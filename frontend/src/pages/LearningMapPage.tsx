import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { topicsApi, progressApi } from '../api/client'
import type { Topic, Progress } from '../types'
import { CheckCircle2, Circle, Clock, Lock, ChevronRight } from 'lucide-react'
import { usePageTitle } from '../hooks/usePageTitle'

function TopicCard({ topic, progress, isUnlocked, onNavigate }: {
  topic: Topic
  progress?: Progress
  isUnlocked: boolean
  onNavigate: () => void
}) {
  const lessonDone = progress?.lessonDone
  const quizPassed = progress?.quizPassed
  const bestScore = progress?.bestScore

  return (
    <div
      onClick={isUnlocked ? onNavigate : undefined}
      className={`topic-card relative p-5 rounded-xl border transition-all ${
        isUnlocked
          ? 'bg-slate-800 border-slate-700 hover:border-indigo-500 cursor-pointer'
          : 'bg-slate-800/50 border-slate-700/50 cursor-not-allowed opacity-60'
      }`}
    >
      {/* Status indicator */}
      <div className="absolute top-3 right-3">
        {!isUnlocked ? (
          <Lock size={16} className="text-slate-500" />
        ) : quizPassed ? (
          <CheckCircle2 size={20} className="text-green-400" />
        ) : lessonDone ? (
          <div className="w-5 h-5 rounded-full border-2 border-yellow-400 border-dashed flex items-center justify-center">
            <div className="w-2 h-2 bg-yellow-400 rounded-full" />
          </div>
        ) : (
          <Circle size={20} className="text-slate-600" />
        )}
      </div>

      <div className="flex items-start gap-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ backgroundColor: topic.color + '20', border: `1px solid ${topic.color}40` }}
        >
          {topic.icon || '📖'}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-white font-semibold text-sm leading-tight">{topic.title}</h3>
          <p className="text-slate-400 text-xs mt-1 line-clamp-2">{topic.description}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-4 pt-3 border-t border-slate-700/50">
        <div className="flex items-center gap-1 text-xs text-slate-400">
          <Clock size={12} />
          <span>{topic.estimatedMin} dk</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-yellow-400">
          <span>+{topic.lessonPoints + topic.quizPoints} puan</span>
        </div>
        {bestScore && bestScore > 0 && (
          <div className="text-xs text-indigo-400 ml-auto">En iyi: %{bestScore}</div>
        )}
      </div>

      {/* Progress bar */}
      {isUnlocked && (
        <div className="mt-2 h-1 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: quizPassed ? '100%' : lessonDone ? '50%' : '0%',
              background: quizPassed ? '#22c55e' : '#6366f1'
            }}
          />
        </div>
      )}
    </div>
  )
}

export default function LearningMapPage() {
  usePageTitle('Öğren')
  const navigate = useNavigate()
  const { data: topics = [], isLoading } = useQuery({ queryKey: ['topics'], queryFn: topicsApi.getAll })
  const { data: progress = [] } = useQuery({ queryKey: ['progress'], queryFn: progressApi.getAll })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-400">Yükleniyor...</div>
      </div>
    )
  }

  const progressMap = Object.fromEntries(progress.map((p: Progress) => [p.topicId, p]))

  const isTopicUnlocked = (topic: Topic): boolean => {
    if (!topic.parentId) return true
    const parentProgress = progressMap[topic.parentId]
    return parentProgress?.lessonDone === true
  }

  const rawLevels = Array.from(new Set(topics.map((t: Topic) => t.level)))
  const levels: number[] = (rawLevels as number[]).sort((a, b) => a - b)

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Öğrenme Haritası</h1>
        <p className="text-slate-400 mt-2">
          Konuları sırayla tamamla. Her tamamlanan ders yeni konuların kilidini açar.
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-8 p-4 bg-slate-800 rounded-xl border border-slate-700">
        {[
          { icon: <Circle size={16} className="text-slate-500" />, label: 'Başlanmadı' },
          { icon: <div className="w-4 h-4 rounded-full border-2 border-yellow-400 border-dashed" />, label: 'Ders Yapıldı' },
          { icon: <CheckCircle2 size={16} className="text-green-400" />, label: 'Tamamlandı' },
          { icon: <Lock size={16} className="text-slate-500" />, label: 'Kilitli' },
        ].map(({ icon, label }) => (
          <div key={label} className="flex items-center gap-2">
            {icon}
            <span className="text-slate-400 text-sm">{label}</span>
          </div>
        ))}
      </div>

      {/* Topics by level */}
      <div className="space-y-10">
        {levels.map((level: number) => {
          const levelTopics = topics.filter((t: Topic) => t.level === level)
          return (
            <div key={level as number}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                  {level as number}
                </div>
                <h2 className="text-white font-semibold">
                  {(level as number) === 0 ? 'Başlangıç' :
                   (level as number) === 1 ? 'Temel Kavramlar' :
                   (level as number) === 2 ? 'Temel Veri Yapıları' :
                   (level as number) === 3 ? 'İleri Veri Yapıları' :
                   (level as number) === 4 ? 'Algoritmalar' :
                   'İleri Algoritmalar'}
                </h2>
                <div className="flex-1 h-px bg-slate-700" />
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {levelTopics.map((topic: Topic) => {
                  const prog = progressMap[topic.id]
                  const unlocked = isTopicUnlocked(topic)
                  return (
                    <TopicCard
                      key={topic.id}
                      topic={topic}
                      progress={prog}
                      isUnlocked={unlocked}
                      onNavigate={() => navigate(`/learn/${topic.slug}`)}
                    />
                  )
                })}
              </div>

              {/* Connection arrow */}
              {level < Math.max(...levels) && (
                <div className="flex justify-center mt-6">
                  <ChevronRight size={24} className="text-slate-600 rotate-90" />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
