export default function HUD({ xp, level, mathCoins, streak, zoneName, zoneEmoji, onBack }) {
  const xpInLevel = xp % 100
  const streakBonus = streak >= 3

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 p-3 pointer-events-auto">
        <div className="flex items-center gap-3">
          {/* Back button */}
          <button
            onClick={onBack}
            className="btn btn-ghost text-base px-4 py-2 min-h-0 h-10 pointer-events-auto flex-shrink-0"
            style={{ fontSize: 16, minHeight: 40 }}
          >
            ← Mapa
          </button>

          {/* Zone name */}
          <div
            className="card px-4 py-2 flex items-center gap-2 flex-1 min-w-0"
            style={{ backdropFilter: 'blur(10px)' }}
          >
            <span style={{ fontSize: 20 }}>{zoneEmoji}</span>
            <span
              className="font-black text-white truncate"
              style={{ fontSize: 16 }}
            >
              {zoneName}
            </span>
          </div>

          {/* Coins */}
          <div
            className="card px-3 py-2 flex items-center gap-1 flex-shrink-0"
            style={{ backdropFilter: 'blur(10px)' }}
          >
            <span style={{ fontSize: 18 }}>🪙</span>
            <span className="font-black text-yellow-300" style={{ fontSize: 18 }}>
              {mathCoins}
            </span>
          </div>
        </div>

        {/* XP bar */}
        <div className="mt-2 flex items-center gap-2">
          <div
            className="card px-2 py-1 flex items-center gap-1 flex-shrink-0"
            style={{ backdropFilter: 'blur(10px)' }}
          >
            <span style={{ fontSize: 14, color: '#FFD93D' }}>⚡ Nv.{level}</span>
          </div>
          <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <div
              className="h-full rounded-full xp-bar-fill"
              style={{
                width: `${xpInLevel}%`,
                background: 'linear-gradient(90deg, #6C63FF, #A855F7)',
                boxShadow: '0 0 8px rgba(108,99,255,0.8)',
              }}
            />
          </div>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', flexShrink: 0 }}>
            {xpInLevel}/100
          </span>
        </div>
      </div>

      {/* Streak indicator */}
      {streak >= 2 && (
        <div
          className="absolute top-24 left-1/2 -translate-x-1/2 card px-4 py-2 flex items-center gap-2"
          style={{
            backdropFilter: 'blur(10px)',
            border: streakBonus
              ? '2px solid #FFD93D'
              : '1px solid rgba(255,255,255,0.2)',
            animation: 'pulse-scale 1s ease-in-out infinite',
          }}
        >
          <span style={{ fontSize: 20 }}>🔥</span>
          <span className="font-black text-yellow-300" style={{ fontSize: 18 }}>
            ×{streak} racha{streakBonus ? ' (x2 monedas!)' : ''}
          </span>
        </div>
      )}

      {/* Crosshair */}
      <div
        className="absolute crosshair"
        style={{
          top: '50%',
          left: '50%',
          width: 0,
          height: 0,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Desktop hint (bottom center) */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center"
        style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, pointerEvents: 'none' }}
      >
        WASD para mover · Ratón para mirar · <kbd style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 4, padding: '1px 5px' }}>E</kbd> interactuar
      </div>
    </div>
  )
}
