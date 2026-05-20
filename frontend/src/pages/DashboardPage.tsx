import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { progressApi, leaderboardApi, challengesApi, topicsApi } from '../api/client'
import { Trophy, BookOpen, Target, Flame, ArrowRight, Zap } from 'lucide-react'
import { usePageTitle } from '../hooks/usePageTitle'

export default function DashboardPage() {
  usePageTitle('Ana Sayfa')
  const { user } = useAuthStore()
  const navigate = useNavigate()

  const { data: progress = [] } = useQuery({ queryKey: ['progress'], queryFn: progressApi.getAll })
  const { data: myRank } = useQuery({ queryKey: ['my-rank'], queryFn: leaderboardApi.getMyRank })
  const { data: challenges = [] } = useQuery({ queryKey: ['challenges'], queryFn: challengesApi.getAll })
  const { data: topics = [] } = useQuery({ queryKey: ['topics'], queryFn: topicsApi.getAll })

  const totalTopics = topics.length || 1  // bölme sıfırı önlemek için minimum 1

  const lessonsCompleted = progress.filter((p: any) => p.lessonDone).length
  const quizzesPassed = progress.filter((p: any) => p.quizPassed).length
  const activeChallenges = challenges.filter((c: any) => c.status === 'active').length

  const stats = [
    { label: 'Toplam Puan', value: user?.totalPoints || 0, icon: Trophy, color: '#FFB800', bg: 'rgba(255,184,0,0.1)', to: '/leaderboard' },
    { label: 'Ders Tamamlandı', value: lessonsCompleted, icon: BookOpen, color: '#00B8FF', bg: 'rgba(0,184,255,0.1)', to: '/learn' },
    { label: 'Quiz Geçildi', value: quizzesPassed, icon: Target, color: '#00E096', bg: 'rgba(0,224,150,0.1)', to: '/learn' },
    { label: 'Sıralama', value: myRank?.rank ? `#${myRank.rank}` : '-', icon: Flame, color: '#FF6B3D', bg: 'rgba(255,107,61,0.1)', to: '/leaderboard' },
  ]

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Welcome */}
      <div className="mb-8 p-6 rounded-2xl" style={{ background: 'linear-gradient(135deg, #091525 0%, #0F2040 100%)', border: '1px solid #162942' }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Merhaba, <span style={{ color: '#00B8FF' }}>{user?.username}</span>! 👋
            </h1>
            <p className="text-slate-400 mt-1 text-sm">Bugün yeni bir şey öğrenmeye hazır mısın?</p>
          </div>
          <button
            onClick={() => navigate('/learn')}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all"
            style={{ background: 'linear-gradient(135deg, #1756FF, #0047CC)', boxShadow: '0 4px 16px rgba(23,86,255,0.3)' }}
          >
            Öğrenmeye Devam Et <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map(({ label, value, icon: Icon, color, bg, to }) => (
          <div
            key={label}
            onClick={() => navigate(to)}
            className="rounded-xl p-5 cursor-pointer transition-all group"
            style={{ background: '#091525', border: '1px solid #162942' }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#1756FF'; (e.currentTarget as HTMLDivElement).style.background = '#0F2040' }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#162942'; (e.currentTarget as HTMLDivElement).style.background = '#091525' }}
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-transform group-hover:scale-110" style={{ background: bg }}>
              <Icon size={20} style={{ color }} />
            </div>
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="text-slate-400 text-sm mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Progress + Challenges */}
      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        {/* Progress */}
        <div className="rounded-xl p-6" style={{ background: '#091525', border: '1px solid #162942' }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-semibold">Öğrenme İlerlemen</h2>
            <button
              onClick={() => navigate('/learn')}
              className="text-sm flex items-center gap-1 transition-colors"
              style={{ color: '#00B8FF' }}
            >
              Devam et <ArrowRight size={13} />
            </button>
          </div>
          <div className="space-y-4">
            {[
              { label: 'Dersler', done: lessonsCompleted, total: totalTopics, color: '#1756FF' },
              { label: 'Quizler', done: quizzesPassed,   total: totalTopics, color: '#00B8FF' },
            ].map(({ label, done, total, color }) => (
              <div key={label}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">{label}</span>
                  <span className="text-white font-medium">{done}/{total}</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: '#0F2040' }}>
                  <div
                    className="h-full rounded-full progress-bar"
                    style={{ width: `${(done / total) * 100}%`, background: `linear-gradient(90deg, ${color}, ${color}99)` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 p-4 rounded-xl" style={{ background: '#0F2040', border: '1px solid #1A3358' }}>
            <p className="text-sm" style={{ color: '#A8C5E0' }}>
              {quizzesPassed === 0
                ? '🚀 İlk dersini tamamla ve puan kazanmaya başla!'
                : quizzesPassed < 6
                ? `⚡ Harika gidiyorsun! ${totalTopics - quizzesPassed} konu daha kaldı.`
                : '🏆 Müthiş ilerleme! Zirveye yaklaşıyorsun!'}
            </p>
          </div>
        </div>

        {/* Active Challenges */}
        <div className="rounded-xl p-6" style={{ background: '#091525', border: '1px solid #162942' }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-semibold">Aktif Challenge'lar</h2>
            <button
              onClick={() => navigate('/challenges')}
              className="text-sm flex items-center gap-1 transition-colors"
              style={{ color: '#00B8FF' }}
            >
              Tümünü gör <ArrowRight size={13} />
            </button>
          </div>
          {activeChallenges === 0 ? (
            <div className="text-center py-8">
              <Zap size={32} className="mx-auto mb-2" style={{ color: '#1A3358' }} />
              <p className="text-slate-400 text-sm">Şu an aktif challenge yok</p>
            </div>
          ) : (
            <div className="space-y-3">
              {challenges.filter((c: any) => c.status === 'active').map((c: any) => (
                <div
                  key={c.id}
                  onClick={() => navigate('/challenges')}
                  className="p-4 rounded-xl cursor-pointer transition-all"
                  style={{ background: '#0F2040', border: '1px solid #1A3358' }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = '#1756FF'}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = '#1A3358'}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-white text-sm font-medium">{c.title}</div>
                      <div className="text-slate-400 text-xs mt-0.5">{c.participantCount} katılımcı</div>
                    </div>
                    <span className="text-sm font-bold" style={{ color: '#FFB800' }}>+{c.points}p</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      c.difficulty === 'easy' ? 'bg-green-900/40 text-green-400' :
                      c.difficulty === 'medium' ? 'bg-yellow-900/40 text-yellow-400' :
                      'bg-red-900/40 text-red-400'
                    }`}>
                      {c.difficulty === 'easy' ? 'Kolay' : c.difficulty === 'medium' ? 'Orta' : 'Zor'}
                    </span>
                    {c.myParticipation && (
                      <span className="text-xs" style={{ color: '#00B8FF' }}>✓ Katıldın</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl p-6" style={{ background: '#091525', border: '1px solid #162942' }}>
        <h2 className="text-white font-semibold mb-4">Son Tamamlanan Dersler</h2>
        {progress.filter((p: any) => p.lessonDone || p.quizPassed).length === 0 ? (
          <div className="text-center py-8">
            <BookOpen size={32} className="mx-auto mb-2" style={{ color: '#1A3358' }} />
            <p className="text-slate-400 text-sm">Henüz ders tamamlamadın.</p>
            <button
              onClick={() => navigate('/learn')}
              className="mt-3 text-sm font-medium transition-colors"
              style={{ color: '#00B8FF' }}
            >
              Öğrenmeye başla →
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {progress.filter((p: any) => p.lessonDone || p.quizPassed).slice(0, 6).map((p: any) => (
              <div
                key={p.id}
                onClick={() => navigate(`/learn/${p.topic?.slug}`)}
                className="p-3 rounded-xl cursor-pointer transition-all flex items-center gap-3"
                style={{ background: '#0F2040', border: '1px solid #1A3358' }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = '#2A4870'}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = '#1A3358'}
              >
                <span className="text-2xl">{p.topic?.icon || '📖'}</span>
                <div className="min-w-0">
                  <div className="text-white text-sm font-medium truncate">{p.topic?.title}</div>
                  <div className="flex gap-2 mt-0.5">
                    {p.lessonDone && <span className="text-xs" style={{ color: '#1756FF' }}>✓ Ders</span>}
                    {p.quizPassed && <span className="text-xs" style={{ color: '#00E096' }}>✓ Quiz</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
