import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { ZONE_CONFIGS, TOTAL_ZONES } from '../data/zoneConfigs'
import LoadingScreen from './LoadingScreen'

// ─── Adjacent-zone decoration cache (module-level — survives remounts) ────────
const adjacentCache = new Map()

function disposeMeshGroup(group) {
  group.traverse(obj => {
    if (obj.geometry) obj.geometry.dispose()
    if (obj.material) {
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
      mats.forEach(m => { if (m.map) m.map.dispose(); m.dispose() })
    }
  })
}

function scheduleAdjacentPreload(currentZoneId) {
  for (const [id, group] of adjacentCache) {
    if (Math.abs(id - currentZoneId) > 1) {
      disposeMeshGroup(group)
      adjacentCache.delete(id)
    }
  }
  const candidates = [currentZoneId - 1, currentZoneId + 1].filter(
    z => z >= 1 && z <= TOTAL_ZONES && !adjacentCache.has(z)
  )
  candidates.forEach((zId, i) => {
    setTimeout(() => {
      if (adjacentCache.has(zId)) return
      const group = new THREE.Group()
      addDecorations(group, zId, ZONE_CONFIGS[zId])
      adjacentCache.set(zId, group)
    }, 900 + i * 400)
  })
}

// ─── NPC positions (6 per zone) ───────────────────────────────────────────────
const NPC_POSITIONS = [
  new THREE.Vector3(-4.5, 0, -5),
  new THREE.Vector3(0,   0, -6.5),
  new THREE.Vector3(4.5, 0, -5),
  new THREE.Vector3(-5.5, 0, 0.5),
  new THREE.Vector3(5.5,  0, 0.5),
  new THREE.Vector3(0,   0, 3.5),
]

// ─── NPC helpers ─────────────────────────────────────────────────────────────

function makeSprite(text, bg) {
  const canvas = document.createElement('canvas')
  canvas.width = 128; canvas.height = 128
  const ctx = canvas.getContext('2d')
  ctx.beginPath()
  ctx.arc(64, 64, 58, 0, Math.PI * 2)
  ctx.fillStyle = bg
  ctx.fill()
  ctx.strokeStyle = 'rgba(255,255,255,0.8)'
  ctx.lineWidth = 4
  ctx.stroke()
  ctx.font = 'bold 72px Arial'
  ctx.fillStyle = 'white'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, 64, 68)
  const tex = new THREE.CanvasTexture(canvas)
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false })
  const sprite = new THREE.Sprite(mat)
  sprite.scale.set(0.7, 0.7, 0.7)
  sprite.position.y = 2.9
  return sprite
}

function createNPC(pos, done, config) {
  const group = new THREE.Group()
  const bodyColor = done ? 0x555566 : config.npcColor
  const headColor = done ? 0x777788 : 0xFFD93D

  const bodyMat = new THREE.MeshLambertMaterial({ color: bodyColor })
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.45, 1.3, 10), bodyMat)
  body.position.y = 0.65
  group.add(body)

  const headMat = new THREE.MeshLambertMaterial({ color: headColor })
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.44, 16, 12), headMat)
  head.position.y = 1.8
  group.add(head)

  const eyeMat = new THREE.MeshLambertMaterial({ color: 0x1a1a2e })
  const eyeGeo = new THREE.SphereGeometry(0.08, 8, 8)
  ;[[-0.15, 1.85, 0.36], [0.15, 1.85, 0.36]].forEach(([x, y, z]) => {
    const e = new THREE.Mesh(eyeGeo, eyeMat)
    e.position.set(x, y, z)
    group.add(e)
  })

  const armMat = new THREE.MeshLambertMaterial({ color: bodyColor })
  const armGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.8, 8)
  ;[[-0.55, 0.5], [0.55, -0.5]].forEach(([x, rz]) => {
    const a = new THREE.Mesh(armGeo, armMat)
    a.position.set(x, 0.9, 0)
    a.rotation.z = rz
    group.add(a)
  })

  if (!done) {
    const light = new THREE.PointLight(config.npcColor, 1.5, 4)
    light.position.y = 1.2
    group.add(light)
    group.userData.light = light
  }

  const sprite = makeSprite(done ? '✓' : '!', done ? '#6BCB77' : '#FFD93D')
  group.add(sprite)
  group.userData.sprite  = sprite
  group.userData.bodyMat = bodyMat
  group.userData.headMat = headMat
  group.userData.armMat  = armMat

  group.position.copy(pos)
  return group
}

