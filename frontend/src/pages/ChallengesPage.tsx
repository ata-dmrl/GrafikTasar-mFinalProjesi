import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { challengesApi } from '../api/client'
import type { Challenge } from '../types'
import toast from 'react-hot-toast'
import { Swords, Clock, Users, Trophy, Code2, CheckCircle, GitBranch, ExternalLink, ChevronDown, ChevronUp, Send } from 'lucide-react'
import { usePageTitle } from '../hooks/usePageTitle'

const LANGUAGES = ['Python', 'C#', 'JavaScript', 'Java', 'Go', 'Rust', 'Other']

function diffLabel(d: string) {
  if (d === 'easy') return { label: 'Kolay', cls: 'bg-green-900/30 text-green-400' }
  if (d === 'medium') return { label: 'Orta', cls: 'bg-yellow-900/30 text-yellow-400' }
  return { label: 'Zor', cls: 'bg-red-900/30 text-red-400' }
}

function renderMarkdown(text: string) {
  return text.split('\n').map((line, i) => {
    if (line.startsWith('**') && line.endsWith('**') && !line.slice(2).includes('**')) {
      return <p key={i} className="text-white font-semibold mt-3 mb-1">{line.slice(2, -2)}</p>
    }
    const html = line
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
      .replace(/`(.*?)`/g, '<code class="bg-slate-700 text-indigo-300 px-1 rounded text-xs">$1</code>')
    if (line.startsWith('- ') || line.match(/^\d+\./)) {
      return <li key={i} className="text-slate-300 text-sm ml-4" dangerouslySetInnerHTML={{ __html: html.replace(/^- /, '').replace(/^\d+\. /, '') }} />
    }
    return line
      ? <p key={i} className="text-slate-300 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: html }} />
      : <br key={i} />
  })
}

