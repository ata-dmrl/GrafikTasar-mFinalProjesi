import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { usersApi, messagesApi } from '../api/client'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'
import {
  Trophy, BookOpen, Target, Calendar, MessageSquare, Edit3, Save, X,
  GitBranch, ExternalLink, CheckCircle, XCircle, Swords, Award, User
} from 'lucide-react'
import { usePageTitle } from '../hooks/usePageTitle'

function CertificateCard({ completedCount, quizCount }: { completedCount: number; quizCount: number }) {
  const eligible = quizCount >= 5
  return (
    <div className={`rounded-xl p-6 border ${eligible
      ? 'bg-gradient-to-br from-yellow-900/30 to-amber-900/20 border-yellow-700/50'
      : 'bg-slate-800/50 border-slate-700/50'
    }`}>
      <div className="flex items-center gap-3 mb-3">
        <Award size={28} className={eligible ? 'text-yellow-400' : 'text-slate-600'} />
        <div>
          <h3 className={`font-bold text-lg ${eligible ? 'text-yellow-300' : 'text-slate-500'}`}>
            AlgoLearn Sertifikası
          </h3>
          <p className="text-xs text-slate-400">
            {eligible ? 'Kazanıldı! 🎉' : `${quizCount}/5 quiz tamamlandı`}
          </p>
        </div>
      </div>
      {eligible ? (
        <div className="text-center py-4 border border-yellow-700/40 rounded-lg bg-yellow-900/10">
          <div className="text-yellow-300 font-bold text-lg mb-1">🏆 AlgoLearn Başarı Sertifikası</div>
          <div className="text-yellow-400/70 text-sm">
            {completedCount} konu tamamlandı · {quizCount} quiz geçildi
          </div>
          <div className="text-slate-500 text-xs mt-2">Algoritma ve Veri Yapıları Temel Seviye</div>
        </div>
      ) : (
        <p className="text-slate-500 text-sm">
          Sertifika kazanmak için en az 5 quiz geçmen gerekiyor. Devam et!
        </p>
      )}
    </div>
  )
}

