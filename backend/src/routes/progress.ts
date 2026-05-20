import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.use(authMiddleware);

router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const progress = await prisma.progress.findMany({
      where: { userId: req.userId! },
      include: { topic: true }
    });
    res.json(progress);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

router.post('/complete-lesson', async (req: AuthRequest, res: Response): Promise<void> => {
  const { topicId } = req.body;
  if (!topicId) { res.status(400).json({ error: 'topicId gerekli' }); return; }
  try {
    const topic = await prisma.topic.findUnique({ where: { id: Number(topicId) } });
    if (!topic) { res.status(404).json({ error: 'Konu bulunamadı' }); return; }

    const existing = await prisma.progress.findUnique({
      where: { userId_topicId: { userId: req.userId!, topicId: Number(topicId) } }
    });
    if (existing?.lessonDone) {
      res.json({ message: 'Ders zaten tamamlandı', alreadyDone: true, progress: existing });
      return;
    }

    const progress = await prisma.progress.upsert({
      where: { userId_topicId: { userId: req.userId!, topicId: Number(topicId) } },
      update: { lessonDone: true },
      create: { userId: req.userId!, topicId: Number(topicId), lessonDone: true }
    });

    await prisma.user.update({
      where: { id: req.userId! },
      data: { totalPoints: { increment: topic.lessonPoints } }
    });

    await prisma.notification.create({
      data: {
        userId: req.userId!,
        type: 'lesson_complete',
        title: 'Ders Tamamlandı!',
        body: `"${topic.title}" dersini tamamladın! +${topic.lessonPoints} puan kazandın.`
      }
    });

    res.json({ message: 'Ders tamamlandı', earnedPoints: topic.lessonPoints, progress });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

export default router;
