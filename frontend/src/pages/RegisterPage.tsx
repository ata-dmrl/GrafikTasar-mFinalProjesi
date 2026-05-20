import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { authApi } from '../api/client'
import toast from 'react-hot-toast'
import { User, Mail, Lock, ChevronRight } from 'lucide-react'

const inputStyle = {
  background: '#0F2040',
  border: '1px solid #1A3358',
}

export default function RegisterPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      toast.error('Şifreler eşleşmiyor')
      return
    }
    if (form.password.length < 6) {
      toast.error('Şifre en az 6 karakter olmalı')
      return
    }
    setLoading(true)
    try {
      const data = await authApi.register({ username: form.username, email: form.email, password: form.password })
      setAuth(data.user, data.token)
      toast.success('Hesabın oluşturuldu! Öğrenmeye başla! 🚀')
      navigate('/dashboard')
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Kayıt başarısız')
    } finally {
      setLoading(false)
    }
  }

  const fields = [
    { key: 'username', label: 'Kullanıcı Adı', type: 'text', placeholder: 'kodcu42', Icon: User },
    { key: 'email', label: 'E-posta Adresi', type: 'email', placeholder: 'ornek@mail.com', Icon: Mail },
    { key: 'password', label: 'Şifre', type: 'password', placeholder: '••••••••  (min. 6 karakter)', Icon: Lock },
    { key: 'confirmPassword', label: 'Şifre Tekrar', type: 'password', placeholder: '••••••••', Icon: Lock },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#050D1A' }}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <img src="/logo.png" alt="ReacType" className="w-14 h-14 object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-white">ReacType</h1>
          <p className="text-slate-400 text-sm mt-1">Algoritma öğrenmek hiç bu kadar keyifli olmamıştı</p>
        </div>

        {/* Form */}
        <div className="rounded-2xl p-8" style={{ background: '#091525', border: '1px solid #162942' }}>
          <h2 className="text-xl font-bold text-white mb-1">Hesap Oluştur</h2>
          <p className="text-slate-400 text-sm mb-6">Ücretsiz hesabını oluştur, hemen başla</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map(({ key, label, type, placeholder, Icon }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>
                <div className="relative">
                  <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#7AA0C4' }} />
                  <input
                    type={type}
                    value={form[key as keyof typeof form]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    className="w-full rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none transition-all"
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = '#1756FF'; e.target.style.boxShadow = '0 0 0 3px rgba(23,86,255,0.15)' }}
                    onBlur={e => { e.target.style.borderColor = '#1A3358'; e.target.style.boxShadow = 'none' }}
                    placeholder={placeholder}
                    required
                  />
                </div>
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
              style={{
                background: 'linear-gradient(135deg, #1756FF, #0047CC)',
                boxShadow: '0 4px 20px rgba(23,86,255,0.35)',
              }}
              onMouseEnter={e => !loading && (e.currentTarget.style.background = 'linear-gradient(135deg, #3B7FFF, #1756FF)')}
              onMouseLeave={e => !loading && (e.currentTarget.style.background = 'linear-gradient(135deg, #1756FF, #0047CC)')}
            >
              {loading ? 'Hesap oluşturuluyor...' : (<>Kayıt Ol <ChevronRight size={16} /></>)}
            </button>
          </form>

          <p className="text-center text-slate-400 text-sm mt-6">
            Hesabın var mı?{' '}
            <Link to="/login" className="font-semibold transition-colors" style={{ color: '#00B8FF' }}>
              Giriş yap
            </Link>
          </p>
        </div>

        {/* Features */}
        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          {[
            { label: '16 Konu', sub: 'Algoritma & Veri Yapısı' },
            { label: '80+ Soru', sub: 'İnteraktif Quizler' },
            { label: '3 Challenge', sub: 'GitHub ile Doğrulama' },
          ].map((item, i) => (
            <div key={i} className="p-3 rounded-xl" style={{ background: '#091525', border: '1px solid #162942' }}>
              <div className="text-white font-bold text-sm" style={{ color: '#00B8FF' }}>{item.label}</div>
              <div className="text-slate-500 text-xs mt-0.5">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