function updateNPCVisual(npcObj) {
  const { mesh, done, config } = npcObj
  const ud = mesh.userData
  ud.bodyMat.color.setHex(done ? 0x555566 : config.npcColor)
  ud.armMat.color.setHex(done ? 0x555566 : config.npcColor)
  ud.headMat.color.setHex(done ? 0x777788 : 0xFFD93D)
  if (ud.light) ud.light.intensity = done ? 0 : 1.5
  if (ud.sprite) {
    mesh.remove(ud.sprite)
    ud.sprite.material.map.dispose()
    ud.sprite.material.dispose()
    const s = makeSprite(done ? '✓' : '!', done ? '#6BCB77' : '#FFD93D')
    mesh.add(s)
    mesh.userData.sprite = s
  }
}

function animateNPC(npcObj, time, idx, isNear) {
  const { mesh, done } = npcObj
  if (!done && isNear) {
    mesh.scale.setScalar(1 + 0.04 * Math.sin(time * 4))
    if (mesh.userData.light) mesh.userData.light.intensity = 1.2 + 0.8 * Math.sin(time * 4)
  } else {
    mesh.scale.setScalar(1)
    if (mesh.userData.light) mesh.userData.light.intensity = done ? 0 : 0.6 + 0.4 * Math.sin(time * 2 + idx)
  }
  const sprite = mesh.userData.sprite
  if (sprite) sprite.position.y = 2.9 + 0.12 * Math.sin(time * 2.5 + idx * 1.1)
}

// ─── Player mesh (visible third-person character) ─────────────────────────────

function createPlayerMesh(skinColor, onLoaded) {
  const group = new THREE.Group()
  const loader = new GLTFLoader()
  loader.load('/models/character.glb', (gltf) => {
    const model = gltf.scene
    model.scale.set(1, 1, 1)
    group.add(model)
    model.traverse((child) => {
      if (child.isMesh) {
        child.material.needsUpdate = true
      }
    })
    if (onLoaded) onLoaded()
  })                        // ← cierra el loader.load acá
  group.position.y = 0.33
  group.userData.leftArm  = null
  group.userData.rightArm = null
  group.userData.leftLeg  = null
  group.userData.rightLeg = null
  return group
}                           // ← cierra la función acá

function animatePlayerMesh(playerMesh, isMoving, time) {
  if (!playerMesh) return
  const swing = isMoving ? Math.sin(time * 8) * 0.5 : 0
  if (playerMesh.userData.leftArm)  playerMesh.userData.leftArm.rotation.x  =  swing
  if (playerMesh.userData.rightArm) playerMesh.userData.rightArm.rotation.x = -swing
  if (playerMesh.userData.leftLeg)  playerMesh.userData.leftLeg.rotation.x  = -swing
  if (playerMesh.userData.rightLeg) playerMesh.userData.rightLeg.rotation.x  = swing
}

// ─── Scene sub-builders ───────────────────────────────────────────────────────

function buildRoom(scene, config) {
  scene.add(new THREE.AmbientLight(0xffffff, 2.5))
  scene.background = new THREE.Color(config.bgColor)
  scene.fog = new THREE.FogExp2(config.fogColor, 0.03)

  scene.add(new THREE.AmbientLight(0xffffff, 0.55))
  const dir = new THREE.DirectionalLight(config.lightColor, 1.1)
  dir.position.set(4, 8, 6)
  scene.add(dir)
  scene.add(new THREE.HemisphereLight(config.lightColor, config.floorColor, 0.4))

  const roomMats = [
    new THREE.MeshLambertMaterial({ color: config.wallColor,    side: THREE.BackSide }),
    new THREE.MeshLambertMaterial({ color: config.wallColor,    side: THREE.BackSide }),
    new THREE.MeshLambertMaterial({ color: config.ceilingColor, side: THREE.BackSide }),
    new THREE.MeshLambertMaterial({ color: config.floorColor,   side: THREE.BackSide }),
    new THREE.MeshLambertMaterial({ color: config.wallColor,    side: THREE.BackSide }),
    new THREE.MeshLambertMaterial({ color: config.wallColor,    side: THREE.BackSide }),
  ]
  const room = new THREE.Mesh(new THREE.BoxGeometry(20, 6, 20), roomMats)
  room.position.y = 3
  scene.add(room)

  const grid = new THREE.GridHelper(
    20, 20,
    new THREE.Color(config.accentColor).multiplyScalar(0.3),
    new THREE.Color(config.accentColor).multiplyScalar(0.15),
  )
  grid.position.y = 0.01
  scene.add(grid)
}

function buildNPCs(scene, zoneId, completedMap, config) {
  return NPC_POSITIONS.map((pos, i) => {
    const exId = `z${zoneId}_e${i + 1}`
    const done = !!completedMap[exId]
    const mesh = createNPC(pos, done, config)
    scene.add(mesh)
    return { mesh, done, config }
  })
}

