import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { verifyGitHubRepo, isGitHubUrl } from '../utils/github';

const router = Router();
const prisma = new PrismaClient();

router.use(authMiddleware);

// Konuya ait ödevi getir
router.get('/topic/:slug', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const topic = await prisma.topic.findUnique({ where: { slug: req.params.slug } });
    if (!topic) { res.status(404).json({ error: 'Konu bulunamadı' }); return; }

    const homework = await prisma.homework.findFirst({
      where: { topicId: topic.id },
      include: {
        submissions: { where: { userId: req.userId! } }
      }
    });

    if (!homework) { res.json(null); return; }

    res.json({
      ...homework,
      mySubmission: homework.submissions[0] || null
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Ödev teslim et
router.post('/:id/submit', async (req: AuthRequest, res: Response): Promise<void> => {
  const homeworkId = Number(req.params.id);
  const { githubUrl } = req.body;

  if (!githubUrl || !isGitHubUrl(githubUrl)) {
    res.status(400).json({ error: 'Geçerli bir GitHub repo URL girin (https://github.com/kullanici/repo)' });
    return;
  }

  try {
    const homework = await prisma.homework.findUnique({ where: { id: homeworkId } });
    if (!homework) { res.status(404).json({ error: 'Ödev bulunamadı' }); return; }

    // GitHub repo kontrolü
    const { valid, repoName } = await verifyGitHubRepo(githubUrl);

    const existing = await prisma.homeworkSubmission.findUnique({
      where: { userId_homeworkId: { userId: req.userId!, homeworkId } }
    });

    let submission;
    const earnedPoints = valid ? homework.points : 0;

    if (existing) {
      submission = await prisma.homeworkSubmission.update({
        where: { userId_homeworkId: { userId: req.userId!, homeworkId } },
        data: { githubUrl, repoName, verified: valid, points: earnedPoints, submittedAt: new Date() }
      });
    } else {
      submission = await prisma.homeworkSubmission.create({
        data: { userId: req.userId!, homeworkId, githubUrl, repoName, verified: valid, points: earnedPoints }
      });

      if (valid && earnedPoints > 0) {
        await prisma.user.update({
          where: { id: req.userId! },
          data: { totalPoints: { increment: earnedPoints } }
        });
      }
    }

    res.json({
      submission,
      verified: valid,
      repoName,
      earnedPoints: existing ? 0 : earnedPoints,
      message: valid
        ? `✅ GitHub reposu doğrulandı! +${earnedPoints} puan kazandın!`
        : '⚠️ GitHub reposuna erişilemedi. URL\'nin public bir repo olduğunu kontrol edin.'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Kullanıcının tüm ödevleri
router.get('/my', async (req: AuthRequest, res: Response) => {
  try {
    const submissions = await prisma.homeworkSubmission.findMany({
      where: { userId: req.userId! },
      include: { homework: { include: { topic: true } } },
      orderBy: { submittedAt: 'desc' }
    });
    res.json(submissions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

export default router;
