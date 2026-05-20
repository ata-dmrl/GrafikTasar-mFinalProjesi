/**
 * lessonContent.ts — ReacType Platform Ders İçerikleri
 *
 * Bu dosya tüm React ders içeriklerini barındırır.
 * Her ders: video linkleri, dış kurs linkleri, bölümler, kod örnekleri,
 * anahtar noktalar ve pratik sorulardan oluşur.
 *
 * Müfredat Yapısı:
 *   Level 0: JavaScript Temelleri
 *   Level 1: React Temelleri (JSX, Props, State Kavramı)
 *   Level 2: Temel Hooks (useState, useEffect, useRef)
 *   Level 3: İleri Hooks (useContext, useReducer, useMemo/useCallback)
 *   Level 4: Gelişmiş Hooks (useLayoutEffect, useImperativeHandle, Custom Hooks)
 *   Level 5: Form ve Routing (React Router, React Hook Form, Yup)
 *   Level 6: Veri ve State Yönetimi (Axios, React Query, Redux)
 */

export interface CodeExample {
  language: 'typescript' | 'jsx' | 'python' | 'csharp';
  code: string;
}

export interface LessonSection {
  title: string;
  content: string;
  codeExamples?: CodeExample[];
  visualDescription?: string;
}

export interface LessonVideo {
  videoId: string;
  title: string;
  channelName?: string;
}

export interface ExternalCourse {
  title: string;
  url: string;
  platform: string;
  description?: string;
}

export interface LessonContent {
  slug: string;
  title: string;
  videos?: LessonVideo[];
  externalCourses?: ExternalCourse[];
  sections: LessonSection[];
  keyPoints: string[];
  practiceProblems?: string[];
}

// ─── Sabit kurs linkleri ───
const BTK_REACT = {
  title: 'React ile Web Geliştirme',
  url: 'https://www.btkakademi.gov.tr/portal/course/react-ile-web-gelistirme-17801',
  platform: 'BTK Akademi',
  description: 'React ile modern web uygulaması geliştirme. Ücretsiz sertifikalı kurs.'
};

const BTK_REACT2 = {
  title: 'React ile Web Programcılığı',
  url: 'https://www.btkakademi.gov.tr/portal/course/react-ile-web-programciligi-10035',
  platform: 'BTK Akademi',
  description: 'React ile web programcılığını temelden öğren. Ücretsiz ve sertifikalı BTK kursu.'
};

const BTK_JS = {
  title: 'JavaScript ile Programlamaya Giriş',
  url: 'https://www.btkakademi.gov.tr/portal/course/javascript-ile-programlamaya-giris-13585',
  platform: 'BTK Akademi',
  description: 'JavaScript temellerini sıfırdan öğren. Ücretsiz ve sertifikalı.'
};

const BTK_TS = {
  title: 'TypeScript ile Web Geliştirme',
  url: 'https://www.btkakademi.gov.tr/portal/course/typescript-ile-web-gelistirme-17810',
  platform: 'BTK Akademi',
  description: 'TypeScript ile tip güvenli React uygulamaları geliştir.'
};