function ChallengeCard({ challenge }: { challenge: Challenge }) {
  const qc = useQueryClient()
  const [expanded, setExpanded] = useState(false)
  const [showSubmit, setShowSubmit] = useState(false)
  const [githubUrl, setgithubUrl] = useState('')
  const [language, setLanguage] = useState('Python')

  const isActive = challenge.status === 'active'
  const joined = !!challenge.myParticipation
  const submitted = !!challenge.myParticipation?.submittedAt
  const diff = diffLabel(challenge.difficulty)

  const endDate = new Date(challenge.endDate)
  const now = new Date()
  const hoursLeft = Math.max(0, Math.floor((endDate.getTime() - now.getTime()) / (1000 * 60 * 60)))
  const daysLeft = Math.floor(hoursLeft / 24)

  const joinMutation = useMutation({
    mutationFn: () => challengesApi.join(challenge.id),
    onSuccess: () => {
      toast.success('Challenge\'a katıldın! Kodlamaya başla 🎯')
      qc.invalidateQueries({ queryKey: ['challenges'] })
      setExpanded(true)
    },
    onError: (err: any) => toast.error(err.response?.data?.error || 'Hata oluştu')
  })

  const submitMutation = useMutation({
    mutationFn: () => challengesApi.submitGithub(challenge.id, githubUrl, language),
    onSuccess: (data) => {
      if (data.verified) {
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
      qc.invalidateQueries({ queryKey: ['challenges'] })
      setShowSubmit(false)
    },
    onError: (err: any) => toast.error(err.response?.data?.error || 'Gönderi başarısız')
  })

  return (
    <div className={`bg-slate-800 border rounded-xl overflow-hidden transition-all ${
      isActive ? 'border-slate-700 hover:border-indigo-500/50' : 'border-slate-700/50 opacity-75'
    }`}>
      {/* Header */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold border ${
              challenge.status === 'active' ? 'bg-green-900/50 text-green-400 border-green-800' :
              challenge.status === 'upcoming' ? 'bg-blue-900/50 text-blue-400 border-blue-800' :
              'bg-slate-700 text-slate-400 border-slate-600'
            }`}>
              {challenge.status === 'active' ? '🟢 Aktif' : challenge.status === 'upcoming' ? '🔵 Yakında' : '⭕ Bitti'}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${diff.cls}`}>{diff.label}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 flex items-center gap-1">
              <Code2 size={10} /> Kodlama
            </span>
          </div>
          <div className="text-yellow-400 font-bold">+{challenge.points}p</div>
        </div>

        <h3 className="text-white font-semibold text-lg mb-1">{challenge.title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-3">{challenge.description}</p>

        <div className="flex items-center gap-4 text-slate-400 text-sm">
          <div className="flex items-center gap-1.5"><Users size={13} /><span>{challenge.participantCount || 0} katılımcı</span></div>
          {isActive && (
            <div className="flex items-center gap-1.5"><Clock size={13} />
              <span>{daysLeft > 0 ? `${daysLeft} gün` : `${hoursLeft} saat`} kaldı</span>
            </div>
          )}
        </div>
      </div>

      {/* Submitted indicator */}
      {submitted && challenge.myParticipation && (
        <div className={`mx-5 mb-3 p-3 rounded-lg border flex items-center gap-3 ${
          challenge.myParticipation.verified
            ? 'bg-green-900/20 border-green-800/50'
            : 'bg-yellow-900/20 border-yellow-800/50'
        }`}>
          {challenge.myParticipation.verified
            ? <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
            : <GitBranch size={16} className="text-yellow-400 flex-shrink-0" />
          }
          <div className="min-w-0 flex-1">
            <p className={`text-sm font-medium ${challenge.myParticipation.verified ? 'text-green-400' : 'text-yellow-400'}`}>
              {challenge.myParticipation.verified ? `✅ Çözüm doğrulandı (+${challenge.myParticipation.earnedPoints}p)` : '⚠️ Repo doğrulanamadı'}
            </p>
            {challenge.myParticipation.repoName && (
              <a href={challenge.myParticipation.githubUrl} target="_blank" rel="noopener noreferrer"
                className="text-slate-400 text-xs hover:text-white flex items-center gap-1 mt-0.5">
                <GitBranch size={11} /> {challenge.myParticipation.repoName} <ExternalLink size={10} />
              </a>
            )}
          </div>
          {challenge.myParticipation.language && (
            <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded flex-shrink-0">{challenge.myParticipation.language}</span>
          )}
        </div>
      )}

      {/* Requirements toggle */}
      {challenge.requirements && (
        <div className="border-t border-slate-700">
          <button
            onClick={() => setExpanded(e => !e)}
            className="w-full flex items-center justify-between px-5 py-2.5 text-slate-400 hover:text-white text-sm transition-colors"
          >
            <span className="flex items-center gap-2"><Code2 size={14} /> Problem Açıklaması</span>
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          {expanded && (
            <div className="px-5 pb-4 space-y-1 border-t border-slate-700/50 pt-3 bg-slate-900/20">
              {renderMarkdown(challenge.requirements)}
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="p-4 border-t border-slate-700 bg-slate-800/50">
        {!isActive ? (
          <div className="text-slate-500 text-sm text-center">
            {challenge.status === 'upcoming' ? '⏳ Challenge henüz başlamadı' : '⭕ Challenge sona erdi'}
          </div>
        ) : !joined ? (
          <button
            onClick={() => joinMutation.mutate()}
            disabled={joinMutation.isPending}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Swords size={16} /> Challenge'a Katıl
          </button>
        ) : !submitted ? (
          showSubmit ? (
            <div className="space-y-3">
              <div>
                <label className="text-slate-400 text-xs mb-1 block">GitBranch Repo URL *</label>
                <input
                  value={githubUrl}
                  onChange={e => setgithubUrl(e.target.value)}
                  placeholder="https://GitBranch.com/kullanici/repo-adi"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Kullandığın Dil</label>
                <select
                  value={language}
                  onChange={e => setLanguage(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {LANGUAGES.map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => submitMutation.mutate()}
                  disabled={!githubUrl.trim() || submitMutation.isPending}
                  className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 text-sm"
                >
                  <Send size={14} /> {submitMutation.isPending ? 'Doğrulanıyor...' : 'Gönder'}
                </button>
                <button onClick={() => setShowSubmit(false)} className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors text-sm">
                  İptal
                </button>
              </div>
              <p className="text-slate-500 text-xs">💡 Repo public olmalı. GitBranch üzerinden otomatik doğrulanır.</p>
            </div>
          ) : (
            <div className="flex gap-2">
              <div className="flex-1 flex items-center gap-2 text-green-400 text-sm">
                <CheckCircle size={16} /> Katıldın!
              </div>
              <button
                onClick={() => { setShowSubmit(true); setExpanded(true) }}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm transition-colors"
              >
                <GitBranch size={14} /> Çözümü Gönder
              </button>
            </div>
          )
        ) : null}
      </div>
    </div>
  )
}

export default function ChallengesPage() {
  usePageTitle('Challenge\'lar')
  const [filter, setFilter] = useState<'all' | 'active' | 'upcoming' | 'ended'>('all')

  const { data: challenges = [], isLoading } = useQuery<Challenge[]>({
    queryKey: ['challenges'],
    queryFn: challengesApi.getAll,
    refetchInterval: 60000,
  })

  const filtered = filter === 'all' ? challenges : challenges.filter((c: Challenge) => c.status === filter)

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Swords className="text-indigo-400" /> Kodlama Challenge'ları
        </h1>
        <p className="text-slate-400 mt-2">
          Gerçek kodlama problemlerini çöz, GitBranch'a yükle ve puanını kazan!
        </p>
      </div>

      {/* Info banner */}
      <div className="bg-indigo-900/20 border border-indigo-800/40 rounded-xl p-5 mb-6 flex items-start gap-4">
        <GitBranch size={24} className="text-indigo-400 flex-shrink-0 mt-0.5" />
        <div>
          <div className="text-white font-semibold mb-1">Challenge Nasıl Çalışır?</div>
          <ol className="text-slate-400 text-sm space-y-1 list-decimal list-inside">
            <li>Challenge'a katıl ve problem açıklamasını oku</li>
            <li>Çözümünü kodla ve GitBranch'da public bir repoya yükle</li>
            <li>Repo linkini gönder — sistem GitBranch üzerinden doğrular</li>
            <li>Doğrulandıktan sonra puanın hesabına eklenir 🎉</li>
          </ol>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {([['all', 'Tümü'], ['active', '🟢 Aktif'], ['upcoming', '🔵 Yakında'], ['ended', '⭕ Bitti']] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === key ? 'bg-indigo-600 text-white' : 'bg-slate-800 border border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-slate-400">Yükleniyor...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12">
          <Trophy size={40} className="text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400">Bu kategoride challenge yok</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((c: Challenge) => (
            <ChallengeCard key={c.id} challenge={c} />
          ))}
        </div>
      )}
    </div>
  )
}
