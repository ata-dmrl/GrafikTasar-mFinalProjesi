import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const topicsData = [
  // Level 0 - Root
  { slug: 'algoritmaya-giris', title: 'Algoritmalara Giriş', titleEn: 'Introduction to Algorithms', description: 'Algoritma kavramı, özellikleri ve günlük hayattaki örnekleri', level: 0, parentSlug: null, lessonPoints: 10, quizPoints: 20, order: 1, icon: '🧠', color: '#6366f1', estimatedMin: 20 },
  // Level 1
  { slug: 'karmasiklik-analizi', title: 'Karmaşıklık Analizi', titleEn: 'Complexity Analysis', description: 'Big O notasyonu ile algoritma verimliliğini ölçme', level: 1, parentSlug: 'algoritmaya-giris', lessonPoints: 15, quizPoints: 25, order: 1, icon: '📊', color: '#8b5cf6', estimatedMin: 30 },
  { slug: 'ozyineleme', title: 'Özyineleme', titleEn: 'Recursion', description: 'Özyinelemeli fonksiyonlar, taban durumu ve özyinelemeli durum', level: 1, parentSlug: 'algoritmaya-giris', lessonPoints: 15, quizPoints: 25, order: 2, icon: '🔄', color: '#ec4899', estimatedMin: 35 },
  // Level 2
  { slug: 'diziler', title: 'Diziler', titleEn: 'Arrays', description: 'Temel dizi operasyonları, two pointers ve sliding window teknikleri', level: 2, parentSlug: 'karmasiklik-analizi', lessonPoints: 15, quizPoints: 25, order: 1, icon: '📋', color: '#06b6d4', estimatedMin: 30 },
  { slug: 'bagli-listeler', title: 'Bağlı Listeler', titleEn: 'Linked Lists', description: 'Tekli ve çiftli bağlı listeler, düğüm yapısı', level: 2, parentSlug: 'karmasiklik-analizi', lessonPoints: 15, quizPoints: 25, order: 2, icon: '🔗', color: '#10b981', estimatedMin: 35 },
  // Level 3
  { slug: 'yiginlar', title: 'Yığınlar', titleEn: 'Stacks', description: 'LIFO prensibi, push/pop operasyonları ve kullanım alanları', level: 3, parentSlug: 'bagli-listeler', lessonPoints: 15, quizPoints: 25, order: 1, icon: '📚', color: '#f59e0b', estimatedMin: 25 },
  { slug: 'kuyruklar', title: 'Kuyruklar', titleEn: 'Queues', description: 'FIFO prensibi, enqueue/dequeue ve BFS bağlantısı', level: 3, parentSlug: 'bagli-listeler', lessonPoints: 15, quizPoints: 25, order: 2, icon: '🚶', color: '#ef4444', estimatedMin: 25 },
  { slug: 'hash-tablolari', title: 'Hash Tabloları', titleEn: 'Hash Tables', description: 'Anahtar-değer çiftleri, hash fonksiyonu ve çakışma çözümleri', level: 3, parentSlug: 'diziler', lessonPoints: 20, quizPoints: 30, order: 1, icon: '#️⃣', color: '#14b8a6', estimatedMin: 35 },
  // Level 4
  { slug: 'agaclar', title: 'Ağaçlar', titleEn: 'Trees', description: 'İkili ağaçlar, dolaşım yöntemleri ve BST', level: 4, parentSlug: 'ozyineleme', lessonPoints: 20, quizPoints: 30, order: 1, icon: '🌳', color: '#84cc16', estimatedMin: 40 },
  { slug: 'siralama-algoritmalari', title: 'Sıralama Algoritmaları', titleEn: 'Sorting Algorithms', description: 'Bubble, Selection, Insertion, Merge ve Quick Sort', level: 4, parentSlug: 'karmasiklik-analizi', lessonPoints: 20, quizPoints: 30, order: 3, icon: '🔢', color: '#f97316', estimatedMin: 45 },
  // Level 5
  { slug: 'graflar', title: 'Graflar', titleEn: 'Graphs', description: 'Graf teorisi, BFS, DFS ve en kısa yol algoritmaları', level: 5, parentSlug: 'agaclar', lessonPoints: 25, quizPoints: 35, order: 1, icon: '🕸️', color: '#a855f7', estimatedMin: 50 },
  { slug: 'dinamik-programlama', title: 'Dinamik Programlama', titleEn: 'Dynamic Programming', description: 'Memoization, tabulation ve klasik DP problemleri', level: 5, parentSlug: 'siralama-algoritmalari', lessonPoints: 30, quizPoints: 40, order: 1, icon: '⚡', color: '#3b82f6', estimatedMin: 60 },
  // Level 4+ - Advanced Topics
  { slug: 'ikili-arama', title: 'İkili Arama', titleEn: 'Binary Search', description: 'Sıralı dizilerde O(log n) arama, iteratif ve özyinelemeli yaklaşımlar', level: 4, parentSlug: 'karmasiklik-analizi', lessonPoints: 20, quizPoints: 30, order: 4, icon: '🔍', color: '#0ea5e9', estimatedMin: 35 },
  // Level 5+ - Advanced Trees & Sorting
  { slug: 'bst', title: 'İkili Arama Ağacı (BST)', titleEn: 'Binary Search Tree', description: 'BST insert, search, delete operasyonları ve InOrder dolaşımı', level: 5, parentSlug: 'agaclar', lessonPoints: 25, quizPoints: 35, order: 2, icon: '🌲', color: '#22c55e', estimatedMin: 45 },
  { slug: 'quick-sort', title: 'Hızlı Sıralama (Quick Sort)', titleEn: 'Quick Sort', description: 'Lomuto ve Hoare partition, pivot seçimi ve Quick Select', level: 5, parentSlug: 'siralama-algoritmalari', lessonPoints: 25, quizPoints: 35, order: 2, icon: '⚡', color: '#fb923c', estimatedMin: 40 },
  // Level 6 - Graphs Advanced
  { slug: 'dijkstra', title: "Dijkstra Algoritması", titleEn: "Dijkstra's Algorithm", description: "En kısa yol algoritması, öncelik kuyruğu ve A* algoritmasına giriş", level: 6, parentSlug: 'graflar', lessonPoints: 30, quizPoints: 40, order: 1, icon: '🗺️', color: '#c084fc', estimatedMin: 55 },
];