// ─── Tüm dersler ───
const lessons: Record<string, LessonContent> = {

  // ══════════════════ LEVEL 0 ══════════════════

  'js-temelleri': {
    slug: 'js-temelleri',
    title: 'JavaScript Temelleri',
    videos: [
      { videoId: 'W6NZfCO5SIk', title: 'JavaScript Tutorial - Full Course for Beginners', channelName: 'Programming with Mosh' },
      { videoId: 'hdI2bqOjy3c', title: 'JavaScript Crash Course', channelName: 'Traversy Media' },
      { videoId: 'e2NOPJHRCqA', title: 'JS & JSX Farkı Nedir? | REACT Dersleri', channelName: 'Enes Bayram' },
      { videoId: '8NkCNIoju4Y', title: 'ReactJS Eğitim Serisi - JSX ve JavaScript İfadeleri', channelName: 'Yazılım Bilimi' },
    ],
    externalCourses: [BTK_JS, BTK_REACT2],
    sections: [
      {
        title: 'Değişkenler ve Veri Tipleri',
        content: `JavaScript'te değişken tanımlamak için \`let\`, \`const\` ve eski yöntem \`var\` kullanılır.

**const** — değeri değiştirilemez (sabit)
**let** — değeri değiştirilebilir (blok kapsamlı)
**var** — eski yöntem, artık önerilmez

JavaScript'te başlıca veri tipleri:
- **string**: Metin verisi → \`"Merhaba"\`
- **number**: Sayı → \`42\`, \`3.14\`
- **boolean**: Doğru/Yanlış → \`true\`, \`false\`
- **null**: Kasıtlı boşluk
- **undefined**: Tanımsız
- **object**: Nesne yapısı
- **array**: Dizi`,
        codeExamples: [
          {
            language: 'typescript',
            code: `// Değişken tanımları
const isim: string = "Ahmet";       // değiştirilemez
let yas: number = 25;               // değiştirilebilir
let aktif: boolean = true;

// TypeScript'te tip çıkarımı (otomatik tip)
const sehir = "İstanbul";          // TypeScript: string olduğunu anlar

// Dizi ve nesne
const renkler: string[] = ["kırmızı", "mavi", "yeşil"];
const kullanici = { isim: "Ahmet", yas: 25 };

// Template literal (şablon string)
console.log(\`Merhaba, \${isim}! Yaşın: \${yas}\`);
// Çıktı: Merhaba, Ahmet! Yaşın: 25`
          }
        ]
      },
      {
        title: 'Fonksiyonlar',
        content: `JavaScript'te fonksiyon tanımlamanın birden fazla yolu vardır:

**Function Declaration** — hoisting destekler, çağrıdan önce tanımlanabilir
**Function Expression** — değişkene atanan fonksiyon
**Arrow Function** — kısa sözdizimi, modern React'te tercih edilir`,
        codeExamples: [
          {
            language: 'typescript',
            code: `// 1. Arrow Function (React'te en çok kullanılan)
const topla = (a: number, b: number): number => {
  return a + b;
};

// 2. Tek satırlık arrow function
const kare = (x: number): number => x * x;

// 3. Default parametre
const selamla = (isim: string = "Dünya") => {
  return \`Merhaba, \${isim}!\`;
};

// 4. Destructuring ile parametre
const kullaniciBilgisi = ({ isim, yas }: { isim: string; yas: number }) => {
  return \`\${isim} - \${yas} yaşında\`;
};

console.log(topla(5, 3));         // 8
console.log(kare(4));             // 16
console.log(selamla());           // Merhaba, Dünya!
console.log(selamla("React"));    // Merhaba, React!`
          }
        ]
      },
      {
        title: 'Dizi Metodları (Array Methods)',
        content: `React'te listeleri işlemek için dizi metodlarını çok kullanırsın. En önemli metodlar:

- **map()** — Her elemanı dönüştürür, yeni dizi döner
- **filter()** — Koşula uyan elemanları seçer
- **reduce()** — Diziyi tek değere indirger
- **find()** — İlk eşleşen elemanı döner
- **some() / every()** — Koşul kontrolü`,
        codeExamples: [
          {
            language: 'typescript',
            code: `const sayilar = [1, 2, 3, 4, 5];

// map — her sayıyı iki katına çıkar
const ikileri = sayilar.map(s => s * 2);
// [2, 4, 6, 8, 10]

// filter — çift sayıları seç
const ciftler = sayilar.filter(s => s % 2 === 0);
// [2, 4]

// reduce — toplam hesapla
const toplam = sayilar.reduce((acc, s) => acc + s, 0);
// 15

// find — ilk çift sayıyı bul
const ilkCift = sayilar.find(s => s % 2 === 0);
// 2

// Kullanıcı listesi örneği (React'te sık kullanım)
const kullanicilar = [
  { id: 1, isim: "Ahmet", aktif: true },
  { id: 2, isim: "Ayşe", aktif: false },
  { id: 3, isim: "Mehmet", aktif: true },
];

const aktifKullanicilar = kullanicilar
  .filter(k => k.aktif)
  .map(k => k.isim);
// ["Ahmet", "Mehmet"]`
          }
        ]
      }
    ],
    keyPoints: [
      'const değiştirilemez, let değiştirilebilir — var kullanımından kaçın',
      'Arrow function => sözdizimi React\'te standart kullanım',
      'map(), filter(), reduce() React bileşenlerinde sürekli kullanılır',
      'Template literal ile string birleştirme: `${değişken}`',
      'Destructuring ile nesnelerden/dizilerden veri çekme'
    ],
    practiceProblems: [
      'Bir dizi içindeki tüm sayıların karesini dönen bir fonksiyon yaz',
      '18 yaşından büyük kullanıcıları filtreleyen ve isimlerini büyük harfe çeviren bir fonksiyon yaz',
      'Bir nesne dizisindeki tüm fiyatların toplamını hesapla'
    ]
  },

  'js-kontrol-akisi': {
    slug: 'js-kontrol-akisi',
    title: 'Kontrol Akışı ve Modern JS',
    videos: [
      { videoId: 'IsG4Xd6LlsM', title: 'JavaScript Control Flow', channelName: 'Programming with Mosh' },
      { videoId: 'NCwa_xi0Uuc', title: 'ES6+ Modern JavaScript', channelName: 'Traversy Media' },
    ],
    externalCourses: [BTK_JS, BTK_TS, BTK_REACT2],
    sections: [
      {
        title: 'Koşul İfadeleri',
        content: `JavaScript'te karar verme mekanizmaları:

**if/else** — temel koşul kontrolü
**Ternary Operator (?:)** — kısa koşul ifadesi, React'te JSX içinde kullanılır
**Nullish Coalescing (??)** — null/undefined kontrolü
**Optional Chaining (?.)** — güvenli erişim`,
        codeExamples: [
          {
            language: 'typescript',
            code: `const yas = 20;

// if/else
if (yas >= 18) {
  console.log("Yetişkin");
} else {
  console.log("Çocuk");
}

// Ternary — React JSX içinde çok kullanılır!
const mesaj = yas >= 18 ? "Yetişkin" : "Çocuk";

// Nullish Coalescing ?? — null veya undefined ise varsayılan değer
const isim: string | null = null;
const goruntulenenIsim = isim ?? "Misafir";
// "Misafir"

// Optional Chaining ?. — güvenli nesne erişimi
const kullanici = { profil: { isim: "Ahmet" } };
const kullaniciIsim = kullanici?.profil?.isim;  // "Ahmet"
const sehir = kullanici?.adres?.sehir;           // undefined (hata vermez)

// React'te JSX koşullu render örneği
const isLoggedIn = true;
// JSX: {isLoggedIn ? <Dashboard /> : <LoginPage />}`
          }
        ]
      },
      {
        title: 'Modern ES6+ Özellikleri',
        content: `React ile çalışırken sıkça kullandığın modern JavaScript özellikleri:

**Destructuring** — nesne/diziden değer çekme
**Spread Operator (...)** — kopyalama ve birleştirme
**Rest Parameters** — değişken sayıda parametre
**Modules (import/export)** — kod parçalama`,
        codeExamples: [
          {
            language: 'typescript',
            code: `// ─── Destructuring ───
const { isim, yas, ...geri } = { isim: "Ahmet", yas: 25, sehir: "İstanbul" };
// isim = "Ahmet", yas = 25, geri = { sehir: "İstanbul" }

const [ilk, ikinci, ...kalanlar] = [1, 2, 3, 4, 5];
// ilk = 1, ikinci = 2, kalanlar = [3, 4, 5]

// ─── Spread Operator ───
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];  // [1, 2, 3, 4, 5]

const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }

// React state güncellemesinde spread çok önemli!
const state = { isim: "Ahmet", yas: 25 };
const yeniState = { ...state, yas: 26 }; // sadece yas değişti

// ─── Modules ───
// export
export const hesapla = (a: number, b: number) => a + b;
export default function App() { return null; }

// import
import App, { hesapla } from './App';`
          }
        ]
      },
      {
        title: 'Promises ve Async/Await',
        content: `API çağrıları, dosya okuma gibi asenkron işlemler için:

**Promise** — gelecekte tamamlanacak işlem
**async/await** — Promise'i senkron görünümlü yazmak için
**try/catch** — hata yakalama`,
        codeExamples: [
          {
            language: 'typescript',
            code: `// ─── Async/Await ───
const veriCek = async (url: string) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(\`HTTP Hatası: \${response.status}\`);
    }

    const veri = await response.json();
    return veri;
  } catch (hata) {
    console.error("Veri çekme hatası:", hata);
    throw hata;
  }
};

// Kullanım
const kullanicilariGetir = async () => {
  const kullanicilar = await veriCek('https://jsonplaceholder.typicode.com/users');
  console.log(kullanicilar);
};

// React'te useEffect içinde nasıl kullanılır
// useEffect(() => {
//   const getData = async () => {
//     const data = await veriCek('/api/users');
//     setUsers(data);
//   };
//   getData();
// }, []);`
          }
        ]
      }
    ],
    keyPoints: [
      'Ternary operator (?:) React JSX içinde koşullu render için kullanılır',
      'Optional chaining (?.) null/undefined hatalarını önler',
      'Destructuring ile props ve state değerlerini kolayca çekebilirsin',
      'Spread (...) ile state\'i immutable (değiştirmeden) güncellersin',
      'async/await ile asenkron işlemleri okunabilir şekilde yazarsın'
    ],
    practiceProblems: [
      'Bir kullanıcı nesnesinden isim, email ve yas alanlarını destructuring ile çek',
      'İki diziyi spread operatörü ile birleştir ve yalnızca benzersiz değerleri tut',
      'JSONPlaceholder API\'den kullanıcıları çeken bir async fonksiyon yaz'
    ]
  },

  // ══════════════════ LEVEL 1 ══════════════════

  'react-giris': {
    slug: 'react-giris',
    title: 'React\'e Giriş ve JSX',
    videos: [
      { videoId: 'SqcY0GlETPk', title: 'React Tutorial for Beginners', channelName: 'Programming with Mosh' },
      { videoId: 'Ke90Tje7VS0', title: 'React JS Crash Course', channelName: 'Traversy Media' },
      { videoId: 'slVS7QNsSk8', title: 'React ile Proje Geliştirmek - Kurulum & Dosya Yapısı', channelName: 'PROTOTURK' },
      { videoId: 'jVWXoEz2ZmQ', title: 'React ile Proje Geliştirmek - JSX, createElement, Fragment', channelName: 'PROTOTURK' },
      { videoId: 'wSDZyaLlCeo', title: 'Nedir Bu React? | REACT Dersleri', channelName: 'Enes Bayram' },
      { videoId: 'lNfBlYAk3Lw', title: 'ReactJS Eğitim Serisi 1 - Giriş ve ReactJS Nedir?', channelName: 'Yazılım Bilimi' },
      { videoId: '_p1KmuE29KM', title: 'ReactJS Eğitim Serisi 3 - Virtual Dom Mimarisi', channelName: 'Yazılım Bilimi' },
    ],
    externalCourses: [BTK_REACT, BTK_REACT2, BTK_TS],
    sections: [
      {
        title: 'React Nedir?',
        content: `React, Facebook (Meta) tarafından geliştirilen açık kaynaklı bir JavaScript UI kütüphanesidir (2013).

**Neden React?**
- **Component tabanlı**: UI'ı küçük, yeniden kullanılabilir parçalara böler
- **Declarative (Bildirimsel)**: "ne göstereceğini" söylersin, "nasıl" olduğunu React halleder
- **Virtual DOM**: Gerçek DOM'u en az güncelleyerek performans sağlar
- **Tek yönlü veri akışı**: Props üstten alta akar, öngörülebilir

**React ile ne yapılır?**
- Web uygulamaları (React DOM)
- Mobil uygulamalar (React Native)
- Masaüstü uygulamaları (Electron + React)

**Proje oluşturma:**`,
        codeExamples: [
          {
            language: 'typescript',
            code: `# Vite ile yeni React + TypeScript projesi oluşturma
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev

# Proje yapısı:
# my-app/
# ├── public/
# ├── src/
# │   ├── App.tsx       ← Ana bileşen
# │   ├── main.tsx      ← Giriş noktası
# │   └── index.css
# ├── package.json
# ├── vite.config.ts
# └── tsconfig.json`
          }
        ]
      },
      {
        title: 'JSX Nedir?',
        content: `JSX (JavaScript XML), JavaScript içinde HTML benzeri sözdizimi yazmamızı sağlar. Tarayıcı JSX'i anlamaz; Babel/Vite tarafından saf JavaScript'e dönüştürülür.

**JSX Kuralları:**
1. Tek kök element döndürülmeli (ya da \`<></>\` Fragment kullan)
2. Tüm taglar kapatılmalı (\`<br />\`, \`<img />\`)
3. CSS sınıfı için \`class\` değil \`className\` kullanılır
4. JavaScript ifadeleri \`{}\` içinde yazılır
5. Camel case event isimleri: \`onClick\`, \`onChange\``,
        codeExamples: [
          {
            language: 'typescript',
            code: `// JSX örneği
function Merhaba() {
  const isim = "Dünya";
  const renk = "mavi";

  return (
    <div className="container">         {/* class değil className! */}
      <h1>Merhaba, {isim}!</h1>          {/* JS ifadesi {} içinde */}
      <p style={{ color: renk }}>        {/* İnline stil: çift süslü parantez */}
        Bu bir JSX örneğidir.
      </p>
      <img src="/logo.png" alt="Logo" /> {/* Self-closing tag */}
    </div>
  );
}

// Fragment kullanımı — gereksiz div eklemez
function Liste() {
  return (
    <>
      <h2>Başlık</h2>
      <ul>
        <li>Madde 1</li>
        <li>Madde 2</li>
      </ul>
    </>
  );
}`
          }
        ]
      },
      {
        title: 'Functional Component',
        content: `React 16.8 sonrasında fonksiyonel bileşenler standart hale geldi. Class component'ler artık tercih edilmiyor.

**Functional Component özellikleri:**
- Normal JavaScript fonksiyonu
- JSX döndürür
- Hook'lar kullanabilir
- TypeScript ile tip tanımlanabilir`,
        codeExamples: [
          {
            language: 'typescript',
            code: `import React from 'react';

// Basit fonksiyonel bileşen
function Kart() {
  return (
    <div style={{
      border: '1px solid #ddd',
      padding: '16px',
      borderRadius: '8px'
    }}>
      <h3>Merhaba React!</h3>
      <p>Bu bir fonksiyonel bileşendir.</p>
    </div>
  );
}

// Arrow function ile (modern tercih)
const Buton: React.FC = () => {
  return (
    <button onClick={() => alert('Tıklandı!')}>
      Bana Tıkla
    </button>
  );
};

// App.tsx içinde kullanım
function App() {
  return (
    <div>
      <Kart />     {/* Bileşen kullanımı */}
      <Buton />
    </div>
  );
}

export default App;`
          }
        ]
      }
    ],
    keyPoints: [
      'React bir JavaScript UI kütüphanesidir, framework değil',
      'JSX JavaScript içinde HTML benzeri sözdizimi sağlar',
      'className kullan, class değil (JavaScript reserved word)',
      'Her bileşen tek bir kök element döndürmelidir',
      'Fonksiyonel bileşenler modern React\'in standardı'
    ],
    practiceProblems: [
      'Merhaba Dünya yazan basit bir React bileşeni oluştur',
      'İsim ve yaşı prop olarak alan bir Kart bileşeni yaz',
      'Bir ürün listesini ul/li ile gösteren bileşen oluştur'
    ]
  },

  'props': {
    slug: 'props',
    title: 'Props ve Component İletişimi',
    videos: [
      { videoId: 'PHaECbrKgs0', title: 'React Props Explained', channelName: 'Traversy Media' },
      { videoId: 'reZa1pLHEyQ', title: 'React Props & TypeScript', channelName: 'Jack Herrington' },
      { videoId: 'UzuCy83S4Vo', title: 'React ile Proje Geliştirmek - Component, Props, useState', channelName: 'PROTOTURK' },
      { videoId: 'MB7HhYLImEU', title: 'Props Nedir? | Props Kullanımı | REACT Dersleri', channelName: 'Enes Bayram' },
      { videoId: '14M8Z-ui7jc', title: 'ReactJS Eğitim Serisi - Propsların Kullanımı', channelName: 'Yazılım Bilimi' },
      { videoId: 'eSqjokUrOPg', title: 'ReactJS Eğitim Serisi - PropTypes ve Default Props', channelName: 'Yazılım Bilimi' },
    ],
    externalCourses: [BTK_REACT, BTK_REACT2],
    sections: [
      {
        title: 'Props Nedir?',
        content: `Props (Properties), parent bileşenden child bileşene veri aktarmanın yoludur. React'te veri akışı **tek yönlüdür**: yukarıdan aşağıya (top-down).

**Props Özellikleri:**
- **Readonly**: Child bileşen props'u değiştiremez
- **Herhangi tip**: string, number, boolean, object, fonksiyon, bileşen
- **TypeScript** ile tip güvenliği sağlanır`,
        codeExamples: [
          {
            language: 'typescript',
            code: `// Props arayüzü tanımı (TypeScript)
interface KartProps {
  baslik: string;
  icerik: string;
  puan?: number;       // ? = isteğe bağlı
  renk?: string;
}

// Props alan bileşen
const Kart: React.FC<KartProps> = ({ baslik, icerik, puan = 0, renk = '#fff' }) => {
  return (
    <div style={{ backgroundColor: renk, padding: '16px', borderRadius: '8px' }}>
      <h3>{baslik}</h3>
      <p>{icerik}</p>
      {puan > 0 && <span>⭐ {puan} puan</span>}
    </div>
  );
};

// Kullanım
function App() {
  return (
    <div>
      <Kart
        baslik="useState Dersi"
        icerik="React state yönetimi öğren"
        puan={95}
        renk="#e3f2fd"
      />
      <Kart
        baslik="useEffect Dersi"
        icerik="Yan etkileri yönet"
      />
    </div>
  );
}`
          }
        ]
      },
      {
        title: 'Children Props',
        content: `\`children\` özel bir prop'tur. Bileşen tagları arasına yerleştirilen içeriği temsil eder.`,
        codeExamples: [
          {
            language: 'typescript',
            code: `import { ReactNode } from 'react';

// children prop'u alan bileşen
interface KutucukProps {
  renk?: string;
  children: ReactNode;  // herhangi bir JSX içeriği
}

const Kutucuk: React.FC<KutucukProps> = ({ renk = '#f5f5f5', children }) => {
  return (
    <div style={{
      backgroundColor: renk,
      padding: '20px',
      borderRadius: '12px',
      border: '1px solid #ddd'
    }}>
      {children}  {/* Buraya ne yazılırsa görünür */}
    </div>
  );
};

// Kullanım — kutucuklar arasına herhangi içerik koyabilirsin
function App() {
  return (
    <Kutucuk renk="#e8f5e9">
      <h2>Bu bir başlık</h2>
      <p>Ve bu bir paragraf</p>
      <button>Buton da olur</button>
    </Kutucuk>
  );
}`
          }
        ]
      },
      {
        title: 'Props Drilling ve Çözümü',
        content: `Prop drilling, verileri birçok ara bileşen üzerinden alt bileşene iletmek durumudur. Bu kod karmaşıklığına yol açar.

**Çözümler:**
- **useContext** (ileri konularda)
- **Redux / Zustand** (global state)
- Bileşen mimarisini yeniden düzenlemek`,
        codeExamples: [
          {
            language: 'typescript',
            code: `// ❌ Prop drilling sorunu
function Uygulama() {
  const kullanici = { isim: "Ahmet", rol: "Admin" };
  return <Layout kullanici={kullanici} />;
}

function Layout({ kullanici }: { kullanici: object }) {
  return <Header kullanici={kullanici} />;  // sadece geçiriyor
}

function Header({ kullanici }: { kullanici: object }) {
  return <Profil kullanici={kullanici} />;  // yine geçiriyor
}

function Profil({ kullanici }: { kullanici: any }) {
  return <span>{kullanici.isim}</span>;     // gerçekten kullanan bu
}

// ✅ Çözüm: useContext (ileriki konuda öğreneceksin)
// const KullaniciContext = createContext(null);
// <KullaniciContext.Provider value={kullanici}>
//   <Layout />
// </KullaniciContext.Provider>`
          }
        ]
      }
    ],
    keyPoints: [
      'Props üstten alta tek yönlü veri akışı sağlar',
      'Child bileşenler props\'u değiştiremez (readonly)',
      'TypeScript interface ile props tipleri tanımla',
      'Opsiyonel props için ? kullan ve varsayılan değer ver',
      'children özel prop\'u bileşen tagları arasındaki içeriği alır'
    ],
    practiceProblems: [
      'Kullanıcı adı, avatar ve bio props alan bir ProfilKarti bileşeni yaz',
      'Renk ve boyut props alan yeniden kullanılabilir bir Buton bileşeni oluştur',
      'Props olarak ürün listesi alan ve her ürünü gösteren bir UrunListesi bileşeni yaz'
    ]
  },

  'state-yonetimi': {
    slug: 'state-yonetimi',
    title: 'State Yönetimi Kavramı',
    videos: [
      { videoId: 'O6P86uwfdR0', title: 'React State Management Explained', channelName: 'Web Dev Simplified' },
      { videoId: 'hQAHSlTtcmY', title: 'React State vs Props', channelName: 'Traversy Media' },
      { videoId: 'Q5MtgP7DFio', title: 'ReactJS Eğitim Serisi - State Nedir ve Statelerin Özellikleri', channelName: 'Yazılım Bilimi' },
      { videoId: 'qRqzCHOd9N0', title: 'Kurslarım Projesi #1 | Örnek | REACT Dersleri', channelName: 'Enes Bayram' },
    ],
    externalCourses: [BTK_REACT, BTK_REACT2],
    sections: [
      {
        title: 'State Nedir?',
        content: `**State** (durum), bileşenin zaman içinde değişebilen iç verisini temsil eder. State değiştiğinde React bileşeni otomatik olarak yeniden render eder.

**Props ile State Farkı:**

| Özellik | Props | State |
|---------|-------|-------|
| Kaynak | Parent bileşen | Bileşenin kendisi |
| Değiştirilebilir mi? | Hayır (readonly) | Evet |
| Re-render tetikler mi? | Evet (parent'tan gelince) | Evet |
| Amacı | Veri iletimi | Dinamik UI durumu |`,
        codeExamples: [
          {
            language: 'typescript',
            code: `// State ne zaman kullanılır?
// - Kullanıcı etkileşimleri (tıklama, yazma)
// - API'den gelen dinamik veri
// - Form değerleri
// - Açık/kapalı durumlar (modal, dropdown)
// - Sayaçlar, liste öğeleri

// Örnekler:
// ❌ State GEREKMEZ — sabit değer
const RENK = "mavi";  // const kullan, state değil

// ✅ State GEREKİR — kullanıcı etkileşimine göre değişir
// const [sayac, setSayac] = useState(0);
// const [isAcik, setIsAcik] = useState(false);
// const [kullaniciListesi, setKullaniciListesi] = useState([]);

// State'i hesaplanabiliyorsa KULLANMA
// ❌ Yanlış
// const [tamIsim, setTamIsim] = useState("Ahmet Yılmaz");
// setTamIsim(isim + " " + soyIsim);  // gereksiz

// ✅ Doğru — hesapla
// const tamIsim = isim + " " + soyIsim;  // sadece hesapla`
          }
        ]
      },
      {
        title: 'React Render Döngüsü',
        content: `React'in çalışma prensibi:

1. **Initial Render**: Bileşen ilk kez DOM'a eklenir
2. **State/Props değişikliği**: Re-render tetiklenir
3. **Virtual DOM karşılaştırması**: Farklar tespit edilir
4. **Gerçek DOM güncelleme**: Sadece değişen kısımlar güncellenir

Bu süreç **Reconciliation** (uzlaşma) olarak adlandırılır.`,
        codeExamples: [
          {
            language: 'typescript',
            code: `// Render döngüsünü anlamak için konsol logu
import { useState } from 'react';

function Sayac() {
  const [count, setCount] = useState(0);

  console.log("Bileşen render edildi! Count:", count);
  // Her state değişiminde bu log çalışır

  return (
    <div>
      <p>Sayaç: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Arttır
      </button>
    </div>
  );
}

// ÖNEMLİ: State'i doğrudan değiştirme!
// ❌ YANLIŞ — React değişimi görmez
// count = count + 1;

// ✅ DOĞRU — setter fonksiyonu kullan
// setCount(count + 1);
// veya callback ile:
// setCount(prev => prev + 1);`
          }
        ]
      }
    ],
    keyPoints: [
      'State bileşenin kendi içindeki dinamik verisidir',
      'Props üstten gelir, state içeriden yönetilir',
      'State değiştiğinde React otomatik re-render yapar',
      'State\'i hiçbir zaman doğrudan değiştirme, setter kullan',
      'Hesaplanabilecek değerleri state olarak saklama'
    ],
    practiceProblems: [
      'Hangi değerlerin state olması gerektiğini, hangilerinin gereksiz olduğunu belirle',
      'Bir bileşende kaç kez render edildiğini gösteren bir sayaç ekle',
      'Props ile State kullanan bir bileşen yaz ve farkı göster'
    ]
  },

  // ══════════════════ LEVEL 2 ══════════════════

  'usestate': {
    slug: 'usestate',
    title: 'useState Hook',
    videos: [
      { videoId: 'O6P86uwfdR0', title: 'useState Hook Tutorial', channelName: 'Web Dev Simplified' },
      { videoId: 'e0TJLIkV0bg', title: 'React useState Explained', channelName: 'Traversy Media' },
      { videoId: 'x5mfP6MxoJY', title: 'Nedir Bu useState? | useState Kullanımı | REACT Dersleri', channelName: 'Enes Bayram' },
      { videoId: '9HuUDqqswqc', title: 'ReactJS Eğitim Serisi - State Oluşturma', channelName: 'Yazılım Bilimi' },
    ],
    externalCourses: [BTK_REACT, BTK_REACT2],
    sections: [
      {
        title: 'useState Nedir?',
        content: `\`useState\`, React'in en temel hook'udur. Fonksiyonel bileşenlerde yerel state tanımlamayı sağlar.

**Sözdizimi:**
\`const [state, setState] = useState<Tip>(başlangıçDeğeri);\`

**Kurallar:**
1. State setter kullanılmalı: \`setCount(count + 1)\`
2. Doğrudan değiştirme yasak: \`count = count + 1\` ❌
3. Her \`setState\` çağrısı yeni bir render tetikler
4. TypeScript'te tip belirtimi: \`useState<number>(0)\``,
        codeExamples: [
          {
            language: 'typescript',
            code: `import { useState } from 'react';

// Temel sayaç örneği
function Sayac() {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <p>Sayı: {count}</p>
      <button onClick={() => setCount(count + 1)}>Arttır</button>
      <button onClick={() => setCount(count - 1)}>Azalt</button>
      <button onClick={() => setCount(0)}>Sıfırla</button>
    </div>
  );
}

// Farklı tip örnekler
function FormOrnek() {
  const [isim, setIsim] = useState<string>('');
  const [aktif, setAktif] = useState<boolean>(false);
  const [liste, setListe] = useState<string[]>([]);

  const elemanEkle = () => {
    setListe([...liste, isim]);  // spread ile kopya oluştur!
    setIsim('');
  };

  return (
    <div>
      <input value={isim} onChange={e => setIsim(e.target.value)} />
      <button onClick={elemanEkle}>Ekle</button>
      <ul>{liste.map((el, i) => <li key={i}>{el}</li>)}</ul>
    </div>
  );
}`
          }
        ]
      },
      {
        title: 'Nesne State Yönetimi',
        content: `Nesne state kullanırken dikkat edilmesi gerekenler. React'te state **immutable** (değişmez) olmalıdır — her güncellemede yeni bir nesne döndürülmeli.`,
        codeExamples: [
          {
            language: 'typescript',
            code: `interface Kullanici {
  isim: string;
  yas: number;
  sehir: string;
}

function KullaniciFormu() {
  const [kullanici, setKullanici] = useState<Kullanici>({
    isim: '',
    yas: 0,
    sehir: ''
  });

  // ❌ YANLIŞ — doğrudan değiştirme, React görmez
  // kullanici.isim = "Ahmet";

  // ✅ DOĞRU — spread ile yeni nesne
  const isimDegistir = (yeniIsim: string) => {
    setKullanici({ ...kullanici, isim: yeniIsim });
  };

  // Daha temiz: fonksiyonel güncelleme
  const yasDegistir = (yeniYas: number) => {
    setKullanici(prev => ({ ...prev, yas: yeniYas }));
  };

  return (
    <div>
      <input
        value={kullanici.isim}
        onChange={e => isimDegistir(e.target.value)}
        placeholder="İsim"
      />
      <input
        type="number"
        value={kullanici.yas}
        onChange={e => yasDegistir(Number(e.target.value))}
        placeholder="Yaş"
      />
      <p>Kullanıcı: {JSON.stringify(kullanici)}</p>
    </div>
  );
}`
          }
        ]
      },
      {
        title: 'useState ile Toggle ve Lazy Initialization',
        content: `Sık kullanılan state kalıpları:

**Toggle** — boolean değeri tersine çevirme
**Lazy Initialization** — başlangıç değerini hesaplamak pahalıysa fonksiyon kullan`,
        codeExamples: [
          {
            language: 'typescript',
            code: `import { useState } from 'react';

// Toggle örneği — modal, dark mode, dropdown için
function ToggleOrnek() {
  const [isAcik, setIsAcik] = useState(false);

  // ✅ Callback ile güvenli toggle
  const toggle = () => setIsAcik(prev => !prev);

  return (
    <div>
      <button
        onClick={toggle}
        style={{ backgroundColor: isAcik ? '#4CAF50' : '#f44336' }}
      >
        {isAcik ? '✓ Açık' : '✕ Kapalı'}
      </button>
      {isAcik && <div>Modal içeriği burada!</div>}
    </div>
  );
}

// Lazy Initialization — başlangıç değeri hesaplamak pahalıysa
function AgirHesap() {
  // ❌ Her render'da çalışır (gereksiz)
  // const [data, setData] = useState(agirHesaplama());

  // ✅ Sadece ilk render'da çalışır (fonksiyon geç)
  const [data, setData] = useState(() => {
    return JSON.parse(localStorage.getItem('veri') || '[]');
  });

  return <div>{JSON.stringify(data)}</div>;
}`
          }
        ]
      }
    ],
    keyPoints: [
      'useState<Tip>(başlangıç) — tip belirtmek TypeScript\'te önerilir',
      'Setter fonksiyonunu kullan, state\'i doğrudan değiştirme',
      'Nesne state\'inde spread (...) ile immutable güncelleme yap',
      'Toggle için setX(prev => !prev) kalıbını kullan',
      'Ağır hesaplamalar için lazy initialization (fonksiyon) kullan'
    ],
    practiceProblems: [
      'Artır/Azalt/Sıfırla butonlu bir sayaç bileşeni oluştur',
      'Kullanıcı adı, email, yaş içeren bir profil formu yaz',
      'Açık/kapalı durumu olan ve içeriği gösteren/gizleyen bir Accordion bileşeni yap'
    ]
  },

  'useeffect': {
    slug: 'useeffect',
    title: 'useEffect Hook',
    videos: [
      { videoId: '0ZJgIjIuY7U', title: 'useEffect Hook Tutorial', channelName: 'Web Dev Simplified' },
      { videoId: 'gv9ugDJ1ynU', title: 'React useEffect Explained', channelName: 'Traversy Media' },
      { videoId: '4as9W5msOI8', title: 'React ile Proje Geliştirmek - Yaşam Döngüsü (Lifecycle)', channelName: 'PROTOTURK' },
      { videoId: '7TP9XgHyRnw', title: 'Nedir Bu useEffect? | useEffect Kullanımı | REACT Dersleri', channelName: 'Enes Bayram' },
    ],
    externalCourses: [BTK_REACT, BTK_REACT2],
    sections: [
      {
        title: 'useEffect Nedir?',
        content: `\`useEffect\`, side effect (yan etki) işlemlerini yönetmek için kullanılır. Side effect'ler render ile doğrudan ilgili olmayan işlemlerdir:

- API çağrıları (fetch/axios)
- DOM manipülasyonu
- Timer/interval (setInterval, setTimeout)
- Event listener ekleme
- Abonelik (subscription)

Class component'teki \`componentDidMount\`, \`componentDidUpdate\`, \`componentWillUnmount\` metodlarının birleşimidir.

**Kullanım Kalıpları:**`,
        codeExamples: [
          {
            language: 'typescript',
            code: `import { useState, useEffect } from 'react';

// 1. Her render sonrası çalışır (bağımlılık yok)
useEffect(() => {
  document.title = "Sayfa Başlığı";
});

// 2. Sadece ilk yüklemede çalışır (componentDidMount)
useEffect(() => {
  console.log("Bileşen yüklendi!");
}, []);  // Boş dizi = sadece bir kez

// 3. Belirtilen değer değişince çalışır
useEffect(() => {
  console.log("count değişti:", count);
}, [count]);

// 4. Cleanup fonksiyonu (componentWillUnmount)
useEffect(() => {
  const timer = setInterval(() => {
    console.log("Her saniye çalışır");
  }, 1000);

  return () => clearInterval(timer);  // temizle!
}, []);`
          }
        ]
      },
      {
        title: 'API\'den Veri Çekme',
        content: `useEffect içinde API çağrısı yapmak için en yaygın kalıp:`,
        codeExamples: [
          {
            language: 'typescript',
            code: `import { useState, useEffect } from 'react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

function TodoListesi() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [hata, setHata] = useState<string | null>(null);

  useEffect(() => {
    // Async fonksiyon useEffect içinde tanımla
    const veriCek = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          'https://jsonplaceholder.typicode.com/todos?_limit=5'
        );
        const data: Todo[] = await res.json();
        setTodos(data);
      } catch (err) {
        setHata('Veri yüklenemedi!');
      } finally {
        setLoading(false);
      }
    };

    veriCek();
  }, []);  // Sadece bir kez çalışır

  if (loading) return <div>Yükleniyor...</div>;
  if (hata) return <div style={{ color: 'red' }}>{hata}</div>;

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id} style={{
          textDecoration: todo.completed ? 'line-through' : 'none'
        }}>
          {todo.title}
        </li>
      ))}
    </ul>
  );
}`
          }
        ]
      },
      {
        title: 'Bağımlılık Dizisi ve Cleanup',
        content: `**Bağımlılık Dizisi Kuralları:**
- Boş \`[]\` → Sadece mount'ta çalışır
- \`[değer]\` → Değer her değiştiğinde çalışır
- Dizisiz → Her render'da çalışır (dikkatli kullan)

**Cleanup Fonksiyonu:**
Bileşen unmount olduğunda veya bir sonraki effect çalışmadan önce çalışır. Event listener ve timer'lar için zorunlu!`,
        codeExamples: [
          {
            language: 'typescript',
            code: `// Event listener temizleme örneği
function PencereBoyutu() {
  const [boyut, setBoyut] = useState({
    genislik: window.innerWidth,
    yukseklik: window.innerHeight,
  });

  useEffect(() => {
    const boyutGuncelle = () => {
      setBoyut({
        genislik: window.innerWidth,
        yukseklik: window.innerHeight,
      });
    };

    window.addEventListener('resize', boyutGuncelle);

    // Cleanup: bileşen kaldırıldığında event listener'ı temizle
    return () => {
      window.removeEventListener('resize', boyutGuncelle);
    };
  }, []);  // Sadece bir kez ekle

  return (
    <p>
      Pencere: {boyut.genislik} x {boyut.yukseklik}
    </p>
  );
}`
          }
        ]
      }
    ],
    keyPoints: [
      'useEffect side effect\'leri render\'dan ayırır',
      'Boş [] → sadece mount\'ta çalışır (API çağrısı için ideal)',
      '[değer] → o değer değişince çalışır',
      'Cleanup fonksiyonu bellek sızıntılarını önler',
      'Async fonksiyonları useEffect içinde tanımla, async useEffect yazmak hatalı'
    ],
    practiceProblems: [
      'Sayfa başlığını count state ile senkronize eden bir bileşen yaz',
      'JSONPlaceholder\'dan kullanıcı listesi çeken, loading/error durumları olan bileşen oluştur',
      'Her saniye artan ve durduralabilen bir timer bileşeni yaz (cleanup ile)'
    ]
  },

  'useref': {
    slug: 'useref',
    title: 'useRef Hook',
    videos: [
      { videoId: 't2ypzz6gJm0', title: 'useRef Hook Tutorial', channelName: 'Web Dev Simplified' },
      { videoId: 'LWg0OyZQffc', title: 'React useRef Explained', channelName: 'Traversy Media' },
      { videoId: 'KRQ97fhnR3A', title: 'React ile Proje Geliştirmek - useRef() ve forwardRef()', channelName: 'PROTOTURK' },
    ],
    externalCourses: [BTK_REACT, BTK_REACT2],
    sections: [
      {
        title: 'useRef Nedir?',
        content: `\`useRef\`, iki farklı amaç için kullanılır:

1. **DOM elemanlarına doğrudan erişim** (focus, scroll, boyut ölçme)
2. **Render'lar arasında değer saklama** — değer değiştiğinde re-render tetiklemez!

**useRef vs useState:**

| Özellik | useState | useRef |
|---------|---------|--------|
| Re-render tetikler mi? | Evet | Hayır |
| Değere erişim | count | ref.current |
| DOM erişimi | Hayır | Evet |`,
        codeExamples: [
          {
            language: 'typescript',
            code: `import { useRef, useEffect } from 'react';

// 1. DOM Erişimi — input'a odaklanma
function OtomatikOdak() {
  const inputRef = useRef<HTMLInputElement>(null);

  // Sayfa yüklenince otomatik odaklan
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const temizle = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <input ref={inputRef} placeholder="Otomatik odaklanır" />
      <button onClick={temizle}>Temizle</button>
    </div>
  );
}`
          }
        ]
      },
      {
        title: 'Render Sayacı ve Timer Ref',
        content: `useRef'in render tetiklemeden değer saklama özelliği önemli kullanım senaryoları sağlar:`,
        codeExamples: [
          {
            language: 'typescript',
            code: `import { useState, useRef, useEffect } from 'react';

// 2. Render sayacı — kaç kez render edildiğini sayma
function RenderSayaci() {
  const [count, setCount] = useState(0);
  const renderCount = useRef(0);  // Bu değer değişse de render tetiklemez

  useEffect(() => {
    renderCount.current++;  // current ile güncelle
  });

  return (
    <div>
      <p>Sayaç: {count}</p>
      <p>Bu bileşen {renderCount.current} kez render edildi</p>
      <button onClick={() => setCount(c => c + 1)}>Arttır</button>
    </div>
  );
}

// 3. Timer ID saklama — interval için
function ZamanlayiciRef() {
  const [saniye, setSaniye] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const baslat = () => {
    intervalRef.current = setInterval(() => {
      setSaniye(s => s + 1);
    }, 1000);
  };

  const durdur = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  return (
    <div>
      <p>{saniye} saniye</p>
      <button onClick={baslat}>Başlat</button>
      <button onClick={durdur}>Durdur</button>
    </div>
  );
}`
          }
        ]
      }
    ],
    keyPoints: [
      'useRef DOM elementlerine ref={...} ile bağlanır',
      'ref.current ile DOM elementine veya saklanan değere erişilir',
      'useRef değeri değiştiğinde re-render tetiklemez (useState\'ten farkı)',
      'Timer ID, önceki değer gibi persist değerler için useRef kullan',
      'TypeScript\'te tip belirt: useRef<HTMLInputElement>(null)'
    ],
    practiceProblems: [
      'Sayfa yüklenince otomatik odaklanan ve Temizle butonu olan arama kutusu yaz',
      'Video elementi için oynat/durdur kontrolü yapan bir bileşen oluştur',
      'Önceki state değerini gösteren (usePrevious custom hook) bir bileşen yaz'
    ]
  },

  // ══════════════════ LEVEL 3 ══════════════════

  'usecontext': {
    slug: 'usecontext',
    title: 'useContext ve Context API',
    videos: [
      { videoId: 'HYKDUF8X3qI', title: 'React Context & Hooks Tutorial', channelName: 'Web Dev Simplified' },
      { videoId: '5LrDIWkK_Bc', title: 'React Context API Crash Course', channelName: 'Traversy Media' },
      { videoId: 'KY6al2AiW_Q', title: 'React ile Proje Geliştirmek - Context API', channelName: 'PROTOTURK' },
    ],
    externalCourses: [BTK_REACT, BTK_REACT2],
    sections: [
      {
        title: 'Context API Nedir?',
        content: `Context API, bileşen ağacında veriyi prop drilling yapmadan paylaşmayı sağlar. Tema, dil, kullanıcı bilgisi gibi global verileri tüm bileşenlerden erişilebilir yapar.

**3 Adımda Context:**
1. **createContext** ile context oluştur
2. **Provider** ile alt bileşenleri sar
3. **useContext** ile istenen bileşende oku`,
        codeExamples: [
          {
            language: 'typescript',
            code: `// 1. ThemeContext.tsx — Context oluştur
import { createContext, useContext, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Context oluştur
export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

// Özel hook — kullanımı kolaylaştırır
export const useTheme = () => useContext(ThemeContext);

// 2. Provider — App.tsx
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}`
          }
        ]
      },
      {
        title: 'Context Kullanımı',
        content: `Provider ile sarılan herhangi bir bileşen useContext ile context'e erişebilir:`,
        codeExamples: [
          {
            language: 'typescript',
            code: `// 3. Herhangi bir bileşende kullanım
import { useTheme } from './ThemeContext';

function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header style={{
      backgroundColor: theme === 'dark' ? '#1a1a2e' : '#ffffff',
      color: theme === 'dark' ? '#ffffff' : '#000000',
      padding: '16px',
    }}>
      <h1>ReacType</h1>
      <button onClick={toggleTheme}>
        {theme === 'dark' ? '☀️ Açık Mod' : '🌙 Koyu Mod'}
      </button>
    </header>
  );
}

// App.tsx — Provider ile sar
function App() {
  return (
    <ThemeProvider>   {/* Tüm alt bileşenler temaya erişebilir */}
      <Header />
      <AnaSayfa />
      <Footer />
    </ThemeProvider>
  );
}

// Ne zaman Context kullanmamalısın?
// - Sadece 2-3 seviye geçiyorsa → Props yeterli
// - Sık değişen veriler → performans sorununa yol açabilir
// - Büyük uygulamalar → Redux/Zustand tercih et`
          }
        ]
      }
    ],
    keyPoints: [
      'Context prop drilling sorununu çözer',
      'createContext → Provider → useContext zinciri',
      'Özel hook oluşturmak context kullanımını kolaylaştırır',
      'Tema, dil, auth gibi uygulama geneli veriler için idealdir',
      'Sık değişen veriler için Context performans sorununa yol açabilir'
    ],
    practiceProblems: [
      'Dark/Light tema geçişi yapan bir Context sistemi oluştur',
      'Dil seçimi (TR/EN) yapan bir LanguageContext oluştur',
      'Kullanıcı giriş durumunu tüm uygulamaya yayan bir AuthContext yaz'
    ]
  },

  'usereducer': {
    slug: 'usereducer',
    title: 'useReducer Hook',
    videos: [
      { videoId: 'kK_Wqx3RnHk', title: 'useReducer Hook Tutorial', channelName: 'Web Dev Simplified' },
      { videoId: 'aM1bxz-82Qo', title: 'React useReducer Explained', channelName: 'Traversy Media' },
      { videoId: 'i2_zltNQADA', title: 'React ile Proje Geliştirmek - useReducer()', channelName: 'PROTOTURK' },
    ],
    externalCourses: [BTK_REACT, BTK_REACT2],
    sections: [
      {
        title: 'useReducer Nedir?',
        content: `\`useReducer\`, \`useState\`'e alternatif olarak daha karmaşık state mantığını yönetmek için kullanılır. Redux'taki gibi action'lar ve reducer'lar kullanarak state yönetimi sağlar.

**Ne zaman useReducer kullanmalı?**
- Birden fazla ilişkili state değişkeni varsa
- State güncellemeleri karmaşık logic içeriyorsa
- Sonraki state önceki state'e bağlıysa
- Redux'a geçmeden önce basit bir alternatif arıyorsan

**Çalışma Prensibi:**
\`dispatch(action)\` → \`reducer(state, action)\` → \`yeniState\``,
        codeExamples: [
          {
            language: 'typescript',
            code: `import { useReducer } from 'react';

// State ve Action tipleri
interface CounterState {
  count: number;
}

type CounterAction =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' }
  | { type: 'SET'; payload: number };

// Reducer fonksiyonu — pure function olmalı!
const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    case 'SET':
      return { count: action.payload };
    default:
      return state;
  }
};

// Bileşen kullanımı
function SayacReducer() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <h2>Sayaç: {state.count}</h2>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Sıfırla</button>
      <button onClick={() => dispatch({ type: 'SET', payload: 100 })}>100 Yap</button>
    </div>
  );
}`
          }
        ]
      },
      {
        title: 'Gerçek Dünya: Alışveriş Sepeti',
        content: `useReducer'ın gücünü bir alışveriş sepeti örneğiyle görelim:`,
        codeExamples: [
          {
            language: 'typescript',
            code: `interface Urun {
  id: number;
  isim: string;
  fiyat: number;
  adet: number;
}

interface SepetState {
  urunler: Urun[];
  toplam: number;
}

type SepetAction =
  | { type: 'URUN_EKLE'; payload: Omit<Urun, 'adet'> }
  | { type: 'URUN_CIKAR'; payload: number }    // id
  | { type: 'SEPETI_TEMIZLE' };

const toplamHesapla = (urunler: Urun[]) =>
  urunler.reduce((sum, u) => sum + u.fiyat * u.adet, 0);

const sepetReducer = (state: SepetState, action: SepetAction): SepetState => {
  switch (action.type) {
    case 'URUN_EKLE': {
      const mevcutUrun = state.urunler.find(u => u.id === action.payload.id);
      const yeniUrunler = mevcutUrun
        ? state.urunler.map(u => u.id === action.payload.id
            ? { ...u, adet: u.adet + 1 } : u)
        : [...state.urunler, { ...action.payload, adet: 1 }];
      return { urunler: yeniUrunler, toplam: toplamHesapla(yeniUrunler) };
    }
    case 'URUN_CIKAR': {
      const yeniUrunler = state.urunler.filter(u => u.id !== action.payload);
      return { urunler: yeniUrunler, toplam: toplamHesapla(yeniUrunler) };
    }
    case 'SEPETI_TEMIZLE':
      return { urunler: [], toplam: 0 };
    default:
      return state;
  }
};`
          }
        ]
      }
    ],
    keyPoints: [
      'dispatch(action) → reducer → yeni state akışı',
      'Reducer saf (pure) fonksiyon olmalı: aynı girdi = aynı çıktı',
      'useState\'ten daha karmaşık state için useReducer tercih et',
      'Action type\'ları string literal union ile tanımla',
      'Context ile birlikte kullanarak mini Redux oluşturabilirsin'
    ],
    practiceProblems: [
      'INCREMENT/DECREMENT/RESET/SET aksiyonlu bir sayaç oluştur',
      'Ürün ekle/çıkar/sepeti temizle özellikli alışveriş sepeti yaz',
      'Form alanlarını tek bir reducer ile yöneten bir kayıt formu yaz'
    ]
  },

  'usememo-usecallback': {
    slug: 'usememo-usecallback',
    title: 'useMemo ve useCallback',
    videos: [
      { videoId: '_AyFbSvi_UA', title: 'useMemo & useCallback Tutorial', channelName: 'Web Dev Simplified' },
      { videoId: 'THL1OPn72vo', title: 'React Performance Optimization', channelName: 'Traversy Media' },
      { videoId: 'oyf0GxdZBbM', title: 'React ile Proje Geliştirmek - Memoization (useMemo, useCallback, React.memo)', channelName: 'PROTOTURK' },
    ],
    externalCourses: [BTK_REACT, BTK_REACT2],
    sections: [
      {
        title: 'Performans Optimizasyonu Neden Gerekli?',
        content: `React bileşeni her state/props değişiminde re-render olur. Eğer:
- Ağır hesaplamalar yapılıyorsa
- Child bileşenlere fonksiyon/nesne geçiliyorsa

Her render'da bu işlemler tekrar yapılır. \`useMemo\` ve \`useCallback\` bunu önler.

**Temel Fark:**
- \`useMemo\` → bir **DEĞERi** memoize eder
- \`useCallback\` → bir **FONKSİYONU** memoize eder`,
        codeExamples: [
          {
            language: 'typescript',
            code: `import { useState, useMemo, useCallback, memo } from 'react';

// ─── useMemo Örneği ───
function KullaniciBileseni({ kullanicilar }: { kullanicilar: Kullanici[] }) {
  const [filtre, setFiltre] = useState('');

  // ❌ Filtreleme her render'da çalışır
  // const filtrelenmis = kullanicilar.filter(k => k.isim.includes(filtre));

  // ✅ Sadece kullanicilar veya filtre değişince çalışır
  const filtrelenmis = useMemo(() => {
    console.log("Filtreleniyor...");
    return kullanicilar.filter(k =>
      k.isim.toLowerCase().includes(filtre.toLowerCase())
    );
  }, [kullanicilar, filtre]);

  return (
    <div>
      <input value={filtre} onChange={e => setFiltre(e.target.value)} />
      <p>Sonuç: {filtrelenmis.length} kullanıcı</p>
    </div>
  );
}`
          }
        ]
      },
      {
        title: 'useCallback ile Fonksiyon Memoization',
        content: `useCallback, fonksiyon referansını sabit tutar. React.memo ile sarılmış child bileşenlere geçilen fonksiyonlar için kritik öneme sahiptir.`,
        codeExamples: [
          {
            language: 'typescript',
            code: `import { useState, useCallback, memo } from 'react';

// Child bileşen — React.memo ile gereksiz render önlenir
const ChildBileseni = memo(({ onClick, isim }: {
  onClick: () => void;
  isim: string;
}) => {
  console.log(\`\${isim} render edildi\`);
  return <button onClick={onClick}>{isim}</button>;
});

// Parent bileşen
function ParentBileseni() {
  const [count, setCount] = useState(0);
  const [tema, setTema] = useState('light');

  // ❌ useCallback olmadan — her render'da yeni fonksiyon referansı
  // Her sayaç değişiminde child de render olur!
  // const tikla = () => setCount(c => c + 1);

  // ✅ useCallback ile — bağımlılık değişmeden aynı referans
  const tikla = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);  // Hiç değişmez

  const temaDegistir = useCallback(() => {
    setTema(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  return (
    <div>
      <p>Sayaç: {count} | Tema: {tema}</p>
      <ChildBileseni onClick={tikla} isim="Sayaç Butonu" />
      <ChildBileseni onClick={temaDegistir} isim="Tema Butonu" />
    </div>
  );
}`
          }
        ]
      }
    ],
    keyPoints: [
      'useMemo değer hesaplamalarını cache\'ler',
      'useCallback fonksiyon referanslarını cache\'ler',
      'Her yerde kullanma — gerçekten ağır hesaplamalar veya memo ile kullanılan fonksiyonlar için',
      'Bağımlılık dizisi doğru tanımlanmalı, aksi halde eski değerler kullanılır',
      'React.memo ile child bileşeni sarmak useCallback etkisini tamamlar'
    ],
    practiceProblems: [
      'useMemo ile büyük bir listeyi filtreleyen bir arama bileşeni yaz',
      'useCallback + React.memo ile gereksiz render\'ları önleyen bir liste yaz',
      'useMemo ile ürün listesinin toplam fiyatını hesaplayan bileşen oluştur'
    ]
  },

  // ══════════════════ LEVEL 4 ══════════════════

  'uselayouteffect': {
    slug: 'uselayouteffect',
    title: 'useLayoutEffect',
    videos: [
      { videoId: 'wU57kvYOxT4', title: 'useLayoutEffect vs useEffect', channelName: 'Web Dev Simplified' },
    ],
    externalCourses: [BTK_REACT, BTK_REACT2],
    sections: [
      {
        title: 'useLayoutEffect vs useEffect',
        content: `\`useLayoutEffect\`, \`useEffect\` ile aynı API'ye sahiptir. Tek farkı **çalışma zamanı**:

| | useEffect | useLayoutEffect |
|--|-----------|-----------------|
| Çalışma zamanı | Boyama (paint) sonrası (async) | Boyama öncesi (sync) |
| DOM manipülasyonu | Titreme olabilir | Titreme olmaz |
| Kullanım | API çağrısı, subscription | DOM ölçümü, animasyon |
| Performans riski | Düşük | Yüksek (dikkatli kullan) |

**Çoğu durumda useEffect yeterlidir.** useLayoutEffect sadece DOM'u ölçmeniz veya boyama öncesi DOM'u güncellemeniz gerektiğinde tercih edilir.`,
        codeExamples: [
          {
            language: 'typescript',
            code: `import { useState, useEffect, useLayoutEffect, useRef } from 'react';

// Tooltip konumlandırma örneği
// useEffect ile flicker (titreme) olabilir
// useLayoutEffect ile olmaz
function Tooltip({ mesaj }: { mesaj: string }) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [konum, setKonum] = useState({ x: 0, y: 0 });

  // ✅ useLayoutEffect — DOM boyutunu boyama öncesi ölç
  useLayoutEffect(() => {
    if (tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect();
      // Boyama öncesi konumu ayarla — titreme olmaz
      setKonum({
        x: window.innerWidth / 2 - rect.width / 2,
        y: 100,
      });
    }
  }, []);

  return (
    <div
      ref={tooltipRef}
      style={{
        position: 'fixed',
        left: konum.x,
        top: konum.y,
        backgroundColor: '#333',
        color: '#fff',
        padding: '8px 12px',
        borderRadius: '4px',
      }}
    >
      {mesaj}
    </div>
  );
}

// Kural: DOM boyutu/konumuyla ilgili değilse useEffect kullan!`
          }
        ]
      }
    ],
    keyPoints: [
      'useLayoutEffect boyama (paint) öncesi senkron çalışır',
      'DOM ölçümü gereken durumlarda useEffect\'te titreme olabilir',
      'Çoğu durumda useEffect yeterlidir',
      'useLayoutEffect server-side rendering ile sorun çıkarabilir',
      'Tooltip, popover gibi konumlandırma işlemleri için idealdir'
    ],
    practiceProblems: [
      'useEffect ve useLayoutEffect farkını gösteren bir demo bileşeni yaz',
      'Tıklanan elementin boyutunu useLayoutEffect ile ölçen bir bileşen oluştur'
    ]
  },

  'useimperativehandle': {
    slug: 'useimperativehandle',
    title: 'useImperativeHandle',
    videos: [
      { videoId: 'zpEyAGdFkko', title: 'useImperativeHandle Tutorial', channelName: 'Web Dev Simplified' },
    ],
    externalCourses: [BTK_REACT, BTK_REACT2],
    sections: [
      {
        title: 'useImperativeHandle Nedir?',
        content: `\`useImperativeHandle\`, \`forwardRef\` ile birlikte kullanılır. Parent bileşenin child bileşenin iç fonksiyonlarına ref aracılığıyla kontrollü erişmesini sağlar.

**Ne zaman kullanılır?**
- Kütüphane bileşeni geliştirirken
- Modal, input, video gibi özel bileşenler için
- Child'ın belirli metodlarını parent'a açmak istediğinde

**Kural:** Mümkün olduğunca state ve props ile çöz. useImperativeHandle son çare olmalı.`,
        codeExamples: [
          {
            language: 'typescript',
            code: `import { forwardRef, useImperativeHandle, useRef } from 'react';

// Child'dan dışa açılacak metodların tipi
export type OzelInputRef = {
  focus: () => void;
  temizle: () => void;
  degerAl: () => string;
};

// forwardRef ile child bileşen
const OzelInput = forwardRef<OzelInputRef, { placeholder?: string }>(
  ({ placeholder }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    // Parent'a açılacak metodlar
    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      temizle: () => {
        if (inputRef.current) inputRef.current.value = '';
      },
      degerAl: () => inputRef.current?.value ?? '',
    }));

    return (
      <input
        ref={inputRef}
        placeholder={placeholder}
        style={{ padding: '8px', borderRadius: '4px' }}
      />
    );
  }
);

// Parent bileşen
function Parent() {
  const inputRef = useRef<OzelInputRef>(null);

  return (
    <div>
      <OzelInput ref={inputRef} placeholder="Bir şeyler yazın" />
      <button onClick={() => inputRef.current?.focus()}>Odaklan</button>
      <button onClick={() => inputRef.current?.temizle()}>Temizle</button>
      <button onClick={() => alert(inputRef.current?.degerAl())}>Değeri Al</button>
    </div>
  );
}`
          }
        ]
      }
    ],
    keyPoints: [
      'forwardRef + useImperativeHandle birlikte çalışır',
      'Child\'ın sadece belirli metodlarını dışa aç',
      'Kütüphane bileşeni geliştirirken faydalıdır',
      'Normal durumlarda props/state tercih et, bu son çare',
      'TypeScript ile ref tipini tanımlamak zorunludur'
    ],
    practiceProblems: [
      'focus() ve clear() metodlarına sahip özel bir TextArea bileşeni yaz',
      'Parent\'tan kontrol edilebilen bir Modal bileşeni oluştur'
    ]
  },

  'custom-hooks': {
    slug: 'custom-hooks',
    title: 'Custom Hooks Yazma',
    videos: [
      { videoId: '6ThXsUwLWvc', title: 'Custom React Hooks Tutorial', channelName: 'Web Dev Simplified' },
      { videoId: 'J-g9ZJha8FE', title: 'React Custom Hooks', channelName: 'Traversy Media' },
    ],
    externalCourses: [BTK_REACT, BTK_REACT2],
    sections: [
      {
        title: 'Custom Hook Nedir?',
        content: `Custom Hook, birden fazla bileşende tekrar eden state/effect mantığını tek bir yerde toplamak için kullanılan özel fonksiyonlardır.

**Kurallar:**
1. İsim mutlaka \`use\` ile başlamalı (useLocalStorage, useFetch, useDebounce)
2. İçinde başka hook'lar kullanabilir
3. Normal bir JavaScript fonksiyonu gibi değer döndürür`,
        codeExamples: [
          {
            language: 'typescript',
            code: `// hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

// Local Storage ile senkronize state
function useLocalStorage<T>(key: string, baslangic: T) {
  const [deger, setDeger] = useState<T>(() => {
    try {
      const kayitli = localStorage.getItem(key);
      return kayitli ? JSON.parse(kayitli) : baslangic;
    } catch {
      return baslangic;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(deger));
  }, [key, deger]);

  return [deger, setDeger] as const;
}

// Kullanım — tıpkı useState gibi
function Ayarlar() {
  const [tema, setTema] = useLocalStorage<string>('tema', 'light');
  const [dil, setDil] = useLocalStorage<string>('dil', 'tr');

  return (
    <div>
      <select value={tema} onChange={e => setTema(e.target.value)}>
        <option value="light">Açık</option>
        <option value="dark">Koyu</option>
      </select>
      <p>Tema: {tema} (Sayfa yenilenince korunur!)</p>
    </div>
  );
}`
          }
        ]
      },
      {
        title: 'useFetch ve useDebounce',
        content: `Yaygın olarak kullanılan iki custom hook örneği:`,
        codeExamples: [
          {
            language: 'typescript',
            code: `// hooks/useFetch.ts — Veri çekme hook'u
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const veriCek = async () => {
      try {
        setLoading(true);
        const res = await fetch(url, { signal: controller.signal });
        const json = await res.json();
        setData(json);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    veriCek();
    return () => controller.abort();  // cleanup
  }, [url]);

  return { data, loading, error };
}

// hooks/useDebounce.ts — Gecikme hook'u
function useDebounce<T>(deger: T, gecikme: number): T {
  const [debouncedDeger, setDebouncedDeger] = useState(deger);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedDeger(deger);
    }, gecikme);

    return () => clearTimeout(timer);  // Önceki timer'ı iptal et
  }, [deger, gecikme]);

  return debouncedDeger;
}

// Kullanım
function Arama() {
  const [sorgu, setSorgu] = useState('');
  const debouncedSorgu = useDebounce(sorgu, 500);  // 500ms bekle

  const { data, loading } = useFetch(
    \`https://api.github.com/search/users?q=\${debouncedSorgu}\`
  );

  return (
    <input value={sorgu} onChange={e => setSorgu(e.target.value)} />
  );
}`
          }
        ]
      }
    ],
    keyPoints: [
      'Custom hook ismi mutlaka use ile başlamalı',
      'Birden fazla bileşende tekrar eden mantığı custom hook\'a taşı',
      'İçinde herhangi bir React hook kullanılabilir',
      'useFetch, useLocalStorage, useDebounce yaygın custom hook\'lardır',
      'Normal fonksiyon gibi değer/fonksiyon döndür'
    ],
    practiceProblems: [
      'useWindowSize() custom hook\'u yaz (window genişlik/yüksekliğini döndür)',
      'useDebounce() custom hook\'u yazıp arama bileşeninde kullan',
      'useLocalStorage() custom hook\'u yazıp bir form durumunu kaydet'
    ]
  },

  // ══════════════════ LEVEL 5 ══════════════════

  'react-router': {
    slug: 'react-router',
    title: 'React Router DOM',
    videos: [
      { videoId: 'Ul3y1LXxzdU', title: 'React Router Tutorial', channelName: 'Web Dev Simplified' },
      { videoId: 'Law7wfdg2NM', title: 'React Router v6 Crash Course', channelName: 'Traversy Media' },
      { videoId: 'QnH1q-saSeo', title: 'React ile Proje Geliştirmek - React Router v6 (Bölüm 1)', channelName: 'PROTOTURK' },
      { videoId: 'Hua8Rq6oGoM', title: 'React ile Proje Geliştirmek - React Router v6 (Bölüm 2)', channelName: 'PROTOTURK' },
    ],
    externalCourses: [BTK_REACT, BTK_REACT2],
    sections: [
      {
        title: 'React Router Nedir?',
        content: `React Router, React uygulamalarında sayfa yönlendirmesi (routing) için kullanılan standart kütüphanedir.

**Kurulum:**
\`npm install react-router-dom\`

**Temel Bileşenler:**
- \`BrowserRouter\` — HTML5 history API kullanan router
- \`Routes\` — Route grubu container
- \`Route\` — Yol-bileşen eşleşmesi
- \`Link\` — Sayfa yenilenmeden geçiş
- \`useNavigate\` — Programatik yönlendirme
- \`useParams\` — URL parametrelerini okuma`,
        codeExamples: [
          {
            language: 'typescript',
            code: `// App.tsx
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';

// Sayfalar
function AnaSayfa() {
  return <h1>Ana Sayfa</h1>;
}

function Hakkimda() {
  return <h1>Hakkımda</h1>;
}

function UrunDetay() {
  const { id } = useParams<{ id: string }>();  // URL parametresi
  return <h1>Ürün #{id}</h1>;
}

function BulunamadI() {
  return <h1>404 - Sayfa Bulunamadı</h1>;
}

// Navigasyon bileşeni
function Nav() {
  const navigate = useNavigate();  // Programatik yönlendirme

  return (
    <nav>
      <Link to="/">Ana Sayfa</Link>
      <Link to="/hakkimda">Hakkımda</Link>
      <button onClick={() => navigate('/hakkimda')}>Programatik Git</button>
    </nav>
  );
}

// Ana App
function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<AnaSayfa />} />
        <Route path="/hakkimda" element={<Hakkimda />} />
        <Route path="/urun/:id" element={<UrunDetay />} />  {/* Dinamik */}
        <Route path="*" element={<BulunamadI />} />        {/* 404 */}
      </Routes>
    </BrowserRouter>
  );
}`
          }
        ]
      },
      {
        title: 'Nested Routes ve Layout',
        content: `İç içe route'lar (nested routes) ile ortak layout paylaşan sayfalar oluşturulabilir:`,
        codeExamples: [
          {
            language: 'typescript',
            code: `import { Outlet, NavLink } from 'react-router-dom';

// Layout bileşeni — Outlet ile alt route'lar render edilir
function PanelLayout() {
  return (
    <div style={{ display: 'flex' }}>
      <aside>
        {/* NavLink — aktif durumda class ekler */}
        <NavLink to="/panel" end
          style={({ isActive }) => ({ color: isActive ? 'blue' : 'black' })}
        >
          Özet
        </NavLink>
        <NavLink to="/panel/kullanicilar">
          Kullanıcılar
        </NavLink>
        <NavLink to="/panel/ayarlar">
          Ayarlar
        </NavLink>
      </aside>

      <main>
        <Outlet />  {/* Alt route içeriği burada render edilir */}
      </main>
    </div>
  );
}

// Nested route yapısı
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AnaSayfa />} />

        {/* Panel ve alt route'lar */}
        <Route path="/panel" element={<PanelLayout />}>
          <Route index element={<PanelOzet />} />          {/* /panel */}
          <Route path="kullanicilar" element={<Kullanicilar />} /> {/* /panel/kullanicilar */}
          <Route path="ayarlar" element={<Ayarlar />} />   {/* /panel/ayarlar */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}`
          }
        ]
      }
    ],
    keyPoints: [
      'BrowserRouter → Routes → Route hiyerarşisi',
      'Link sayfayı yenilemeden geçiş sağlar (anchor tag değil)',
      'useNavigate ile programatik yönlendirme',
      'useParams ile /urun/:id gibi dinamik parametreler',
      'Outlet ile nested routes ve paylaşımlı layout'
    ],
    practiceProblems: [
      'Ana sayfa, hakkımda ve iletişim sayfaları olan basit bir site yap',
      '/urun/:id rotasında ürün detayı gösteren bir sayfa oluştur',
      'Ortak sidebar içeren dashboard layout\'u nested routes ile yaz'
    ]
  },

  'react-hook-form': {
    slug: 'react-hook-form',
    title: 'React Hook Form ve Yup',
    videos: [
      { videoId: 'bU_eq8qyjic', title: 'React Hook Form Tutorial', channelName: 'Traversy Media' },
      { videoId: 'CC8bGP5bIYY', title: 'React Hook Form with Yup Validation', channelName: 'Web Dev Simplified' },
      { videoId: 'vfUe36rXaTg', title: 'React ile Proje Geliştirmek - Form Elemanlarıyla Çalışmak', channelName: 'PROTOTURK' },
    ],
    externalCourses: [BTK_REACT, BTK_REACT2],
    sections: [
      {
        title: 'React Hook Form Nedir?',
        content: `React Hook Form, performanslı ve esnek form kütüphanesidir. \`useState\` yerine uncontrolled component'leri kullanarak gereksiz re-render'ları önler.

**Kurulum:**
\`npm install react-hook-form\`
\`npm install @hookform/resolvers yup\`

**Temel API:**
- \`useForm()\` — form instance oluşturma
- \`register\` — input'u form'a kaydetme
- \`handleSubmit\` — form gönderim işlemi
- \`formState.errors\` — hata mesajları
- \`watch\` — anlık değer takibi`,
        codeExamples: [
          {
            language: 'typescript',
            code: `import { useForm } from 'react-hook-form';

// Form verilerinin tipi
interface GirisForm {
  email: string;
  sifre: string;
}

function GirisFormu() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GirisForm>();

  const onSubmit = async (data: GirisForm) => {
    console.log("Form verisi:", data);
    // await api.girisYap(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <div>
        <input
          {...register('email', {
            required: 'Email zorunludur',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Geçerli bir email girin'
            }
          })}
          placeholder="Email"
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
      </div>

      <div>
        <input
          type="password"
          {...register('sifre', {
            required: 'Şifre zorunludur',
            minLength: { value: 6, message: 'En az 6 karakter' }
          })}
          placeholder="Şifre"
        />
        {errors.sifre && <p style={{ color: 'red' }}>{errors.sifre.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Giriş yapılıyor...' : 'Giriş Yap'}
      </button>

    </form>
  );
}`
          }
        ]
      },
      {
        title: 'Yup ile Schema Validasyon',
        content: `Yup, form verilerini schema tabanlı doğrulamak için kullanılan bir kütüphanedir. React Hook Form ile entegre çalışır.`,
        codeExamples: [
          {
            language: 'typescript',
            code: `import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Yup schema — validasyon kuralları
const schema = yup.object({
  kullaniciAdi: yup.string()
    .required('Kullanıcı adı zorunludur')
    .min(3, 'En az 3 karakter')
    .max(20, 'En fazla 20 karakter'),
  email: yup.string()
    .required('Email zorunludur')
    .email('Geçerli bir email girin'),
  sifre: yup.string()
    .required('Şifre zorunludur')
    .min(8, 'En az 8 karakter')
    .matches(/[A-Z]/, 'En az bir büyük harf içermeli'),
  sifreTekrar: yup.string()
    .required('Şifreyi tekrar girin')
    .oneOf([yup.ref('sifre')], 'Şifreler eşleşmiyor'),
});

type KayitForm = yup.InferType<typeof schema>;

function KayitFormu() {
  const { register, handleSubmit, formState: { errors } } = useForm<KayitForm>({
    resolver: yupResolver(schema),  // Yup schema bağla
  });

  const onSubmit = (data: KayitForm) => {
    console.log("Kayıt verisi:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('kullaniciAdi')} placeholder="Kullanıcı Adı" />
      {errors.kullaniciAdi && <p>{errors.kullaniciAdi.message}</p>}

      <input {...register('email')} placeholder="Email" />
      {errors.email && <p>{errors.email.message}</p>}

      <input type="password" {...register('sifre')} placeholder="Şifre" />
      {errors.sifre && <p>{errors.sifre.message}</p>}

      <input type="password" {...register('sifreTekrar')} placeholder="Tekrar" />
      {errors.sifreTekrar && <p>{errors.sifreTekrar.message}</p>}

      <button type="submit">Kayıt Ol</button>
    </form>
  );
}`
          }
        ]
      }
    ],
    keyPoints: [
      'React Hook Form uncontrolled input kullanarak performans sağlar',
      'register() ile input\'ları form\'a bağla',
      'handleSubmit geçerli veride onSubmit\'i çağırır',
      'Yup schema ile güçlü ve okunabilir validasyon kuralları',
      'yupResolver ile React Hook Form ve Yup entegrasyonu'
    ],
    practiceProblems: [
      'Email ve şifre doğrulama olan bir giriş formu oluştur',
      'Yup ile şifre güçlülük kontrolü olan kayıt formu yaz',
      'Çoklu adımlı (multi-step) kayıt formu oluştur'
    ]
  },

  'yup-validasyon': {
    slug: 'yup-validasyon',
    title: 'Dinamik Formlar',
    videos: [
      { videoId: 'dPNFX7rCYeM', title: 'React Dynamic Forms Tutorial', channelName: 'Web Dev Simplified' },
    ],
    externalCourses: [BTK_REACT, BTK_REACT2],
    sections: [
      {
        title: 'useFieldArray ile Dinamik Alanlar',
        content: `Dinamik form alanları — kullanıcı sayısı belirsiz veri girişleri için:

\`useFieldArray\` — React Hook Form'da dizi alanlarını yönetir`,
        codeExamples: [
          {
            language: 'typescript',
            code: `import { useForm, useFieldArray } from 'react-hook-form';

interface SiparisForm {
  urunler: Array<{
    isim: string;
    adet: number;
    fiyat: number;
  }>;
}

function DinamikSiparis() {
  const { register, control, handleSubmit, watch } = useForm<SiparisForm>({
    defaultValues: { urunler: [{ isim: '', adet: 1, fiyat: 0 }] }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'urunler',
  });

  const urunler = watch('urunler');
  const toplam = urunler.reduce((sum, u) => sum + (u.adet * u.fiyat), 0);

  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
      {fields.map((field, index) => (
        <div key={field.id} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          <input
            {...register(\`urunler.\${index}.isim\`)}
            placeholder="Ürün adı"
          />
          <input
            type="number"
            {...register(\`urunler.\${index}.adet\`, { valueAsNumber: true })}
            placeholder="Adet"
          />
          <input
            type="number"
            {...register(\`urunler.\${index}.fiyat\`, { valueAsNumber: true })}
            placeholder="Fiyat"
          />
          <button type="button" onClick={() => remove(index)}>Sil</button>
        </div>
      ))}

      <button type="button" onClick={() => append({ isim: '', adet: 1, fiyat: 0 })}>
        + Ürün Ekle
      </button>
      <p>Toplam: {toplam} TL</p>
      <button type="submit">Sipariş Ver</button>
    </form>
  );
}`
          }
        ]
      }
    ],
    keyPoints: [
      'useFieldArray dinamik dizi alanlarını yönetir',
      'append(), remove(), insert() ile dizi yönetimi',
      'watch() ile anlık değerleri takip et ve hesapla',
      'Dinamik formlar çevrimiçi sipariş, anket, fatura için kullanışlı',
      'Her field\'ın benzersiz key\'i için field.id kullan'
    ],
    practiceProblems: [
      'Dinamik eğitim deneyimi eklenebilen bir CV formu yaz',
      'Alışveriş listesi oluşturan ve toplam fiyatı gösteren dinamik form yaz',
      'Anket soruları eklenip çıkarılabilen bir anket oluşturucu yap'
    ]
  },

  // ══════════════════ LEVEL 6 ══════════════════

  'axios-veri-cekme': {
    slug: 'axios-veri-cekme',
    title: 'Axios ile HTTP İstekleri',
    videos: [
      { videoId: '6LyagkoRWYA', title: 'Axios Crash Course', channelName: 'Traversy Media' },
      { videoId: 'qM4iefuVPJU', title: 'React Axios Tutorial', channelName: 'Web Dev Simplified' },
      { videoId: 'XsCHPcOiEfQ', title: 'React ile Proje Geliştirmek - Fetch API ve Servisler', channelName: 'PROTOTURK' },
      { videoId: 'D4BlrTj4wU0', title: 'API Nedir? | Axios | Fetch | REACT Dersleri', channelName: 'Enes Bayram' },
    ],
    externalCourses: [BTK_REACT, BTK_REACT2],
    sections: [
      {
        title: 'Axios Nedir?',
        content: `Axios, tarayıcı ve Node.js için kullanılan Promise tabanlı HTTP istemcisidir. Native \`fetch\`'e göre avantajları:

- **Otomatik JSON dönüşümü**: response.data ile direkt erişim
- **İstek/yanıt interceptor'ları**: global hata yönetimi
- **Timeout desteği**
- **İstek iptali** (AbortController)
- **TypeScript** ile mükemmel entegrasyon

**Kurulum:** \`npm install axios\``,
        codeExamples: [
          {
            language: 'typescript',
            code: `import axios from 'axios';

// Temel GET isteği
const kullanicilariGetir = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data;  // Otomatik JSON parse
};

// TypeScript ile tip güvenli istek
interface Kullanici {
  id: number;
  name: string;
  email: string;
}

const kullaniciGetir = async (id: number): Promise<Kullanici> => {
  const { data } = await axios.get<Kullanici>(
    \`https://jsonplaceholder.typicode.com/users/\${id}\`
  );
  return data;
};

// POST isteği
const kullaniciOlustur = async (yeniKullanici: Omit<Kullanici, 'id'>) => {
  const { data } = await axios.post<Kullanici>(
    'https://jsonplaceholder.typicode.com/users',
    yeniKullanici
  );
  return data;
};

// Axios Instance — API'ler için temel yapılandırma
const api = axios.create({
  baseURL: 'https://api.orneksite.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': \`Bearer \${localStorage.getItem('token')}\`
  }
});`
          }
        ]
      },
      {
        title: 'Interceptor ve Hata Yönetimi',
        content: `Interceptor'lar her istek/yanıt öncesinde/sonrasında global işlem yapmanı sağlar:`,
        codeExamples: [
          {
            language: 'typescript',
            code: `import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

// İstek interceptor — her isteğe token ekle
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Yanıt interceptor — global hata yönetimi
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token süresi dolmuş → giriş sayfasına yönlendir
      localStorage.removeItem('token');
      window.location.href = '/giris';
    }
    return Promise.reject(error);
  }
);

// React bileşeninde kullanım
function KullaniciListesi() {
  const [kullanicilar, setKullanicilar] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);

  useEffect(() => {
    const getir = async () => {
      try {
        const { data } = await api.get('/kullanicilar');
        setKullanicilar(data);
      } catch (hata) {
        console.error(hata);
      } finally {
        setYukleniyor(false);
      }
    };
    getir();
  }, []);

  return yukleniyor ? <div>Yükleniyor...</div> : (
    <ul>{kullanicilar.map((k: any) => <li key={k.id}>{k.isim}</li>)}</ul>
  );
}`
          }
        ]
      }
    ],
    keyPoints: [
      'axios.get/post/put/delete HTTP metodları',
      'response.data ile otomatik JSON erişimi',
      'axios.create() ile temel URL ve header yapılandırması',
      'Interceptor\'lar global auth ve hata yönetimi için ideal',
      'TypeScript ile axios.get<Tip>() generic kullanımı'
    ],
    practiceProblems: [
      'JSONPlaceholder\'dan post listesi çeken ve listelyen bileşen yaz',
      'CRUD işlemleri yapan (oluştur, güncelle, sil) bir Todo uygulaması yaz',
      '401 hatasında otomatik yönlendiren interceptor\'lı bir axios instance oluştur'
    ]
  },

  'react-query': {
    slug: 'react-query',
    title: 'React Query (TanStack Query)',
    videos: [
      { videoId: 'r8Dg0KVnfMA', title: 'React Query Tutorial', channelName: 'Web Dev Simplified' },
      { videoId: 'novnyCaa7To', title: 'TanStack Query Crash Course', channelName: 'Traversy Media' },
    ],
    externalCourses: [BTK_REACT, BTK_REACT2],
    sections: [
      {
        title: 'React Query Nedir?',
        content: `React Query (TanStack Query), server state yönetimi için kullanılan bir kütüphanedir. \`useEffect\` + \`useState\` kombinasyonunun yerini alır.

**Kurulum:**
\`npm install @tanstack/react-query\`

**Sağladıkları:**
- **Otomatik caching**: Aynı sorgu tekrar çalışmaz
- **Background refetch**: Sekme odaklanınca veri güncellenir
- **Loading/error state**: Otomatik yönetilir
- **Optimistic updates**: UI anında güncellenir
- **Pagination ve infinite scroll**: Hazır destek`,
        codeExamples: [
          {
            language: 'typescript',
            code: `// main.tsx — Provider kurulumu
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,  // 5 dakika taze
      retry: 2,                    // Hata durumunda 2 kez tekrar
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AnaSayfa />
    </QueryClientProvider>
  );
}

// Bileşende useQuery kullanımı
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Kullanici {
  id: number;
  name: string;
  email: string;
}

function KullaniciListesi() {
  const { data, isLoading, isError, error } = useQuery<Kullanici[]>({
    queryKey: ['kullanicilar'],  // Cache anahtarı
    queryFn: async () => {
      const { data } = await axios.get('/api/kullanicilar');
      return data;
    },
    staleTime: 30000,  // 30 saniye taze
  });

  if (isLoading) return <div>Yükleniyor...</div>;
  if (isError) return <div>Hata: {(error as Error).message}</div>;

  return (
    <ul>
      {data?.map(k => (
        <li key={k.id}>{k.name} — {k.email}</li>
      ))}
    </ul>
  );
}`
          }
        ]
      },
      {
        title: 'useMutation ile Veri Yazma',
        content: `\`useMutation\`, POST/PUT/DELETE işlemleri için kullanılır:`,
        codeExamples: [
          {
            language: 'typescript',
            code: `import { useMutation, useQueryClient } from '@tanstack/react-query';

function YeniKullanici() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (yeniKullanici: { isim: string; email: string }) => {
      const { data } = await axios.post('/api/kullanicilar', yeniKullanici);
      return data;
    },
    onSuccess: () => {
      // Başarı: kullanici listesini yenile
      queryClient.invalidateQueries({ queryKey: ['kullanicilar'] });
      toast.success('Kullanıcı oluşturuldu!');
    },
    onError: (hata) => {
      toast.error('Hata oluştu!');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ isim: "Ahmet", email: "ahmet@mail.com" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" disabled={isPending}>
        {isPending ? 'Oluşturuluyor...' : 'Kullanıcı Oluştur'}
      </button>
    </form>
  );
}`
          }
        ]
      }
    ],
    keyPoints: [
      'useQuery ile GET istekleri — caching ve loading state otomatik',
      'queryKey cache anahtarını belirler, dizi formatında kullanılır',
      'useMutation POST/PUT/DELETE işlemleri için',
      'invalidateQueries ile ilgili query\'leri yenile',
      'staleTime ne kadar süre cache\'in taze sayılacağını belirler'
    ],
    practiceProblems: [
      'Kullanıcı listesi çeken ve önbelleğe alan bir useQuery bileşeni yaz',
      'Yeni kullanıcı ekleyip listeyi güncelleyen bir useMutation kullan',
      'Pagination destekli bir gönderi listesi bileşeni oluştur'
    ]
  },

  'redux': {
    slug: 'redux',
    title: 'Redux ile Global State',
    videos: [
      { videoId: 'iBUJVy8phqw', title: 'Redux Toolkit Tutorial', channelName: 'Traversy Media' },
      { videoId: 'NqzdVN2tyvQ', title: 'React Redux Full Course', channelName: 'Web Dev Simplified' },
    ],
    externalCourses: [BTK_REACT, BTK_REACT2],
    sections: [
      {
        title: 'Redux Nedir?',
        content: `Redux, büyük React uygulamaları için merkezi state yönetimi sağlar. Günümüzde **Redux Toolkit (RTK)** kullanımı standarttır.

**Redux Kavramları:**
- **Store**: Tüm uygulama state'i tek bir yerde
- **Action**: State değişikliği tetikleyen nesne \`{ type: 'INCREMENT' }\`
- **Reducer**: Action'a göre yeni state döndüren fonksiyon
- **Dispatch**: Action'ı store'a gönderme
- **Slice**: RTK'da reducer + action'ları birleştiren yapı

**Kurulum:** \`npm install @reduxjs/toolkit react-redux\``,
        codeExamples: [
          {
            language: 'typescript',
            code: `// store/sayacSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SayacState {
  deger: number;
}

const sayacSlice = createSlice({
  name: 'sayac',
  initialState: { deger: 0 } as SayacState,
  reducers: {
    artir: (state) => {
      state.deger += 1;  // RTK immer.js ile mutasyon izin verilir!
    },
    azalt: (state) => {
      state.deger -= 1;
    },
    sifirla: (state) => {
      state.deger = 0;
    },
    belirliDegereAyarla: (state, action: PayloadAction<number>) => {
      state.deger = action.payload;
    },
  },
});

export const { artir, azalt, sifirla, belirliDegereAyarla } = sayacSlice.actions;
export default sayacSlice.reducer;

// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import sayacReducer from './sayacSlice';

export const store = configureStore({
  reducer: {
    sayac: sayacReducer,
    // kullanici: kullaniciReducer,
    // sepet: sepetReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;`
          }
        ]
      },
      {
        title: 'Redux Bileşenlerde Kullanım',
        content: `\`useSelector\` state okuma, \`useDispatch\` action gönderme için:`,
        codeExamples: [
          {
            language: 'typescript',
            code: `// main.tsx — Provider kurulumu
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
);

// hooks/redux.ts — Tip güvenli hook'lar
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Bileşende kullanım
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { artir, azalt, sifirla } from '../store/sayacSlice';

function SayacBileseni() {
  const deger = useAppSelector(state => state.sayac.deger);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h2>Global Sayaç: {deger}</h2>
      <button onClick={() => dispatch(artir())}>+</button>
      <button onClick={() => dispatch(azalt())}>-</button>
      <button onClick={() => dispatch(sifirla())}>Sıfırla</button>
    </div>
  );
}

// Bu bileşen başka bir sayfada olsa bile aynı store'a erişir!
function FarkliSayfa() {
  const deger = useAppSelector(state => state.sayac.deger);
  return <p>Sayaç değeri (başka sayfada): {deger}</p>;
}`
          }
        ]
      }
    ],
    keyPoints: [
      'Redux Toolkit (RTK) modern Redux\'un standart yoludur',
      'createSlice reducer ve action\'ları bir arada tanımlar',
      'RTK immer.js ile state\'i "mutasyonlu" gibi yazılabilir',
      'useSelector state okuma, useDispatch action gönderme',
      'Büyük uygulamalarda useContext yerine Redux/Zustand tercih et'
    ],
    practiceProblems: [
      'Redux Toolkit ile counter slice oluştur ve bileşenden kullan',
      'Kullanıcı giriş durumunu Redux\'ta saklayan auth slice yaz',
      'Birden fazla ürün içeren alışveriş sepeti slice\'ı ve bileşenleri oluştur'
    ]
  },

};

/**
 * Ders içeriğini slug ile getir
 * @param slug - Konunun URL dostu adı
 * @returns LessonContent veya undefined
 */
export function getLessonBySlug(slug: string): LessonContent | undefined {
  return lessons[slug];
}

export default lessons;
