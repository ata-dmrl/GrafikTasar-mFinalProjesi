import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { verifyGitHubRepo, isGitHubUrl } from '../utils/github';

const router = Router();
const prisma = new PrismaClient();

router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const challenges = await prisma.challenge.findMany({
      orderBy: { startDate: 'desc' },
      include: {
        _count: { select: { participants: true } },
        participants: {
          where: { userId: req.userId! },
          select: { githubUrl: true, language: true, repoName: true, verified: true, earnedPoints: true, submittedAt: true }
        }
      }
    });
    res.json(challenges.map(c => ({
      ...c,
      participantCount: c._count.participants,
      myParticipation: c.participants[0] || null
    })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

router.get('/:id', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const challenge = await prisma.challenge.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        participants: {
          include: { user: { select: { id: true, username: true, avatar: true } } },
          orderBy: { submittedAt: 'asc' },
          take: 20
        }
      }
    });
    if (!challenge) { res.status(404).json({ error: 'Challenge bulunamadı' }); return; }
    res.json(challenge);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

router.post('/:id/join', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  const challengeId = Number(req.params.id);
  try {
    const challenge = await prisma.challenge.findUnique({ where: { id: challengeId } });
    if (!challenge) { res.status(404).json({ error: 'Challenge bulunamadı' }); return; }
    if (challenge.status !== 'active') { res.status(400).json({ error: 'Bu challenge aktif değil' }); return; }

    const existing = await prisma.challengeParticipant.findUnique({
      where: { userId_challengeId: { userId: req.userId!, challengeId } }
    });
    if (existing) { res.status(400).json({ error: 'Zaten katıldınız' }); return; }

    const participation = await prisma.challengeParticipant.create({
      data: { userId: req.userId!, challengeId }
    });
    res.json({ message: 'Challenge\'a katıldınız!', participation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// GitHub linki ile çözüm gönder
router.post('/:id/submit-github', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  const challengeId = Number(req.params.id);
  const { githubUrl, language } = req.body;

  if (!githubUrl || !isGitHubUrl(githubUrl)) {
    res.status(400).json({ error: 'Geçerli bir GitHub repo URL girin (https://github.com/kullanici/repo)' });
    return;
  }

  try {
    const challenge = await prisma.challenge.findUnique({ where: { id: challengeId } });
    if (!challenge) { res.status(404).json({ error: 'Challenge bulunamadı' }); return; }
    if (challenge.status !== 'active') { res.status(400).json({ error: 'Bu challenge aktif değil' }); return; }

    const participation = await prisma.challengeParticipant.findUnique({
      where: { userId_challengeId: { userId: req.userId!, challengeId } }
    });
    if (!participation) { res.status(400).json({ error: 'Önce challenge\'a katılın' }); return; }
    if (participation.submittedAt) { res.status(400).json({ error: 'Zaten gönderi yaptınız' }); return; }

    const { valid, repoName } = await verifyGitHubRepo(githubUrl);
    const earnedPoints = valid ? challenge.points : 0;

    const updated = await prisma.challengeParticipant.update({
      where: { userId_challengeId: { userId: req.userId!, challengeId } },
      data: {
        githubUrl,
        language: language || 'python',
        repoName,
        verified: valid,
        earnedPoints,
        submittedAt: new Date()
      }
    });

    if (valid && earnedPoints > 0) {
      await prisma.user.update({
        where: { id: req.userId! },
        data: { totalPoints: { increment: earnedPoints } }
      });
    }

    res.json({
      participation: updated,
      verified: valid,
      repoName,
      earnedPoints,
      message: valid
        ? `✅ Repo doğrulandı! +${earnedPoints} puan kazandın!`
        : '⚠️ GitHub reposuna erişilemedi. Reponun public olduğunu kontrol edin.'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

export default router;
