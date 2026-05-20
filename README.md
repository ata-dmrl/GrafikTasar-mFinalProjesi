# AlgoLearn - Algoritma ve Veri Yapıları Öğrenme Platformu

## Özellikler

- **12 Konu** - Algoritmalara Girişten Dinamik Programlamaya kadar aşamalı öğrenme
- **C# ve Python** kod örnekleri her derste
- **Dallanarak ilerleyen** öğrenme haritası - konu tamamlanmadan ileri geçilemiyor
- **Quiz sistemi** - 60+ soru, geçmek için %70 gerekli
- **Puanlama sistemi** - Ders: 10-30 puan, Quiz: 20-40 puan
- **Sıralama tablosu** - Kullanıcılar arası rekabet
- **Challenge'lar** - Haftalık yarışmalar
- **Mesajlaşma** - Kullanıcılar arası iletişim
- **Bildirimler** - Puan kazanma, mesaj vb.

## Teknolojiler

**Backend:** Node.js, Express, TypeScript, Prisma, SQLite, JWT, bcrypt  
**Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Zustand, React Query

## Başlatma

### 1. Backend

```bash
cd backend
npm install
npx prisma migrate dev --name init
npx ts-node src/seed.ts
npm run dev
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

### Tek Komutla (Windows PowerShell)

```powershell
.\start.ps1
```

## Öğrenme Haritası

```
Seviye 0: Algoritmalara Giriş (10+20 puan)
    ↓
Seviye 1: Karmaşıklık Analizi  |  Özyineleme
    ↓
Seviye 2: Diziler  |  Bağlı Listeler
    ↓
Seviye 3: Yığınlar  |  Kuyruklar  |  Hash Tabloları
    ↓
Seviye 4: Ağaçlar  |  Sıralama Algoritmaları
    ↓
Seviye 5: Graflar  |  Dinamik Programlama
```

## Veritabanı

SQLite veritabanı `backend/prisma/dev.db` konumunda.  
Sunucuya taşımak için `.env` dosyasında `DATABASE_URL`'yi PostgreSQL bağlantısıyla değiştirin ve `prisma migrate deploy` çalıştırın.

## URL'ler

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api
- API Sağlık: http://localhost:5000/api/health
