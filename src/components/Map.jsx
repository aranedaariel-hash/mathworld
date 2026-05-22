import { ZONE_CONFIGS } from '../data/zoneConfigs'
import { getZoneProgress } from '../data/exercises'

const ZONE_ORDER = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export default function Map({
  unlockedZones, completedExercises, earnedBadges,
  xp, level, mathCoins, playerName, streak,
  onEnterZone, onProfile,
}) {
  const xpInLevel = xp % 100

  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 120% 100% at 50% 0%, #1a0a3e 0%, #050515 100%)',
      }}
    >
      {/* Stars */}
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            background: 'white',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.1,
          }}
        />
      ))}

      {/* Top HUD */}
      <div className="relative z-10 flex items-center gap-3 p-4 flex-shrink-0">
        {/* Player info */}
        <button
          onClick={onProfile}
          className="card flex items-center gap-3 px-4 py-2 flex-1 min-w-0"
          style={{ cursor: 'pointer', textAlign: 'left' }}
        >
          <div
            className="flex-shrink-0 flex items-center justify-center rounded-full"
            style={{
              width: 44, height: 44, fontSize: 22,
              background: 'linear-gradient(135deg, #6C63FF, #A855F7)',
            }}
          >
            🧑‍🚀
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-black text-white truncate" style={{ fontSize: 18 }}>
              {playerName}
            </p>
            <p className="text-purple-300" style={{ fontSize: 14 }}>
              Nv. {level} · {xp} XP total
            </p>
          </div>
          {streak >= 3 && (
            <span className="flex-shrink-0" style={{ fontSize: 20 }}>🔥</span>
          )}
        </button>

        {/* Coins */}
        <div className="card px-4 py-3 flex items-center gap-2 flex-shrink-0">
          <span style={{ fontSize: 22 }}>🪙</span>
          <span className="font-black text-yellow-300" style={{ fontSize: 22 }}>{mathCoins}</span>
        </div>
      </div>

      {/* Title */}
      <div className="relative z-10 text-center px-4 flex-shrink-0">
        <h2 className="font-black text-white" style={{ fontSize: 28 }}>
          🗺️ Elige tu zona
        </h2>
        <p className="text-purple-300" style={{ fontSize: 16 }}>
          {unlockedZones.length}/9 zonas desbloqueadas
        </p>
      </div>

      {/* XP bar */}
      <div className="relative z-10 px-4 mt-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span style={{ fontSize: 14, color: '#FFD93D' }}>⚡</span>
          <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <div
              className="h-full rounded-full xp-bar-fill"
              style={{
                width: `${xpInLevel}%`,
                background: 'linear-gradient(90deg, #6C63FF, #A855F7)',
              }}
            />
          </div>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{xpInLevel}/100</span>
        </div>
      </div>

      {/* Zones grid */}
      <div
        className="relative z-10 flex-1 overflow-y-auto p-4"
        style={{ paddingBottom: 24 }}
      >
        <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {ZONE_ORDER.map(zoneId => {
            const config = ZONE_CONFIGS[zoneId]
            const unlocked = unlockedZones.includes(zoneId)
            const progress = getZoneProgress(zoneId, completedExercises)
            const completed = progress.done === progress.total && progress.total > 0
            const hasBadge = earnedBadges.includes(config.badge.id)

            return (
              <ZoneCard
                key={zoneId}
                zoneId={zoneId}
                config={config}
                unlocked={unlocked}
                progress={progress}
                completed={completed}
                hasBadge={hasBadge}
                onEnter={() => onEnterZone(zoneId)}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

function ZoneCard({ zoneId, config, unlocked, progress, completed, hasBadge, onEnter }) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden ${!unlocked ? 'zone-locked' : ''}`}
      style={{
        background: unlocked
          ? `linear-gradient(135deg, rgba(${hexToRgb(config.mapColor)},0.2) 0%, rgba(15,12,40,0.9) 100%)`
          : 'rgba(30,30,50,0.6)',
        border: completed
          ? `2px solid ${config.mapColor}`
          : unlocked
          ? `1px solid rgba(${hexToRgb(config.mapColor)},0.4)`
          : '1px solid rgba(255,255,255,0.08)',
        boxShadow: completed ? `0 0 20px rgba(${hexToRgb(config.mapColor)},0.3)` : 'none',
        cursor: unlocked ? 'pointer' : 'default',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onClick={unlocked ? onEnter : undefined}
      onMouseEnter={e => { if (unlocked) e.currentTarget.style.transform = 'scale(1.02)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
    >
      <div className="p-4 flex items-center gap-4">
        {/* Emoji */}
        <div
          className="flex-shrink-0 flex items-center justify-center rounded-2xl"
          style={{
            width: 60, height: 60, fontSize: 32,
            background: unlocked
              ? `rgba(${hexToRgb(config.mapColor)},0.2)`
              : 'rgba(255,255,255,0.05)',
            border: `1px solid rgba(${hexToRgb(config.mapColor)},0.3)`,
          }}
        >
          {unlocked ? config.emoji : '🔒'}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-black text-white" style={{ fontSize: 17 }}>
              Zona {zoneId}
            </span>
            {hasBadge && <span style={{ fontSize: 16 }}>{config.badge.emoji}</span>}
          </div>
          <p
            className="font-bold truncate"
            style={{ fontSize: 15, color: unlocked ? config.mapColor : 'rgba(255,255,255,0.3)' }}
          >
            {config.name}
          </p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>
            {config.description}
          </p>

          {/* Progress bar */}
          {unlocked && (
            <div className="mt-2 flex items-center gap-2">
              <div
                className="flex-1 h-2 rounded-full overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.1)' }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress.pct}%`,
                    background: completed
                      ? config.mapColor
                      : `linear-gradient(90deg, ${config.mapColor}88, ${config.mapColor})`,
                    transition: 'width 0.5s ease',
                  }}
                />
              </div>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', flexShrink: 0 }}>
                {progress.done}/{progress.total}
              </span>
            </div>
          )}
        </div>

        {/* Arrow or lock */}
        <div className="flex-shrink-0">
          {unlocked ? (
            <span style={{ fontSize: 22, color: config.mapColor }}>▶</span>
          ) : (
            <span style={{ fontSize: 22, color: 'rgba(255,255,255,0.2)' }}>🔒</span>
          )}
        </div>
      </div>

      {/* Completed banner */}
      {completed && (
        <div
          className="absolute top-2 right-2 px-2 py-0.5 rounded-full font-black"
          style={{ background: config.mapColor, color: 'white', fontSize: 11 }}
        >
          ✓ Completada
        </div>
      )}
    </div>
  )
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r},${g},${b}`
}
