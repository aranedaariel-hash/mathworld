import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { ZONE_CONFIGS } from '../data/zoneConfigs'
import { getZoneProgress } from '../data/exercises'

const SKIN_COLORS = ['#6C63FF', '#FF6B6B', '#FFD93D', '#6BCB77', '#4ECDC4', '#FF9F43', '#A855F7', '#3498DB']
const HATS = [
  { id: null, emoji: '😊', name: 'Ninguno', cost: 0 },
  { id: 'cap', emoji: '🧢', name: 'Gorra', cost: 20 },
  { id: 'wizard', emoji: '🧙', name: 'Mago', cost: 50 },
  { id: 'crown', emoji: '👑', name: 'Corona', cost: 100 },
  { id: 'rocket', emoji: '🚀', name: 'Cohete', cost: 150 },
]

function AvatarPreview({ file }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(80, 100)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 80 / 100, 0.1, 100)
    camera.position.set(0, 1.2, 3)
    camera.lookAt(0, 1, 0)

    scene.add(new THREE.AmbientLight(0xffffff, 1.5))
    const dir = new THREE.DirectionalLight(0xffffff, 1)
    dir.position.set(2, 4, 3)
    scene.add(dir)

    let afId
    const loader = new GLTFLoader()
    loader.load(`/models/${file}.glb`, (gltf) => {
      const model = gltf.scene
      scene.add(model)
      const animate = () => {
        afId = requestAnimationFrame(animate)
        model.rotation.y += 0.02
        renderer.render(scene, camera)
      }
      animate()
    })

    return () => {
      cancelAnimationFrame(afId)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [file])

  return <div ref={mountRef} />
}

