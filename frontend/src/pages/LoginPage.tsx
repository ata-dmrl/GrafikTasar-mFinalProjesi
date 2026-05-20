import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { authApi } from '../api/client'
import toast from 'react-hot-toast'
import { Lock, User } from 'lucide-react'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await authApi.login({ username, password })
      setAuth(data.user, data.token)
      toast.success(`Hoş geldin, ${data.user.username}! 🚀`)
      navigate('/dashboard')
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Giriş başarısız')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex" style={{ background: '#050D1A' }}>
      {/* Left panel - decorative */}
      <div
        className="hidden lg:flex flex-col justify-between w-2/5 p-12"
        style={{ background: 'linear-gradient(160deg, #091525 0%, #050D1A 50%, #080F1E 100%)', borderRight: '1px solid #162942' }}
      >
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="ReacType" className="w-16 h-16 object-contain" />
          <div>
            <div className="text-white font-bold text-xl">ReacType</div>
            <div className="text-xs" style={{ color: '#00B8FF' }}>Öğren · Kodla · Kazan</div>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-white leading-tight mb-4">
              Algoritma yolculuğuna<br />
              <span style={{ color: '#00B8FF' }}>buradan başla.</span>
            </h2>
            <p className="text-slate-400 leading-relaxed">
              16 konu, interaktif dersler, quiz sistemi ve gerçek kodlama challenge'larıyla algoritma ve veri yapılarını ustaca öğren.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { icon: '🧠', text: '16 algoritma konusu, adım adım' },
              { icon: '⚡', text: 'Anlık puan ve sıralama sistemi' },
              { icon: '💻', text: 'GitHub ile kodlama challenge\'ları' },
              { icon: '🏆', text: 'Sertifika ve başarı rozetleri' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <span className="text-slate-300 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: '#0F2040', border: '1px solid #1A3358' }}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ background: 'linear-gradient(135deg, #1756FF, #00B8FF)' }}>K</div>
          <div>
            <div className="text-white text-sm font-medium">30 puan ile lider</div>
            <div className="text-xs text-slate-400">Bugün 3 konu tamamladı</div>
          </div>
          <div className="ml-auto text-yellow-400 text-sm font-bold">#1</div>
        </div>
      </div>

      {/* Right panel - login form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-block mb-4">
              <img src="/logo.png" alt="ReacType" className="w-16 h-16 object-contain" />
            </div>
            <h1 className="text-2xl font-bold text-white">ReacType</h1>
            <p className="text-slate-400 text-sm mt-1">Algoritma ve Veri Yapıları Platformu</p>
          </div>

          {/* Form card */}
          <div
            className="rounded-2xl p-8"
            style={{ background: '#091525', border: '1px solid #162942' }}
          >
            <h2 className="text-2xl font-bold text-white mb-2">Giriş Yap</h2>
            <p className="text-slate-400 text-sm mb-8">Hesabına giriş yap ve öğrenmeye devam et</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Kullanıcı Adı</label>
                <div className="relative">
                  <User size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#7AA0C4' }} />
                  <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="w-full rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none transition-all"
                    style={{
                      background: '#0F2040',
                      border: '1px solid #1A3358',
                    }}
                    onFocus={e => { e.target.style.borderColor = '#1756FF'; e.target.style.boxShadow = '0 0 0 3px rgba(23,86,255,0.15)' }}
                    onBlur={e => { e.target.style.borderColor = '#1A3358'; e.target.style.boxShadow = 'none' }}
                    placeholder="kullanici_adi"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Şifre</label>
                <div className="relative">
                  <Lock size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#7AA0C4' }} />
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none transition-all"
                    style={{
                      background: '#0F2040',
                      border: '1px solid #1A3358',
                    }}
                    onFocus={e => { e.target.style.borderColor = '#1756FF'; e.target.style.boxShadow = '0 0 0 3px rgba(23,86,255,0.15)' }}
                    onBlur={e => { e.target.style.borderColor = '#1A3358'; e.target.style.boxShadow = 'none' }}
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all disabled:opacity-50"
                style={{
                  background: loading ? '#0A3FD0' : 'linear-gradient(135deg, #1756FF, #0047CC)',
                  boxShadow: '0 4px 20px rgba(23,86,255,0.35)',
                }}
                onMouseEnter={e => !loading && (e.currentTarget.style.background = 'linear-gradient(135deg, #3B7FFF, #1756FF)')}
                onMouseLeave={e => !loading && (e.currentTarget.style.background = 'linear-gradient(135deg, #1756FF, #0047CC)')}
              >
                {loading ? 'Giriş yapılıyor...' : 'Giriş Yap →'}
              </button>
            </form>

            <div className="mt-4 p-3 rounded-xl text-xs" style={{ background: '#0F2040', border: '1px solid #1A3358' }}>
              <span className="text-slate-500">Test hesabı: </span>
              <span className="font-mono" style={{ color: '#00B8FF' }}>testuser</span>
              <span className="text-slate-500"> / </span>
              <span className="font-mono" style={{ color: '#00B8FF' }}>123456</span>
            </div>

            <p className="text-center text-slate-400 text-sm mt-6">
              Hesabın yok mu?{' '}
              <Link to="/register" className="font-semibold transition-colors" style={{ color: '#00B8FF' }}>
                Kayıt ol
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
