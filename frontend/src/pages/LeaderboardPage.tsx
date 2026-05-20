import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { leaderboardApi } from '../api/client'
import { useAuthStore } from '../store/authStore'
import type { LeaderboardEntry } from '../types'
import { Trophy, Medal, Star, Flame } from 'lucide-react'
import { usePageTitle } from '../hooks/usePageTitle'

export default function LeaderboardPage() {
  usePageTitle('Sıralama')
  const { user } = useAuthStore()
  const navigate = useNavigate()

  const { data: leaders = [], isLoading } = useQuery<LeaderboardEntry[]>({
    queryKey: ['leaderboard'],
    queryFn: leaderboardApi.getAll,
    refetchInterval: 60000,
  })

  const { data: myRank } = useQuery({
    queryKey: ['my-rank'],
    queryFn: leaderboardApi.getMyRank,
  })

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy size={18} style={{ color: '#FFB800' }} />
    if (rank === 2) return <Medal size={18} style={{ color: '#C0C8D4' }} />
    if (rank === 3) return <Medal size={18} style={{ color: '#CD7C3A' }} />
    return <span className="text-slate-400 text-sm font-bold w-5 text-center">#{rank}</span>
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Trophy style={{ color: '#FFB800' }} /> Sıralama Tablosu
        </h1>
        <p className="text-slate-400 mt-1 text-sm">En çok puan kazanan öğrenciler</p>
      </div>

      {/* My rank */}
      {myRank && (
        <div className="rounded-xl p-5 mb-6" style={{ background: 'linear-gradient(135deg, #091525, #0F2040)', border: '1px solid #1756FF44' }}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium mb-1" style={{ color: '#00B8FF' }}>Senin Sıralaman</div>
              <div className="text-3xl font-bold text-white">#{myRank.rank}</div>
              <div className="text-slate-400 text-sm">{myRank.totalUsers} kullanıcı arasında</div>
            </div>
            <div className="text-right">
              <div className="text-slate-400 text-sm">Toplam Puan</div>
              <div className="text-2xl font-bold" style={{ color: '#FFB800' }}>{myRank.totalPoints}</div>
            </div>
          </div>
        </div>
      )}

      {/* Top 3 podium */}
      {leaders.length >= 3 && (
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[leaders[1], leaders[0], leaders[2]].map((leader, podiumIdx) => {
            const actualRank = podiumIdx === 0 ? 2 : podiumIdx === 1 ? 1 : 3
            const colors = {
              1: { bg: '#FFB800', ring: 'rgba(255,184,0,0.25)', bar: 'rgba(255,184,0,0.15)', barBorder: 'rgba(255,184,0,0.3)' },
              2: { bg: '#8898AA', ring: 'rgba(136,152,170,0.2)', bar: 'rgba(136,152,170,0.12)', barBorder: 'rgba(136,152,170,0.25)' },
              3: { bg: '#CD7C3A', ring: 'rgba(205,124,58,0.2)', bar: 'rgba(205,124,58,0.12)', barBorder: 'rgba(205,124,58,0.25)' },
            }[actualRank]!
            return (
              <div
                key={leader.id}
                onClick={() => navigate(`/profile/${leader.id}`)}
                className={`flex flex-col items-center cursor-pointer group ${actualRank === 1 ? 'order-2' : actualRank === 2 ? 'order-1 mt-6' : 'order-3 mt-8'}`}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-white mb-2 transition-all"
                  style={{ background: colors.bg, boxShadow: `0 0 0 4px ${colors.ring}` }}
                >
                  {leader.username[0].toUpperCase()}
                </div>
                <div className="text-white text-sm font-semibold truncate max-w-full px-1">{leader.username}</div>
                <div className="text-xs font-bold mt-0.5" style={{ color: '#FFB800' }}>{leader.totalPoints} puan</div>
                <div
                  className={`w-full mt-2 rounded-t-lg flex items-center justify-center py-2 ${actualRank === 1 ? 'pb-6' : actualRank === 2 ? 'pb-2' : 'pb-1'}`}
                  style={{ background: colors.bar, border: `1px solid ${colors.barBorder}` }}
                >
                  {getRankIcon(actualRank)}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Full list */}
      {isLoading ? (
        <div className="text-center py-12 text-slate-400">Yükleniyor...</div>
      ) : (
        <div className="rounded-xl overflow-hidden" style={{ background: '#091525', border: '1px solid #162942' }}>
          <div
            className="grid grid-cols-12 gap-2 px-4 py-3 text-xs font-semibold uppercase tracking-wider"
            style={{ background: '#0F2040', borderBottom: '1px solid #162942', color: '#7AA0C4' }}
          >
            <div className="col-span-1">Sıra</div>
            <div className="col-span-5">Kullanıcı</div>
            <div className="col-span-3 text-center">Puan</div>
            <div className="col-span-3 text-center">Seri</div>
          </div>
          <div>
            {leaders.map((leader) => {
              const isMe = leader.id === user?.id
              return (
                <div
                  key={leader.id}
                  onClick={() => navigate(`/profile/${leader.id}`)}
                  className="grid grid-cols-12 gap-2 px-4 py-3.5 items-center cursor-pointer transition-all"
                  style={{
                    borderBottom: '1px solid #162942',
                    background: isMe ? 'rgba(23,86,255,0.08)' : 'transparent',
                    borderLeft: isMe ? '2px solid #1756FF' : '2px solid transparent',
                  }}
                  onMouseEnter={e => !isMe && (e.currentTarget.style.background = '#0F2040')}
                  onMouseLeave={e => !isMe && (e.currentTarget.style.background = 'transparent')}
                >
                  <div className="col-span-1 flex items-center">
                    {getRankIcon(leader.rank)}
                  </div>
                  <div className="col-span-5 flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #1756FF, #00B8FF)' }}
                    >
                      {leader.username[0].toUpperCase()}
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">
                        {leader.username}
                        {isMe && <span className="ml-2 text-xs" style={{ color: '#00B8FF' }}>(Sen)</span>}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-3 text-center">
                    <span className="font-bold" style={{ color: '#FFB800' }}>{leader.totalPoints}</span>
                  </div>
                  <div className="col-span-3 text-center flex items-center justify-center gap-1">
                    <Flame size={14} style={{ color: '#FF6B3D' }} />
                    <span className="text-slate-300 text-sm">{leader.streak}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {leaders.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <Star size={40} className="mx-auto mb-3" style={{ color: '#1A3358' }} />
          <p className="text-slate-400">Henüz sıralama yok. İlk sen ol!</p>
        </div>
      )}
    </div>
  )
}
