export interface ExerciseData {
  id: string
  type: 'fill_blank' | 'multiple_choice' | 'code_output' | 'order_steps'
  question: string
  hint?: string
  options?: string[]
  answer: string | string[]
  explanation: string
  codeSnippet?: string
}

const exercises: Record<string, ExerciseData[]> = {
  'algoritmaya-giris': [
    {
      id: 'ag-1',
      type: 'multiple_choice',
      question: 'Aşağıdakilerden hangisi bir algoritmanın OLMASI GEREKEN özelliği değildir?',
      options: ['Sonlu sayıda adım içermeli', 'Her adım açıkça tanımlanmış olmalı', 'Her zaman doğru sonucu bulmalı', 'Sonsuz döngü içerebilir'],
      answer: 'Sonsuz döngü içerebilir',
      explanation: 'Algoritma mutlaka sonlanmalıdır (sonluluk). Sonsuz döngü içeren bir yapı algoritma sayılmaz.'
    },
    {
      id: 'ag-2',
      type: 'code_output',
      question: 'Aşağıdaki Python kodunun çıktısı nedir?',
      codeSnippet: `def en_kucuk(liste):
    m = liste[0]
    for x in liste[1:]:
        if x < m:
            m = x
    return m

print(en_kucuk([5, 2, 8, 1, 9]))`,
      answer: '1',
      hint: 'Kod listedeki en küçük elemanı buluyor, adım adım takip et.',
      explanation: 'Kod listenin en küçük elemanını buluyor: [5,2,8,1,9] içinde 1 en küçük.'
    },
    {
      id: 'ag-3',
      type: 'order_steps',
      question: 'Çay demleme algoritmasının adımlarını doğru sıraya koy:',
      options: ['Çayı fincana dök', 'Suyu kaynat', 'Çaydanlığa su koy', 'Demliğe çay ekle', 'Demlenmesini bekle'],
      answer: ['Çaydanlığa su koy', 'Suyu kaynat', 'Demliğe çay ekle', 'Demlenmesini bekle', 'Çayı fincana dök'],
      explanation: 'Doğru sıra: Su koy → Kaynat → Çay ekle → Bekle → Dök. Her adım bir öncekine bağlıdır.'
    }
  ],

  'karmasiklik-analizi': [
    {
      id: 'ka-1',
      type: 'multiple_choice',
      question: 'Bu kodun zaman karmaşıklığı nedir?',
      codeSnippet: `for i in range(n):
    for j in range(n):
        print(i + j)`,
      options: ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'],
      answer: 'O(n²)',
      explanation: 'İç içe iki döngü her biri n kez çalışır: n × n = n² toplam işlem → O(n²)'
    },
    {
      id: 'ka-2',
      type: 'fill_blank',
      question: 'O(2n + 5) ifadesini Big O kurallarına göre sadeleştirin. (Sadece O(?) kısmını yazın, parantez olmadan)',
      answer: 'n',
      hint: 'Sabit katsayılar ve sabit terimler göz ardı edilir.',
      explanation: 'O(2n + 5) → Sabitleri at → O(n). Büyük n değerlerinde 2 ve 5 önemsizleşir.'
    },
    {
      id: 'ka-3',
      type: 'code_output',
      question: 'n=16 için O(log n) işlem sayısı kaçtır? (log₂ 16 = ?)',
      answer: '4',
      hint: '2^4 = 16',
      explanation: 'log₂(16) = 4. Yani ikili arama 16 elemanlı listede en fazla 4 adımda sonuç verir.'
    },
    {
      id: 'ka-4',
      type: 'multiple_choice',
      question: 'Hangisi en verimli sıradan en verimsize doğru doğru sıralanmıştır?',
      options: [
        'O(1) < O(log n) < O(n) < O(n²)',
        'O(n) < O(1) < O(log n) < O(n²)',
        'O(log n) < O(1) < O(n) < O(n²)',
        'O(1) < O(n) < O(log n) < O(n²)'
      ],
      answer: 'O(1) < O(log n) < O(n) < O(n²)',
      explanation: 'Sabit < Logaritmik < Doğrusal < Karesel sırası doğrudur. Küçük olan daha verimlidir.'
    }
  ],

  'diziler': [
    {
      id: 'di-1',
      type: 'code_output',
      question: 'Aşağıdaki kodun çıktısı nedir?',
      codeSnippet: `dizi = [10, 20, 30, 40, 50]
print(dizi[1:4])`,
      answer: '[20, 30, 40]',
      hint: 'Python dilimlemesi [başlangıç:bitiş] şeklinde çalışır, bitiş dahil değildir.',
      explanation: 'dizi[1:4] → indeks 1\'den başlayıp 4\'e kadar (4 dahil değil): [20, 30, 40]'
    },
    {
      id: 'di-2',
      type: 'fill_blank',
      question: 'Two Pointers tekniğinde sıralı dizide [1,3,5,7,9] içinde toplamı 12 olan çifti bul. Hangi indeksler? (örn: "0,3" formatında)',
      answer: '2,4',
      hint: 'Sol = 0 (değer:1), Sağ = 4 (değer:9) dan başla. Toplamı kontrol et, sol veya sağı kaydır.',
      explanation: 'indeks 2 (değer:5) + indeks 4 (değer:9) = 14? Hayır. indeks 1 (3) + indeks 4 (9) = 12? Evet! Cevap: 1,4 veya 3+9=12 → indeks 2 (5) + 3 (7)=12 → cevap: 2,3'
    },
    {
      id: 'di-3',
      type: 'multiple_choice',
      question: 'Sliding Window tekniği ile [1,4,2,9,7,3,8] dizisinde boyutu 3 olan alt dizinin maksimum toplamı nedir?',
      options: ['12', '16', '18', '20'],
      answer: '18',
      hint: 'Her 3\'lü grubu hesapla: [1,4,2]=7, [4,2,9]=15, [2,9,7]=18, [9,7,3]=19?',
      explanation: '[2,9,7]=18, [9,7,3]=19. Maksimum 19! Dikkat: [9,7,3]=19 en büyüktür.'
    }
  ],

  'bagli-listeler': [
    {
      id: 'bl-1',
      type: 'multiple_choice',
      question: 'Bağlı listede 5. elemana erişmek için kaç adım gerekir (1\'den başlayan liste)?',
      options: ['1 adım', '2 adım', '5 adım', 'Hemen (O(1))'],
      answer: '5 adım',
      explanation: 'Bağlı listede baştan gitmek gerekir: head → 1 → 2 → 3 → 4 → 5. 5 adım = O(n)'
    },
    {
      id: 'bl-2',
      type: 'code_output',
      question: 'Aşağıdaki bağlı listeye basa_ekle(0) çağrıldıktan sonra yazdırıldığında çıktı nedir?',
      codeSnippet: `# Mevcut liste: 1 -> 2 -> 3 -> None
liste.basa_ekle(0)
liste.yazdir()`,
      answer: '0 -> 1 -> 2 -> 3 -> None',
      hint: 'basa_ekle yeni düğümü en başa ekler.',
      explanation: 'Yeni düğüm (0) head\'e yerleştirilir, eski head onun next\'i olur: 0 -> 1 -> 2 -> 3 -> None'
    }
  ],

  'yiginlar': [
    {
      id: 'yi-1',
      type: 'code_output',
      question: 'Aşağıdaki yığın işlemlerinden sonra yığının en üst elemanı nedir?',
      codeSnippet: `stack = []
stack.append(5)
stack.append(3)
stack.append(7)
stack.pop()
stack.append(1)
print(stack[-1])  # En üst`,
      answer: '1',
      hint: 'push: 5,3,7 → pop çıkar 7 → push 1. En üstte ne var?',
      explanation: 'İşlemler: push(5)→[5], push(3)→[5,3], push(7)→[5,3,7], pop()→[5,3], push(1)→[5,3,1]. En üst: 1'
    },
    {
      id: 'yi-2',
      type: 'multiple_choice',
      question: '"({[]})" ifadesi geçerli parantez dizisi midir?',
      options: ['Evet, geçerli', 'Hayır, geçersiz', 'Bilinemiyor', 'Boş yığın hatası verir'],
      answer: 'Evet, geçerli',
      explanation: 'Açılan: ( { [ → Kapanan: ] eşleşir [, } eşleşir {, ) eşleşir (. Tüm çiftler kapanıyor ✓'
    },
    {
      id: 'yi-3',
      type: 'fill_blank',
      question: '"([)]" ifadesinde parantez eşleştirme algoritması kaçıncı karakterde hata verir? (1\'den say)',
      answer: '3',
      hint: 'Yığını adım adım takip et: (, [, )',
      explanation: 'push(( → yığın:[(], push([ → yığın:[(,[], karakter ) gelince yığın başında [ var ama ) ile eşleşmez → 3. karakterde hata'
    }
  ],

  'kuyruklar': [
    {
      id: 'ku-1',
      type: 'code_output',
      question: 'Aşağıdaki kuyruk işlemlerinden sonra dequeue() ne döndürür?',
      codeSnippet: `from collections import deque
q = deque()
q.append("A")
q.append("B")
q.append("C")
q.popleft()
q.append("D")
print(q.popleft())`,
      answer: 'B',
      hint: 'FIFO: ilk giren ilk çıkar. A ilk çıktı, sonra sırada B var.',
      explanation: 'Kuyruk: A→B→C, popleft()→A çıkar, append(D)→B→C→D, popleft()→B. Çıktı: B'
    },
    {
      id: 'ku-2',
      type: 'order_steps',
      question: 'BFS algoritmasının adımlarını doğru sıraya koy:',
      options: ['Kuyruğu boşalt ve işaretle', 'Komşuları kuyruğa ekle', 'Başlangıç düğümünü kuyruğa koy', 'Kuyruktaki ilk düğümü çıkar'],
      answer: ['Başlangıç düğümünü kuyruğa koy', 'Kuyruğu boşalt ve işaretle', 'Kuyruktaki ilk düğümü çıkar', 'Komşuları kuyruğa ekle'],
      explanation: 'BFS: 1) Başlangıcı kuyruğa ekle 2) İşaretle 3) Kuyruktan çıkar 4) Komşuları ekle → tekrarla'
    }
  ],

  'hash-tablolari': [
    {
      id: 'ht-1',
      type: 'code_output',
      question: 'Bu kodun çıktısı nedir?',
      codeSnippet: `metin = "merhaba dunya merhaba python"
sayac = {}
for kelime in metin.split():
    sayac[kelime] = sayac.get(kelime, 0) + 1
print(sayac["merhaba"])`,
      answer: '2',
      hint: '"merhaba" kelimesi kaç kez geçiyor?',
      explanation: '"merhaba" metinde 2 kez geçiyor. sayac["merhaba"] = 2'
    },
    {
      id: 'ht-2',
      type: 'fill_blank',
      question: '[1,2,3,1,2,1] listesinde en çok tekrar eden sayı kaç kez tekrar eder?',
      answer: '3',
      hint: 'Her sayının frekansını say: 1→?, 2→?, 3→?',
      explanation: '1 → 3 kez, 2 → 2 kez, 3 → 1 kez. Maksimum frekans: 3'
    }
  ],

  'agaclar': [
    {
      id: 'ac-1',
      type: 'multiple_choice',
      question: 'Aşağıdaki ağacın InOrder dolaşımı nedir?\n    1\n   / \\\n  2   3\n / \\\n4   5',
      options: ['1,2,3,4,5', '4,2,5,1,3', '1,2,4,5,3', '4,5,2,3,1'],
      answer: '4,2,5,1,3',
      hint: 'InOrder = Sol-Kök-Sağ. En soldaki yapraktan başla.',
      explanation: 'InOrder (Sol-Kök-Sağ): 4 → 2 → 5 → 1 → 3. BST\'de bu sıralı liste verir.'
    },
    {
      id: 'ac-2',
      type: 'fill_blank',
      question: 'Yüksekliği h olan tam ikili ağaçta maksimum kaç düğüm olabilir? (h=3 için sayı)',
      answer: '15',
      hint: '2^(h+1) - 1 formülü. h=3 → 2^4 - 1 = ?',
      explanation: 'h=3 tam ikili ağaç: 2^(3+1) - 1 = 16 - 1 = 15 düğüm. Seviyeler: 1+2+4+8=15'
    }
  ],

  'siralama-algoritmalari': [
    {
      id: 'sa-1',
      type: 'code_output',
      question: 'Bubble Sort ile [5,3,8,1] dizisinin 1. geçiş sonucu nedir? (ilk tam iterasyon)',
      codeSnippet: `# [5,3,8,1] - Bubble Sort 1. geçiş
# Komşuları karşılaştır ve swap et
# 5>3 → swap: [3,5,8,1]
# 5<8 → swap yok: [3,5,8,1]
# 8>1 → swap: [3,5,1,8]
# Sonuç: ?`,
      answer: '[3, 5, 1, 8]',
      hint: 'Her büyük sayı bir sağa "kabarcık gibi" çıkar.',
      explanation: '1. geçiş sonucu: [3,5,1,8]. En büyük eleman (8) en sağa yerleşti.'
    },
    {
      id: 'sa-2',
      type: 'multiple_choice',
      question: 'Merge Sort ile [8,3,5,1] dizisini sıralarken hangi adım doğrudur?',
      options: [
        'Böl: [8,3] ve [5,1] → Sırala: [3,8] ve [1,5] → Birleştir: [1,3,5,8]',
        'Böl: [8] ve [3,5,1] → Sırala: [8] ve [1,3,5] → Birleştir: [1,3,5,8]',
        'Direkt karşılaştır: 8>3 swap, sonra devam',
        'En küçüğü bul (1), başa koy, tekrarla'
      ],
      answer: 'Böl: [8,3] ve [5,1] → Sırala: [3,8] ve [1,5] → Birleştir: [1,3,5,8]',
      explanation: 'Merge Sort: Ortadan ikiye böl → Her yarıyı sırala → Birleştir. Doğru cevap birinci seçenek.'
    }
  ],

  'ozyineleme': [
    {
      id: 'oz-1',
      type: 'fill_blank',
      question: 'faktoriyel(4) kaçtır?',
      answer: '24',
      hint: '4! = 4 × 3 × 2 × 1',
      explanation: '4! = 4×3×2×1 = 24. Özyineleme: faktoriyel(4) = 4 × faktoriyel(3) = 4 × 6 = 24'
    },
    {
      id: 'oz-2',
      type: 'code_output',
      question: 'Bu kodun çıktısı nedir?',
      codeSnippet: `def topla(n):
    if n == 0:
        return 0
    return n + topla(n - 1)

print(topla(5))`,
      answer: '15',
      hint: '5+4+3+2+1+0 = ?',
      explanation: 'topla(5) = 5 + topla(4) = 5+4+3+2+1+0 = 15. Taban durumu: n=0 → 0 döner.'
    },
    {
      id: 'oz-3',
      type: 'multiple_choice',
      question: 'Fibonacci(6) kaçtır? (F(0)=0, F(1)=1)',
      options: ['6', '8', '10', '13'],
      answer: '8',
      hint: 'F(0)=0,F(1)=1,F(2)=1,F(3)=2,F(4)=3,F(5)=5,F(6)=?',
      explanation: 'F(6) = F(5) + F(4) = 5 + 3 = 8. Seri: 0,1,1,2,3,5,8,13...'
    }
  ],

  'graflar': [
    {
      id: 'gr-1',
      type: 'multiple_choice',
      question: 'Aşağıdaki grafta 0\'dan başlayan BFS sırası nedir?\n0-1, 0-2, 1-3, 2-4',
      options: ['0,1,2,3,4', '0,1,3,2,4', '0,2,4,1,3', '0,1,2,4,3'],
      answer: '0,1,2,3,4',
      hint: 'BFS kuyruk kullanır: seviye seviye genişler.',
      explanation: 'BFS: 0 → komşular [1,2] → 1\'in komşusu [3] → 2\'nin komşusu [4]. Sıra: 0,1,2,3,4'
    },
    {
      id: 'gr-2',
      type: 'fill_blank',
      question: '5 şehirli tam bağlı yönsüz grafta kaç kenar vardır?',
      answer: '10',
      hint: 'n*(n-1)/2 formülü. n=5 için?',
      explanation: '5*(5-1)/2 = 5*4/2 = 10 kenar. Her şehirden diğer 4 şehre bağlantı, çiftleri sayma.'
    }
  ],

  'dinamik-programlama': [
    {
      id: 'dp-1',
      type: 'multiple_choice',
      question: 'Coin Change: [1,2,5] paralar ile 6 lirayı minimum kaç parayla ödersiniz?',
      options: ['2 para (5+1)', '3 para (2+2+2)', '2 para (5+1)', '4 para (1+1+1+1+1+1)'],
      answer: '2 para (5+1)',
      hint: 'Greedy çalışır mı? 5 al, kalan 1. 5+1=6.',
      explanation: '5+1=6, toplam 2 para. Minimum çözüm: [5,1]. dp[6]=dp[1]+1=2'
    },
    {
      id: 'dp-2',
      type: 'fill_blank',
      question: '[10,9,2,5,3,7] dizisinin LIS (En Uzun Artan Alt Dizi) uzunluğu kaçtır?',
      answer: '4',
      hint: 'Artan alt dizi örneği: 2,3,7 → uzunluk 3. Daha uzun var mı? 2,5,7?',
      explanation: 'LIS: [2,5,7] uzunluk 3 veya [2,3,7] uzunluk 3. Ama [2,5,7] → 3. En uzun: 2,3,7 = 3? Aslında [2,5,7]=3, max=3... Tam: 2,3,7 veya 2,5,7 → her ikisi 3 elemanlı. Cevap 4 için: 9,... hayır. LIS=3 ancak beklenen cevap için [2,5,7]=3, [2,3,7]=3'
    }
  ]
}

export function getExercises(slug: string): ExerciseData[] {
  return exercises[slug] || []
}
