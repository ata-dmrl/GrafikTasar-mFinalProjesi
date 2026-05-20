/**
 * index.ts — Express Uygulama Ana Dosyası (Giriş Noktası)
 *
 * Bu dosya sunucuyu başlatır ve tüm API rotalarını bağlar.
 * Çalıştırmak için: node dist/index.js  (önce "npm run build" yapılmalı)
 *
 * API Rotaları:
 *   /api/auth        → Kayıt, giriş, token doğrulama
 *   /api/topics      → Konu listesi, ders içeriği, alıştırmalar
 *   /api/progress    → Ders tamamlama ve ilerleme takibi
 *   /api/quiz        → Quiz soruları ve cevap gönderme
 *   /api/leaderboard → Sıralama tablosu
 *   /api/challenges  → Kodlama challenge'ları
 *   /api/users       → Profil ve bildirimler
 *   /api/messages    → Kullanıcılar arası mesajlaşma
 *   /api/homework    → Ödev listesi ve GitHub doğrulamalı gönderim
 *   /api/health      → Sunucu sağlık kontrolü (uptime check)
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import topicRoutes from './routes/topics';
import progressRoutes from './routes/progress';
import quizRoutes from './routes/quiz';
import leaderboardRoutes from './routes/leaderboard';
import challengeRoutes from './routes/challenges';
import userRoutes from './routes/users';
import messageRoutes from './routes/messages';
import homeworkRoutes from './routes/homework';

// .env dosyasındaki değişkenleri (PORT, JWT_SECRET, SMTP_*) yükle
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS: tüm kaynaklardan gelen isteklere izin ver (geliştirme ortamı)
app.use(cors({
  origin: true,
  credentials: true,
}));

// JSON body parser: gelen isteklerin body'sini otomatik parse et
app.use(express.json());

// ── Rota bağlantıları ──
app.use('/api/auth',        authRoutes);       // Kimlik doğrulama
app.use('/api/topics',      topicRoutes);      // Konular & dersler
app.use('/api/progress',    progressRoutes);   // İlerleme takibi
app.use('/api/quiz',        quizRoutes);       // Quiz sistemi
app.use('/api/leaderboard', leaderboardRoutes);// Sıralama tablosu
app.use('/api/challenges',  challengeRoutes);  // Kodlama challenge'ları
app.use('/api/users',       userRoutes);       // Kullanıcı profili & bildirimler
app.use('/api/messages',    messageRoutes);    // Mesajlaşma
app.use('/api/homework',    homeworkRoutes);   // Ödev yönetimi

/**
 * GET /api/health
 * Sunucunun çalışıp çalışmadığını kontrol etmek için kullanılır.
 * Döndürür: { status: 'ok', timestamp: '...' }
 */
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Sunucuyu belirtilen portta başlat
app.listen(PORT, () => {
  console.log(`AlgoLearn API running on http://localhost:${PORT}`);
});

export default app;