export default function ProfilePage() {
  usePageTitle('Profil')
  const { id } = useParams<{ id: string }>()
  const { user, updateUser } = useAuthStore()
  const navigate = useNavigate()
  const qc = useQueryClient()
  const isMe = user?.id === Number(id)

  const [editing, setEditing] = useState(false)
  const [editForm, setEditForm] = useState({ username: '', fullName: '', bio: '' })
  const [showMsgModal, setShowMsgModal] = useState(false)
  const [msgContent, setMsgContent] = useState('')
  const [activeTab, setActiveTab] = useState<'homework' | 'challenges'>('homework')

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', id],
    queryFn: () => usersApi.getProfile(Number(id)),
    enabled: !!id
  })

  const updateMutation = useMutation({
    mutationFn: usersApi.updateProfile,
    onSuccess: (data) => {
      toast.success('Profil güncellendi!')
      updateUser(data)
      qc.invalidateQueries({ queryKey: ['profile', id] })
      setEditing(false)
    },
    onError: (err: any) => toast.error(err.response?.data?.error || 'Hata oluştu')
  })

  const msgMutation = useMutation({
    mutationFn: () => messagesApi.send(Number(id), msgContent),
    onSuccess: () => {
      toast.success('Mesaj gönderildi!')
      setShowMsgModal(false)
      setMsgContent('')
      navigate('/messages')
    },
    onError: (err: any) => toast.error(err.response?.data?.error || 'Hata oluştu')
  })

  if (isLoading) return <div className="flex items-center justify-center h-64 text-slate-400">Yükleniyor...</div>
  if (!profile) return <div className="flex items-center justify-center h-64 text-slate-400">Kullanıcı bulunamadı</div>

  const completedTopics = profile.progress?.filter((p: any) => p.lessonDone) || []
  const quizzesPassed = profile.progress?.filter((p: any) => p.quizPassed) || []
  const joinDate = new Date(profile.createdAt).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long' })
  const hwSubmissions: any[] = profile.homeworkSubmissions || []
  const challengeSubmissions: any[] = profile.challengeParticipants || []

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-[300px_1fr] gap-6">

        {/* ─── Left Column ─── */}
        <div className="space-y-5">
          {/* Avatar + Info */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
            <div className="flex flex-col items-center text-center mb-5">
              <div className="w-24 h-24 rounded-2xl bg-indigo-600 flex items-center justify-center text-4xl font-bold text-white mb-3">
                {profile.username[0].toUpperCase()}
              </div>
              {!editing ? (
                <>
                  {profile.fullName && (
                    <h1 className="text-white font-bold text-xl">{profile.fullName}</h1>
                  )}
                  <p className="text-slate-400 text-sm mt-0.5 flex items-center gap-1">
                    <User size={12} /> @{profile.username}
                  </p>
                  {profile.bio && (
                    <p className="text-slate-400 text-sm mt-3 leading-relaxed">{profile.bio}</p>
                  )}
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-3">
                    <Calendar size={11} />
                    <span>{joinDate}'den beri üye</span>
                  </div>
                  {isMe && (
                    <button
                      onClick={() => { setEditForm({ username: profile.username, fullName: profile.fullName || '', bio: profile.bio || '' }); setEditing(true) }}
                      className="mt-3 flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      <Edit3 size={14} /> Profili Düzenle
                    </button>
                  )}
                </>
              ) : (
                <div className="w-full space-y-2 text-left mt-2">
                  <div>
                    <label className="text-slate-400 text-xs mb-0.5 block">Ad Soyad</label>
                    <input
                      value={editForm.fullName}
                      onChange={e => setEditForm(f => ({ ...f, fullName: e.target.value }))}
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Ad Soyad"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 text-xs mb-0.5 block">Kullanıcı Adı</label>
                    <input
                      value={editForm.username}
                      onChange={e => setEditForm(f => ({ ...f, username: e.target.value }))}
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Kullanıcı adı"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 text-xs mb-0.5 block">Hakkında</label>
                    <textarea
                      value={editForm.bio}
                      onChange={e => setEditForm(f => ({ ...f, bio: e.target.value }))}
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                      placeholder="Kendini tanıt..."
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => updateMutation.mutate({ username: editForm.username, fullName: editForm.fullName, bio: editForm.bio })}
                      disabled={updateMutation.isPending}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors disabled:opacity-50"
                    >
                      <Save size={13} /> Kaydet
                    </button>
                    <button onClick={() => setEditing(false)} className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-700 text-slate-300 rounded-lg text-sm hover:bg-slate-600 transition-colors">
                      <X size={13} /> İptal
                    </button>
                  </div>
                </div>
              )}
            </div>

            {!isMe && (
              <button
                onClick={() => setShowMsgModal(true)}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm"
              >
                <MessageSquare size={15} /> Mesaj Gönder
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 space-y-4">
            <h3 className="text-white font-semibold text-sm">İstatistikler</h3>
            {[
              { label: 'Toplam Puan', value: profile.totalPoints, icon: Trophy, color: 'text-yellow-400' },
              { label: 'Ders Tamamlandı', value: completedTopics.length, icon: BookOpen, color: 'text-blue-400' },
              { label: 'Quiz Geçildi', value: quizzesPassed.length, icon: Target, color: 'text-green-400' },
              { label: 'Ödev Teslimi', value: hwSubmissions.length, icon: GitBranch, color: 'text-purple-400' },
              { label: 'Challenge', value: challengeSubmissions.length, icon: Swords, color: 'text-orange-400' },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Icon size={15} className={color} />
                  {label}
                </div>
                <span className="text-white font-bold">{value}</span>
              </div>
            ))}
          </div>

          {/* Certificate */}
          <CertificateCard completedCount={completedTopics.length} quizCount={quizzesPassed.length} />
        </div>

        {/* ─── Right Column ─── */}
        <div className="space-y-5">
          {/* Tabs */}
          <div className="flex gap-1 bg-slate-800 border border-slate-700 rounded-xl p-1">
            <button
              onClick={() => setActiveTab('homework')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'homework' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <GitBranch size={15} /> Ödevler ({hwSubmissions.length})
            </button>
            <button
              onClick={() => setActiveTab('challenges')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'challenges' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Swords size={15} /> Challenge'lar ({challengeSubmissions.length})
            </button>
          </div>

          {/* Homework Tab */}
          {activeTab === 'homework' && (
            <div className="space-y-3">
              {hwSubmissions.length === 0 ? (
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-10 text-center">
                  <GitBranch size={36} className="text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400 font-medium">Henüz ödev teslimi yok</p>
                  <p className="text-slate-500 text-sm mt-1">Derslerdeki ödevleri tamamla ve GitBranch linkini paylaş!</p>
                </div>
              ) : hwSubmissions.map((sub: any) => (
                <div key={sub.id} className={`bg-slate-800 border rounded-xl p-4 flex items-start gap-4 ${
                  sub.verified ? 'border-green-800/40' : 'border-yellow-800/40'
                }`}>
                  <div className={`flex-shrink-0 mt-0.5 ${sub.verified ? 'text-green-400' : 'text-yellow-400'}`}>
                    {sub.verified ? <CheckCircle size={20} /> : <XCircle size={20} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{sub.homework?.topic?.icon || '📖'}</span>
                      <span className="text-white font-medium text-sm">{sub.homework?.title}</span>
                    </div>
                    <p className="text-slate-500 text-xs mb-2">{sub.homework?.topic?.title}</p>
                    <a href={sub.GitBranchUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 text-sm transition-colors">
                      <GitBranch size={13} />
                      <span className="truncate">{sub.repoName || sub.GitBranchUrl}</span>
                      <ExternalLink size={11} className="flex-shrink-0" />
                    </a>
                  </div>
                  <div className="text-right flex-shrink-0">
                    {sub.verified ? (
                      <span className="text-yellow-400 font-bold text-sm">+{sub.points}p</span>
                    ) : (
                      <span className="text-slate-500 text-xs">Doğrulanamadı</span>
                    )}
                    <p className="text-slate-600 text-xs mt-0.5">
                      {new Date(sub.submittedAt).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Challenges Tab */}
          {activeTab === 'challenges' && (
            <div className="space-y-3">
              {challengeSubmissions.length === 0 ? (
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-10 text-center">
                  <Swords size={36} className="text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400 font-medium">Henüz challenge teslimi yok</p>
                  <p className="text-slate-500 text-sm mt-1">Challenge'lara katıl ve çözümlerini GitBranch'a yükle!</p>
                </div>
              ) : challengeSubmissions.map((sub: any) => (
                <div key={sub.id} className={`bg-slate-800 border rounded-xl p-4 flex items-start gap-4 ${
                  sub.verified ? 'border-green-800/40' : 'border-yellow-800/40'
                }`}>
                  <div className={`flex-shrink-0 mt-0.5 ${sub.verified ? 'text-green-400' : 'text-yellow-400'}`}>
                    {sub.verified ? <CheckCircle size={20} /> : <XCircle size={20} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm mb-1">{sub.challenge?.title}</p>
                    {sub.language && (
                      <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded mb-2 inline-block">{sub.language}</span>
                    )}
                    {sub.GitBranchUrl && (
                      <a href={sub.GitBranchUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 text-sm transition-colors mt-1">
                        <GitBranch size={13} />
                        <span className="truncate">{sub.repoName || sub.GitBranchUrl}</span>
                        <ExternalLink size={11} className="flex-shrink-0" />
                      </a>
                    )}
                  </div>
                  <div className="text-right flex-shrink-0">
                    {sub.verified ? (
                      <span className="text-yellow-400 font-bold text-sm">+{sub.earnedPoints}p</span>
                    ) : (
                      <span className="text-slate-500 text-xs">Beklemede</span>
                    )}
                    {sub.submittedAt && (
                      <p className="text-slate-600 text-xs mt-0.5">
                        {new Date(sub.submittedAt).toLocaleDateString('tr-TR')}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Message Modal */}
      {showMsgModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-white font-semibold text-lg mb-4">
              {profile.username} kullanıcısına mesaj gönder
            </h3>
            <textarea
              value={msgContent}
              onChange={e => setMsgContent(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              placeholder="Mesajınızı yazın..."
              rows={4}
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => msgMutation.mutate()}
                disabled={!msgContent.trim() || msgMutation.isPending}
                className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors"
              >
                {msgMutation.isPending ? 'Gönderiliyor...' : 'Gönder'}
              </button>
              <button onClick={() => setShowMsgModal(false)} className="flex-1 py-2.5 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors">
                İptal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
