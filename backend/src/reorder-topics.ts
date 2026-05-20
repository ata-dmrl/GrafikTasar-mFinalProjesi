/**
 * reorder-topics.ts — Konu Sıralama Scripti
 *
 * AMAÇ: "Algoritmaya Giriş" konusunu müfredatın başına (Level 0, sıra 1) taşır.
 * Platformda ilk açılacak dersin "Algoritmaya Giriş" olmasını sağlar.
 *
 * ÇALIŞTIRILIR (tek seferlik):
 *   npx ts-node src/reorder-topics.ts
 *
 * YAPTIĞI DEĞİŞİKLİKLER:
 *   - Algoritmaya Giriş → Level 0, order 1, parent: yok (kök konu)
 *   - Veri Girişi       → Level 0, order 2, parent: Algoritmaya Giriş
 *   - For Döngüleri     → Level 1, order 1, parent: Veri Girişi
 *   - Özyineleme        → Level 1, order 2, parent: Veri Girişi
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('📊 Konuların sırasını düzenliyor...\n');

  // 1. Algoritmaya Giriş → Level 0, order 1, parent null
  const algoritmaGiris = await prisma.topic.update({
    where: { slug: 'algoritmaya-giris' },
    data: {
      level: 0,
      order: 1,
      parentId: null
    }
  });
  console.log(`✅ Algoritmaya Giriş → Level 0, Sıra 1 (parent: null)`);

  // 2. Veri Girişi → Level 0, order 2, parent = Algoritmaya Giriş
  const veriGirisi = await prisma.topic.update({
    where: { slug: 'veri-girisi' },
    data: {
      level: 0,
      order: 2,
      parentId: algoritmaGiris.id
    }
  });
  console.log(`✅ Veri Girişi → Level 0, Sıra 2 (parent: Algoritmaya Giriş)`);

  // 3. For Döngüleri → Level 1, order 1, parent = Veri Girişi
  await prisma.topic.update({
    where: { slug: 'for-donguleri' },
    data: {
      level: 1,
      order: 1,
      parentId: veriGirisi.id
    }
  });
  console.log(`✅ For Döngüleri → Level 1, Sıra 1 (parent: Veri Girişi)`);

  // 4. Özyineleme → Level 1, order 2, parent = Veri Girişi
  await prisma.topic.update({
    where: { slug: 'ozyineleme' },
    data: {
      level: 1,
      order: 2,
      parentId: veriGirisi.id
    }
  });
  console.log(`✅ Özyineleme → Level 1, Sıra 2 (parent: Veri Girişi)`);

  console.log('\n🎉 Konu sıralaması başarıyla güncellendi!');
  console.log('\n📚 Yeni yapı:');
  console.log('  Level 0:');
  console.log('    1️⃣ Algoritmaya Giriş (İlk Ders)');
  console.log('    2️⃣ Veri Girişi ve Temel Kavramlar');
  console.log('  Level 1:');
  console.log('    For Döngüleri ve Kontrol Akışı');
  console.log('    Özyineleme');
  console.log('  Level 2:');
  console.log('    Diziler');
  console.log('    Bağlı Listeler');
  console.log('  ... (diğer seviyeler)');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
