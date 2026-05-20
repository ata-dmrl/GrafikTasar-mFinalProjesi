/**
 * delete-user.ts — Kullanıcı Silme Scripti
 *
 * AMAÇ: Belirtilen kullanıcıyı ve ona ait TÜM verileri veritabanından temizler.
 * Test kullanıcılarını veya istenmeyen hesapları kaldırmak için kullanılır.
 *
 * KULLANIM: Dosyanın içindeki `username` değişkenini değiştirip çalıştırın:
 *   npx ts-node src/delete-user.ts
 *
 * SİLİNEN VERİLER (sırayla, foreign key hataları olmadan):
 *   1. Bildirimler            (Notification)
 *   2. Mesajlar               (Message — gönderilen ve alınan)
 *   3. Quiz sonuçları         (QuizResult)
 *   4. İlerleme kayıtları     (Progress)
 *   5. Challenge katılımları  (ChallengeParticipant)
 *   6. Ödev gönderileri       (HomeworkSubmission)
 *   7. Kullanıcının kendisi   (User)
 *
 * ⚠️  DİKKAT: Bu işlem geri alınamaz!
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const username = 'gamer';

  const user = await prisma.user.findFirst({ where: { username } });
  if (!user) {
    console.log(`❌ "${username}" kullanıcısı bulunamadı`);
    return;
  }

  console.log(`🔍 Bulunan kullanıcı: ID=${user.id}, email=${user.email}`);

  // İlişkili verileri sil
  await prisma.notification.deleteMany({ where: { userId: user.id } });
  await prisma.message.deleteMany({ where: { OR: [{ senderId: user.id }, { receiverId: user.id }] } });
  await prisma.quizResult.deleteMany({ where: { userId: user.id } });
  await prisma.progress.deleteMany({ where: { userId: user.id } });
  await prisma.challengeParticipant.deleteMany({ where: { userId: user.id } });
  await prisma.homeworkSubmission.deleteMany({ where: { userId: user.id } });
  await prisma.user.delete({ where: { id: user.id } });

  console.log(`✅ "${username}" kullanıcısı ve tüm verileri silindi!`);
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