const quizData: Record<string, Array<{text: string; type: string; options?: string[]; answer: string; explanation: string; order: number}>> = {
  'algoritmaya-giris': [
    { text: 'Algoritmanın temel özelliklerinden biri değildir?', type: 'multiple_choice', options: ['Kesinlik', 'Sonluluk', 'Yaratıcılık', 'Etkinlik'], answer: 'Yaratıcılık', explanation: 'Algoritmanın özellikleri: kesinlik, sonluluk, etkinlik, giriş/çıkış. Yaratıcılık bir algoritma özelliği değildir.', order: 1 },
    { text: 'Bir algoritmanın belirli adımlar içermesi ve net tanımlanmış olması hangi özelliğe karşılık gelir?', type: 'multiple_choice', options: ['Sonluluk', 'Kesinlik', 'Etkinlik', 'Girdi'], answer: 'Kesinlik', explanation: 'Kesinlik: Her adımın açık ve net tanımlanmış olması anlamına gelir.', order: 2 },
    { text: 'Günlük hayatta tarif (yemek tarifi) bir algoritma örneği midir?', type: 'true_false', options: ['Doğru', 'Yanlış'], answer: 'Doğru', explanation: 'Evet! Tarif adım adım talimatlar içerir, kesin, sonlu ve etkin bir algoritmadır.', order: 3 },
    { text: 'Bir algoritmanın mutlaka sonlanması gerekir. Bu hangi özelliği ifade eder?', type: 'multiple_choice', options: ['Kesinlik', 'Etkinlik', 'Sonluluk', 'Doğruluk'], answer: 'Sonluluk', explanation: 'Sonluluk: Algoritmanın belirli bir sürede sona ermesi gerektiğini ifade eder.', order: 4 },
    { text: 'İki sayının toplamını bulan bir algoritmada kaç temel adım vardır?', type: 'multiple_choice', options: ['1', '2', '3', '4'], answer: '2', explanation: 'İki sayıyı topla ve sonucu döndür. 2 temel adım yeterlidir.', order: 5 },
  ],
  'karmasiklik-analizi': [
    { text: 'O(1), O(n), O(n²) arasında hangisi en verimlidir?', type: 'multiple_choice', options: ['O(n²)', 'O(n)', 'O(1)', 'Hepsi eşit'], answer: 'O(1)', explanation: 'O(1) sabit zamandır ve n\'den bağımsız, en verimli karmaşıklıktır.', order: 1 },
    { text: 'İç içe iki döngü genellikle hangi zaman karmaşıklığına sahiptir?', type: 'multiple_choice', options: ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'], answer: 'O(n²)', explanation: 'İç içe iki döngüde her döngü n kez çalışır, toplam n×n = n² işlem yapılır.', order: 2 },
    { text: 'İkili arama algoritması hangi zaman karmaşıklığına sahiptir?', type: 'multiple_choice', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], answer: 'O(log n)', explanation: 'İkili aramada her adımda problem yarıya bölünür, bu da O(log n) karmaşıklık sağlar.', order: 3 },
    { text: 'Big O notasyonu en iyi durumu (best case) analiz eder.', type: 'true_false', options: ['Doğru', 'Yanlış'], answer: 'Yanlış', explanation: 'Hayır! Big O genellikle en kötü durumu (worst case) analiz eder.', order: 4 },
    { text: 'O(2n) nasıl sadeleştirilir?', type: 'multiple_choice', options: ['O(2n)', 'O(n)', 'O(n²)', 'O(log n)'], answer: 'O(n)', explanation: 'Big O\'da sabit katsayılar göz ardı edilir: O(2n) → O(n)', order: 5 },
  ],
  'diziler': [
    { text: 'Bir dizide belirli bir indeksteki elemana erişim zaman karmaşıklığı nedir?', type: 'multiple_choice', options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'], answer: 'O(1)', explanation: 'Diziler bellekte ardışık saklandığı için indeks hesaplaması ile O(1) erişim sağlanır.', order: 1 },
    { text: 'Python\'da listenin sonuna eleman eklemenin karmaşıklığı nedir?', type: 'multiple_choice', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], answer: 'O(1)', explanation: 'append() amortize O(1)\'dir çünkü dinamik dizi kapasiteyi aşınca iki katına çıkarır.', order: 2 },
    { text: 'Two Pointers tekniği ne zaman kullanılır?', type: 'multiple_choice', options: ['Sadece sıralı dizilerde', 'Sadece hash tablolarında', 'Sadece ağaçlarda', 'Sadece graflarda'], answer: 'Sadece sıralı dizilerde', explanation: 'Two Pointers tekniği genellikle sıralı dizilerde iki işaretçi ile verimlice çözüm üretir.', order: 3 },
    { text: 'dizi = [1,2,3,4,5] için dizi[1:3] ifadesi ne döndürür?', type: 'multiple_choice', options: ['[1,2]', '[2,3]', '[2,3,4]', '[1,2,3]'], answer: '[2,3]', explanation: 'Python dilimlemesinde dizi[1:3], indeks 1\'den başlayıp 3\'e kadar (3 dahil değil) alır: [2,3]', order: 4 },
    { text: 'Sliding Window tekniği O(n²) karmaşıklıklı çözümleri O(n)\'e indirebilir.', type: 'true_false', options: ['Doğru', 'Yanlış'], answer: 'Doğru', explanation: 'Evet! Sliding window, pencereyi kaydırarak tekrarlı hesaplamalardan kaçınır ve O(n)\'de çalışır.', order: 5 },
  ],
  'bagli-listeler': [
    { text: 'Bağlı listede başa eleman eklemenin karmaşıklığı nedir?', type: 'multiple_choice', options: ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'], answer: 'O(1)', explanation: 'Yeni düğüm oluşturulup head\'e bağlanır, bu sabit zamanlı bir işlemdir.', order: 1 },
    { text: 'Bağlı listenin diziye göre avantajı nedir?', type: 'multiple_choice', options: ['Hızlı rastgele erişim', 'Dinamik boyut', 'Az bellek kullanımı', 'Sıralı erişim'], answer: 'Dinamik boyut', explanation: 'Bağlı listeler dinamik boyutludur, başlangıçta boyut belirtmek gerekmez.', order: 2 },
    { text: 'Çift bağlı listede her düğüm kaç pointer içerir?', type: 'multiple_choice', options: ['1', '2', '3', '0'], answer: '2', explanation: 'Çift bağlı listede her düğüm: next (sonraki) ve prev (önceki) pointerları içerir.', order: 3 },
    { text: 'Bağlı listede arama (search) karmaşıklığı nedir?', type: 'multiple_choice', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], answer: 'O(n)', explanation: 'Bağlı listede rastgele erişim yoktur, baştan sona kadar gezilmesi gerekir.', order: 4 },
    { text: 'Döngüsel bağlı listede son düğümün next pointer\'ı null\'a işaret eder.', type: 'true_false', options: ['Doğru', 'Yanlış'], answer: 'Yanlış', explanation: 'Döngüsel bağlı listede son düğümün next pointer\'ı head (başa) işaret eder.', order: 5 },
  ],
  'yiginlar': [
    { text: 'Yığın hangi prensibi uygular?', type: 'multiple_choice', options: ['FIFO', 'LIFO', 'Random', 'Priority'], answer: 'LIFO', explanation: 'Yığın LIFO (Last In, First Out - Son Giren İlk Çıkar) prensibini uygular.', order: 1 },
    { text: 'push() operasyonu yığına eleman ekler. Bu operasyonun karmaşıklığı nedir?', type: 'multiple_choice', options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'], answer: 'O(1)', explanation: 'push() ve pop() her ikisi de O(1)\'dir çünkü sadece en üste erişilir.', order: 2 },
    { text: 'Parantez eşleştirme problemini çözmek için hangi veri yapısı uygundur?', type: 'multiple_choice', options: ['Kuyruk', 'Yığın', 'Dizi', 'Ağaç'], answer: 'Yığın', explanation: 'Açılan parantezler yığına push\'lanır, kapatılan parantezde yığından pop edilip eşleşme kontrol edilir.', order: 3 },
    { text: 'Fonksiyon çağrıları bilgisayarda bir yığın (call stack) üzerinde yönetilir.', type: 'true_false', options: ['Doğru', 'Yanlış'], answer: 'Doğru', explanation: 'Evet! Fonksiyon çağrıldığında stack\'e eklenir, return edildiğinde stack\'ten çıkar.', order: 4 },
    { text: 'Boş bir yığından pop() yapmaya ne denir?', type: 'multiple_choice', options: ['Stack Overflow', 'Stack Underflow', 'Stack Error', 'Null Exception'], answer: 'Stack Underflow', explanation: 'Boş yığından eleman almaya "Stack Underflow" (yığın taşması değil, boşalması) denir.', order: 5 },
  ],
  'kuyruklar': [
    { text: 'Kuyruk hangi prensibi uygular?', type: 'multiple_choice', options: ['LIFO', 'FIFO', 'Random', 'Priority'], answer: 'FIFO', explanation: 'Kuyruk FIFO (First In, First Out - İlk Giren İlk Çıkar) prensibini uygular.', order: 1 },
    { text: 'BFS algoritması hangi veri yapısını kullanır?', type: 'multiple_choice', options: ['Yığın', 'Kuyruk', 'Ağaç', 'Hash tablosu'], answer: 'Kuyruk', explanation: 'BFS (Genişlik Öncelikli Arama) keşfedilen düğümleri kuyrukta saklar.', order: 2 },
    { text: 'Python\'da kuyruk için kullanılan en verimli veri yapısı hangisidir?', type: 'multiple_choice', options: ['list', 'deque', 'set', 'dict'], answer: 'deque', explanation: 'deque (double-ended queue), popleft() için O(1) sunar; list.pop(0) ise O(n)\'dir.', order: 3 },
    { text: 'Yazıcı kuyruğu hangi veri yapısına örnek verilebilir?', type: 'multiple_choice', options: ['Yığın', 'Kuyruk', 'Graf', 'Ağaç'], answer: 'Kuyruk', explanation: 'Yazıcıya gönderilen işler sırayla (FIFO) işlenir, bu bir kuyruk örneğidir.', order: 4 },
    { text: 'Priority Queue\'da öğeler eklendikleri sıraya göre çıkarılır.', type: 'true_false', options: ['Doğru', 'Yanlış'], answer: 'Yanlış', explanation: 'Priority Queue\'da öğeler öncelik değerine göre sıralanır ve en yüksek/düşük öncelikli önce çıkar.', order: 5 },
  ],
  'hash-tablolari': [
    { text: 'Hash tablosunda ortalama erişim karmaşıklığı nedir?', type: 'multiple_choice', options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'], answer: 'O(1)', explanation: 'Hash fonksiyonu anahtarı direkt dizine çevirir, bu yüzden ortalama O(1) erişim sağlar.', order: 1 },
    { text: 'Hash tablosunda iki farklı anahtar aynı dizine düşmesine ne denir?', type: 'multiple_choice', options: ['Hash Overflow', 'Collision (Çakışma)', 'Hash Error', 'Bucket Overflow'], answer: 'Collision (Çakışma)', explanation: 'İki farklı anahtarın aynı hash değerine sahip olmasına "çakışma (collision)" denir.', order: 2 },
    { text: 'Python\'da hangi veri tipi hash tablosunu temsil eder?', type: 'multiple_choice', options: ['list', 'set', 'dict', 'tuple'], answer: 'dict', explanation: 'Python\'da dict (sözlük) bir hash tablosudur. Anahtar-değer çiftlerini O(1) ile saklar.', order: 3 },
    { text: 'Kelime frekansı sayma probleminde hash tablosu kullanmak verimlidir.', type: 'true_false', options: ['Doğru', 'Yanlış'], answer: 'Doğru', explanation: 'Evet! Her kelimeyi anahtar, sayısını değer olarak saklamak O(n) toplam ile yapılabilir.', order: 4 },
    { text: 'Hash tablosunda arama için hangi bilgi gereklidir?', type: 'multiple_choice', options: ['İndeks', 'Anahtar (Key)', 'Değer (Value)', 'Boyut'], answer: 'Anahtar (Key)', explanation: 'Hash tablosunda arama için anahtar kullanılır; anahtar hash fonksiyonuna verilerek konum bulunur.', order: 5 },
  ],
  'agaclar': [
    { text: 'İkili ağaçta her düğüm en fazla kaç çocuğa sahip olabilir?', type: 'multiple_choice', options: ['1', '2', '3', 'Sınırsız'], answer: '2', explanation: 'İkili ağaçta her düğümün en fazla 2 çocuğu (sol ve sağ) bulunabilir.', order: 1 },
    { text: 'InOrder dolaşım BST\'de hangi sırayla değerleri verir?', type: 'multiple_choice', options: ['Rastgele', 'Azalan sıra', 'Artan sıra', 'Level sırasıyla'], answer: 'Artan sıra', explanation: 'BST\'de InOrder (Sol-Kök-Sağ) dolaşımı her zaman sıralı (artan) değerler üretir.', order: 2 },
    { text: 'Ağacın kökünden en derin yaprağa olan mesafeye ne denir?', type: 'multiple_choice', options: ['Derinlik', 'Yükseklik', 'Genişlik', 'Derece'], answer: 'Yükseklik', explanation: 'Ağacın yüksekliği kökten en uzak yaprağa olan kenar sayısıdır.', order: 3 },
    { text: 'PreOrder dolaşımda düğümler hangi sırayla ziyaret edilir?', type: 'multiple_choice', options: ['Sol-Kök-Sağ', 'Kök-Sol-Sağ', 'Sol-Sağ-Kök', 'Kök-Sağ-Sol'], answer: 'Kök-Sol-Sağ', explanation: 'PreOrder: önce kök, sonra sol alt ağaç, son olarak sağ alt ağaç ziyaret edilir.', order: 4 },
    { text: 'Yaprak düğüm (leaf node) herhangi bir çocuğa sahip değildir.', type: 'true_false', options: ['Doğru', 'Yanlış'], answer: 'Doğru', explanation: 'Evet! Yaprak düğümler çocuğu olmayan düğümlerdir, ağacın en alt noktalarındadır.', order: 5 },
  ],
  'siralama-algoritmalari': [
    { text: 'Bubble Sort\'un en kötü durum zaman karmaşıklığı nedir?', type: 'multiple_choice', options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'], answer: 'O(n²)', explanation: 'Bubble Sort\'ta iç içe iki döngü n×n işlem yapar, bu O(n²) karmaşıklıktır.', order: 1 },
    { text: 'Merge Sort hangi stratejiyi kullanır?', type: 'multiple_choice', options: ['Greedy', 'Dynamic Programming', 'Divide and Conquer', 'Backtracking'], answer: 'Divide and Conquer', explanation: 'Merge Sort "Böl ve Yönet" (Divide and Conquer) stratejisini kullanır.', order: 2 },
    { text: 'Merge Sort\'un her durumda garantili zaman karmaşıklığı nedir?', type: 'multiple_choice', options: ['O(n)', 'O(n²)', 'O(n log n)', 'O(log n)'], answer: 'O(n log n)', explanation: 'Merge Sort en iyi, ortalama ve en kötü durumda O(n log n) karmaşıklığa sahiptir.', order: 3 },
    { text: 'Quick Sort\'un ortalama durumda Merge Sort\'tan daha iyi performans göstermesinin sebebi nedir?', type: 'multiple_choice', options: ['Daha az karşılaştırma', 'Daha az bellek kullanımı (in-place)', 'Daha basit kod', 'Her zaman O(n)\'de çalışır'], answer: 'Daha az bellek kullanımı (in-place)', explanation: 'Quick Sort in-place çalışır O(log n) alan, Merge Sort O(n) ek alan gerektirir.', order: 4 },
    { text: 'Sıralı bir dizi için Bubble Sort O(n) karmaşıklıkta çalışabilir.', type: 'true_false', options: ['Doğru', 'Yanlış'], answer: 'Doğru', explanation: 'Evet! Erken çıkış optimizasyonu ile sıralı dizide hiç değişim olmaz ve O(n)\'de tamamlanır.', order: 5 },
  ],
  'ozyineleme': [
    { text: 'Özyinelemeli bir fonksiyonun mutlaka sahip olması gereken nedir?', type: 'multiple_choice', options: ['Döngü', 'Taban durumu (Base Case)', 'Parametre', 'Return değeri'], answer: 'Taban durumu (Base Case)', explanation: 'Taban durumu olmadan özyineleme sonsuz çalışır ve Stack Overflow oluşur.', order: 1 },
    { text: '5! (5 faktöriyel) kaçtır?', type: 'multiple_choice', options: ['25', '60', '120', '720'], answer: '120', explanation: '5! = 5×4×3×2×1 = 120', order: 2 },
    { text: 'Memoization nedir?', type: 'multiple_choice', options: ['Kod bellekte saklamak', 'Hesaplanan sonuçları önbellekte saklamak', 'Özyinelemeyi durdurmak', 'Değişkenleri sıfırlamak'], answer: 'Hesaplanan sonuçları önbellekte saklamak', explanation: 'Memoization, aynı hesaplamaları tekrar yapmamak için sonuçları saklama tekniğidir.', order: 3 },
    { text: 'Her özyinelemeli çözümün iteratif (döngülü) versiyonu yazılabilir.', type: 'true_false', options: ['Doğru', 'Yanlış'], answer: 'Doğru', explanation: 'Evet! Her özyinelemeli çözüm iteratif olarak da yazılabilir, genellikle yığın (stack) kullanılır.', order: 4 },
    { text: 'Fibonacci(10) hesaplamak için kaç benzersiz alt problem vardır?', type: 'multiple_choice', options: ['5', '10', '11', '55'], answer: '11', explanation: 'Fibonacci(0) ile Fibonacci(10) arasında 11 benzersiz alt problem vardır: F(0),F(1),...,F(10)', order: 5 },
  ],
  'graflar': [
    { text: 'BFS ve DFS arasındaki temel fark nedir?', type: 'multiple_choice', options: ['BFS yığın, DFS kuyruk kullanır', 'BFS kuyruk, DFS yığın kullanır', 'İkisi de aynı veri yapısını kullanır', 'BFS daha yavaştır'], answer: 'BFS kuyruk, DFS yığın kullanır', explanation: 'BFS genişlik öncelikli (kuyruk kullanır), DFS derinlik öncelikli (yığın/özyineleme kullanır).', order: 1 },
    { text: 'Ağırlıklı graflarda en kısa yol için hangi algoritma kullanılır?', type: 'multiple_choice', options: ['BFS', 'DFS', 'Dijkstra', 'Prim'], answer: 'Dijkstra', explanation: 'Dijkstra algoritması negatif ağırlık olmayan graflarda en kısa yolu bulur.', order: 2 },
    { text: 'Yönsüz bir grafta V düğüm ve E kenar varsa komşuluk listesi ne kadar alan kullanır?', type: 'multiple_choice', options: ['O(V²)', 'O(V+E)', 'O(E²)', 'O(V×E)'], answer: 'O(V+E)', explanation: 'Komşuluk listesi her düğüm için yalnızca o düğümün komşularını saklar: O(V+E)', order: 3 },
    { text: 'Sosyal ağlarda iki kişi arasındaki en kısa bağlantıyı bulmak için BFS kullanılır.', type: 'true_false', options: ['Doğru', 'Yanlış'], answer: 'Doğru', explanation: 'BFS en kısa yolu garanti eder ve Facebook\'un "Ortak tanıdıklar" gibi özellikleri BFS tabanlıdır.', order: 4 },
    { text: 'Döngü (cycle) içermeyen yönlü grafa ne denir?', type: 'multiple_choice', options: ['Ağırlıklı Graf', 'DAG (Directed Acyclic Graph)', 'Tam Graf', 'Bağlı Graf'], answer: 'DAG (Directed Acyclic Graph)', explanation: 'DAG (Yönlü Asiklik Graf) döngü içermeyen yönlü graftır. Görev planlamasında kullanılır.', order: 5 },
  ],
  'dinamik-programlama': [
    { text: 'Dinamik programlama hangi iki temel özelliği gerektirir?', type: 'multiple_choice', options: ['Sıralı veriler ve döngüler', 'Optimal alt yapı ve örtüşen alt problemler', 'Graf ve ağırlıklar', 'Yığın ve kuyruk'], answer: 'Optimal alt yapı ve örtüşen alt problemler', explanation: 'DP için: 1) Optimal alt yapı: Büyük çözüm küçük çözümlerden oluşmalı, 2) Örtüşen alt problemler: Aynı alt problem tekrar tekrar çözülmeli.', order: 1 },
    { text: 'Coin Change probleminde minimum para sayısını bulmak hangi yönteme örnektir?', type: 'multiple_choice', options: ['Greedy', 'Divide and Conquer', 'Dynamic Programming', 'Backtracking'], answer: 'Dynamic Programming', explanation: 'Coin Change greedy\'de her zaman optimal sonucu vermez, DP ile garantili çözüm bulunur.', order: 2 },
    { text: 'Top-Down DP (Memoization) ve Bottom-Up DP (Tabulation) aynı sonucu verir.', type: 'true_false', options: ['Doğru', 'Yanlış'], answer: 'Doğru', explanation: 'Evet! Her iki yaklaşım da aynı sonucu verir, fark implementasyon yöntemidir.', order: 3 },
    { text: '0/1 Sırt Çantası probleminde bir öğeyi kaç kez alabiliriz?', type: 'multiple_choice', options: ['Sınırsız', '1 kez', '2 kez', 'Kapasite kadar'], answer: '1 kez', explanation: '0/1 Sırt Çantasında her öğe ya alınır (1) ya da alınmaz (0), birden fazla alınamaz.', order: 4 },
    { text: 'LIS (En Uzun Artan Alt Dizi) probleminin DP çözümünün zaman karmaşıklığı nedir?', type: 'multiple_choice', options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(2ⁿ)'], answer: 'O(n²)', explanation: 'Klasik DP çözümünde her eleman için önceki tüm elemanlarla karşılaştırma yapılır: O(n²).', order: 5 },
  ],
  'ikili-arama': [
    { text: 'İkili aramanın çalışabilmesi için dizi nasıl olmalıdır?', type: 'multiple_choice', options: ['Rastgele sıralı', 'Sıralı (artan veya azalan)', 'Boş olmamalı', 'Sadece sayılar içermeli'], answer: 'Sıralı (artan veya azalan)', explanation: 'İkili arama ortadaki elemana bakarak yarıyı eler; bu yalnızca sıralı dizilerde doğru çalışır.', order: 1 },
    { text: 'İkili aramanın zaman karmaşıklığı nedir?', type: 'multiple_choice', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], answer: 'O(log n)', explanation: 'Her adımda dizi yarıya bölündüğü için 2^k = n ise k = log n adım yeterlidir.', order: 2 },
    { text: 'n=1.000.000 elemanlı dizide ikili arama en fazla kaç adımda tamamlanır?', type: 'multiple_choice', options: ['500.000', '1.000.000', '20', '100'], answer: '20', explanation: 'log₂(1.000.000) ≈ 20 adım; bu ikili aramanın gücünü gösterir.', order: 3 },
    { text: 'Python\'da bisect.bisect_left([1,3,5,7], 5) ne döndürür?', type: 'multiple_choice', options: ['0', '1', '2', '3'], answer: '2', explanation: 'bisect_left 5\'in sol tarafına eklenecek indeksi döndürür; [1,3,5,7]\'de 5 indeks 2\'dedir.', order: 4 },
    { text: 'İkili arama döngüsel (rotated) sıralı dizilerde de doğrudan uygulanabilir.', type: 'true_false', options: ['Doğru', 'Yanlış'], answer: 'Yanlış', explanation: 'Hayır! Döngüsel dizide önce hangi yarının sıralı olduğu belirlenmeli, sonra buna göre ilerlenmelidir.', order: 5 },
  ],
  'bst': [
    { text: 'BST\'de sol çocukların değeri kök düğüme göre nasıldır?', type: 'multiple_choice', options: ['Daha büyük', 'Daha küçük', 'Eşit', 'Rastgele'], answer: 'Daha küçük', explanation: 'BST kuralı: sol alt ağaçtaki tüm değerler kök\'ten küçük, sağ alt ağaçtakiler büyüktür.', order: 1 },
    { text: 'BST\'de en kötü durumda arama karmaşıklığı nedir?', type: 'multiple_choice', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], answer: 'O(n)', explanation: 'Dengesiz BST\'de (zincir gibi) her düğüm tek çocuğa sahipse O(n) olur. Dengeli BST\'de O(log n)\'dir.', order: 2 },
    { text: 'BST\'de InOrder dolaşım hangi sırayla değerleri üretir?', type: 'multiple_choice', options: ['Rastgele', 'Ekleme sırası', 'Artan sıra', 'Azalan sıra'], answer: 'Artan sıra', explanation: 'InOrder (Sol-Kök-Sağ) BST\'de her zaman sıralı (artan) çıktı verir.', order: 3 },
    { text: 'BST\'de iki çocuklu bir düğüm silindiğinde yerine ne gelir?', type: 'multiple_choice', options: ['Sol çocuk', 'Sağ çocuk', 'InOrder halefi (sağ alt ağacın minimumu)', 'Rastgele çocuk'], answer: 'InOrder halefi (sağ alt ağacın minimumu)', explanation: 'İki çocuklu düğüm silinirken InOrder halefi (sağ alt ağacın en küçük değeri) yerine geçer.', order: 4 },
    { text: 'AVL ağacı, BST özelliklerini korurken her zaman dengeli kalır.', type: 'true_false', options: ['Doğru', 'Yanlış'], answer: 'Doğru', explanation: 'AVL ağacında her düğümün sol ve sağ alt ağaç yüksekliği farkı en fazla 1\'dir; bu O(log n) garantisi sağlar.', order: 5 },
  ],
  'quick-sort': [
    { text: 'Quick Sort hangi stratejiyi kullanır?', type: 'multiple_choice', options: ['Greedy', 'Dynamic Programming', 'Divide and Conquer', 'Backtracking'], answer: 'Divide and Conquer', explanation: 'Quick Sort pivot etrafında diziyi böler (partition) ve alt dizileri özyinelemeli sıralar.', order: 1 },
    { text: 'Quick Sort\'un ortalama zaman karmaşıklığı nedir?', type: 'multiple_choice', options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'], answer: 'O(n log n)', explanation: 'Ortalamada pivot diziyi yaklaşık eşit böler; bu O(log n) seviye ve her seviyede O(n) iş = O(n log n).', order: 2 },
    { text: 'Quick Sort en kötü durumda hangi karmaşıklığa düşer?', type: 'multiple_choice', options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'], answer: 'O(n²)', explanation: 'Zaten sıralı bir dizide ilk veya son eleman pivot seçilirse her bölme 1+n-1 yapar: O(n²).', order: 3 },
    { text: 'Rastgele pivot seçimi Quick Sort\'un en kötü durum olasılığını düşürür.', type: 'true_false', options: ['Doğru', 'Yanlış'], answer: 'Doğru', explanation: 'Rastgele pivot saldırgan (adversarial) girdilere karşı koruma sağlar ve pratikte O(n log n) davranış sunar.', order: 4 },
    { text: 'Quick Select algoritması ne için kullanılır?', type: 'multiple_choice', options: ['Diziyi sıralamak', 'k. en küçük elemanı bulmak', 'İkili arama yapmak', 'Döngü tespiti'], answer: 'k. en küçük elemanı bulmak', explanation: 'Quick Select, diziyi tam sıralamadan O(n) ortalama karmaşıklıkta k. en küçük elemanı bulur.', order: 5 },
  ],
  'dijkstra': [
    { text: 'Dijkstra algoritması ne tür graflarda doğru çalışır?', type: 'multiple_choice', options: ['Negatif ağırlıklı graflar', 'Negatif olmayan ağırlıklı graflar', 'Yönsüz graflar', 'Döngüsüz graflar'], answer: 'Negatif olmayan ağırlıklı graflar', explanation: 'Dijkstra negatif kenar ağırlıklarında yanlış sonuç verir; negatif kenarlar için Bellman-Ford kullanılır.', order: 1 },
    { text: 'Dijkstra algoritmasında hangi veri yapısı kritik rol oynar?', type: 'multiple_choice', options: ['Yığın (Stack)', 'Kuyruk (Queue)', 'Öncelik Kuyruğu (Priority Queue)', 'Hash Tablosu'], answer: 'Öncelik Kuyruğu (Priority Queue)', explanation: 'Min-heap (öncelik kuyruğu) her adımda en küçük mesafeli düğümü O(log V) ile seçmemizi sağlar.', order: 2 },
    { text: 'Dijkstra\'nın öncelik kuyruğu ile zaman karmaşıklığı nedir?', type: 'multiple_choice', options: ['O(V²)', 'O(V+E)', 'O((V+E) log V)', 'O(E log E)'], answer: 'O((V+E) log V)', explanation: 'Her düğüm bir kez çıkarılır O(V log V), her kenar bir kez işlenir O(E log V); toplam O((V+E) log V).', order: 3 },
    { text: 'A* algoritması Dijkstra\'ya benzer ancak hedefe yönelik heuristic kullanır.', type: 'true_false', options: ['Doğru', 'Yanlış'], answer: 'Doğru', explanation: 'A*, f(n)=g(n)+h(n) kullanır: g(n) gerçek maliyet, h(n) tahmini maliyet. Bu Dijkstra\'yı yönlendirerek daha hızlı yapar.', order: 4 },
    { text: 'Dijkstra algoritması hangi gerçek dünya probleminde kullanılır?', type: 'multiple_choice', options: ['Görüntü sıkıştırma', 'GPS navigasyon', 'Kelime arama', 'Matris çarpımı'], answer: 'GPS navigasyon', explanation: 'Google Maps, Waze gibi navigasyon sistemleri en kısa/hızlı yolu bulmak için Dijkstra veya A* kullanır.', order: 5 },
  ],
};

const challengesData = [
  {
    title: 'İkili Arama Implementasyonu',
    description: 'Sıralı bir dizide hedef elemanı O(log n) karmaşıklıkla bulan iteratif ikili arama fonksiyonu yaz.',
    requirements: `**Görev:** İkili arama algoritmasını sıfırdan implemente et.

**Gereksinimler:**
- binary_search(arr, target) fonksiyonu yaz
- Eleman bulunursa indeksini, bulunamazsa -1 döndür
- Döngü kullan (özyineleme değil)
- O(log n) zaman karmaşıklığı sağla

**Test Durumları:**
- binary_search([1, 3, 5, 7, 9, 11], 7) → 3
- binary_search([1, 3, 5, 7, 9, 11], 4) → -1
- binary_search([], 5) → -1

**GitHub reposuna README.md ekle ve test sonuçlarını göster!**`,
    difficulty: 'easy',
    type: 'coding',
    language: 'any',
    startDate: new Date(),
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    points: 50,
    status: 'active',
  },
  {
    title: 'Bağlı Liste Sınıfı',
    description: 'Tek yönlü bağlı liste veri yapısını baştan sona kodla: ekleme, silme, arama ve yazdırma metodları.',
    requirements: `**Görev:** Tekli bağlı liste (Singly Linked List) implementasyonu.

**Gereksinimler:**
- Node sınıfı: value ve next alanları
- LinkedList sınıfı şu metodlarla:
  - append(value): Sona ekle
  - prepend(value): Başa ekle
  - delete(value): Değere göre sil
  - search(value): True/False döndür
  - to_list(): Python listesine çevir
  - __len__: Boyutu döndür

**Test Durumları:**
- ll = LinkedList(); ll.append(1); ll.append(2); ll.append(3)
- ll.to_list() → [1, 2, 3]
- ll.search(2) → True; ll.delete(2); ll.to_list() → [1, 3]

**README.md ekle, kullanım örneklerini göster!**`,
    difficulty: 'medium',
    type: 'coding',
    language: 'any',
    startDate: new Date(),
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    points: 75,
    status: 'active',
  },
  {
    title: 'BST ile Sözlük',
    description: 'İkili Arama Ağacı kullanarak key-value çifti saklayan bir sözlük yap. Insert, search ve inorder traversal implement et.',
    requirements: `**Görev:** BST tabanlı anahtar-değer sözlüğü.

**Gereksinimler:**
- BSTNode: key, value, left, right
- BSTDict sınıfı:
  - put(key, value): Ekle veya güncelle
  - get(key): Değer döndür, yoksa None
  - contains(key): True/False
  - keys_sorted(): İnorder ile sıralı anahtar listesi
  - delete(key): Sil (tek/çift çocuk durumları)

**Test Durumları:**
- d = BSTDict()
- d.put("elma", 5); d.put("armut", 3); d.put("çilek", 8)
- d.keys_sorted() → ["armut", "elma", "çilek"] (alfabetik)
- d.get("elma") → 5; d.get("muz") → None

**README + test sonuçları ekle!**`,
    difficulty: 'hard',
    type: 'coding',
    language: 'any',
    startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 17 * 24 * 60 * 60 * 1000),
    points: 150,
    status: 'upcoming',
  },
];

