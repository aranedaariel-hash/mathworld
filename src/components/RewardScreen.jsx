import { useEffect, useState } from 'react'

export default function RewardScreen({ badge, zoneId, onContinue }) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400)
    const t2 = setTimeout(() => setPhase(2), 1200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (!badge) return null

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center z-50 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #1a0a3e 0%, #0a0520 100%)',
      }}
    >
      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
              background: 'white',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.1,
              animation: `float-y ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Confetti particles */}
      {phase >= 1 && Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${5 + Math.random() * 90}%`,
            animationDuration: `${1.5 + Math.random() * 1.5}s`,
            animationDelay: `${Math.random() * 0.5}s`,
            fontSize: `${20 + Math.random() * 16}px`,
          }}
        >
          {['⭐', '🌟', '✨', '💫', '🎉', '🎊', '🏆', '💎'][Math.floor(Math.random() * 8)]}
        </div>
      ))}

      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center max-w-md w-full">
        {/* Header */}
        {phase >= 0 && (
          <div
            className="anim-slide-up"
            style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}
          >
            <p className="font-black text-yellow-300" style={{ fontSize: 22 }}>
              ¡Zona completada! 🎉
            </p>
          </div>
        )}

        {/* Badge */}
        {phase >= 1 && (
          <div className="anim-badge" style={{ opacity: 0, animationFillMode: 'forwards' }}>
            <div
              className="flex flex-col items-center gap-3 card px-8 py-6"
              style={{
                background: 'rgba(255,215,61,0.15)',
                border: '3px solid #FFD93D',
                boxShadow: '0 0 40px rgba(255,215,61,0.4)',
              }}
            >
              <div style={{ fontSize: 80 }}>{badge.emoji}</div>
              <div>
                <p className="font-black text-yellow-300" style={{ fontSize: 24 }}>
                  {badge.nombre}
                </p>
                <p className="text-white mt-1" style={{ fontSize: 16, opacity: 0.8 }}>
                  Zona {zoneId} completada
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bonus info */}
        {phase >= 2 && (
          <div
            className="anim-pop flex gap-4"
            style={{ opacity: 0, animationFillMode: 'forwards' }}
          >
            <div className="card px-5 py-3 flex items-center gap-2">
              <span style={{ fontSize: 24 }}>⚡</span>
              <span className="font-black text-purple-300" style={{ fontSize: 20 }}>+50 XP</span>
            </div>
            <div className="card px-5 py-3 flex items-center gap-2">
              <span style={{ fontSize: 24 }}>🪙</span>
              <span className="font-black text-yellow-300" style={{ fontSize: 20 }}>+50 monedas</span>
            </div>
          </div>
        )}

        {/* Continue button */}
        {phase >= 2 && (
          <div
            className="anim-slide-up w-full"
            style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}
          >
            <button
              onClick={onContinue}
              className="btn btn-success w-full"
              style={{ fontSize: 22 }}
            >
              ¡Seguir explorando! 🗺️
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
