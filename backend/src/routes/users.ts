import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.use(authMiddleware);

router.get('/profile/:id', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.params.id) },
      select: {
        id: true, username: true, fullName: true, avatar: true, bio: true,
        totalPoints: true, streak: true, createdAt: true,
        progress: { include: { topic: true }, where: { OR: [{ lessonDone: true }, { quizPassed: true }] } },
        quizResults: { orderBy: { completedAt: 'desc' }, take: 10, include: { quiz: { include: { topic: true } } } },
        homeworkSubmissions: {
          orderBy: { submittedAt: 'desc' },
          include: { homework: { include: { topic: true } } }
        },
        challengeParticipants: {
          where: { submittedAt: { not: null } },
          orderBy: { submittedAt: 'desc' },
          include: { challenge: true }
        }
      }
    });
    if (!user) { res.status(404).json({ error: 'Kullanıcı bulunamadı' }); return; }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

router.put('/profile', async (req: AuthRequest, res: Response) => {
  const { username, fullName, bio, avatar } = req.body;
  try {
    const updated = await prisma.user.update({
      where: { id: req.userId! },
      data: {
        ...(username && { username }),
        ...(fullName !== undefined && { fullName }),
        ...(bio !== undefined && { bio }),
        ...(avatar && { avatar })
      },
      select: { id: true, username: true, fullName: true, avatar: true, bio: true, totalPoints: true }
    });
    res.json(updated);
  } catch (err: any) {
    if (err?.code === 'P2002') {
      res.status(400).json({ error: 'Kullanıcı adı zaten kullanımda' });
    } else {
      res.status(500).json({ error: 'Sunucu hatası' });
    }
  }
});

router.get('/notifications', async (req: AuthRequest, res: Response) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.userId! },
      orderBy: { createdAt: 'desc' },
      take: 20
    });
    res.json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

router.put('/notifications/:id/read', async (req: AuthRequest, res: Response) => {
  try {
    await prisma.notification.update({
      where: { id: Number(req.params.id), userId: req.userId! },
      data: { read: true }
    });
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Tüm bildirimleri okundu yap
router.put('/notifications/read-all', async (req: AuthRequest, res: Response) => {
  try {
    await prisma.notification.updateMany({
      where: { userId: req.userId!, read: false },
      data: { read: true }
    });
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

export default router;
