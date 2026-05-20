/**
 * admin-setup.ts — Admin Kullanıcı Kurulum Scripti
 *
 * AMAÇ: "admin" kullanıcısına tüm konularda tamamlanmış ilerleme kaydı oluşturur.
 * Bu sayede admin, platform üzerindeki tüm içeriklere kısıtsız erişebilir.
 *
 * ÇALIŞTIRILIR: Yeni bir konu eklendikten sonra aşağıdaki komutla çalıştırılır:
 *   npx ts-node src/admin-setup.ts
 *
 * YAPTIĞI İŞLEMLER:
 *   1. Veritabanında "admin" kullanıcısını bulur
 *   2. Kullanıcı rolünü 'admin' olarak günceller
 *   3. Mevcut tüm konular için ders + quiz tamamlandı kaydı oluşturur (upsert)
 *   4. Tüm konuların puanlarını toplayıp kullanıcının totalPoints alanını günceller
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. Veritabanında "admin" kullanıcısını ara
  const user = await prisma.user.findFirst({ where: { username: 'admin' } });
  if (!user) {
    console.log('❌ admin kullanıcısı bulunamadı');
    return;
  }

  // Rolü 'admin' olarak garantiye al
  await prisma.user.update({
    where: { id: user.id },
    data: { role: 'admin' }
  });
  console.log(`✅ Admin kullanıcısı bulundu: ${user.username}`);

  // 2. Veritabanındaki tüm konuları çek (sadece puan hesabı için gerekli alanlar)
  const topics = await prisma.topic.findMany({
    select: { id: true, title: true, lessonPoints: true, quizPoints: true }
  });
  console.log(`📚 ${topics.length} konu bulundu`);

  // 3. Her konu için ilerleme kaydı oluştur ya da güncelle (upsert)
  //    - lessonDone: true  → ders tamamlandı
  //    - quizPassed: true  → quiz geçildi
  //    - bestScore: 100    → en yüksek puan %100
  let totalPoints = 0;
  for (const topic of topics) {
    await prisma.progress.upsert({
      where: { userId_topicId: { userId: user.id, topicId: topic.id } },
      update:  { lessonDone: true, quizPassed: true, bestScore: 100, completedAt: new Date() },
      create:  { userId: user.id, topicId: topic.id, lessonDone: true, quizPassed: true, bestScore: 100, completedAt: new Date() }
    });
    totalPoints += topic.lessonPoints + topic.quizPoints;
    console.log(`  ✅ ${topic.title}`);
  }

  // 4. Hesaplanan toplam puanı kullanıcı kaydına yaz
  await prisma.user.update({
    where: { id: user.id },
    data: { totalPoints }
  });

  console.log(`\n🎯 Toplam puan: ${totalPoints}`);
  console.log(`\n🎉 Admin kurulumu tamamlandı! Giriş: kullanıcı adı = admin`);
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