const homeworkData: Record<string, { title: string; description: string; difficulty: string; points: number }> = {
  'algoritmaya-giris': {
    title: 'İlk Algoritma: Asal Sayı Bulma',
    description: `**Ödev:** Verilen bir sayının asal olup olmadığını kontrol eden bir fonksiyon yaz.

**Gereksinimler:**
- is_prime(n) fonksiyonu → True/False döndürür
- Negatif sayılar ve 0, 1 için False döndür
- Optimizasyon: √n'e kadar kontrol et
- En az 10 test durumu içeren bir test dosyası ekle

**Bonus:** Verilen aralıktaki tüm asal sayıları bulan primes_in_range(start, end) fonksiyonu ekle.

GitHub reposuna hem kodu hem README.md ekle.`,
    difficulty: 'easy',
    points: 15,
  },
  'karmasiklik-analizi': {
    title: 'Big O Analiz Raporu',
    description: `**Ödev:** 4 farklı arama/sıralama fonksiyonu yaz ve Big O analizini yap.

**Gereksinimler:**
1. Lineer arama - O(n)
2. İkili arama - O(log n)
3. Bubble Sort - O(n²)
4. Her fonksiyon için n=100, 1000, 10000 için süre ölç (time modülü ile)

**Rapor:** README.md'e ölçüm sonuçlarını tablo halinde ekle ve neden bu karmaşıklıkları elde ettiğini açıkla.`,
    difficulty: 'medium',
    points: 20,
  },
  'ozyineleme': {
    title: 'Özyinelemeli Problemler',
    description: `**Ödev:** Aşağıdaki 3 problemi özyinelemeli olarak çöz:

1. **Fibonacci (memoization ile):** fib(n) - hem saf hem memoized versiyonu yaz, süre farkını göster
2. **Hanoi Kulesi:** hanoi(n, source, target, auxiliary) - adımları yazdır
3. **Permütasyon:** permutations(arr) - dizinin tüm permütasyonlarını döndür

**Test:** Her fonksiyon için en az 3 test durumu yaz.
README.md'e çıktıları ekle.`,
    difficulty: 'medium',
    points: 20,
  },
  'diziler': {
    title: 'Sliding Window Uygulaması',
    description: `**Ödev:** Sliding Window tekniğiyle 2 problem çöz:

1. **Maksimum Alt Dizi Toplamı (Kadane):** max_subarray(arr) → toplam ve alt diziyi döndür
2. **K Uzunluklu Maksimum Toplam:** max_sum_k(arr, k) → k boyutlu pencerede max toplamı bul
3. **Benzersiz Karakterli En Uzun Alt Dizi:** longest_unique(s) → uzunluk döndür

**Test:** Örnek:
- max_subarray([-2,1,-3,4,-1,2,1,-5,4]) → 6, [4,-1,2,1]
- max_sum_k([2,1,5,1,3,2], 3) → 9

README.md ekle.`,
    difficulty: 'medium',
    points: 20,
  },
  'bagli-listeler': {
    title: 'Bağlı Liste Operasyonları',
    description: `**Ödev:** Tekli bağlı liste implementasyonu + ileri düzey operasyonlar:

**Gereksinimler:**
1. Temel: append, prepend, delete, search, length
2. reverse(): Listeyi tersine çevir (in-place)
3. find_middle(): Ortadaki düğümü bul (tek geçişte - Floyd tekniği)
4. has_cycle(): Döngü var mı? (Floyd'un tavşan-kaplumbağa algoritması)
5. merge_sorted(l1, l2): İki sıralı listeyi birleştir

**Bonus:** Çift yönlü bağlı liste (DoublyLinkedList) implement et.`,
    difficulty: 'hard',
    points: 25,
  },
  'yiginlar': {
    title: 'Yığın ile Klasik Problemler',
    description: `**Ödev:** Yığın kullanarak 3 klasik problemi çöz:

1. **Parantez Eşleştirme:** is_valid(s) → "(()[{}])" True, "([)]" False
2. **Postfix Hesaplama:** eval_postfix("3 4 + 2 * 7 /") → sonucu hesapla
3. **Sonraki Büyük Eleman:** next_greater(arr) → her eleman için sağında ilk büyük elemanı bul

**Test:**
- is_valid("{[()]}") → True
- next_greater([4,5,2,10]) → [5,10,10,-1]

Stack sınıfını da sıfırdan implement et (list kullansın).`,
    difficulty: 'medium',
    points: 20,
  },
  'kuyruklar': {
    title: 'Kuyruk ile BFS Uygulaması',
    description: `**Ödev:** Kuyruk kullanarak BFS algoritmasını implement et:

1. **Deque implement et:** enqueue, dequeue, peek, is_empty
2. **BFS ile Labirent:** 2D grid üzerinde BFS ile en kısa yol bul
   - Grid: 0 = yürünebilir, 1 = duvar
   - Başlangıç (0,0) → Bitiş (n-1,m-1)
   - Minimum adım sayısını döndür
3. **Circular Queue:** Sabit boyutlu döngüsel kuyruk implement et

**Test Grid:**
[[0,1,0,0],[0,0,0,1],[1,0,0,0],[0,1,0,0]] → 7 adım`,
    difficulty: 'hard',
    points: 25,
  },
  'hash-tablolari': {
    title: 'Hash Tablosu Implementasyonu',
    description: `**Ödev:** Sıfırdan hash tablosu yaz (dict/HashMap kullanma!):

1. **HashTable sınıfı:**
   - Dizi tabanlı, başlangıç kapasitesi 16
   - hash_function(key): Polynomial rolling hash kullan
   - put(key, value), get(key), delete(key), contains(key)
   - Çakışma çözümü: Chaining (linked list ile)
   - Load factor > 0.7 olunca resize (2x)

2. **Uygulama:** HashTable kullanarak kelime frekansı say
   - word_frequency(text) → {"elma": 3, "armut": 1, ...}

README.md'e load factor ve resize davranışını açıkla.`,
    difficulty: 'hard',
    points: 25,
  },
  'agaclar': {
    title: 'İkili Ağaç Dolaşımları',
    description: `**Ödev:** İkili ağaç veri yapısı ve dolaşım algoritmaları:

1. **BinaryTree sınıfı:** insert, height, size
2. **4 Dolaşım implement et:**
   - inorder(root) → Sol-Kök-Sağ
   - preorder(root) → Kök-Sol-Sağ
   - postorder(root) → Sol-Sağ-Kök
   - level_order(root) → BFS ile seviye seviye (kuyruk kullan)
3. **Bonus problemler:**
   - is_symmetric(root): Ağaç simetrik mi?
   - max_depth(root): Maksimum derinlik
   - path_sum(root, target): Kökten yaprağa hedef toplam var mı?

Test sonuçlarını görsel ASCII ağaç olarak README'e ekle.`,
    difficulty: 'hard',
    points: 25,
  },
  'siralama-algoritmalari': {
    title: 'Sıralama Algoritmaları Karşılaştırması',
    description: `**Ödev:** 5 sıralama algoritması implement et ve karşılaştır:

1. Bubble Sort
2. Selection Sort
3. Insertion Sort
4. Merge Sort
5. Quick Sort (random pivot)

**Her algoritma için:**
- Doğru implementasyon
- n=100, 1000, 10000 için çalışma süresi ölçümü (time modülü)

**README.md'e tablo ekle:**
| Algoritma | n=100 | n=1000 | n=10000 | Big O |
|-----------|-------|--------|---------|-------|

**Bonus:** Hangi durumda hangi algoritmayı kullanırsın? (sıralı, ters sıralı, rastgele)`,
    difficulty: 'hard',
    points: 25,
  },
  'graflar': {
    title: 'Graf Algoritmaları: BFS ve DFS',
    description: `**Ödev:** Graf veri yapısı ve temel algoritmalar:

1. **Graph sınıfı:** (komşuluk listesi ile)
   - add_vertex, add_edge (yönsüz)
   - neighbors(vertex)

2. **BFS implement et:** bfs(start) → ziyaret sırası
3. **DFS implement et:** dfs(start) → ziyaret sırası (özyinelemeli + iteratif)
4. **Bağlantı kontrolü:** is_connected() → Graf bağlı mı?
5. **En kısa yol:** shortest_path(start, end) → BFS ile yol listesi

**Test Graf:**
5 şehir (A,B,C,D,E), kenarlar: A-B, A-C, B-D, C-D, D-E
- BFS(A): [A,B,C,D,E]
- shortest_path(A,E): [A,B,D,E] veya [A,C,D,E]`,
    difficulty: 'hard',
    points: 30,
  },
  'dinamik-programlama': {
    title: 'Klasik DP Problemleri',
    description: `**Ödev:** 4 klasik dinamik programlama problemi:

1. **Fibonacci (Bottom-Up):** fib_dp(n) - O(n) zaman, O(1) alan
2. **Coin Change:** min_coins(coins, amount) → minimum para sayısı
   - coins=[1,5,10,25], amount=36 → 3 (25+10+1)
3. **0/1 Knapsack:** knapsack(weights, values, capacity) → max değer
4. **LCS:** lcs(s1, s2) → En uzun ortak alt dizi uzunluğu
   - lcs("ABCBDAB", "BDCAB") → 4 ("BCAB")

Her problem için hem Top-Down (memoization) hem Bottom-Up (tabulation) çözümü yaz.
README.md'e DP tablosunu görselleştir.`,
    difficulty: 'hard',
    points: 30,
  },
  'ikili-arama': {
    title: 'İkili Arama Varyantları',
    description: `**Ödev:** İkili aramanın 3 varyantını implement et:

1. **Temel:** binary_search(arr, target) → indeks veya -1
2. **İlk Oluşum:** first_occurrence(arr, target) → tekrarlı dizilerde ilk indeks
3. **Döngüsel Dizide Arama:** search_rotated(arr, target)
   - [4,5,6,7,0,1,2] dizisinde 0'ı bul → 4
4. **Cevap Üzerinde İkili Arama:** square_root(n) → tamsayı karekök (ikili aramayla)

**Test:**
- first_occurrence([1,2,2,2,3,4], 2) → 1
- search_rotated([4,5,6,7,0,1,2], 0) → 4
- square_root(16) → 4, square_root(20) → 4`,
    difficulty: 'medium',
    points: 20,
  },
  'bst': {
    title: 'BST Tam Implementasyon',
    description: `**Ödev:** Tam özellikli İkili Arama Ağacı implement et:

1. **BST sınıfı:**
   - insert(value), search(value) → True/False
   - delete(value): 3 durum (yaprak, tek çocuk, iki çocuk)
   - inorder(), preorder(), postorder() → liste döndür
   - min_value(), max_value()
   - height() → ağaç yüksekliği

2. **Doğrulama:** is_valid_bst(root) → BST mi?

3. **Dönüşüm:** sorted_array_to_bst([1,2,3,4,5,6,7]) → dengeli BST oluştur

**Test:** [5,3,7,1,4,6,8] ekle → inorder=[1,3,4,5,6,7,8]`,
    difficulty: 'hard',
    points: 25,
  },
  'quick-sort': {
    title: 'Quick Sort ve Quick Select',
    description: `**Ödev:** Quick Sort ailesi implementasyonları:

1. **Quick Sort (Lomuto):** Lomuto partition scheme ile
2. **Quick Sort (Hoare):** Hoare partition scheme ile
3. **Quick Sort (Rastgele Pivot):** random.randint ile pivot seç
4. **Quick Select:** kth_smallest(arr, k) → k. en küçük elemanı O(n) ortalamada bul

**Karşılaştırma:**
- 3 versiyonu n=10000 rastgele, sıralı, ters sıralı dizi için çalıştır
- Süreleri README'e ekle

**Test:**
- quick_select([3,2,1,5,6,4], 2) → 2 (2. en küçük)`,
    difficulty: 'hard',
    points: 25,
  },
  'dijkstra': {
    title: "Dijkstra ile Şehir Navigasyonu",
    description: `**Ödev:** Dijkstra algoritması ile şehirler arası en kısa yol:

1. **Graph sınıfı:** Ağırlıklı yönsüz graf (komşuluk listesi)
2. **Dijkstra implement et:**
   - dijkstra(graph, start) → {vertex: min_distance} sözlüğü
   - Öncelik kuyruğu kullan (heapq)
3. **Yol izleme:** shortest_path(graph, start, end) → [start, ..., end] + toplam mesafe

**Test Graf (şehirler):**
Istanbul-Ankara: 450km, Ankara-Izmir: 590km, Istanbul-Izmir: 565km, Ankara-Antalya: 490km, Izmir-Antalya: 330km

shortest_path("Istanbul", "Antalya") → ['Istanbul', 'Izmir', 'Antalya'] → 895km

README'e graf görselini ASCII sanat ile çiz!`,
    difficulty: 'hard',
    points: 30,
  },
};

