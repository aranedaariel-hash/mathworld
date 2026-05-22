import { useState, useEffect } from 'react'

const EMOJIS_CORRECT = ['🎉', '⭐', '🌟', '🏆', '💫', '✨', '🎊', '🥇']
const EMOJIS_WRONG = ['🤔', '💪', '📚', '🎯']

export default function ExerciseModal({ exercise, streak, onAnswer, onClose }) {
  const [selected, setSelected] = useState(null)
  const [inputVal, setInputVal] = useState('')
  const [result, setResult] = useState(null) // null | 'correct' | 'wrong'
  const [attempts, setAttempts] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [emoji, setEmoji] = useState('')

  useEffect(() => {
    setSelected(null)
    setInputVal('')
    setResult(null)
    setAttempts(0)
    setShowHint(false)
    setEmoji('')
  }, [exercise?.id])

  if (!exercise) return null

  const isMultiple = exercise.tipo === 'opcion_multiple'
  const isNumber = exercise.tipo === 'numero'
  const isTF = exercise.tipo === 'verdadero_falso'
  const multiplier = streak >= 2 ? 2 : 1
  const canRetry = attempts < 1 && result === 'wrong'

  function handleSubmit(answer) {
    const isCorrect = answer === exercise.respuesta
    setResult(isCorrect ? 'correct' : 'wrong')
    setAttempts(a => a + 1)
    setEmoji(
      isCorrect
        ? EMOJIS_CORRECT[Math.floor(Math.random() * EMOJIS_CORRECT.length)]
        : EMOJIS_WRONG[Math.floor(Math.random() * EMOJIS_WRONG.length)]
    )
    if (!isCorrect && attempts >= 0) setShowHint(true)
    onAnswer(answer, isCorrect)
  }

  function handleNumberSubmit() {
    if (inputVal.trim() === '') return
    handleSubmit(inputVal.trim().replace(/\./g, '').replace(/,/g, '.'))
  }

  const isCorrectAnswer = result === 'correct'
  const isFinalWrong = result === 'wrong' && attempts >= 1

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
    >
      <div
        className="card w-full max-w-lg anim-pop"
        style={{
          background: isCorrectAnswer
            ? 'linear-gradient(135deg, rgba(107,203,119,0.2) 0%, rgba(10,20,10,0.95) 100%)'
            : isFinalWrong
            ? 'linear-gradient(135deg, rgba(255,71,87,0.15) 0%, rgba(20,10,10,0.95) 100%)'
            : 'linear-gradient(135deg, rgba(108,99,255,0.15) 0%, rgba(15,12,40,0.97) 100%)',
          border: isCorrectAnswer
            ? '2px solid #6BCB77'
            : isFinalWrong
            ? '2px solid #FF4757'
            : '2px solid rgba(108,99,255,0.4)',
          boxShadow: isCorrectAnswer
            ? '0 0 40px rgba(107,203,119,0.3)'
            : '0 20px 60px rgba(0,0,0,0.6)',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <div className="p-6 flex flex-col gap-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 flex-1 flex-wrap">
              {exercise.nivel === 2 && (
                <span
                  className="px-2 py-0.5 rounded-full font-black"
                  style={{ background: '#FFD93D', color: '#333', fontSize: 13 }}
                >
                  ⭐ Desafío
                </span>
              )}
              {multiplier > 1 && (
                <span
                  className="px-2 py-0.5 rounded-full font-black flex items-center gap-1"
                  style={{ background: 'rgba(255,107,107,0.3)', color: '#FF6B6B', fontSize: 13, border: '1px solid #FF6B6B' }}
                >
                  🔥 ×2 monedas!
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                +{exercise.xp * multiplier} XP · +{exercise.monedas * multiplier}🪙
              </span>
            </div>
          </div>

          {/* Question */}
          <div
            className="text-white font-bold leading-snug text-center"
            style={{ fontSize: 22 }}
          >
            {exercise.pregunta}
          </div>

          {/* Answer section */}
          {!result && (
            <>
              {isMultiple && (
                <div className="grid grid-cols-2 gap-3">
                  {exercise.opciones.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSubmit(opt)}
                      className="btn"
                      style={{
                        background: selected === opt
                          ? 'rgba(108,99,255,0.4)'
                          : 'rgba(255,255,255,0.08)',
                        border: selected === opt
                          ? '2px solid #6C63FF'
                          : '2px solid rgba(255,255,255,0.15)',
                        color: 'white',
                        fontSize: 20,
                        minHeight: 60,
                        borderRadius: 16,
                        transition: 'all 0.15s',
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {isNumber && (
                <div className="flex flex-col gap-3">
                  <input
                    type="number"
                    value={inputVal}
                    onChange={e => setInputVal(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleNumberSubmit()}
                    placeholder="Escribí tu respuesta..."
                    className="w-full text-center font-black text-white rounded-2xl"
                    style={{
                      fontSize: 28,
                      background: 'rgba(255,255,255,0.1)',
                      border: '2px solid rgba(108,99,255,0.4)',
                      padding: '14px 20px',
                      outline: 'none',
                    }}
                    autoFocus
                  />
                  <button
                    onClick={handleNumberSubmit}
                    className="btn btn-primary w-full"
                    style={{ fontSize: 22 }}
                    disabled={!inputVal.trim()}
                  >
                    ¡Responder! 🎯
                  </button>
                </div>
              )}

              {isTF && (
                <div className="flex gap-4">
                  <button
                    onClick={() => handleSubmit('Verdadero')}
                    className="btn flex-1"
                    style={{
                      background: 'rgba(107,203,119,0.2)',
                      border: '2px solid #6BCB77',
                      color: '#6BCB77',
                      fontSize: 22,
                      minHeight: 64,
                    }}
                  >
                    ✅ Verdadero
                  </button>
                  <button
                    onClick={() => handleSubmit('Falso')}
                    className="btn flex-1"
                    style={{
                      background: 'rgba(255,71,87,0.2)',
                      border: '2px solid #FF4757',
                      color: '#FF4757',
                      fontSize: 22,
                      minHeight: 64,
                    }}
                  >
                    ❌ Falso
                  </button>
                </div>
              )}
            </>
          )}

          {/* Result feedback */}
          {result && (
            <div
              className="flex flex-col items-center gap-4 anim-pop"
              style={{ opacity: 0, animationFillMode: 'forwards' }}
            >
              <div style={{ fontSize: 72 }}>{emoji}</div>

              {isCorrectAnswer ? (
                <div className="text-center">
                  <p className="font-black text-green-400" style={{ fontSize: 28 }}>
                    ¡Correcto!
                  </p>
                  <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>
                    +{exercise.xp * multiplier} XP · +{exercise.monedas * multiplier} 🪙
                    {multiplier > 1 && <span className="text-yellow-300"> (¡racha x2!)</span>}
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="font-black text-red-400" style={{ fontSize: 24 }}>
                    {attempts <= 1 ? '¡Casi! Intentá de nuevo' : 'La respuesta era:'}
                  </p>
                  {attempts > 1 && (
                    <p className="font-black text-white" style={{ fontSize: 22, marginTop: 4 }}>
                      {exercise.respuesta}
                    </p>
                  )}
                </div>
              )}

              {/* Hint */}
              {showHint && (
                <div
                  className="card p-4 w-full"
                  style={{
                    background: 'rgba(255,217,61,0.1)',
                    border: '1px solid rgba(255,217,61,0.4)',
                  }}
                >
                  <p style={{ fontSize: 16, color: '#FFD93D' }}>
                    💡 <strong>Pista:</strong> {exercise.pista}
                  </p>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-3 w-full">
                {canRetry && (
                  <button
                    onClick={() => { setResult(null); setSelected(null); setInputVal('') }}
                    className="btn btn-warning flex-1"
                    style={{ fontSize: 20 }}
                  >
                    🔄 Reintentar
                  </button>
                )}
                <button
                  onClick={onClose}
                  className={`btn flex-1 ${isCorrectAnswer ? 'btn-success' : 'btn-ghost'}`}
                  style={{ fontSize: 20 }}
                >
                  {isCorrectAnswer ? '¡Seguir! 🚀' : 'Continuar'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
