import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (_req, res: Response) => {
  try {
    const topics = await prisma.topic.findMany({
      orderBy: [{ level: 'asc' }, { order: 'asc' }],
      include: { children: { orderBy: { order: 'asc' } } }
    });
    res.json(topics);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

router.get('/:slug', async (req, res: Response) => {
  try {
    const topic = await prisma.topic.findUnique({
      where: { slug: req.params.slug },
      include: {
        children: { orderBy: { order: 'asc' } },
        parent: true,
        quizzes: { include: { questions: { orderBy: { order: 'asc' } } } }
      }
    });
    if (!topic) { res.status(404).json({ error: 'Konu bulunamadı' }); return; }
    res.json(topic);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

router.get('/:slug/lesson', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  const { slug } = req.params;
  const { getLessonBySlug } = await import('../data/lessonContent');
  const content = getLessonBySlug(slug);
  if (!content) { res.status(404).json({ error: 'Ders içeriği bulunamadı' }); return; }
  res.json(content);
});

router.get('/:slug/exercises', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  const { slug } = req.params;
  const { getExercises } = await import('../data/exercises');
  const exercises = getExercises(slug);
  res.json(exercises);
});

export default router;
