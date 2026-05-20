import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { topicsApi, progressApi, homeworkApi } from '../api/client'
import { useAuthStore } from '../store/authStore'
import type { LessonContent, LessonVideo, ExternalCourse } from '../types'
import toast from 'react-hot-toast'
import { ArrowLeft, ArrowRight, BookOpen, Code2, CheckCircle, Target, Lightbulb, PlayCircle, ChevronDown, ChevronUp, GitBranch, Send, ExternalLink } from 'lucide-react'
import Exercise from '../components/Exercise'
import type { ExerciseData } from '../components/Exercise'
import { usePageTitle } from '../hooks/usePageTitle'

function VideoSection({ videos }: { videos: LessonVideo[] }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [collapsed, setCollapsed] = useState(false)

  if (videos.length === 0) return null

  const active = videos[activeIdx]

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden mb-6">
      <button
        onClick={() => setCollapsed(c => !c)}
        className="w-full flex items-center justify-between px-5 py-3 hover:bg-slate-750 transition-colors"
      >
        <div className="flex items-center gap-2 text-white font-semibold">
          <PlayCircle size={18} className="text-red-400" />
          Video Eğitim
          <span className="text-xs font-normal text-slate-400">({videos.length} video)</span>
        </div>
        {collapsed ? <ChevronDown size={16} className="text-slate-400" /> : <ChevronUp size={16} className="text-slate-400" />}
      </button>

      {!collapsed && (
        <div>
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              key={active.videoId}
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${active.videoId}?rel=0&modestbranding=1`}
              title={active.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {videos.length > 1 && (
            <div className="p-3 border-t border-slate-700 flex flex-wrap gap-2">
              {videos.map((v, i) => (
                <button
                  key={v.videoId}
                  onClick={() => setActiveIdx(i)}
                  className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
                    i === activeIdx
                      ? 'bg-red-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {i + 1}. {v.title.length > 40 ? v.title.slice(0, 40) + '…' : v.title}
                </button>
              ))}
            </div>
          )}

          <div className="px-4 py-2 border-t border-slate-700 bg-slate-900/30">
            <p className="text-slate-400 text-xs">{active.title}{active.channelName ? ` — ${active.channelName}` : ''}</p>
          </div>
        </div>
      )}
    </div>
  )
}

function ExternalCourseSection({ courses }: { courses: ExternalCourse[] }) {
  if (!courses || courses.length === 0) return null
  return (
    <div className="bg-slate-800 border border-indigo-500/30 rounded-xl overflow-hidden mb-6">
      <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-700 bg-indigo-900/20">
        <ExternalLink size={17} className="text-indigo-400" />
        <span className="text-white font-semibold text-sm">Ücretsiz Online Kurslar</span>
        <span className="text-xs text-slate-400 font-normal ml-1">— Bu konuyu daha derinlemesine öğren</span>
      </div>
      <div className="p-4 flex flex-col gap-3">
        {courses.map((c, i) => (
          <a
            key={i}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 p-3 rounded-lg bg-slate-900/60 border border-slate-700 hover:border-indigo-500/50 hover:bg-slate-900 transition-all group"
          >
            <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-indigo-600/20 flex items-center justify-center text-lg">
              {c.platform === 'BTK Akademi' ? '🎓' : '📺'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-white text-sm font-medium group-hover:text-indigo-300 transition-colors">{c.title}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-600/20 text-indigo-300 border border-indigo-500/30">{c.platform}</span>
                <span className="text-xs text-green-400 font-medium">Ücretsiz</span>
              </div>
              {c.description && <p className="text-slate-400 text-xs mt-1 leading-relaxed">{c.description}</p>}
            </div>
            <ExternalLink size={14} className="text-slate-500 group-hover:text-indigo-400 transition-colors flex-shrink-0 mt-0.5" />
          </a>
        ))}
      </div>
    </div>
  )
}

function CodeBlock({ language, code }: { language: 'typescript' | 'jsx' | 'python' | 'csharp'; code: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  const langLabel = language === 'typescript' ? '🔷 TypeScript'
    : language === 'jsx' ? '⚛️ JSX'
    : language === 'python' ? '🐍 Python'
    : '🔷 C#'
  const langClass = language === 'typescript' ? 'bg-blue-900/50 text-blue-300'
    : language === 'jsx' ? 'bg-cyan-900/50 text-cyan-300'
    : language === 'python' ? 'bg-yellow-900/50 text-yellow-300'
    : 'bg-purple-900/50 text-purple-300'
  return (
    <div className="mt-3 bg-slate-900 rounded-lg border border-slate-700 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${langClass}`}>
          {langLabel}
        </span>
        <button
          onClick={copy}
          className="text-xs text-slate-400 hover:text-white transition-colors"
        >
          {copied ? '✓ Kopyalandı' : 'Kopyala'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm code-block text-slate-300 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  )
}

function renderMarkdown(text: string) {
  return text
    .split('\n')
    .map((line, i) => {
      if (line.startsWith('- ')) {
        const content = line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
        return <li key={i} className="text-slate-300 ml-4" dangerouslySetInnerHTML={{ __html: content }} />
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="text-white font-semibold mt-2">{line.slice(2, -2)}</p>
      }
      const html = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
      return line ? <p key={i} className="text-slate-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: html }} /> : <br key={i} />
    })
}

export default function LessonPage() {
  usePageTitle('Ders')
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const qc = useQueryClient()
  const { updateUser, user } = useAuthStore()
  const [activeLang, setActiveLang] = useState<'typescript' | 'jsx' | 'python' | 'csharp'>('typescript')
  const [sectionIdx, setSectionIdx] = useState(0)
  const [lessonCompleted, setLessonCompleted] = useState(false)
  const [hwUrl, setHwUrl] = useState('')
  const [hwSubmitting, setHwSubmitting] = useState(false)

  const { data: topic } = useQuery({
    queryKey: ['topic', slug],
    queryFn: () => topicsApi.getBySlug(slug!),
    enabled: !!slug
  })

  const { data: lesson, isLoading } = useQuery<LessonContent>({
    queryKey: ['lesson', slug],
    queryFn: () => topicsApi.getLesson(slug!),
    enabled: !!slug
  })

  const { data: progress = [] } = useQuery({
    queryKey: ['progress'],
    queryFn: () => progressApi.getAll()
  })

  const { data: exercises = [] } = useQuery<ExerciseData[]>({
    queryKey: ['exercises', slug],
    queryFn: () => topicsApi.getExercises(slug!),
    enabled: !!slug
  })

  const { data: homework, refetch: refetchHw } = useQuery({
    queryKey: ['homework', slug],
    queryFn: () => homeworkApi.getByTopic(slug!),
    enabled: !!slug
  })

  const alreadyDone = progress.find((p: any) => p.topicId === topic?.id)?.lessonDone

  const completeMutation = useMutation({
    mutationFn: () => progressApi.completeLesson(topic!.id),
    onSuccess: (data) => {
      if (!data.alreadyDone) {
        toast.success(`🎉 Ders tamamlandı! +${data.earnedPoints} puan kazandın!`)
        updateUser({ totalPoints: (user?.totalPoints || 0) + data.earnedPoints })
      } else {
        toast.success('Ders zaten tamamlanmış!')
      }
      setLessonCompleted(true)
      qc.invalidateQueries({ queryKey: ['progress'] })
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || 'Hata oluştu')
    }
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-400">Ders yükleniyor...</div>
      </div>
    )
  }

  if (!lesson) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-400">Ders içeriği bulunamadı</div>
      </div>
    )
  }

  const section = lesson.sections[sectionIdx]
  const totalSections = lesson.sections.length
  const isLast = sectionIdx === totalSections - 1

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/learn')}
          className="p-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
            <span>{topic?.icon}</span>
            <span>Seviye {topic?.level}</span>
            <span>·</span>
            <span>{topic?.estimatedMin} dakika</span>
          </div>
          <h1 className="text-2xl font-bold text-white">{lesson.title}</h1>
        </div>
        {/* Lang toggle — sadece derste kullanılan diller gösterilir */}
        {lesson.sections.some(s => s.codeExamples && s.codeExamples.length > 0) && (() => {
          const usedLangs = [...new Set(lesson.sections.flatMap(s => s.codeExamples?.map(e => e.language) ?? []))]
          const langMeta: Record<string, { label: string; cls: string }> = {
            typescript: { label: '🔷 TypeScript', cls: 'bg-blue-600' },
            jsx:        { label: '⚛️ JSX',        cls: 'bg-cyan-600'  },
            python:     { label: '🐍 Python',      cls: 'bg-yellow-600' },
            csharp:     { label: '🔷 C#',          cls: 'bg-purple-600' },
          }
          return usedLangs.length > 1 ? (
            <div className="flex bg-slate-800 border border-slate-700 rounded-lg p-1 gap-1">
              {usedLangs.map(lang => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang as typeof activeLang)}
                  className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                    activeLang === lang ? `${langMeta[lang]?.cls ?? 'bg-indigo-600'} text-white` : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {langMeta[lang]?.label ?? lang}
                </button>
              ))}
            </div>
          ) : null
        })()}
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
          <span>Bölüm {sectionIdx + 1} / {totalSections}</span>
          <span className="text-indigo-400 font-medium">+{topic?.lessonPoints} puan</span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full progress-bar"
            style={{ width: `${((sectionIdx + 1) / totalSections) * 100}%` }}
          />
        </div>
      </div>

      {/* Videos */}
      {lesson.videos && lesson.videos.length > 0 && (
        <VideoSection videos={lesson.videos} />
      )}

      {/* External Courses */}
      {lesson.externalCourses && lesson.externalCourses.length > 0 && (
        <ExternalCourseSection courses={lesson.externalCourses} />
      )}

      {/* Section */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-6 fade-in">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <BookOpen size={20} className="text-indigo-400" />
          {section.title}
        </h2>

        {/* Content */}
        <div className="space-y-2 mb-4">
          {renderMarkdown(section.content)}
        </div>

        {/* Visual description */}
        {section.visualDescription && (
          <div className="mt-4 p-3 bg-slate-700/50 border border-slate-600 rounded-lg text-center">
            <code className="text-slate-300 text-sm">{section.visualDescription}</code>
          </div>
        )}

        {/* Code examples */}
        {section.codeExamples && section.codeExamples.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center gap-2 text-slate-300 text-sm mb-2">
              <Code2 size={16} />
              <span>Kod Örneği</span>
            </div>
            {section.codeExamples.map((ex, i) => {
              if (ex.language !== activeLang) return null
              return <CodeBlock key={i} language={ex.language} code={ex.code} />
            })}
            {!section.codeExamples.some(e => e.language === activeLang) && (
              <div className="text-slate-500 text-sm italic mt-2">
                Bu bölüm için {activeLang === 'typescript' ? 'TypeScript' : activeLang === 'jsx' ? 'JSX' : activeLang === 'python' ? 'Python' : 'C#'} kodu hazırlanıyor...
              </div>
            )}
          </div>
        )}
      </div>

      {/* Key points (last section) */}
      {isLast && (
        <div className="bg-indigo-900/20 border border-indigo-800/50 rounded-xl p-6 mb-6">
          <h3 className="text-white font-semibold flex items-center gap-2 mb-4">
            <Lightbulb size={18} className="text-yellow-400" />
            Önemli Noktalar
          </h3>
          <ul className="space-y-2">
            {lesson.keyPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                <CheckCircle size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                {point}
              </li>
            ))}
          </ul>

          {lesson.practiceProblems && lesson.practiceProblems.length > 0 && (
            <div className="mt-4 pt-4 border-t border-indigo-800/30">
              <h4 className="text-white text-sm font-semibold flex items-center gap-2 mb-3">
                <Target size={16} className="text-orange-400" />
                Pratik Soruları
              </h4>
              <ul className="space-y-2">
                {lesson.practiceProblems.map((problem, i) => (
                  <li key={i} className="text-slate-400 text-sm flex items-start gap-2">
                    <span className="text-orange-400 flex-shrink-0">{i + 1}.</span>
                    {problem}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Interactive Exercises */}
      {isLast && exercises.length > 0 && (
        <div className="mb-6">
          <h3 className="text-white font-semibold text-lg flex items-center gap-2 mb-2">
            <span className="text-xl">✏️</span> İnteraktif Alıştırmalar
            <span className="text-xs text-slate-400 font-normal">({exercises.length} alıştırma)</span>
          </h3>
          <p className="text-slate-400 text-sm mb-4">
            Öğrendiklerini pekiştir! Bu alıştırmalar puanlamaya dahil değil, pratik yapmak içindir.
          </p>
          <div className="space-y-4">
            {exercises.map(ex => (
              <Exercise key={ex.id} exercise={ex} />
            ))}
          </div>
        </div>
      )}

      {/* Homework Section */}
      {isLast && homework && (
        <div className="bg-slate-800 border border-indigo-800/40 rounded-xl p-6 mb-6">
          <h3 className="text-white font-semibold text-lg flex items-center gap-2 mb-1">
            <GitBranch size={20} className="text-indigo-400" /> Ödev: {homework.title}
          </h3>
          <div className="flex items-center gap-2 mb-4">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              homework.difficulty === 'easy' ? 'bg-green-900/40 text-green-400' :
              homework.difficulty === 'hard' ? 'bg-red-900/40 text-red-400' :
              'bg-yellow-900/40 text-yellow-400'
            }`}>
              {homework.difficulty === 'easy' ? 'Kolay' : homework.difficulty === 'hard' ? 'Zor' : 'Orta'}
            </span>
            <span className="text-yellow-400 text-sm font-semibold">+{homework.points} puan</span>
          </div>

          <div className="bg-slate-900/50 rounded-lg p-4 mb-4 text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
            {homework.description}
          </div>

          {homework.mySubmission ? (
            <div className={`flex items-start gap-3 p-3 rounded-lg border ${
              homework.mySubmission.verified ? 'bg-green-900/20 border-green-700/50' : 'bg-yellow-900/20 border-yellow-700/50'
            }`}>
              {homework.mySubmission.verified
                ? <CheckCircle size={18} className="text-green-400 flex-shrink-0 mt-0.5" />
                : <GitBranch size={18} className="text-yellow-400 flex-shrink-0 mt-0.5" />
              }
              <div>
                <p className={`text-sm font-medium ${homework.mySubmission.verified ? 'text-green-400' : 'text-yellow-300'}`}>
                  {homework.mySubmission.verified ? `✅ Ödev teslim edildi ve doğrulandı! +${homework.mySubmission.points}p` : '⚠️ Teslim edildi fakat repo doğrulanamadı'}
                </p>
                <a href={homework.mySubmission.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 text-xs flex items-center gap-1 mt-1">
                  <GitBranch size={11} />{homework.mySubmission.repoName || homework.mySubmission.githubUrl}<ExternalLink size={10} />
                </a>
                {!homework.mySubmission.verified && (
                  <button onClick={() => setHwUrl(homework.mySubmission!.githubUrl)} className="text-xs text-slate-400 hover:text-white mt-1 underline">
                    URL'yi güncelle
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-slate-400 text-sm">GitHub Repo Linki</label>
              <div className="flex gap-2">
                <input
                  value={hwUrl}
                  onChange={e => setHwUrl(e.target.value)}
                  placeholder="https://github.com/kullanici/repo-adi"
                  className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  disabled={!hwUrl.trim() || hwSubmitting}
                  onClick={async () => {
                    setHwSubmitting(true)
                    try {
                      const res = await homeworkApi.submit(homework.id, hwUrl)
                      if (res.verified) toast.success(res.message)
                      else toast.error(res.message)
                      refetchHw()
                      setHwUrl('')
                    } catch (e: any) {
                      toast.error(e.response?.data?.error || 'Hata oluştu')
                    } finally {
                      setHwSubmitting(false)
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm disabled:opacity-50 transition-colors"
                >
                  <Send size={14} />{hwSubmitting ? 'Doğrulanıyor...' : 'Teslim Et'}
                </button>
              </div>
              <p className="text-slate-500 text-xs">💡 Repon public olmalı. GitHub API üzerinden otomatik doğrulanır.</p>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => setSectionIdx(i => Math.max(0, i - 1))}
          disabled={sectionIdx === 0}
          className="flex items-center gap-2 px-4 py-2.5 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ArrowLeft size={16} /> Önceki
        </button>

        {isLast ? (
          <div className="flex gap-3">
            {!alreadyDone && !lessonCompleted ? (
              <button
                onClick={() => completeMutation.mutate()}
                disabled={completeMutation.isPending}
                className="flex items-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
              >
                <CheckCircle size={16} />
                {completeMutation.isPending ? 'Kaydediliyor...' : 'Dersi Tamamla!'}
              </button>
            ) : (
              <div className="flex items-center gap-2 px-4 py-2.5 bg-green-900/30 border border-green-700 text-green-400 rounded-lg text-sm">
                <CheckCircle size={16} /> Tamamlandı!
              </div>
            )}
            {topic?.quizzes && topic.quizzes.length > 0 && (
              <button
                onClick={() => navigate(`/learn/${slug}/quiz`)}
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
              >
                Quiz'e Geç <ArrowRight size={16} />
              </button>
            )}
          </div>
        ) : (
          <button
            onClick={() => setSectionIdx(i => i + 1)}
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
          >
            Devam Et <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  )
}
