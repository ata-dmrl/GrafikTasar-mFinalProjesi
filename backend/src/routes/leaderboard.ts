import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (_req, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, username: true, avatar: true, totalPoints: true, streak: true, createdAt: true },
      orderBy: { totalPoints: 'desc' },
      take: 100
    });
    const ranked = users.map((u, i) => ({ ...u, rank: i + 1 }));
    res.json(ranked);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

router.get('/me', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, totalPoints: true },
      orderBy: { totalPoints: 'desc' }
    });
    const rank = users.findIndex(u => u.id === req.userId!) + 1;
    const me = users.find(u => u.id === req.userId!);
    res.json({ rank, totalPoints: me?.totalPoints || 0, totalUsers: users.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

export default router;
