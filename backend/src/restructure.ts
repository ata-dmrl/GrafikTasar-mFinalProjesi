/**
 * restructure.ts — Eğitim Müfredatı Yeniden Yapılandırma Scripti
 *
 * AMAÇ: Tüm konuların seviye (level) ve ebeveyn (parent) ilişkilerini
 * yeniden düzenler; "Veri Girişi" ve "For Döngüleri" adlı iki yeni konu ekler.
 *
 * ÇALIŞTIRILIR (tek seferlik):
 *   npx ts-node src/restructure.ts
 *
 * YAPTIĞI İŞLEMLER:
 *   1. "Veri Girişi" konusunu Level 0 olarak ekler (upsert)
 *   2. "For Döngüleri" konusunu Level 1 olarak ekler (upsert)
 *   3. Mevcut 16 konunun level ve parentId değerlerini günceller
 *   4. "Karmaşıklık Analizi" adını "Big O Notasyonu" olarak değiştirir
 *   5. Her yeni konuya 5 quiz sorusu ekler (önceki quizler temizlenir)
 *   6. Her yeni konuya ödev ekler
 *
 * YENİ MÜFREDAт YAPISI:
 *   Level 0: Veri Girişi
 *   Level 1: For Döngüleri, Özyineleme
 *   Level 2: Diziler, Bağlı Listeler
 *   Level 3: Yığınlar, Kuyruklar, Hash Tabloları
 *   Level 4: Sıralama Alg., Quick Sort, İkili Arama
 *   Level 5: Ağaçlar, BST, Big O Notasyonu
 *   Level 6: Graflar, Dijkstra, Dinamik Programlama, Algoritmaya Giriş
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Eğitim yapısı yeniden düzenleniyor...\n');

  // ─── 1. YENİ KONU: Veri Girişi (Level 0 - yeni root) ───
  const veriGirisi = await prisma.topic.upsert({
    where: { slug: 'veri-girisi' },
    update: {},
    create: {
      slug: 'veri-girisi',
      title: 'Veri Girişi ve Temel Kavramlar',
      titleEn: 'Data Entry and Basic Concepts',
      description: 'Değişkenler, veri tipleri, temel I/O işlemleri ve programlamaya giriş',
      level: 0,
      parentId: null,
      lessonPoints: 10,
      quizPoints: 20,
      order: 1,
      icon: '💾',
      color: '#06b6d4',
      estimatedMin: 20,
    }
  });
  console.log(`✅ Konu: ${veriGirisi.title} (Level 0)`);

  // ─── 2. YENİ KONU: For Döngüleri (Level 1) ───
  const forDonguleri = await prisma.topic.upsert({
    where: { slug: 'for-donguleri' },
    update: {},
    create: {
      slug: 'for-donguleri',
      title: 'For Döngüleri ve Kontrol Akışı',
      titleEn: 'For Loops and Control Flow',
      description: 'For, while döngüleri, if/else koşulları ve fonksiyon temelleri',
      level: 1,
      parentId: veriGirisi.id,
      lessonPoints: 10,
      quizPoints: 20,
      order: 2,
      icon: '🔁',
      color: '#f59e0b',
      estimatedMin: 25,
    }
  });
  console.log(`✅ Konu: ${forDonguleri.title} (Level 1)`);

  // Topic ID'lerini al
  const topics = await prisma.topic.findMany();
  const bySlug = Object.fromEntries(topics.map(t => [t.slug, t.id]));

  // ─── 3. MEVCUT KONULARI GÜNCELLE ───

  const updates: Array<{ slug: string; level: number; parentSlug: string | null; order: number; title?: string; titleEn?: string }> = [
    // Level 1: Özyineleme → parent: veri-girisi
    { slug: 'ozyineleme', level: 1, parentSlug: 'veri-girisi', order: 1 },

    // Level 2: Diziler + Bağlı Listeler → parent: for-donguleri
    { slug: 'diziler',       level: 2, parentSlug: 'for-donguleri', order: 1 },
    { slug: 'bagli-listeler', level: 2, parentSlug: 'for-donguleri', order: 2 },

    // Level 3: Yığınlar, Kuyruklar, Hash Tabloları
    { slug: 'yiginlar',       level: 3, parentSlug: 'bagli-listeler', order: 1 },
    { slug: 'kuyruklar',      level: 3, parentSlug: 'bagli-listeler', order: 2 },
    { slug: 'hash-tablolari', level: 3, parentSlug: 'diziler',        order: 1 },

    // Level 4: Sıralama, Hızlı Sıralama, İkili Arama
    { slug: 'siralama-algoritmalari', level: 4, parentSlug: 'yiginlar',              order: 1 },
    { slug: 'quick-sort',             level: 4, parentSlug: 'siralama-algoritmalari', order: 2 },
    { slug: 'ikili-arama',            level: 4, parentSlug: 'hash-tablolari',         order: 1 },

    // Level 5: Ağaçlar, BST, Big O Notasyonu (= Karmaşıklık Analizi)
    { slug: 'agaclar',          level: 5, parentSlug: 'ozyineleme',           order: 1 },
    { slug: 'bst',              level: 5, parentSlug: 'agaclar',              order: 2 },
    {
      slug: 'karmasiklik-analizi',
      level: 5,
      parentSlug: 'siralama-algoritmalari',
      order: 3,
      title: 'Big O Notasyonu',
      titleEn: 'Big O Notation',
    },

    // Level 6: Graflar, Dijkstra, DP, Algoritmaya Giriş
    { slug: 'graflar',             level: 6, parentSlug: 'agaclar',           order: 1 },
    { slug: 'dijkstra',            level: 6, parentSlug: 'graflar',           order: 2 },
    { slug: 'dinamik-programlama', level: 6, parentSlug: 'agaclar',           order: 3 },
    { slug: 'algoritmaya-giris',   level: 6, parentSlug: 'graflar',           order: 4 },
  ];

  for (const u of updates) {
    const parentId = u.parentSlug ? bySlug[u.parentSlug] : null;
    const updateData: any = { level: u.level, parentId, order: u.order };
    if (u.title)   updateData.title   = u.title;
    if (u.titleEn) updateData.titleEn = u.titleEn;

    await prisma.topic.update({ where: { slug: u.slug }, data: updateData });
    console.log(`✅ Güncellendi: ${u.slug} → Level ${u.level}${u.title ? ` (${u.title})` : ''}`);
  }

  // ─── 4. YENİ KONULARA QUİZ EKLE ───

  // Veri Girişi quizi
  await addQuiz(bySlug['veri-girisi'], [
    {
      text: 'Python\'da bir değişkene değer atamak için hangi operatör kullanılır?',
      type: 'multiple_choice',
      options: ['==', '=', ':=', '<-'],
      answer: '=',
      explanation: 'Python\'da "=" operatörü atama için kullanılır. "==" ise eşitlik karşılaştırmasıdır.',
      order: 1,
    },
    {
      text: 'Python\'da kullanıcıdan veri almak için hangi fonksiyon kullanılır?',
      type: 'multiple_choice',
      options: ['read()', 'scan()', 'input()', 'get()'],
      answer: 'input()',
      explanation: 'input() fonksiyonu klavyeden kullanıcı girdisi almak için kullanılır.',
      order: 2,
    },
    {
      text: 'int("42") ifadesi ne döndürür?',
      type: 'multiple_choice',
      options: ['"42"', '42', 'True', 'Hata'],
      answer: '42',
      explanation: 'int() fonksiyonu string\'i tam sayıya dönüştürür. int("42") → 42',
      order: 3,
    },
    {
      text: 'Python\'da print() fonksiyonu ekrana çıktı basmak için kullanılır.',
      type: 'true_false',
      options: ['Doğru', 'Yanlış'],
      answer: 'Doğru',
      explanation: 'Evet! print() en temel çıktı fonksiyonudur.',
      order: 4,
    },
    {
      text: 'Aşağıdakilerden hangisi geçersiz bir değişken adıdır?',
      type: 'multiple_choice',
      options: ['_sayi', 'sayi1', '1sayi', 'sayi_bir'],
      answer: '1sayi',
      explanation: 'Değişken adları rakamla başlayamaz. "1sayi" geçersizdir.',
      order: 5,
    },
  ]);
  console.log(`✅ Quiz eklendi: veri-girisi`);

  // For Döngüleri quizi
  await addQuiz(bySlug['for-donguleri'], [
    {
      text: 'for i in range(5): döngüsü kaç kez çalışır?',
      type: 'multiple_choice',
      options: ['4', '5', '6', '1'],
      answer: '5',
      explanation: 'range(5) → 0,1,2,3,4 değerlerini üretir, yani 5 kez çalışır.',
      order: 1,
    },
    {
      text: 'range(2, 8, 2) ifadesi hangi değerleri üretir?',
      type: 'multiple_choice',
      options: ['2,4,6,8', '2,4,6', '2,3,4,5,6,7', '0,2,4,6'],
      answer: '2,4,6',
      explanation: 'range(başlangıç, bitiş, adım) → 2\'den başlar, 8\'e kadar (8 dahil değil), 2\'şer artar: 2,4,6',
      order: 2,
    },
    {
      text: 'while True döngüsü sonsuz döngü oluşturur.',
      type: 'true_false',
      options: ['Doğru', 'Yanlış'],
      answer: 'Doğru',
      explanation: 'while True koşul her zaman doğru olduğu için sonsuz çalışır. break ile durdurulabilir.',
      order: 3,
    },
    {
      text: 'Döngüyü erken sonlandırmak için hangi anahtar kelime kullanılır?',
      type: 'multiple_choice',
      options: ['stop', 'exit', 'break', 'return'],
      answer: 'break',
      explanation: 'break, döngüyü anında sonlandırır ve döngü bloğundan çıkar.',
      order: 4,
    },
    {
      text: 'if x > 0: bloğu hangi koşulda çalışır?',
      type: 'multiple_choice',
      options: ['x sıfır olduğunda', 'x negatif olduğunda', 'x sıfırdan büyük olduğunda', 'Her zaman'],
      answer: 'x sıfırdan büyük olduğunda',
      explanation: 'x > 0 koşulu yalnızca x pozitif (0\'dan büyük) olduğunda True döner.',
      order: 5,
    },
  ]);
  console.log(`✅ Quiz eklendi: for-donguleri`);

  // ─── 5. YENİ KONULARA ÖDEV EKLE ───
  await prisma.homework.deleteMany({ where: { topicId: bySlug['veri-girisi'] } });
  await prisma.homework.create({
    data: {
      topicId: bySlug['veri-girisi'],
      title: 'Kişisel Bilgi Programı',
      description: `**Ödev:** Kullanıcıdan bilgi alan ve formatlı çıktı veren program yaz.

**Gereksinimler:**
1. Kullanıcıdan: isim, yaş, şehir ve favori programlama dili al
2. Bilgileri güzel formatlı olarak ekrana yazdır
3. Yaşa göre: 18'den küçükse "Genç geliştirici!", büyükse "Deneyimli geliştirici!" yazdır
4. Doğum yılını hesapla ve yazdır (2026 - yaş)

**Bonus:** Kullanıcı adını büyük harfe çevir ve kaç karakter olduğunu söyle.`,
      difficulty: 'easy',
      points: 10,
    }
  });

  await prisma.homework.deleteMany({ where: { topicId: bySlug['for-donguleri'] } });
  await prisma.homework.create({
    data: {
      topicId: bySlug['for-donguleri'],
      title: 'Sayı Analizi Programı',
      description: `**Ödev:** Döngüler ve koşullarla sayı analizi yapan program.

**Gereksinimler:**
1. 1'den 100'e kadar tüm çift sayıları yazdır
2. 1'den 50'ye kadar sayıların toplamını hesapla
3. Kullanıcıdan bir sayı al, o sayının faktöriyelini hesapla (döngü ile)
4. FizzBuzz: 1-30 arası: 3'e bölünene "Fizz", 5'e bölünene "Buzz", ikisine de bölünene "FizzBuzz" yazdır

**Bonus:** Kullanıcıdan kaç sayı gireceğini sor, girilen sayıların ortalamasını hesapla.`,
      difficulty: 'easy',
      points: 10,
    }
  });
  console.log(`✅ Ödevler eklendi: veri-girisi, for-donguleri`);

  console.log('\n🎉 Eğitim yapısı başarıyla yeniden düzenlendi!');
  console.log('\n📊 Yeni yapı:');
  console.log('  Level 0: Veri Girişi');
  console.log('  Level 1: Özyineleme / For Döngüleri');
  console.log('  Level 2: Diziler / Bağlı Listeler');
  console.log('  Level 3: Yığınlar / Kuyruklar / Hash Tabloları');
  console.log('  Level 4: Sıralama Algoritmaları / Hızlı Sıralama / İkili Arama');
  console.log('  Level 5: Ağaçlar / BST / Big O Notasyonu');
  console.log('  Level 6: Graflar / Dijkstra / Dinamik Programlama / Algoritmaya Giriş');
}

async function addQuiz(topicId: number, questions: Array<{
  text: string; type: string; options: string[]; answer: string; explanation: string; order: number;
}>) {
  const existing = await prisma.quiz.findMany({ where: { topicId } });
  for (const q of existing) {
    await prisma.quizResult.deleteMany({ where: { quizId: q.id } });
    await prisma.question.deleteMany({ where: { quizId: q.id } });
  }
  await prisma.quiz.deleteMany({ where: { topicId } });

  const quiz = await prisma.quiz.create({ data: { topicId } });
  for (const q of questions) {
    await prisma.question.create({
      data: {
        quizId: quiz.id,
        text: q.text,
        type: q.type,
        options: JSON.stringify(q.options),
        answer: q.answer,
        explanation: q.explanation,
        order: q.order,
      }
    });
  }
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
