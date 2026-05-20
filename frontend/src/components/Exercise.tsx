import { useState } from 'react'
import { CheckCircle2, XCircle, Lightbulb, RotateCcw } from 'lucide-react'

export type ExerciseType = 'fill_blank' | 'multiple_choice' | 'code_output' | 'order_steps'

export interface ExerciseData {
  id: string
  type: ExerciseType
  question: string
  hint?: string
  options?: string[]
  answer: string | string[]
  explanation: string
  codeSnippet?: string
}

interface Props {
  exercise: ExerciseData
}

export default function Exercise({ exercise }: Props) {
  const [answer, setAnswer] = useState<string | string[]>(
    exercise.type === 'order_steps' ? [] : ''
  )
  const [submitted, setSubmitted] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [correct, setCorrect] = useState(false)

  const checkAnswer = () => {
    let isCorrect = false
    if (Array.isArray(exercise.answer)) {
      isCorrect = JSON.stringify(answer) === JSON.stringify(exercise.answer)
    } else {
      isCorrect = answer.toString().toLowerCase().trim() === exercise.answer.toLowerCase().trim()
    }
    setCorrect(isCorrect)
    setSubmitted(true)
  }

  const reset = () => {
    setAnswer(exercise.type === 'order_steps' ? [] : '')
    setSubmitted(false)
    setShowHint(false)
    setCorrect(false)
  }

  const toggleStep = (step: string) => {
    const arr = answer as string[]
    if (arr.includes(step)) {
      setAnswer(arr.filter(s => s !== step))
    } else {
      setAnswer([...arr, step])
    }
  }

  return (
    <div className={`mt-6 rounded-xl border-2 p-5 transition-all ${
      submitted
        ? correct ? 'border-green-600 bg-green-900/10' : 'border-red-600 bg-red-900/10'
        : 'border-indigo-700/60 bg-indigo-900/10'
    }`}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-800 text-indigo-300">
          ✏️ Alıştırma
        </span>
        {exercise.hint && !submitted && (
          <button
            onClick={() => setShowHint(!showHint)}
            className="ml-auto text-xs text-yellow-400 hover:text-yellow-300 flex items-center gap-1"
          >
            <Lightbulb size={12} /> {showHint ? 'İpucunu Gizle' : 'İpucu'}
          </button>
        )}
      </div>

      {/* Question */}
      <p className="text-white font-medium mb-3 leading-relaxed">{exercise.question}</p>

      {/* Code snippet */}
      {exercise.codeSnippet && (
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-300 font-mono mb-4 overflow-x-auto">
          {exercise.codeSnippet}
        </pre>
      )}

      {/* Hint */}
      {showHint && exercise.hint && (
        <div className="mb-3 p-3 bg-yellow-900/20 border border-yellow-700/50 rounded-lg text-yellow-300 text-sm flex items-start gap-2">
          <Lightbulb size={14} className="mt-0.5 flex-shrink-0" />
          {exercise.hint}
        </div>
      )}

      {/* Input - Multiple Choice */}
      {exercise.type === 'multiple_choice' && (
        <div className="space-y-2">
          {exercise.options?.map(opt => (
            <button
              key={opt}
              onClick={() => !submitted && setAnswer(opt)}
              disabled={submitted}
              className={`w-full text-left p-3 rounded-lg border text-sm transition-all ${
                submitted
                  ? opt === exercise.answer
                    ? 'border-green-500 bg-green-900/30 text-green-300'
                    : answer === opt
                    ? 'border-red-500 bg-red-900/30 text-red-300'
                    : 'border-slate-600 text-slate-400 opacity-60'
                  : answer === opt
                  ? 'border-indigo-500 bg-indigo-900/30 text-white'
                  : 'border-slate-600 text-slate-300 hover:border-slate-500 hover:text-white'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {/* Input - Fill blank */}
      {(exercise.type === 'fill_blank' || exercise.type === 'code_output') && (
        <input
          type="text"
          value={answer as string}
          onChange={e => !submitted && setAnswer(e.target.value)}
          disabled={submitted}
          className={`w-full bg-slate-800 border rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            submitted
              ? correct ? 'border-green-500' : 'border-red-500'
              : 'border-slate-600'
          }`}
          placeholder={exercise.type === 'code_output' ? 'Çıktıyı yazın...' : 'Cevabınızı yazın...'}
          onKeyDown={e => { if (e.key === 'Enter' && !submitted && answer) checkAnswer() }}
        />
      )}

      {/* Input - Order steps */}
      {exercise.type === 'order_steps' && (
        <div className="space-y-2">
          <p className="text-slate-400 text-xs mb-2">Adımları doğru sırayla seçin:</p>
          {exercise.options?.map(step => {
            const selected = (answer as string[]).includes(step)
            const idx = (answer as string[]).indexOf(step)
            return (
              <button
                key={step}
                onClick={() => !submitted && toggleStep(step)}
                disabled={submitted}
                className={`w-full text-left p-3 rounded-lg border text-sm transition-all flex items-center gap-3 ${
                  submitted
                    ? (exercise.answer as string[]).includes(step) && idx === (exercise.answer as string[]).indexOf(step)
                      ? 'border-green-500 bg-green-900/30 text-green-300'
                      : selected
                      ? 'border-red-500 bg-red-900/30 text-red-300'
                      : 'border-slate-600 text-slate-400 opacity-60'
                    : selected
                    ? 'border-indigo-500 bg-indigo-900/30 text-white'
                    : 'border-slate-600 text-slate-300 hover:border-slate-500'
                }`}
              >
                <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0 ${
                  selected ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-400'
                }`}>
                  {selected ? idx + 1 : '?'}
                </span>
                {step}
              </button>
            )
          })}
        </div>
      )}

      {/* Actions */}
      <div className="mt-4 flex items-center gap-3">
        {!submitted ? (
          <button
            onClick={checkAnswer}
            disabled={!answer || (Array.isArray(answer) && answer.length === 0)}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Kontrol Et
          </button>
        ) : (
          <button
            onClick={reset}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg transition-colors"
          >
            <RotateCcw size={14} /> Tekrar Dene
          </button>
        )}
      </div>

      {/* Result */}
      {submitted && (
        <div className={`mt-4 p-4 rounded-lg border ${
          correct ? 'bg-green-900/20 border-green-700' : 'bg-red-900/20 border-red-700'
        }`}>
          <div className={`flex items-center gap-2 font-semibold text-sm mb-2 ${correct ? 'text-green-400' : 'text-red-400'}`}>
            {correct ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
            {correct ? 'Doğru! 🎉' : 'Yanlış - Tekrar dene!'}
          </div>
          {!correct && (
            <div className="text-slate-300 text-sm mb-2">
              Doğru cevap: <strong className="text-green-300">
                {Array.isArray(exercise.answer) ? exercise.answer.join(' → ') : exercise.answer}
              </strong>
            </div>
          )}
          <p className="text-slate-400 text-sm">{exercise.explanation}</p>
        </div>
      )}
    </div>
  )
}