function addDecorations(target, zoneId, config) {
  const add = (mesh) => target.add(mesh)

  const pillar = (x, z, color, h = 4, r = 0.25) => {
    const m = new THREE.Mesh(
      new THREE.CylinderGeometry(r, r, h, 8),
      new THREE.MeshLambertMaterial({ color }),
    )
    m.position.set(x, h / 2, z)
    add(m)
  }
  const box = (x, y, z, w, h, d, color) => {
    const m = new THREE.Mesh(
      new THREE.BoxGeometry(w, h, d),
      new THREE.MeshLambertMaterial({ color }),
    )
    m.position.set(x, y, z)
    add(m)
  }

  switch (zoneId) {
    case 1: {
      ;[0xff6b6b, 0x6bcb77, 0x4ecdc4, 0xffd93d, 0xa855f7].forEach((c, i) => {
        const m = new THREE.Mesh(
          new THREE.SphereGeometry(0.3 + (i % 3) * 0.2, 12, 10),
          new THREE.MeshLambertMaterial({ color: c, emissive: c, emissiveIntensity: 0.2 }),
        )
        m.position.set(-7 + i * 3.5, 3 + Math.sin(i) * 1.5, -8)
        add(m)
      })
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.8, 0.15, 8, 24),
        new THREE.MeshLambertMaterial({ color: 0xffd93d }),
      )
      ring.rotation.x = 1.2
      ring.position.set(-6, 3.5, -7)
      add(ring)
      const geo = new THREE.BufferGeometry()
      const pos = []
      for (let i = 0; i < 200; i++) {
        pos.push((Math.random() - 0.5) * 18, Math.random() * 5.5, (Math.random() - 0.5) * 18)
      }
      geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
      add(new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.05 })))
      const rocketBody = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.35, 1.5, 8),
        new THREE.MeshLambertMaterial({ color: 0xccccff }),
      )
      rocketBody.position.set(6.5, 2, -7)
      rocketBody.rotation.z = 0.3
      add(rocketBody)
      const nose = new THREE.Mesh(
        new THREE.ConeGeometry(0.2, 0.6, 8),
        new THREE.MeshLambertMaterial({ color: 0xff6b6b }),
      )
      nose.position.set(6.5 + Math.sin(0.3), 2 + Math.cos(0.3), -7)
      nose.rotation.z = 0.3
      add(nose)
      break
    }
    case 2: {
      ;[0xa855f7, 0x6c63ff, 0xff6b6b, 0x4ecdc4].forEach((c, i) => {
        pillar(-7 + i * 4.5, -8,   c, 5, 0.3)
        pillar(-7 + i * 4.5,  8.5, c, 5, 0.3)
      })
      ;[0xffd93d, 0x6bcb77, 0xff9f43].forEach((c, i) => box(-5 + i * 5, 3.5, -8, 0.8, 0.8, 0.8, c))
      break
    }
    case 3: {
      const disc = new THREE.Mesh(
        new THREE.CylinderGeometry(3, 3, 0.06, 32),
        new THREE.MeshLambertMaterial({ color: 0x0d4a20 }),
      )
      disc.position.set(0, 0.04, 0)
      add(disc)
      ;[{ x: 0, z: -6, r: 0 }, { x: 0, z: 6, r: Math.PI }, { x: -6, z: 0, r: Math.PI / 2 }, { x: 6, z: 0, r: -Math.PI / 2 }]
        .forEach(({ x, z, r }, i) => {
          const cone = new THREE.Mesh(
            new THREE.ConeGeometry(0.35, 1.2, 6),
            new THREE.MeshLambertMaterial({ color: [0xff6b6b, 0x6bcb77, 0xffd93d, 0x4ecdc4][i] }),
          )
          cone.rotation.z = r + Math.PI / 2
          cone.position.set(x * 0.5, 0.8, z * 0.5)
          add(cone)
        })
      box(0, 3, -8, 0.3, 5, 0.3, 0xff6b6b)
      break
    }
    case 4: {
      ;[{ x: -7, z: -6, h: 3 }, { x: -7, z: 6, h: 4 }, { x: 7, z: -6, h: 5 }, { x: 7, z: 6, h: 3.5 }]
        .forEach(({ x, z, h }, i) => box(x, h / 2, z, 2, h, 2, [0x8e8e9e, 0x7e7e8e, 0x9e9e9e, 0x8e8e9e][i]))
      for (let i = 0; i < 4; i++) {
        const coin = new THREE.Mesh(
          new THREE.CylinderGeometry(0.4, 0.4, 0.12, 16),
          new THREE.MeshLambertMaterial({ color: 0xffd93d, emissive: 0xffd93d, emissiveIntensity: 0.2 }),
        )
        coin.position.set(-3 + i * 2, 0.06 + i * 0.14, -8)
        add(coin)
      }
      break
    }
    case 5: {
      ;[
        { geo: new THREE.BoxGeometry(0.8, 0.8, 0.8),             color: 0xff6b35, x: -5, z: -7 },
        { geo: new THREE.SphereGeometry(0.45, 12, 10),            color: 0xa855f7, x:  0, z: -8 },
        { geo: new THREE.ConeGeometry(0.45, 0.9, 6),              color: 0xffd93d, x:  5, z: -7 },
        { geo: new THREE.TorusGeometry(0.35, 0.12, 8, 24),        color: 0x4ecdc4, x: -5, z:  7 },
        { geo: new THREE.OctahedronGeometry(0.5),                  color: 0x6bcb77, x:  5, z:  7 },
      ].forEach(({ geo, color, x, z }) => {
        const ped = new THREE.Mesh(
          new THREE.CylinderGeometry(0.35, 0.35, 0.8, 8),
          new THREE.MeshLambertMaterial({ color: 0x444455 }),
        )
        ped.position.set(x, 0.4, z)
        add(ped)
        const shape = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ color, emissive: color, emissiveIntensity: 0.15 }))
        shape.position.set(x, 1.2, z)
        add(shape)
      })
      break
    }
    case 6: {
      ;[{ x: -7, z: -5 }, { x: 7, z: -5 }, { x: -7, z: 5 }, { x: 7, z: 5 }].forEach(({ x, z }, i) => {
        const gear = new THREE.Mesh(
          new THREE.TorusGeometry(0.9, 0.25, 6, 14),
          new THREE.MeshLambertMaterial({ color: 0xcc4444, emissive: 0x661111 }),
        )
        gear.position.set(x, 2, z)
        gear.rotation.y = i * 0.5
        gear.userData.isGear = true
        add(gear)
      })
      box(-8, 2, 0, 0.3, 0.3, 14, 0x888899)
      box( 8, 2, 0, 0.3, 0.3, 14, 0x888899)
      break
    }
    case 7: {
      box(-7, 0.1, -3, 0.25, 0.2, 8, 0xddcc88)
      box( 7, 0.1, -3, 0.25, 0.2, 8, 0xddcc88)
      for (let i = 0; i < 9; i++) box(-7, 0.22, -7 + i, 0.25, 0.15, 0.05, 0x222222)
      const scaleBase = new THREE.Mesh(
        new THREE.CylinderGeometry(0.15, 0.25, 1.5, 8),
        new THREE.MeshLambertMaterial({ color: 0x888877 }),
      )
      scaleBase.position.set(0, 0.75, -8)
      add(scaleBase)
      const scaleArm = new THREE.Mesh(
        new THREE.BoxGeometry(3, 0.1, 0.1),
        new THREE.MeshLambertMaterial({ color: 0x888877 }),
      )
      scaleArm.position.set(0, 1.6, -8)
      scaleArm.rotation.z = 0.1
      add(scaleArm)
      break
    }
    case 8: {
      for (let i = -4; i <= 4; i += 2) {
        ;[-9.4, 9.4].forEach(zv => box(i, 5.3, zv, 0.6, 0.6, 0.6, 0x444455))
        ;[-9.4, 9.4].forEach(xv => box(xv, 5.3, i, 0.6, 0.6, 0.6, 0x444455))
      }
      ;[[-6, -6], [6, -6], [-6, 6], [6, 6]].forEach(([x, z], i) => {
        const c = [0xa855f7, 0xff6b6b, 0x6bcb77, 0x4ecdc4][i]
        box(x, 0.5, z, 0.8, 1, 0.8, c)
        box(x, 1.6, z, 0.8, 0.15, 0.15, c)
        if (i < 2) box(x, 1.6, z, 0.15, 0.15, 0.8, c)
      })
      break
    }
    case 9: {
      ;[
        { geo: new THREE.BoxGeometry(0.9, 0.9, 0.9),                 color: 0x3498db, x: -6, z: -6 },
        { geo: new THREE.SphereGeometry(0.5, 16, 12),                 color: 0x9b59b6, x:  0, z: -7 },
        { geo: new THREE.ConeGeometry(0.5, 1.0, 8),                   color: 0xe67e22, x:  6, z: -6 },
        { geo: new THREE.CylinderGeometry(0.35, 0.35, 1.0, 12),       color: 0x27ae60, x: -6, z:  6 },
        { geo: new THREE.OctahedronGeometry(0.55),                     color: 0xe74c3c, x:  6, z:  6 },
      ].forEach(({ geo, color, x, z }) => {
        const ped = new THREE.Mesh(
          new THREE.BoxGeometry(1.2, 0.8, 1.2),
          new THREE.MeshLambertMaterial({ color: 0xdde0e8 }),
        )
        ped.position.set(x, 0.4, z)
        add(ped)
        const shape = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ color, emissive: color, emissiveIntensity: 0.2 }))
        shape.position.set(x, 1.35, z)
        add(shape)
      })
      ;[[0x3498db, -6, -6], [0x9b59b6, 0, -7], [0xe67e22, 6, -6], [0x27ae60, -6, 6], [0xe74c3c, 6, 6]]
        .forEach(([c, x, z]) => {
          const l = new THREE.PointLight(c, 1, 5)
          l.position.set(x, 3, z)
          add(l)
        })
      break
    }
    default: break
  }
}