export default function ProfileScreen({
  playerName, xp, level, mathCoins, streak, bestStreak,
  totalCorrect, totalAttempts, earnedBadges, completedExercises,
  skin, setSkin, onBack, resetGame, selectedCharacter, onChangeCharacter,
}) {
  const accuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0
  const xpInLevel = xp % 100

  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #1a0a3e 100%)' }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 p-4 flex-shrink-0">
        <button onClick={onBack} className="btn btn-ghost text-base px-4 py-2 min-h-0 h-10" style={{ fontSize: 16, minHeight: 40 }}>
          ← Volver
        </button>
        <h2 className="font-black text-white" style={{ fontSize: 24 }}>Mi Perfil 🧑‍🚀</h2>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-4 pb-8">
        <div className="max-w-lg mx-auto flex flex-col gap-5">

          {/* Avatar + stats */}
          <div className="card p-5 flex items-center gap-5">
            <div
              className="flex-shrink-0 flex items-center justify-center rounded-2xl overflow-hidden"
              style={{
                width: 80, height: 100,
                background: 'rgba(255,255,255,0.05)',
                boxShadow: '0 0 20px rgba(108,99,255,0.3)',
                cursor: 'pointer',
              }}
              onClick={onChangeCharacter}
              title="Cambiar personaje"
            >
              <AvatarPreview file={selectedCharacter || 'character-female-a'} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-black text-white" style={{ fontSize: 24 }}>{playerName}</p>
              <p className="text-purple-300" style={{ fontSize: 16 }}>Nivel {level} Explorador</p>
              <p
                onClick={onChangeCharacter}
                style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', cursor: 'pointer', marginTop: 2 }}
              >
                ✏️ Cambiar personaje
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                  <div className="h-full rounded-full xp-bar-fill" style={{ width: `${xpInLevel}%`, background: 'linear-gradient(90deg, #6C63FF, #A855F7)' }} />
                </div>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{xpInLevel}/100</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'XP Total', value: xp, icon: '⚡', color: '#A855F7' },
              { label: 'MathCoins', value: mathCoins, icon: '🪙', color: '#FFD93D' },
              { label: 'Racha Máxima', value: bestStreak, icon: '🔥', color: '#FF6B6B' },
              { label: 'Precisión', value: `${accuracy}%`, icon: '🎯', color: '#6BCB77' },
              { label: 'Correctas', value: totalCorrect, icon: '✅', color: '#4ECDC4' },
              { label: 'Badges', value: earnedBadges.length, icon: '🏅', color: '#FF9F43' },
            ].map(stat => (
              <div key={stat.label} className="card p-4 flex items-center gap-3">
                <span style={{ fontSize: 28 }}>{stat.icon}</span>
                <div>
                  <p className="font-black" style={{ fontSize: 22, color: stat.color }}>{stat.value}</p>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Color picker */}
          <div className="card p-4">
            <p className="font-black text-white mb-3" style={{ fontSize: 18 }}>🎨 Color del personaje</p>
            <div className="flex gap-3 flex-wrap">
              {SKIN_COLORS.map(color => (
                <button
                  key={color}
                  onClick={() => setSkin({ color })}
                  className="rounded-xl transition-transform"
                  style={{
                    width: 44, height: 44,
                    background: color,
                    border: skin.color === color ? '3px solid white' : '3px solid transparent',
                    boxShadow: skin.color === color ? `0 0 12px ${color}` : 'none',
                    transform: skin.color === color ? 'scale(1.15)' : 'scale(1)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Hat shop */}
          <div className="card p-4">
            <p className="font-black text-white mb-1" style={{ fontSize: 18 }}>🪙 Tienda de accesorios</p>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }} className="mb-3">Tenés {mathCoins} monedas</p>
            <div className="flex flex-col gap-2">
              {HATS.map(hat => {
                const owned = hat.cost === 0 || mathCoins >= hat.cost
                const active = skin.hat === hat.id
                return (
                  <button
                    key={hat.id ?? 'none'}
                    onClick={() => setSkin({ hat: hat.id })}
                    disabled={!owned && !active}
                    className="flex items-center gap-3 p-3 rounded-xl transition-all"
                    style={{
                      background: active ? 'rgba(108,99,255,0.3)' : 'rgba(255,255,255,0.05)',
                      border: active ? '2px solid #6C63FF' : '2px solid rgba(255,255,255,0.1)',
                      cursor: owned || active ? 'pointer' : 'not-allowed',
                      opacity: owned || active ? 1 : 0.5,
                    }}
                  >
                    <span style={{ fontSize: 28 }}>{hat.emoji}</span>
                    <div className="flex-1 text-left">
                      <p className="font-bold text-white" style={{ fontSize: 16 }}>{hat.name}</p>
                    </div>
                    {hat.cost > 0 && (
                      <span style={{ fontSize: 14, color: '#FFD93D' }}>🪙 {hat.cost}</span>
                    )}
                    {active && <span style={{ fontSize: 14, color: '#6C63FF' }}>✓ Activo</span>}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Badges */}
          <div className="card p-4">
            <p className="font-black text-white mb-3" style={{ fontSize: 18 }}>🏅 Mis badges</p>
            <div className="flex flex-col gap-2">
              {Object.entries(ZONE_CONFIGS).map(([zId, config]) => {
                const earned = earnedBadges.includes(config.badge.id)
                const progress = getZoneProgress(parseInt(zId), completedExercises)
                return (
                  <div
                    key={config.badge.id}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{
                      background: earned ? `rgba(${hexToRgb(config.mapColor)},0.15)` : 'rgba(255,255,255,0.04)',
                      border: earned ? `1px solid rgba(${hexToRgb(config.mapColor)},0.4)` : '1px solid rgba(255,255,255,0.08)',
                      opacity: earned ? 1 : 0.5,
                    }}
                  >
                    <span style={{ fontSize: 32, filter: earned ? 'none' : 'grayscale(1)' }}>
                      {config.badge.emoji}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white" style={{ fontSize: 16 }}>{config.badge.nombre}</p>
                      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
                        {config.name} · {progress.done}/{progress.total} ejercicios
                      </p>
                    </div>
                    {earned && <span style={{ fontSize: 18 }}>✅</span>}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Reset */}
          <button
            onClick={() => {
              if (window.confirm('¿Seguro que querés reiniciar tu progreso? Se borrará todo.')) {
                resetGame()
              }
            }}
            className="btn btn-ghost w-full"
            style={{ fontSize: 16, color: 'rgba(255,100,100,0.7)', borderColor: 'rgba(255,100,100,0.3)' }}
          >
            🗑️ Reiniciar progreso
          </button>

        </div>
      </div>
    </div>
  )
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r},${g},${b}`
}