# 🚀 AlgoLearn - React Öğrenme Platformu

## 📋 Proje Hakkında

**AlgoLearn** (React Type), React dilini öğrenmek isteyen kişiler için kapsamlı bir web tabanlı öğrenme platformudur. Sistemin amacı sadece teorik bilgi vermek değil, aynı zamanda kullanıcıların birbirleriyle etkileşim kurmasını, rekabet etmesini, kodlama challenge'larında katılmasını ve işbirlikçi projeler geliştirmelerini sağlamaktır.

### 🎯 Temel Özellikler
- **Yapılandırılmış Kurs İçeriği**: React konseptlerinin video anlatım ve kod örnekleriyle öğretilmesi
- **Quiz Sistemi**: Konular sonrası anlayışı test etme
- **Kodlama Challenge'ları**: GitHub entegrasyonlu zorluk seviyeleri
- **Leaderboard**: Kullanıcılar arası rekabet sistemi
- **Mesajlaşma**: Kullanıcılar arası iletişim
- **Ödev Sistemi**: GitHub tabanlı çalışma gönderimi
- **İlerleme Takibi**: Kullanıcıların öğrenme yolculuklarının kaydedilmesi
- **Puan Sistemi**: Etkinliklere göre puan kazanma (Quiz, Challenge, Homework)
- **Bildirim Sistemi**: Önemli olaylar hakkında kullanıcı bildirimleri

---

## 🛠️ Teknik Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Dil**: TypeScript
- **Veritabanı**: SQLite + Prisma ORM
- **Kimlik Doğrulama**: JWT (JSON Web Tokens)
- **Şifreleme**: bcryptjs
- **E-posta**: Nodemailer
- **CORS**: Cross-Origin Resource Sharing

### Frontend
- **Kütüphane**: React 19
- **Dil**: TypeScript
- **Bundler**: Vite
- **Stil**: Tailwind CSS 4
- **Yönlendirme**: React Router 7
- **API İletişimi**: Axios + React Query
- **Durum Yönetimi**: Zustand
- **Bildirimler**: React Hot Toast
- **İkonlar**: Lucide React

---

## 📁 Proje Yapısı

```
GrafikFinal/
├── backend/
│   ├── src/
│   │   ├── index.ts                 # Express sunucusu ve rota bağlantıları
│   │   ├── middleware/
│   │   │   └── auth.ts              # JWT kimlik doğrulama middleware
│   │   ├── routes/                  # API endpoint'leri
│   │   │   ├── auth.ts              # Kayıt, giriş, token doğrulama
│   │   │   ├── topics.ts            # Konular ve ders içeriği
│   │   │   ├── progress.ts          # İlerleme takibi
│   │   │   ├── quiz.ts              # Quiz soruları ve sonuçları
│   │   │   ├── leaderboard.ts       # Sıralama tablosu
│   │   │   ├── challenges.ts        # Kodlama challenge'ları
│   │   │   ├── users.ts             # Kullanıcı profili ve bildirimler
│   │   │   ├── messages.ts          # Mesajlaşma sistemi
│   │   │   └── homework.ts          # Ödev yönetimi
│   │   ├── services/
│   │   │   └── emailService.ts      # SMTP ile e-posta gönderimi
│   │   ├── data/
│   │   │   ├── exercises.ts         # Egzersiz veri setleri
│   │   │   └── lessonContent.ts     # Ders içeriği
│   │   ├── utils/
│   │   │   └── github.ts            # GitHub API entegrasyonu
│   │   └── seed.ts                  # Veritabanı seeding
│   ├── prisma/
│   │   ├── schema.prisma            # Veritabanı şeması
│   │   └── migrations/              # Veritabanı migrasyon geçmişi
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── main.tsx                 # React uygulaması giriş noktası
│   │   ├── App.tsx                  # Ana rota ve layout yapısı
│   │   ├── api/
│   │   │   └── client.ts            # Axios API client yapılandırması
│   │   ├── components/
│   │   │   ├── Layout.tsx           # Ana sayfa şablonu
│   │   │   ├── Exercise.tsx         # Egzersiz bileşeni
│   │   │   └── Logo.tsx             # Logo bileşeni
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx        # Giriş sayfası
│   │   │   ├── RegisterPage.tsx     # Kayıt sayfası
│   │   │   ├── DashboardPage.tsx    # Anasayfa panosu
│   │   │   ├── LearningMapPage.tsx  # Kurs konuları listesi
│   │   │   ├── LessonPage.tsx       # Ders içeriği gösterimi
│   │   │   ├── QuizPage.tsx         # Quiz uygulama sayfası
│   │   │   ├── LeaderboardPage.tsx  # Sıralama tablosu
│   │   │   ├── ChallengesPage.tsx   # Kodlama challenge'ları
│   │   │   ├── ProfilePage.tsx      # Kullanıcı profili
│   │   │   └── MessagesPage.tsx     # Mesajlaşma sayfası
│   │   ├── store/
│   │   │   └── authStore.ts         # Zustand auth state management
│   │   ├── hooks/
│   │   │   └── usePageTitle.ts      # Sayfa başlığı hook'u
│   │   ├── types/
│   │   │   └── index.ts             # TypeScript tip tanımlamaları
│   │   ├── App.css
│   │   └── index.css
│   ├── public/
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── eslint.config.js
│   └── package.json
│
└── README.md
```

