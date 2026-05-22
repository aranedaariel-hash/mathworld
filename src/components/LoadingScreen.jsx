import { useEffect, useState, useMemo } from 'react'

// Stars are computed once on mount (stable random positions)
function useStars(count) {
  return useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    left: Math.random() * 100,
    top:  Math.random() * 100,
    opacity: Math.random() * 0.6 + 0.1,
    dur:  2 + Math.random() * 3,
    delay: Math.random() * 2,
  })), [count])
}

export default function LoadingScreen({
  progress = 0,
  zoneName = '',
  zoneEmoji = '🚀',
  accentColor = '#6C63FF',
  subtext = '',
}) {
  const [dots, setDots] = useState('')
  const stars = useStars(50)

  useEffect(() => {
    const t = setInterval(() => setDots(d => (d.length >= 3 ? '' : d + '.')), 380)
    return () => clearInterval(t)
  }, [])

  const clamp = Math.min(100, Math.max(0, progress))

  return (
    <div
      className="absolute inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 90% 80% at 50% 40%, #1a0a3e 0%, #050515 100%)' }}
    >
      {/* Stars */}
      {stars.map(s => (
        <div
          key={s.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: s.size, height: s.size,
            background: 'white',
            left: `${s.left}%`, top: `${s.top}%`,
            opacity: s.opacity,
            animation: `float-y ${s.dur}s ease-in-out infinite`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      {/* Glow orbs */}
      <div className="absolute pointer-events-none" style={{
        width: 320, height: 320, borderRadius: '50%',
        background: `radial-gradient(circle, ${accentColor}33 0%, transparent 70%)`,
        top: '5%', left: '5%',
        animation: 'float-y 7s ease-in-out infinite',
      }} />
      <div className="absolute pointer-events-none" style={{
        width: 220, height: 220, borderRadius: '50%',
        background: 'radial-gradient(circle, #FFD93D22 0%, transparent 70%)',
        bottom: '10%', right: '8%',
        animation: 'float-y 5s ease-in-out infinite',
        animationDelay: '2.5s',
      }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-5 text-center px-8 max-w-xs w-full">

        {/* Zone emoji / logo */}
        <div
          className="anim-float"
          style={{
            fontSize: 72,
            filter: `drop-shadow(0 0 18px ${accentColor}99)`,
          }}
        >
          {zoneEmoji}
        </div>

        {/* Title */}
        <div style={{ lineHeight: 1.1 }}>
          <div className="font-black text-white" style={{ fontSize: 34, letterSpacing: '-1px' }}>
            Expedición
          </div>
          <div
            className="font-black"
            style={{
              fontSize: 34, letterSpacing: '-1px',
              background: `linear-gradient(135deg, ${accentColor} 0%, #FFD93D 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Matemática
          </div>
        </div>

        {/* Zone label */}
        {zoneName && (
          <div
            className="card px-5 py-2 anim-pop"
            style={{
              border: `1px solid ${accentColor}66`,
              background: `${accentColor}18`,
              opacity: 0,
              animationFillMode: 'forwards',
            }}
          >
            <p className="font-bold" style={{ color: accentColor, fontSize: 17 }}>
              {zoneEmoji} {zoneName}
            </p>
          </div>
        )}

        {/* Progress bar */}
        <div className="w-full flex flex-col gap-2">
          <div
            className="w-full rounded-full overflow-hidden"
            style={{ height: 10, background: 'rgba(255,255,255,0.08)' }}
          >
            <div
              style={{
                height: '100%',
                width: `${clamp}%`,
                borderRadius: 9999,
                background: `linear-gradient(90deg, ${accentColor} 0%, #FFD93D 100%)`,
                transition: 'width 0.18s cubic-bezier(0.4,0,0.2,1)',
                boxShadow: `0 0 14px ${accentColor}88`,
              }}
            />
          </div>

          {/* Percentage + text */}
          <div className="flex justify-between items-center">
            <p className="font-bold text-purple-300" style={{ fontSize: 15 }}>
              {subtext || `Preparando la expedición${dots}`}
            </p>
            <span
              className="font-black"
              style={{ fontSize: 14, color: accentColor, minWidth: 38, textAlign: 'right' }}
            >
              {Math.round(clamp)}%
            </span>
          </div>
        </div>

        {/* Step hint */}
        {clamp < 100 && (
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.28)' }}>
            {clamp < 25  ? '⚙️ Iniciando motor 3D...' :
             clamp < 50  ? '💡 Configurando iluminación...' :
             clamp < 70  ? '🏗️ Construyendo el mundo...' :
             clamp < 85  ? '🧑‍🤝‍🧑 Preparando personajes...' :
                           '🎨 Agregando detalles...'}
          </p>
        )}
        {clamp >= 100 && (
          <p style={{ fontSize: 14, color: '#6BCB77', fontWeight: 700 }}>
            ✅ ¡Listo para explorar!
          </p>
        )}
      </div>
    </div>
  )
}
