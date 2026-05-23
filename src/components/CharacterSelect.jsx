import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const FEMALES = [
  'character-female-a', 'character-female-b', 'character-female-c',
  'character-female-d', 'character-female-e', 'character-female-f',
]
const MALES = [
  'character-male-a', 'character-male-b', 'character-male-c',
  'character-male-d', 'character-male-e', 'character-male-f',
]
const PETS = [
  { file: 'animal-beaver',     name: 'Castor',    emoji: '🦫' },
  { file: 'animal-bee',        name: 'Abeja',     emoji: '🐝' },
  { file: 'animal-bunny',      name: 'Conejo',    emoji: '🐰' },
  { file: 'animal-cat',        name: 'Gato',      emoji: '🐱' },
  { file: 'animal-caterpillar',name: 'Oruga',     emoji: '🐛' },
  { file: 'animal-chick',      name: 'Pollito',   emoji: '🐥' },
  { file: 'animal-cow',        name: 'Vaca',      emoji: '🐮' },
  { file: 'animal-crab',       name: 'Cangrejo',  emoji: '🦀' },
  { file: 'animal-deer',       name: 'Ciervo',    emoji: '🦌' },
  { file: 'animal-dog',        name: 'Perro',     emoji: '🐶' },
  { file: 'animal-elephant',   name: 'Elefante',  emoji: '🐘' },
  { file: 'animal-fish',       name: 'Pez',       emoji: '🐟' },
  { file: 'animal-fox',        name: 'Zorro',     emoji: '🦊' },
  { file: 'animal-giraffe',    name: 'Jirafa',    emoji: '🦒' },
  { file: 'animal-hog',        name: 'Chancho',   emoji: '🐷' },
  { file: 'animal-koala',      name: 'Koala',     emoji: '🐨' },
  { file: 'animal-lion',       name: 'León',      emoji: '🦁' },
  { file: 'animal-monkey',     name: 'Mono',      emoji: '🐒' },
  { file: 'animal-panda',      name: 'Panda',     emoji: '🐼' },
  { file: 'animal-parrot',     name: 'Loro',      emoji: '🦜' },
  { file: 'animal-penguin',    name: 'Pingüino',  emoji: '🐧' },
  { file: 'animal-pig',        name: 'Cerdo',     emoji: '🐷' },
  { file: 'animal-polar',      name: 'Oso Polar', emoji: '🐻‍❄️' },
  { file: 'animal-tiger',      name: 'Tigre',     emoji: '🐯' },
]

function ModelPreview({ path, width = 120, height = 160, fallbackEmoji = '🐾' }) {
  const mountRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (!hovered) return
    setFailed(false)
    const mount = mountRef.current
    if (!mount) return
    let mounted = true
    let disposed = false
    let afId

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const dispose = () => {
      if (disposed) return
      disposed = true
      cancelAnimationFrame(afId)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    scene.add(new THREE.AmbientLight(0xffffff, 1.5))
    const dir = new THREE.DirectionalLight(0xffffff, 1)
    dir.position.set(2, 4, 3)
    scene.add(dir)

    new GLTFLoader().load(
      path,
      (gltf) => {
        if (!mounted) { dispose(); return }
        const model = gltf.scene
        scene.add(model)
        const box = new THREE.Box3().setFromObject(model)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())
        const maxDim = Math.max(size.x, size.y, size.z)
        const dist = maxDim * 2.2
        model.position.sub(center)
        model.position.y += size.y / 2
        camera.position.set(0, size.y * 0.5, dist)
        camera.lookAt(0, size.y * 0.3, 0)
        camera.near = dist * 0.01
        camera.far = dist * 10
        camera.updateProjectionMatrix()
        const animate = () => {
          if (!mounted) return
          afId = requestAnimationFrame(animate)
          try {
            model.rotation.y += 0.02
            renderer.render(scene, camera)
          } catch (e) { dispose(); if (mounted) setFailed(true) }
        }
        animate()
      },
      undefined,
      () => { if (mounted) setFailed(true); dispose() }
    )

    return () => { mounted = false; dispose() }
  }, [hovered, path])

  const fontSize = width > 100 ? 52 : 36

  if (failed) return (
    <div style={{ width, height, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize }}>
      {fallbackEmoji}
    </div>
  )

  return (
    <div
      style={{ width, height, position: 'relative' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setFailed(false) }}
    >
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize }}>
        {fallbackEmoji}
      </div>
      <div ref={mountRef} style={{ position: 'relative', zIndex: 1 }} />
    </div>
  )
}