---

## 📊 Veritabanı Şeması

Proje SQLite kullanır ve aşağıdaki ana modelleri içerir:

### User (Kullanıcı)
- Kimlik: `id`, `username`, `email`, `password`
- Profil: `fullName`, `avatar`, `bio`
- İstatistikler: `totalPoints`, `streak`, `lastActive`
- Rol: `role` (user, admin)
- Timestamp: `createdAt`, `updatedAt`

### Topic (Konu)
- Başlık: `slug`, `title`, `titleEn`, `description`
- Seviye: `level` (sıralama sistemi)
- Hiyerarşi: `parentId` (konu içinde konu)
- Puan: `lessonPoints`, `quizPoints`
- Veriler: `icon`, `color`, `estimatedMin`

### Progress (İlerleme)
- `lessonDone`: Ders tamamlandı mı?
- `quizPassed`: Quiz başarıyla geçildi mi?
- `bestScore`: En iyi quiz puanı
- `completedAt`: Tamamlanma tarihi

### Quiz & Question (Quiz Sistemi)
- Quiz: Soruların bulunduğu test
- Question: Çoktan seçmeli/açık uçlu sorular
- QuizResult: Kullanıcı quiz sonuçları

### Challenge (Kodlama Challenge'ları)
- Tanım: `title`, `description`, `requirements`
- Zorluk: `difficulty`, `type`, `language`
- Zaman: `startDate`, `endDate`
- ChallengeParticipant: Katılımcı bilgileri, GitHub URL'si, doğrulama

### Homework (Ödev)
- Tanım: `title`, `description`, `difficulty`
- HomeworkSubmission: Ödev gönderim kayıtları

### Message (Mesajlaşma)
- İçerik: `content`
- Taraflar: `senderId`, `receiverId`
- Durum: `read` (okundu mu?)

### Notification (Bildirim)
- Tip: `type` (quiz_passed, challenge_joined, etc.)
- İçerik: `title`, `body`
- Durum: `read`

---

## 🚀 Başlangıç Rehberi

### ⚙️ Gereksinimler
- **Node.js** 16+ (v20+ önerilir)
- **npm** veya **yarn**
- **.env dosyası** (Backend için)

### 📦 Kurulum

#### 1. Depoyu Klonlayın ve Dizine Girin
```bash
cd c:\Users\asus\Desktop\GrafikFinal
```

#### 2. Backend Kurulumu

```bash
cd backend

# Bağımlılıkları yükle
npm install

# .env dosyasını oluştur ve yapılandır
# (Aşağıdaki .env yapılandırması bölümüne bak)

# Prisma istemcisini oluştur
npm run prisma:generate

# Veritabanı migrasyonlarını çalıştır
npm run prisma:migrate

# (Opsiyonel) Veritabanını test verisiyle doldur
npm run prisma:seed
```

#### 3. Frontend Kurulumu

```bash
cd frontend

# Bağımlılıkları yükle
npm install
```

---

### 🔧 .env Yapılandırması (Backend)

`backend/` dizininde `.env` dosyası oluştur ve aşağıdaki değişkenleri ekle:

```env
# Sunucu
PORT=5000
NODE_ENV=development

# Veritabanı
DATABASE_URL="file:./dev.db"

# JWT Gizli Anahtarı (güvenli bir key üret)
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production

# E-posta (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@algolearn.com

# GitHub API (Challenge'lar için)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Frontend URL (CORS için)
FRONTEND_URL=http://localhost:5173
```

