import { useState } from 'react'

export default function IntroScreen({ onStart }) {
  const [name, setName] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    onStart(name || 'Explorador')
  }

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 80% 80% at 50% 50%, #1a0a3e 0%, #050515 100%)',
      }}
    >
      {/* Animated stars */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            background: 'white',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.8 + 0.1,
            animation: `float-y ${2 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}

      {/* Glowing orbs */}
      <div
        className="absolute rounded-full"
        style={{
          width: 300, height: 300,
          background: 'radial-gradient(circle, rgba(108,99,255,0.3) 0%, transparent 70%)',
          top: '10%', left: '10%',
          animation: 'float-y 6s ease-in-out infinite',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 200, height: 200,
          background: 'radial-gradient(circle, rgba(168,85,247,0.25) 0%, transparent 70%)',
          bottom: '15%', right: '10%',
          animation: 'float-y 5s ease-in-out infinite',
          animationDelay: '2s',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 w-full max-w-md">
        {/* Logo */}
        <div className="text-center anim-float">
          <div style={{ fontSize: 80 }}>🚀</div>
          <h1
            className="font-black text-white mt-2"
            style={{
              fontSize: 'clamp(32px, 8vw, 52px)',
              textShadow: '0 0 30px rgba(108,99,255,0.8)',
              letterSpacing: '-1px',
            }}
          >
            Expedición
          </h1>
          <h1
            className="font-black mt-1"
            style={{
              fontSize: 'clamp(32px, 8vw, 52px)',
              background: 'linear-gradient(135deg, #FFD93D, #FF6B6B, #6C63FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-1px',
            }}
          >
            Matemática
          </h1>
          <p className="text-purple-300 mt-2" style={{ fontSize: 18 }}>
            9 zonas · 54 ejercicios · ¡Aventura sin fin!
          </p>
        </div>

        {/* Zone previews */}
        <div className="flex gap-2 flex-wrap justify-center">
          {['🚀','🔢','🗺️','💰','🔺','✖️','📏','🧮','🏛️'].map((e, i) => (
            <div
              key={i}
              className="card flex items-center justify-center"
              style={{
                width: 44, height: 44, fontSize: 22,
                animation: `bounce-up 1.2s ease-in-out infinite`,
                animationDelay: `${i * 0.15}s`,
              }}
            >
              {e}
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div>
            <label
              className="block font-black text-purple-300 mb-2"
              style={{ fontSize: 18 }}
            >
              ¿Cómo te llamás, explorador?
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={20}
              placeholder="Tu nombre aquí..."
              className="w-full rounded-2xl font-bold text-white"
              style={{
                fontSize: 22,
                background: 'rgba(255,255,255,0.08)',
                border: '2px solid rgba(108,99,255,0.5)',
                padding: '14px 20px',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = '#6C63FF'}
              onBlur={e => e.target.style.borderColor = 'rgba(108,99,255,0.5)'}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full anim-pulse"
            style={{ fontSize: 24, minHeight: 64 }}
          >
            ¡Empezar aventura! 🚀
          </button>
        </form>

        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>
          Tu progreso se guarda automáticamente 💾
        </p>
      </div>
    </div>
  )
}