// ─── Mobile controls overlay ──────────────────────────────────────────────────
// Joystick geometry constants (must match touch handler calculations)
const JOY_LEFT   = 24   // px from screen left
const JOY_BOTTOM = 24   // px from screen bottom
const JOY_SIZE   = 120  // base diameter
const JOY_KNOB   = 44   // knob diameter
const JOY_MAX_R  = (JOY_SIZE - JOY_KNOB) / 2  // 38 px max deflection

function MobileControls({ joystickKnobRef, hasNearby, onInteract }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-10">

      {/* ── Joystick base (fixed bottom-left) ── */}
      <div style={{
        position: 'absolute',
        bottom: JOY_BOTTOM, left: JOY_LEFT,
        width: JOY_SIZE, height: JOY_SIZE,
        borderRadius: '50%',
        border: '3px solid rgba(255,255,255,0.45)',
        background: 'rgba(0,0,0,0.45)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 24px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.04)',
      }}>
        {/* Crosshair guides */}
        <div style={{ position: 'absolute', width: '58%', height: 1, background: 'rgba(255,255,255,0.15)' }} />
        <div style={{ position: 'absolute', width: 1, height: '58%', background: 'rgba(255,255,255,0.15)' }} />
        {/* Knob — position updated imperatively via ref */}
        <div
          ref={joystickKnobRef}
          style={{
            width: JOY_KNOB, height: JOY_KNOB,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.95), rgba(180,180,255,0.7))',
            border: '2px solid rgba(255,255,255,0.85)',
            boxShadow: '0 3px 12px rgba(0,0,0,0.5)',
            willChange: 'transform',
          }}
        />
      </div>

      {/* ── Swipe-to-look hint (right edge, center) ── */}
      <div style={{
        position: 'absolute', right: 12, top: '42%', transform: 'translateY(-50%)',
        color: 'rgba(255,255,255,0.18)', fontSize: 11, textAlign: 'center',
        lineHeight: 1.6, fontStyle: 'normal', pointerEvents: 'none',
      }}>
        👆<br />Deslizá<br />para<br />mirar
      </div>

      {/* ── Interaction button (fixed bottom-right, always visible) ── */}
      <div
        style={{
          position: 'absolute', bottom: JOY_BOTTOM, right: JOY_LEFT,
          width: JOY_SIZE, height: JOY_SIZE,
          borderRadius: '50%',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          background: hasNearby
            ? 'linear-gradient(135deg, #FFD93D 0%, #FF9F43 100%)'
            : 'rgba(255,255,255,0.07)',
          border: hasNearby
            ? '3px solid rgba(255,255,255,0.8)'
            : '3px solid rgba(255,255,255,0.15)',
          boxShadow: hasNearby
            ? '0 0 32px rgba(255,217,61,0.75), 0 4px 20px rgba(0,0,0,0.4)'
            : '0 4px 16px rgba(0,0,0,0.3)',
          animation: hasNearby ? 'pulse-scale 1s ease-in-out infinite' : 'none',
          transition: 'background 0.2s, border-color 0.2s, box-shadow 0.2s',
          pointerEvents: hasNearby ? 'auto' : 'none',
          cursor: hasNearby ? 'pointer' : 'default',
        }}
        onPointerDown={hasNearby ? (e => { e.stopPropagation(); onInteract() }) : undefined}
      >
        <span style={{ fontSize: 38, lineHeight: 1 }}>💬</span>
        <span style={{
          fontSize: 11, fontWeight: 900, fontStyle: 'normal',
          letterSpacing: 0.5, marginTop: 6,
          color: hasNearby ? '#333' : 'rgba(255,255,255,0.2)',
        }}>
          {hasNearby ? '¡HABLAR!' : 'ACERCATE'}
        </span>
      </div>

    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

