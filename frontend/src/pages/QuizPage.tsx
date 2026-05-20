import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { topicsApi, quizApi } from '../api/client'
import { useAuthStore } from '../store/authStore'
import type { QuizResult } from '../types'
import toast from 'react-hot-toast'
import { ArrowLeft, CheckCircle2, XCircle, Trophy, RotateCcw, ArrowRight } from 'lucide-react'
import { usePageTitle } from '../hooks/usePageTitle'

export default function QuizPage() {
  usePageTitle('Quiz')
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const qc = useQueryClient()
  const { updateUser, user } = useAuthStore()

  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [result, setResult] = useState<QuizResult | null>(null)
  const [currentQ, setCurrentQ] = useState(0)

  const { data: topic } = useQuery({
    queryKey: ['topic', slug],
    queryFn: () => topicsApi.getBySlug(slug!),
    enabled: !!slug
  })

  const { data: quiz, isLoading } = useQuery({
    queryKey: ['quiz', topic?.id],
    queryFn: () => quizApi.getByTopic(topic!.id),
    enabled: !!topic?.id
  })

  const submitMutation = useMutation({
    mutationFn: () => {
      const formatted = Object.entries(answers).map(([qId, answer]) => ({
        questionId: Number(qId),
        answer
      }))
      return quizApi.submit(quiz!.id, formatted)
    },
    onSuccess: (data: QuizResult) => {
      setResult(data)
      if (data.passed) {
        toast.success(`🏆 Harika! +${data.earnedPoints} puan kazandın!`)
        updateUser({ totalPoints: (user?.totalPoints || 0) + data.earnedPoints })
      } else {
        toast.error(`Quiz başarısız. Tekrar dene! (%${data.score})`)
      }
      qc.invalidateQueries({ queryKey: ['progress'] })
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || 'Hata oluştu')
    }
  })

  if (isLoading || !quiz) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-400">Quiz yükleniyor...</div>
      </div>
    )
  }

  const questions = quiz.questions
  const question = questions[currentQ]
  const totalQ = questions.length
  const allAnswered = questions.every((q: any) => answers[q.id])

  if (result) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 text-center">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
            result.passed ? 'bg-green-900/40 border-2 border-green-500' : 'bg-red-900/40 border-2 border-red-500'
          }`}>
            {result.passed ? (
              <Trophy size={40} className="text-green-400" />
            ) : (
              <XCircle size={40} className="text-red-400" />
            )}
          </div>

          <h2 className="text-3xl font-bold text-white mb-2">
            {result.passed ? 'Tebrikler! 🎉' : 'Neredeyse! 💪'}
          </h2>

          <div className="text-6xl font-bold mb-2" style={{ color: result.passed ? '#22c55e' : '#ef4444' }}>
            %{result.score}
          </div>

          <p className="text-slate-400 mb-2">
            {result.total} / {result.totalQ} doğru cevap
          </p>

          {result.earnedPoints > 0 && (
            <div className="inline-flex items-center gap-2 bg-yellow-900/30 border border-yellow-700 text-yellow-400 px-4 py-2 rounded-lg text-sm font-semibold mb-6">
              <Trophy size={16} />
              +{result.earnedPoints} puan kazandın!
            </div>
          )}

          {!result.passed && (
            <p className="text-slate-400 text-sm mb-6">Geçmek için en az %70 gerekli. Tekrar dene!</p>
          )}

          {/* Answer review */}
          <div className="text-left space-y-3 mt-6 mb-6">
            <h3 className="text-white font-semibold text-sm">Cevap Analizi:</h3>
            {result.results.map((r, i) => {
              const q = questions[i]
              return (
                <div key={r.questionId} className={`p-3 rounded-lg border text-sm ${
                  r.correct ? 'bg-green-900/20 border-green-800' : 'bg-red-900/20 border-red-800'
                }`}>
                  <div className="flex items-start gap-2">
                    {r.correct
                      ? <CheckCircle2 size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                      : <XCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                    }
                    <div>
                      <p className="text-slate-300">{q?.text}</p>
                      {!r.correct && (
                        <p className="text-red-300 text-xs mt-1">
                          Senin cevabın: <strong>{answers[r.questionId] || 'Boş'}</strong>
                          {' · '}Doğru: <strong>{r.correctAnswer}</strong>
                        </p>
                      )}
                      {r.explanation && (
                        <p className="text-slate-400 text-xs mt-1 italic">{r.explanation}</p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex gap-3 justify-center">
            {!result.passed && (
              <button
                onClick={() => { setResult(null); setAnswers({}); setCurrentQ(0) }}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                <RotateCcw size={16} /> Tekrar Dene
              </button>
            )}
            <button
              onClick={() => navigate('/learn')}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              Öğrenme Haritasına Dön <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(`/learn/${slug}`)} className="p-2 text-slate-400 hover:text-white">
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <p className="text-slate-400 text-sm">{topic?.title}</p>
          <h1 className="text-xl font-bold text-white">Quiz</h1>
        </div>
        <div className="text-indigo-400 font-semibold">
          +{topic?.quizPoints} puan
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-slate-400 mb-2">
          <span>Soru {currentQ + 1} / {totalQ}</span>
          <span>{Object.keys(answers).length} cevaplandı</span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full progress-bar"
            style={{ width: `${((currentQ + 1) / totalQ) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-6 fade-in">
        <p className="text-white text-lg font-medium leading-relaxed mb-6">
          {currentQ + 1}. {question.text}
        </p>

        <div className="space-y-3">
          {question.options?.map((option: string) => (
            <button
              key={option}
              onClick={() => setAnswers(a => ({ ...a, [question.id]: option }))}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                answers[question.id] === option
                  ? 'bg-indigo-600/30 border-indigo-500 text-white'
                  : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:border-slate-500 hover:text-white'
              }`}
            >
              <span className="font-medium">{option}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => setCurrentQ(i => Math.max(0, i - 1))}
          disabled={currentQ === 0}
          className="flex items-center gap-2 px-4 py-2.5 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors disabled:opacity-40"
        >
          <ArrowLeft size={16} /> Önceki
        </button>

        {currentQ < totalQ - 1 ? (
          <button
            onClick={() => setCurrentQ(i => i + 1)}
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
          >
            Sonraki <ArrowRight size={16} />
          </button>
        ) : (
          <button
            onClick={() => submitMutation.mutate()}
            disabled={!allAnswered || submitMutation.isPending}
            className="flex items-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors"
          >
            {submitMutation.isPending ? 'Gönderiliyor...' : `Gönder (${Object.keys(answers).length}/${totalQ})`}
          </button>
        )}
      </div>

      {/* Question dots */}
      <div className="flex justify-center gap-2 mt-6 flex-wrap">
        {questions.map((_: any, i: number) => (
          <button
            key={i}
            onClick={() => setCurrentQ(i)}
            className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${
              i === currentQ
                ? 'bg-indigo-600 text-white'
                : answers[questions[i].id]
                ? 'bg-green-700 text-white'
                : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}