async function main() {
  console.log('🌱 Seed başlatılıyor...');

  // Konuları oluştur
  const topicMap: Record<string, number> = {};
  for (const t of topicsData) {
    const { parentSlug, ...data } = t;
    const parentId = parentSlug ? topicMap[parentSlug] : undefined;
    const topic = await prisma.topic.upsert({
      where: { slug: data.slug },
      update: { ...data, ...(parentId && { parentId }) },
      create: { ...data, ...(parentId && { parentId }) }
    });
    topicMap[data.slug] = topic.id;
    console.log(`✅ Konu: ${topic.title}`);
  }

  // Quizleri oluştur
  for (const [slug, questions] of Object.entries(quizData)) {
    const topicId = topicMap[slug];
    if (!topicId) continue;

    const existingQuizzes = await prisma.quiz.findMany({ where: { topicId }, select: { id: true } });
    for (const eq of existingQuizzes) {
      await prisma.quizResult.deleteMany({ where: { quizId: eq.id } });
      await prisma.question.deleteMany({ where: { quizId: eq.id } });
    }
    await prisma.quiz.deleteMany({ where: { topicId } });
    const quiz = await prisma.quiz.create({ data: { topicId } });

    for (const q of questions) {
      await prisma.question.create({
        data: {
          quizId: quiz.id,
          text: q.text,
          type: q.type,
          options: q.options ? JSON.stringify(q.options) : null,
          answer: q.answer,
          explanation: q.explanation,
          order: q.order
        }
      });
    }
    console.log(`✅ Quiz: ${slug} (${questions.length} soru)`);
  }

  // Challengeları temizle ve yeniden oluştur
  await prisma.challengeParticipant.deleteMany({});
  await prisma.challenge.deleteMany({});
  for (const c of challengesData) {
    await prisma.challenge.create({ data: c });
    console.log(`✅ Challenge: ${c.title}`);
  }

  // Ödevleri oluştur
  for (const [slug, hw] of Object.entries(homeworkData)) {
    const topicId = topicMap[slug];
    if (!topicId) continue;
    await prisma.homework.deleteMany({ where: { topicId } });
    await prisma.homework.create({ data: { topicId, ...hw } });
    console.log(`✅ Ödev: ${hw.title}`);
  }

  console.log('\n🎉 Seed tamamlandı!');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
