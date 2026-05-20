import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.use(authMiddleware);

router.get('/topic/:topicId', async (req: AuthRequest, res: Response) => {
  try {
    const quiz = await prisma.quiz.findFirst({
      where: { topicId: Number(req.params.topicId) },
      include: { questions: { orderBy: { order: 'asc' } } }
    });
    if (!quiz) { res.status(404).json({ error: 'Quiz bulunamadı' }); return; }
    const safeQuestions = quiz.questions.map(q => ({
      id: q.id, text: q.text, type: q.type,
      options: q.options ? JSON.parse(q.options) : null,
      order: q.order
    }));
    res.json({ ...quiz, questions: safeQuestions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

router.post('/:quizId/submit', async (req: AuthRequest, res: Response): Promise<void> => {
  const { answers } = req.body;
  const quizId = Number(req.params.quizId);
  if (!answers || !Array.isArray(answers)) {
    res.status(400).json({ error: 'Cevaplar gerekli' });
    return;
  }
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: { questions: true, topic: true }
    });
    if (!quiz) { res.status(404).json({ error: 'Quiz bulunamadı' }); return; }

    let correct = 0;
    const results = quiz.questions.map(q => {
      const userAnswer = answers.find((a: any) => a.questionId === q.id)?.answer || '';
      const isCorrect = userAnswer.toString().toLowerCase().trim() === q.answer.toString().toLowerCase().trim();
      if (isCorrect) correct++;
      return { questionId: q.id, correct: isCorrect, correctAnswer: q.answer, explanation: q.explanation };
    });

    const total = quiz.questions.length;
    const score = Math.round((correct / total) * 100);
    const passed = score >= 70;
    const topic = quiz.topic;

    const prevResult = await prisma.quizResult.findFirst({
      where: { userId: req.userId!, quizId },
      orderBy: { score: 'desc' }
    });

    let earnedPoints = 0;
    if (passed && (!prevResult || !prevResult.passed)) {
      earnedPoints = score === 100 ? topic.quizPoints + 10 : topic.quizPoints;
      await prisma.user.update({
        where: { id: req.userId! },
        data: { totalPoints: { increment: earnedPoints } }
      });

      await prisma.progress.upsert({
        where: { userId_topicId: { userId: req.userId!, topicId: topic.id } },
        update: { quizPassed: true, bestScore: Math.max(score, prevResult?.score || 0), completedAt: new Date() },
        create: { userId: req.userId!, topicId: topic.id, quizPassed: true, bestScore: score, completedAt: new Date() }
      });

      await prisma.notification.create({
        data: {
          userId: req.userId!,
          type: 'quiz_passed',
          title: 'Quiz Başarılı!',
          body: `${topic.title} quizini %${score} ile geçtin! +${earnedPoints} puan kazandın.`
        }
      });
    } else if (!passed && prevResult?.score && score > prevResult.score) {
      await prisma.progress.upsert({
        where: { userId_topicId: { userId: req.userId!, topicId: topic.id } },
        update: { bestScore: score },
        create: { userId: req.userId!, topicId: topic.id, bestScore: score }
      });
    }

    await prisma.quizResult.create({
      data: { userId: req.userId!, quizId, score, totalQ: total, passed, earnedPoints }
    });

    res.json({ score, total: correct, totalQ: total, passed, earnedPoints, results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

export default router;
