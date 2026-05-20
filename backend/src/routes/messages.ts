import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.use(authMiddleware);

router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const messages = await prisma.message.findMany({
      where: { OR: [{ senderId: req.userId! }, { receiverId: req.userId! }] },
      include: {
        sender: { select: { id: true, username: true, avatar: true } },
        receiver: { select: { id: true, username: true, avatar: true } }
      },
      orderBy: { createdAt: 'desc' },
      take: 50
    });
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

router.post('/', async (req: AuthRequest, res: Response): Promise<void> => {
  const { receiverId, content } = req.body;
  if (!receiverId || !content) { res.status(400).json({ error: 'Alıcı ve içerik gerekli' }); return; }
  if (receiverId === req.userId) { res.status(400).json({ error: 'Kendinize mesaj gönderemezsiniz' }); return; }
  try {
    const receiver = await prisma.user.findUnique({ where: { id: Number(receiverId) } });
    if (!receiver) { res.status(404).json({ error: 'Kullanıcı bulunamadı' }); return; }

    const message = await prisma.message.create({
      data: { senderId: req.userId!, receiverId: Number(receiverId), content },
      include: {
        sender: { select: { id: true, username: true, avatar: true } },
        receiver: { select: { id: true, username: true, avatar: true } }
      }
    });

    await prisma.notification.create({
      data: {
        userId: Number(receiverId),
        type: 'new_message',
        title: 'Yeni Mesaj',
        body: `${message.sender.username} size bir mesaj gönderdi.`
      }
    });

    res.status(201).json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

export default router;
