import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { sendWelcomeEmail } from '../services/emailService';

const router = Router();
const prisma = new PrismaClient();

router.post('/register', async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).json({ error: 'Tüm alanlar gerekli' });
    return;
  }
  if (password.length < 6) {
    res.status(400).json({ error: 'Şifre en az 6 karakter olmalı' });
    return;
  }
  try {
    const existing = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] }
    });
    if (existing) {
      res.status(400).json({ error: 'Kullanıcı adı veya e-posta zaten kullanımda' });
      return;
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, email, password: hashed }
    });
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '7d' });

    // Hoş geldin e-postası gönder (arka planda)
    sendWelcomeEmail(email, username).catch(console.error);

    res.status(201).json({ token, user: { id: user.id, username: user.username, email: user.email, totalPoints: 0 } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Username veya e-posta ile giriş
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ error: 'Kullanıcı adı ve şifre gerekli' });
    return;
  }
  try {
    const user = await prisma.user.findFirst({
      where: { OR: [{ username }, { email: username }] }
    });
    if (!user) {
      res.status(401).json({ error: 'Kullanıcı bulunamadı' });
      return;
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      res.status(401).json({ error: 'Hatalı şifre' });
      return;
    }
    await prisma.user.update({ where: { id: user.id }, data: { lastActive: new Date() } });
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, username: user.username, email: user.email, totalPoints: user.totalPoints, avatar: user.avatar } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

router.get('/me', async (req: Request, res: Response): Promise<void> => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) { res.status(401).json({ error: 'Token gerekli' }); return; }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, username: true, email: true, avatar: true, bio: true, totalPoints: true, streak: true, role: true, createdAt: true }
    });
    if (!user) { res.status(404).json({ error: 'Kullanıcı bulunamadı' }); return; }
    res.json(user);
  } catch {
    res.status(401).json({ error: 'Geçersiz token' });
  }
});

export default router;