**Not**: Gmail kullanıyorsanız [Google App Passwords](https://support.google.com/accounts/answer/185833) oluşturun.

---

### ▶️ Geliştirme Sunucularını Başlat

#### Terminal 1 - Backend
```bash
cd backend
npm run dev
```
**Çıktı**: `AlgoLearn API running on http://localhost:5000`

#### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```
**Çıktı**: `VITE v8.0.12 ready in xxx ms. ➜ Local: http://localhost:5173/`

#### Browser'da Aç
```
http://localhost:5173
```

---

## 🔄 API Endpoint'leri

### 🔐 Authentication (`/api/auth`)
| Method | Endpoint | Tanım |
|--------|----------|-------|
| POST | `/register` | Yeni kullanıcı kaydet |
| POST | `/login` | Giriş yap ve JWT token al |
| GET | `/me` | Mevcut kullanıcı bilgisini al |

### 📚 Topics (`/api/topics`)
| Method | Endpoint | Tanım |
|--------|----------|-------|
| GET | `/` | Tüm konuları listele |
| GET | `/:slug` | Belirli konu detaylarını al |

### 📊 Progress (`/api/progress`)
| Method | Endpoint | Tanım |
|--------|----------|-------|
| GET | `/` | Kullanıcı ilerlemesini al |
| POST | `/mark-lesson-done` | Dersi tamamlandı olarak işaretle |
| POST | `/get-points` | İlerleme puanını güncelle |

### ❓ Quiz (`/api/quiz`)
| Method | Endpoint | Tanım |
|--------|----------|-------|
| GET | `/:topicId` | Quiz sorularını al |
| POST | `/submit` | Quiz cevaplarını gönder ve değerlendir |

### 🏆 Leaderboard (`/api/leaderboard`)
| Method | Endpoint | Tanım |
|--------|----------|-------|
| GET | `/` | Sıralama tablosunu al |

### 🎯 Challenges (`/api/challenges`)
| Method | Endpoint | Tanım |
|--------|----------|-------|
| GET | `/` | Tüm challenge'ları listele |
| POST | `/join` | Challenge'a katıl |
| POST | `/submit` | GitHub reposunu gönder |

### 👤 Users (`/api/users`)
| Method | Endpoint | Tanım |
|--------|----------|-------|
| GET | `/:id` | Kullanıcı profili al |
| PUT | `/update` | Profil bilgilerini güncelle |
| GET | `/notifications` | Kullanıcı bildirimlerini al |

### 💬 Messages (`/api/messages`)
| Method | Endpoint | Tanım |
|--------|----------|-------|
| GET | `/` | Mesajları listele |
| POST | `/send` | Mesaj gönder |
| PUT | `/:id/read` | Mesajı okundu olarak işaretle |

### 📝 Homework (`/api/homework`)
| Method | Endpoint | Tanım |
|--------|----------|-------|
| GET | `/` | Ödev listesi al |
| POST | `/submit` | Ödev gönderimi yap |

### ❤️ Health Check (`/api/health`)
| Method | Endpoint | Tanım |
|--------|----------|-------|
| GET | `/api/health` | Sunucu durumunu kontrol et |

---

## 🏗️ Build ve Production

### Backend
```bash
cd backend

# TypeScript kodu derle
npm run build

# Production'da çalıştır
npm start
```

### Frontend
```bash
cd frontend

# Üretim için derle
npm run build

# Preview (üretime benzer)
npm run preview
```

Build çıktıları:
- **Backend**: `backend/dist/`
- **Frontend**: `frontend/dist/`

---

## 📋 Mevcut Sayfalar ve İşlevler

### 🌐 Frontend Rotaları

| Rota | Açıklama | Durum |
|------|----------|-------|
| `/login` | Giriş sayfası | ✅ |
| `/register` | Kayıt sayfası | ✅ |
| `/dashboard` | Anasayfa paneli | ✅ |
| `/learn` | Konu haritası | ✅ |
| `/learn/:slug` | Ders içeriği | ✅ |
| `/learn/:slug/quiz` | Quiz sayfası | ✅ |
| `/leaderboard` | Sıralama tablosu | ✅ |
| `/challenges` | Kodlama challenge'ları | ✅ |
| `/profile/:id` | Kullanıcı profili | ✅ |
| `/messages` | Mesajlaşma | ✅ |

---

## 🔑 Ana Özellikler Detaylı

### 1. **Kimlik Doğrulama Sistemi** 🔐
- Kayıt ve giriş işlemleri
- JWT tabanlı token yönetimi
- Şifre hash'leme (bcryptjs)
- Hoş geldin e-postası gönderimi

### 2. **Ders İçeriği Yönetimi** 📚
- Hiyerarşik konu yapısı
- Ders materyalleri (text, kod örnekleri)
- Egzersiz soruları
- Konuların seviye sistemine göre sıralanması

### 3. **Değerlendirme Sistemi** ✅
- Çoktan seçmeli ve açık uçlu quiz'ler
- Otomatik puan hesaplama
- Quiz geçme/başarısızlık durumu takibi
- En iyi skor kaydı

### 4. **Gamifikasyon** 🎮
- Puan sistemi (Quiz: 20pt, Lesson: 10pt, Challenge: 50pt+)
- Leaderboard sıralaması
- Kullanıcı streak (ardışık gün aktivitesi)
- Badge sistemi (geleceğe dönük)

### 5. **Challenge Sistemi** 🏁
- Zorluk seviyeleri (Easy, Medium, Hard)
- GitHub entegrasyonu
- Zaman sınırı (başlangıç ve bitiş tarihleri)
- Katılımcı doğrulama

### 6. **Sosyal Özellikler** 👥
- Kullanıcılar arası mesajlaşma
- Bildirim sistemi
- Profile görüntüleme
- Leaderboard rekabeti

### 7. **Ödev Yönetimi** 📝
- Konu başına ödev ataması
- GitHub repo gönderimi
- Gönderim doğrulaması
- Puan kazanma

---

## 🧪 Seeding ve Test Verisi

Veritabanını örnek verilerle doldurmak için:

```bash
cd backend
npm run prisma:seed
```

Bu komut:
- Test kullanıcıları oluşturur
- Örnek konular ve dersler ekler
- Quiz soruları ve cevapları hazırlar
- Challenge ve homework örnekleri yükler

---

## 🐛 Sık Karşılaşılan Sorunlar

### Problem: `DATABASE_URL` hatası
**Çözüm**: `backend/.env` dosyasının mevcut olup olmadığını kontrol et:
```bash
# Eğer yoksa:
echo "DATABASE_URL=file:./dev.db" > backend/.env
```

### Problem: JWT_SECRET hatası
**Çözüm**: Güvenli bir string üret ve `.env`'ye ekle:
```bash
# Node.js ile
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Problem: Sunucu bağlantı hatası
**Çözüm**: Port'ların açık olup olmadığını kontrol et:
```bash
# Windows'ta
netstat -ano | findstr :5000
netstat -ano | findstr :5173
```

### Problem: CORS hatası
**Çözüm**: `backend/src/index.ts`'de CORS yapılandırmasını kontrol et ve frontend URL'sini ekle

### Problem: Email gönderilemedi
**Çözüm**: SMTP yapılandırmasını ve Gmail App Password'ü kontrol et

---

## 📚 Kullanılan Kütüphaneler ve Versiyon

### Backend
- `express@^4.22.2` - Web framework
- `@prisma/client@^6.19.3` - ORM
- `typescript@^5.9.3` - Dil
- `jsonwebtoken@^9.0.3` - JWT
- `bcryptjs@^3.0.3` - Şifreleme
- `nodemailer@^8.0.7` - E-posta
- `cors@^2.8.6` - CORS middleware

### Frontend
- `react@^19.2.6` - UI library
- `typescript@~6.0.2` - Dil
- `vite@^8.0.12` - Bundler
- `tailwindcss@^4.3.0` - CSS framework
- `react-router-dom@^7.15.0` - Yönlendirme
- `@tanstack/react-query@^5.100.10` - Async state
- `zustand@^5.0.13` - State management
- `axios@^1.16.0` - HTTP client

---

## 📞 İletişim ve Destek

Sorular veya sorunlar için:
1. GitHub Issues'i kontrol et
2. Backend loglarını kontrol et: `npm run dev` çıktısı
3. Frontend console'unu aç: `F12 → Console`
4. Veritabanı durumunu kontrol et: `backend/dev.db`

---

## 📄 Lisans

Bu proje ISC lisansı altında dağıtılmaktadır.

---

## 🎉 Başarıyla Kurulum Tamamlandı!

Platform artık çalışmaya hazır. İlk kullanıcıyı kaydet ve öğrenmeye başla! 🚀