// Third-person camera constants
const CAM_DIST   = 5    // horizontal distance behind player
const CAM_HEIGHT = 3    // vertical offset above player
const CAM_MIN_PITCH = -0.25  // look-down limit
const CAM_MAX_PITCH =  0.8   // look-up limit

export default function Game3D({ zoneId, completedExercises, onInteract, playerSkinColor }) {
  const mountRef      = useRef(null)
  const threeRef      = useRef({})
  const inputRef      = useRef({
    keys: {},
    yaw: Math.PI,      // horizontal camera angle
    pitch: 0.3,        // vertical camera angle (slight downward look)
    nearbyIdx: -1,
    joystick:  { active: false, startX: 0, startY: 0, dx: 0, dy: 0, touchId: null },
    lookTouch: { active: false, lastX: 0, lastY: 0, touchId: null },
    // Player world position (tracked separately from camera)
    playerX: 0,
    playerZ: 4,
  })
  const completedRef  = useRef(completedExercises)
  const onInteractRef = useRef(onInteract)
  completedRef.current  = completedExercises
  onInteractRef.current = onInteract

  const [nearbyActive, setNearbyActive] = useState(false)
  const [isMobile,    setIsMobile]    = useState(false)
  const [loadProg,    setLoadProg]    = useState(0)
  const [isLoading,   setIsLoading]   = useState(true)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0)

    let cancelled = false
    let afId      = null

    const tick = (ms = 20) => new Promise(r => setTimeout(r, ms))
    const prog = async (p) => { if (!cancelled) { setLoadProg(p); await tick() } }

    const config = ZONE_CONFIGS[zoneId]

    async function init() {
      setIsLoading(true)
      setLoadProg(0)
      await tick(24)
      if (cancelled) return

      // Step 1: WebGL renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(mount.clientWidth, mount.clientHeight)
      renderer.shadowMap.enabled = false
      mount.appendChild(renderer.domElement)
      await prog(22)
      if (cancelled) { renderer.dispose(); return }

      // Step 2: Scene + camera
      const scene  = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(72, mount.clientWidth / mount.clientHeight, 0.05, 200)
      buildRoom(scene, config)
      await prog(48)
      if (cancelled) { disposeAndRemove(scene, renderer, mount); return }

      // Step 3: NPCs
      const npcs = buildNPCs(scene, zoneId, completedRef.current, config)
      await prog(72)
      if (cancelled) { disposeAndRemove(scene, renderer, mount); return }

      // Step 4: Decorations
      let decorGroup
      if (adjacentCache.has(zoneId)) {
        decorGroup = adjacentCache.get(zoneId)
        adjacentCache.delete(zoneId)
      } else {
        decorGroup = new THREE.Group()
        addDecorations(decorGroup, zoneId, config)
      }
      scene.add(decorGroup)
      await prog(100)
      if (cancelled) { disposeAndRemove(scene, renderer, mount); return }

      await tick(280)
      if (cancelled) { disposeAndRemove(scene, renderer, mount); return }

      // Create player mesh (third-person visible character)
      const playerMesh = createPlayerMesh(playerSkinColor)
      playerMesh.position.set(inputRef.current.playerX, 0, inputRef.current.playerZ)
      scene.add(playerMesh)

      setIsLoading(false)
      threeRef.current = { renderer, scene, camera, npcs, playerMesh }

      scheduleAdjacentPreload(zoneId)

      // ── Input: keyboard ──────────────────────────────────────────────────
      const onKeyDown = (e) => {
        inputRef.current.keys[e.key.toLowerCase()] = true
        if ((e.key === 'e' || e.key === 'E') && inputRef.current.nearbyIdx >= 0) {
          const npc = npcs[inputRef.current.nearbyIdx]
          if (npc && !npc.done) onInteractRef.current(zoneId, inputRef.current.nearbyIdx)
        }
      }
      const onKeyUp = (e) => { inputRef.current.keys[e.key.toLowerCase()] = false }
      document.addEventListener('keydown', onKeyDown)
      document.addEventListener('keyup',   onKeyUp)

      // ── Input: mouse drag (no pointer lock needed for third-person) ──────
      let mouseDown = false
      let lastMouseX = 0, lastMouseY = 0

      const canvas = renderer.domElement

      const onMouseDown = (e) => {
        mouseDown = true
        lastMouseX = e.clientX
        lastMouseY = e.clientY
        canvas.style.cursor = 'grabbing'
      }
      const onMouseUp = () => {
        mouseDown = false
        canvas.style.cursor = 'grab'
      }
      const onMouseMove = (e) => {
        if (!mouseDown) return
        const inp = inputRef.current
        inp.yaw   -= (e.clientX - lastMouseX) * 0.005
        inp.pitch -= (e.clientY - lastMouseY) * 0.005
        inp.pitch  = Math.max(CAM_MIN_PITCH, Math.min(CAM_MAX_PITCH, inp.pitch))
        lastMouseX = e.clientX
        lastMouseY = e.clientY
      }
      canvas.addEventListener('mousedown', onMouseDown)
      document.addEventListener('mouseup',   onMouseUp)
      document.addEventListener('mousemove', onMouseMove)

      // ── Input: touch ─────────────────────────────────────────────────────
      const halfW = () => mount.clientWidth / 2

      const onTouchStart = (e) => {
        e.preventDefault()
        for (const t of e.changedTouches) {
          const inp = inputRef.current
          if (t.clientX < halfW() && !inp.joystick.active)
            inp.joystick  = { active: true, startX: t.clientX, startY: t.clientY, dx: 0, dy: 0, touchId: t.identifier }
          else if (t.clientX >= halfW() && !inp.lookTouch.active)
            inp.lookTouch = { active: true, lastX: t.clientX, lastY: t.clientY, touchId: t.identifier }
        }
      }
      const onTouchMove = (e) => {
        e.preventDefault()
        const inp = inputRef.current
        for (const t of e.changedTouches) {
          if (t.identifier === inp.joystick.touchId) {
            inp.joystick.dx = t.clientX - inp.joystick.startX
            inp.joystick.dy = t.clientY - inp.joystick.startY
          } else if (t.identifier === inp.lookTouch.touchId) {
            inp.yaw   -= (t.clientX - inp.lookTouch.lastX) * 0.006
            inp.pitch -= (t.clientY - inp.lookTouch.lastY) * 0.006
            inp.pitch  = Math.max(CAM_MIN_PITCH, Math.min(CAM_MAX_PITCH, inp.pitch))
            inp.lookTouch.lastX = t.clientX
            inp.lookTouch.lastY = t.clientY
          }
        }
      }
      const onTouchEnd = (e) => {
        e.preventDefault()
        const inp = inputRef.current
        for (const t of e.changedTouches) {
          if (t.identifier === inp.joystick.touchId)
            inp.joystick  = { active: false, startX: 0, startY: 0, dx: 0, dy: 0, touchId: null }
          else if (t.identifier === inp.lookTouch.touchId)
            inp.lookTouch = { active: false, lastX: 0, lastY: 0, touchId: null }
        }
      }
      mount.addEventListener('touchstart',  onTouchStart,  { passive: false })
      mount.addEventListener('touchmove',   onTouchMove,   { passive: false })
      mount.addEventListener('touchend',    onTouchEnd,    { passive: false })
      mount.addEventListener('touchcancel', onTouchEnd,    { passive: false })

      // ── Resize ───────────────────────────────────────────────────────────
      const onResize = () => {
        camera.aspect = mount.clientWidth / mount.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(mount.clientWidth, mount.clientHeight)
      }
      window.addEventListener('resize', onResize)

      // ── Animation loop ────────────────────────────────────────────────────
      const clock      = new THREE.Clock()
      const prevNearby = { val: -1 }

      const animate = () => {
        if (cancelled) return
        afId = requestAnimationFrame(animate)

        const inp   = inputRef.current
        const delta = clock.getDelta()
        const time  = clock.getElapsedTime()
        const spd   = 5.5 * delta

        // ── Move player ──────────────────────────────────────────────────
        const jx = inp.joystick.active ? inp.joystick.dx / 55 : 0
        const jz = inp.joystick.active ? inp.joystick.dy / 55 : 0
        const kx = (inp.keys['d'] || inp.keys['arrowright'] ? 1 : 0) - (inp.keys['a'] || inp.keys['arrowleft'] ? 1 : 0)
        const kz = (inp.keys['s'] || inp.keys['arrowdown']  ? 1 : 0) - (inp.keys['w'] || inp.keys['arrowup']   ? 1 : 0)
        const mx = kx + jx, mz = kz + jz
        const isMoving = mx !== 0 || mz !== 0

        if (isMoving) {
          const len = Math.sqrt(mx * mx + mz * mz) || 1
          const nx = (mx / len) * spd, nz = (mz / len) * spd
          // Camera yaw: camera sits at (sin(yaw)*dist, h, cos(yaw)*dist) behind the player.
          // Forward  = (-sin(yaw), 0, -cos(yaw))  → W moves in that direction (mz=-1)
          // Right    = (-cos(yaw), 0,  sin(yaw))  → D moves in that direction (mx=+1)
          // Combined: Δx = -nx*cos + nz*sin,  Δz = nx*sin + nz*cos
          const cosY = Math.cos(inp.yaw), sinY = Math.sin(inp.yaw)
          const moveX =  nx * cosY + nz * sinY
          const moveZ = -nx * sinY + nz * cosY
          inp.playerX = Math.max(-8.5, Math.min(8.5, inp.playerX + moveX))
          inp.playerZ = Math.max(-8.5, Math.min(8.5, inp.playerZ + moveZ))
          // Face the direction of movement
          playerMesh.rotation.y = Math.atan2(moveX, moveZ)
        }

        // Update player mesh world position
        playerMesh.position.x = inp.playerX
        playerMesh.position.z = inp.playerZ

        // Animate limbs
        animatePlayerMesh(playerMesh, isMoving, time)

        // ── Position camera behind/above player (third-person) ──────────
        // Camera sits behind the player: offset = (sin(yaw), h, cos(yaw)) * dist
        // Pitch tilts the camera up/down around the player
        const cCosYaw   = Math.cos(inp.yaw)
        const cSinYaw   = Math.sin(inp.yaw)
        const cCosPitch = Math.cos(inp.pitch)
        const cSinPitch = Math.sin(inp.pitch)

        const camOffX = cSinYaw * CAM_DIST * cCosPitch
        const camOffY = CAM_HEIGHT + cSinPitch * CAM_DIST
        const camOffZ = cCosYaw  * CAM_DIST * cCosPitch

        camera.position.set(
          inp.playerX + camOffX,
          camOffY,
          inp.playerZ + camOffZ,
        )

        // Look at player head height
        camera.lookAt(inp.playerX, 1.2, inp.playerZ)

        // ── NPC proximity + animation ────────────────────────────────────
        let nearIdx = -1, nearDist = Infinity
        npcs.forEach((npc, i) => {
          const dx = inp.playerX - npc.mesh.position.x
          const dz = inp.playerZ - npc.mesh.position.z
          const dist = Math.sqrt(dx * dx + dz * dz)
          const isNear = dist < 3
          if (isNear && dist < nearDist) { nearDist = dist; nearIdx = i }
          animateNPC(npc, time, i, isNear)
          if (npc.mesh.userData.sprite) npc.mesh.userData.sprite.lookAt(camera.position)

          const exId = `z${zoneId}_e${i + 1}`
          const nowDone = !!completedRef.current[exId]
          if (nowDone !== npc.done) { npc.done = nowDone; updateNPCVisual(npc) }
        })

        if (nearIdx !== prevNearby.val) {
          prevNearby.val = nearIdx
          inp.nearbyIdx  = nearIdx
          setNearbyActive(nearIdx >= 0 && !npcs[nearIdx]?.done)
        }

        renderer.render(scene, camera)
      }
      animate()

      threeRef.current._cleanup = () => {
        document.removeEventListener('keydown', onKeyDown)
        document.removeEventListener('keyup',   onKeyUp)
        canvas.removeEventListener('mousedown', onMouseDown)
        document.removeEventListener('mouseup',   onMouseUp)
        document.removeEventListener('mousemove', onMouseMove)
        mount.removeEventListener('touchstart',  onTouchStart)
        mount.removeEventListener('touchmove',   onTouchMove)
        mount.removeEventListener('touchend',    onTouchEnd)
        mount.removeEventListener('touchcancel', onTouchEnd)
        window.removeEventListener('resize', onResize)
        disposeAndRemove(scene, renderer, mount)
      }
    }

    init()

    return () => {
      cancelled = true
      cancelAnimationFrame(afId)
      if (threeRef.current._cleanup) {
        threeRef.current._cleanup()
        threeRef.current._cleanup = null
      }
    }
  }, [zoneId])

  const handleInteract = () => {
    const { nearbyIdx } = inputRef.current
    const npcs = threeRef.current.npcs
    if (nearbyIdx >= 0 && npcs && !npcs[nearbyIdx]?.done)
      onInteractRef.current(zoneId, nearbyIdx)
  }

  const cfg = ZONE_CONFIGS[zoneId]

  return (
    <div ref={mountRef} className="absolute inset-0" style={{ cursor: 'grab' }}>

      {/* Loading screen */}
      {isLoading && (
        <LoadingScreen
          progress={loadProg}
          zoneName={cfg?.name}
          zoneEmoji={cfg?.emoji}
          accentColor={cfg?.mapColor}
        />
      )}

      {/* Instructions overlay (third-person: no pointer lock needed) */}
      {!isLoading && (
        <div
          className="absolute z-10 pointer-events-none"
          style={{ bottom: 24, left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}
        >
          <div
            className="card px-5 py-2"
            style={{ backdropFilter: 'blur(10px)', display: 'inline-block' }}
          >
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>
              WASD mover · Arrastrar para girar cámara · <kbd style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 4, padding: '1px 5px' }}>E</kbd> interactuar
            </p>
          </div>
        </div>
      )}

      {/* Desktop interaction prompt */}
      {!isLoading && nearbyActive && (
        <div
          className="absolute z-10"
          style={{ bottom: '28%', left: '50%', transform: 'translateX(-50%)', animation: 'bounce-up 0.8s ease-in-out infinite' }}
        >
          <div className="card px-6 py-3 text-center" style={{ border: '2px solid #FFD93D', boxShadow: '0 0 25px rgba(255,217,61,0.6)' }}>
            <p className="font-black text-yellow-300" style={{ fontSize: 18 }}>
              Presioná <kbd style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 6, padding: '2px 8px', fontSize: 16 }}>E</kbd> para interactuar
            </p>
          </div>
        </div>
      )}

      {/* Mobile controls */}
      {!isLoading && isMobile && (
        <MobileControls hasNearby={nearbyActive} onInteract={handleInteract} />
      )}
    </div>
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function disposeAndRemove(scene, renderer, mount) {
  scene.traverse(obj => {
    if (obj.geometry) obj.geometry.dispose()
    if (obj.material) {
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
      mats.forEach(m => { if (m.map) m.map.dispose(); m.dispose() })
    }
  })
  renderer.dispose()
  if (mount && mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
}
