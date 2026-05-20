import nodemailer from 'nodemailer';

async function createTransporter() {
  // Gmail SMTP üzerinden gönder
  if (process.env.SMTP_HOST && process.env.SMTP_PASS && process.env.SMTP_PASS !== 'buraya_uygulama_sifresi_gelecek') {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  // Uygulama şifresi girilmemişse Ethereal test hesabı kullan
  console.warn('⚠️  Gmail App Password girilmemiş, Ethereal test hesabı kullanılıyor.');
  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: { user: testAccount.user, pass: testAccount.pass },
  });
}

export async function sendWelcomeEmail(email: string, username: string): Promise<void> {
  try {
    const transporter = await createTransporter();

    const fromAddress = process.env.SMTP_USER || 'noreply@reactype.dev';

    const info = await transporter.sendMail({
      from: `"ReacType" <${fromAddress}>`,
      to: email,
      subject: 'ReacType\'na Hoş Geldin! 🎉',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; background: #050D1A; color: #e2e8f0; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 40px auto; background: #091525; border-radius: 16px; overflow: hidden; border: 1px solid #162942; }
            .header { background: linear-gradient(135deg, #1756FF, #00B8FF); padding: 40px 30px; text-align: center; }
            .logo { font-size: 28px; font-weight: bold; color: white; letter-spacing: -1px; }
            .tagline { color: rgba(255,255,255,0.85); margin-top: 8px; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; }
            .body { padding: 40px 30px; }
            .greeting { font-size: 22px; font-weight: bold; color: #f1f5f9; margin-bottom: 16px; }
            .text { color: #94a3b8; line-height: 1.8; margin-bottom: 16px; font-size: 15px; }
            .highlight { color: #00B8FF; font-weight: bold; }
            .features { background: #0F2040; border-radius: 12px; padding: 24px; margin: 24px 0; border: 1px solid #1A3358; }
            .feature { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; color: #cbd5e1; font-size: 14px; }
            .feature:last-child { margin-bottom: 0; }
            .feature-icon { font-size: 20px; width: 28px; text-align: center; }
            .cta { text-align: center; margin-top: 32px; }
            .btn { display: inline-block; background: linear-gradient(135deg, #1756FF, #00B8FF); color: white; padding: 14px 36px; border-radius: 10px; text-decoration: none; font-weight: bold; font-size: 15px; letter-spacing: 0.5px; }
            .divider { border: none; border-top: 1px solid #162942; margin: 24px 0; }
            .footer { padding: 20px 30px; text-align: center; color: #475569; font-size: 12px; }
            .footer a { color: #00B8FF; text-decoration: none; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">⚛️ ReacType</div>
              <div class="tagline">Öğren · Kodla · Kazan</div>
            </div>
            <div class="body">
              <div class="greeting">Merhaba, ${username}! 👋</div>
              <p class="text">
                <strong style="color:#f1f5f9">ReacType</strong> platformuna kayıt olduğun için çok teşekkür ederiz!
                Seni aramızda görmekten büyük mutluluk duyuyoruz. 🎉
              </p>
              <p class="text">
                Artık <span class="highlight">20 React konusu</span>, <span class="highlight">100+ quiz sorusu</span>,
                <span class="highlight">3 kodlama challenge'ı</span> ve <span class="highlight">GitHub doğrulamalı ödevler</span> ile
                React öğrenme yolculuğuna başlamaya hazırsın.
              </p>
              <div class="features">
                <div class="feature"><span class="feature-icon">⚛️</span> JS Temellerinden Redux'a React müfredatı</div>
                <div class="feature"><span class="feature-icon">🏆</span> Puanlama sistemi ve sıralama tablosu</div>
                <div class="feature"><span class="feature-icon">⚔️</span> GitHub ile React kodlama challenge'ları</div>
                <div class="feature"><span class="feature-icon">📝</span> Her konu için ödev ve GitHub doğrulaması</div>
                <div class="feature"><span class="feature-icon">🪝</span> Hooks, Context, React Query ve Redux dersleri</div>
                <div class="feature"><span class="feature-icon">🎓</span> Başarı sertifikası sistemi</div>
              </div>
              <p class="text">
                Başlamak için aşağıdaki butona tıkla ve React yolculuğuna çık!
              </p>
              <div class="cta">
                <a href="http://localhost:5173/learn" class="btn">Öğrenmeye Başla 🚀</a>
              </div>
            </div>
            <hr class="divider">
            <div class="footer">
              Bu e-posta <strong>ReacType</strong> platformuna kayıt olduğunuz için gönderilmiştir.<br>
              <a href="http://localhost:5173">reactype.dev</a> &nbsp;·&nbsp; © 2026 ReacType
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log(`📧 Kayıt teşekkür e-postası gönderildi → ${email}`);

    // Ethereal kullanılıyorsa önizleme linki bas
    if (info.messageId && (!process.env.SMTP_HOST || process.env.SMTP_PASS === 'buraya_uygulama_sifresi_gelecek')) {
      console.log(`📬 Test önizleme: ${nodemailer.getTestMessageUrl(info)}`);
    }
  } catch (err) {
    console.error('❌ E-posta gönderilemedi:', err);
  }
}