export default function CharacterSelect({
  playerName, selected, onSelect,
  selectedPet, onSelectPet,
  onConfirm, onBack,
}) {
  const [section, setSection] = useState('character')
  const [tab, setTab] = useState('female')
  const characters = tab === 'female' ? FEMALES : MALES
  const selectedPetData = PETS.find(p => p.file === selectedPet)

  return (
    <div className="w-screen h-screen overflow-auto flex flex-col items-center"
      style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)', padding: 24 }}>

      <div className="text-center mb-4">
        <div style={{ fontSize: 48 }}>{section === 'character' ? '🧑‍🚀' : '🐾'}</div>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: 'white', margin: 0 }}>
          {section === 'character' ? '¡Elegí tu personaje!' : '¡Elegí tu mascota!'}
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>
          Hola <strong style={{ color: '#FFD93D' }}>{playerName}</strong>,{' '}
          {section === 'character' ? '¿quién querés ser?' : '¿quién te va a acompañar?'}
        </p>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        {[
          { key: 'character', label: '🧑‍🚀 Personaje' },
          { key: 'pet',       label: '🐾 Mascota' },
        ].map(s => (
          <button key={s.key} onClick={() => setSection(s.key)} className="btn"
            style={{
              background: section === s.key
                ? 'linear-gradient(135deg, #FF9F43, #FF6B6B)'
                : 'rgba(255,255,255,0.1)',
              color: 'white', fontSize: 15, padding: '10px 24px',
            }}>
            {s.label}
          </button>
        ))}
      </div>

      {section === 'character' && (
        <>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            {['female', 'male'].map(t => (
              <button key={t} onClick={() => setTab(t)} className="btn"
                style={{
                  background: tab === t
                    ? 'linear-gradient(135deg, #6C63FF, #A855F7)'
                    : 'rgba(255,255,255,0.1)',
                  color: 'white', fontSize: 15, padding: '8px 22px',
                }}>
                {t === 'female' ? '👧 Nena' : '👦 Nene'}
              </button>
            ))}
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16, width: '100%', maxWidth: 500, marginBottom: 24,
          }}>
            {characters.map(char => (
              <div key={char} onClick={() => onSelect(char)}
                style={{
                  background: selected === char
                    ? 'linear-gradient(135deg, rgba(108,99,255,0.4), rgba(168,85,247,0.4))'
                    : 'rgba(255,255,255,0.06)',
                  border: selected === char ? '3px solid #A855F7' : '2px solid rgba(255,255,255,0.1)',
                  borderRadius: 20, padding: 12, cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  transition: 'all 0.2s',
                  boxShadow: selected === char ? '0 0 20px rgba(168,85,247,0.5)' : 'none',
                }}>
                <ModelPreview
                  path={`/models/${char}.glb`}
                  fallbackEmoji={char.includes('female') ? '👧' : '👦'}
                />
                <p style={{
                  color: selected === char ? '#FFD93D' : 'rgba(255,255,255,0.6)',
                  fontSize: 12, fontWeight: 700, marginTop: 8, textAlign: 'center',
                }}>
                  {char.replace('character-female-', 'F-').replace('character-male-', 'M-').toUpperCase()}
                </p>
                {selected === char && <span style={{ fontSize: 18 }}>✅</span>}
              </div>
            ))}
          </div>
        </>
      )}

      {section === 'pet' && (
        <>
          <div
            onClick={() => onSelectPet(null)}
            style={{
              background: selectedPet === null
                ? 'linear-gradient(135deg, rgba(108,99,255,0.4), rgba(168,85,247,0.4))'
                : 'rgba(255,255,255,0.06)',
              border: selectedPet === null ? '3px solid #A855F7' : '2px solid rgba(255,255,255,0.1)',
              borderRadius: 20, padding: '12px 24px', cursor: 'pointer',
              marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12,
              width: '100%', maxWidth: 500,
            }}>
            <span style={{ fontSize: 32 }}>🚫</span>
            <p style={{ color: 'white', fontWeight: 700, fontSize: 16 }}>Sin mascota</p>
            {selectedPet === null && <span style={{ fontSize: 18, marginLeft: 'auto' }}>✅</span>}
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16, width: '100%', maxWidth: 500, marginBottom: 24,
          }}>
            {PETS.map(pet => (
              <div key={pet.file} onClick={() => onSelectPet(pet.file)}
                style={{
                  background: selectedPet === pet.file
                    ? 'linear-gradient(135deg, rgba(255,159,67,0.4), rgba(255,107,107,0.4))'
                    : 'rgba(255,255,255,0.06)',
                  border: selectedPet === pet.file ? '3px solid #FF9F43' : '2px solid rgba(255,255,255,0.1)',
                  borderRadius: 20, padding: 12, cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  transition: 'all 0.2s',
                  boxShadow: selectedPet === pet.file ? '0 0 20px rgba(255,159,67,0.5)' : 'none',
                }}>
                <ModelPreview
                  path={`/models/pets/${pet.file}.glb`}
                  width={100} height={100}
                  fallbackEmoji={pet.emoji}
                />
                <p style={{
                  color: selectedPet === pet.file ? '#FFD93D' : 'rgba(255,255,255,0.6)',
                  fontSize: 12, fontWeight: 700, marginTop: 8, textAlign: 'center',
                }}>
                  {pet.emoji} {pet.name}
                </p>
                {selectedPet === pet.file && <span style={{ fontSize: 18 }}>✅</span>}
              </div>
            ))}
          </div>
        </>
      )}

      <div style={{
        display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap',
        background: 'rgba(255,255,255,0.06)',
        borderRadius: 16, padding: '12px 20px',
        marginBottom: 20, width: '100%', maxWidth: 500,
      }}>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Tu selección:</span>
        <span style={{ fontSize: 13, color: 'white', fontWeight: 700 }}>
          🧑‍🚀 {selected?.replace('character-female-', 'F-').replace('character-male-', 'M-').toUpperCase()}
        </span>
        <span style={{ fontSize: 13, color: 'white', fontWeight: 700 }}>
          {selectedPet ? `${selectedPetData?.emoji} ${selectedPetData?.name}` : '🚫 Sin mascota'}
        </span>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
        <button className="btn btn-ghost" onClick={onBack}>← Volver</button>
        <button className="btn btn-primary" onClick={onConfirm}
          style={{ fontSize: 20, padding: '14px 40px' }}>
          ¡Jugar! 🚀
        </button>
      </div>

    </div>
  )
}