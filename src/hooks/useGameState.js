import { useState, useCallback, useEffect, useRef } from 'react'
import { ZONE_CONFIGS, TOTAL_ZONES } from '../data/zoneConfigs'
import { isZoneComplete } from '../data/exercises'

const STORAGE_KEY = 'expedicion_matematica_v1'

const INITIAL_STATE = {
  playerName: '',
  currentZone: 1,
  unlockedZones: [1],
  completedExercises: {},
  earnedBadges: [],
  xp: 0,
  level: 1,
  mathCoins: 0,
  streak: 0,
  bestStreak: 0,
  totalCorrect: 0,
  totalAttempts: 0,
  skin: { color: '#6C63FF', hat: null, accessory: null },
  selectedCharacter: 'character-female-a',
  selectedPet: null,
}

function loadSave() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...INITIAL_STATE, ...JSON.parse(raw) }
  } catch {}
  return { ...INITIAL_STATE }
}

export function useGameState() {
  const [state, setState] = useState(loadSave)
  const [screen, setScreen] = useState(() => loadSave().playerName ? 'character' : 'intro')
  const [pendingReward, setPendingReward] = useState(null)
  const [particles, setParticles] = useState([])
  const particleId = useRef(0)

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) } catch {}
  }, [state])

  const setPlayerName = useCallback((name) => {
    setState(s => ({ ...s, playerName: name.trim() || 'Explorador' }))
    setScreen('character')
  }, [])

  const setCharacter = useCallback((characterFile) => {
    setState(s => ({ ...s, selectedCharacter: characterFile }))
  }, [])

  const setPet = useCallback((petFile) => {
    setState(s => ({ ...s, selectedPet: petFile }))
  }, [])

  const confirmCharacter = useCallback(() => {
    setScreen('map')
  }, [])

  const enterZone = useCallback((zoneId) => {
    setState(s => ({ ...s, currentZone: zoneId }))
    setScreen('game')
  }, [])

  const goToMap = useCallback(() => setScreen('map'), [])
  const goToProfile = useCallback(() => setScreen('profile'), [])
  const goToCharacter = useCallback(() => setScreen('character'), [])

  const spawnParticles = useCallback((count = 6) => {
    const newParticles = Array.from({ length: count }, () => {
      const id = ++particleId.current
      return {
        id,
        emoji: ['⭐', '✨', '🌟', '💫', '🎉', '🎊'][Math.floor(Math.random() * 6)],
        x: 10 + Math.random() * 80,
        delay: Math.random() * 0.4,
        duration: 1.2 + Math.random() * 0.8,
      }
    })
    setParticles(prev => [...prev, ...newParticles])
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(n => n.id === p.id)))
    }, 3000)
  }, [])

  const submitAnswer = useCallback((exercise, isCorrect, completedMap) => {
    setState(prev => {
      const newStreak = isCorrect ? prev.streak + 1 : 0
      const multiplier = prev.streak >= 2 ? 2 : 1
      const xpGained = isCorrect ? exercise.xp * multiplier : 0
      const coinsGained = isCorrect ? exercise.monedas * multiplier : 0
      const newXp = prev.xp + xpGained
      const newLevel = Math.floor(newXp / 100) + 1
      const newCompleted = isCorrect
        ? { ...prev.completedExercises, [exercise.id]: true }
        : prev.completedExercises

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        mathCoins: prev.mathCoins + coinsGained,
        streak: newStreak,
        bestStreak: Math.max(prev.bestStreak, newStreak),
        completedExercises: newCompleted,
        totalCorrect: prev.totalCorrect + (isCorrect ? 1 : 0),
        totalAttempts: prev.totalAttempts + 1,
      }
    })
    return isCorrect
  }, [])

  const checkZoneCompletion = useCallback((zoneId, completedMap) => {
    if (!isZoneComplete(zoneId, completedMap)) return false

    const config = ZONE_CONFIGS[zoneId]
    setState(prev => {
      const alreadyBadge = prev.earnedBadges.includes(config.badge.id)
      const nextZone = zoneId + 1
      const alreadyUnlocked = prev.unlockedZones.includes(nextZone)
      return {
        ...prev,
        earnedBadges: alreadyBadge ? prev.earnedBadges : [...prev.earnedBadges, config.badge.id],
        unlockedZones: (nextZone <= TOTAL_ZONES && !alreadyUnlocked)
          ? [...prev.unlockedZones, nextZone]
          : prev.unlockedZones,
        mathCoins: prev.mathCoins + 50,
        xp: prev.xp + 50,
      }
    })

    setPendingReward({ zoneId, badge: config.badge })
    setScreen('reward')
    return true
  }, [])

  const clearReward = useCallback(() => {
    setPendingReward(null)
    setScreen('map')
  }, [])

  const setSkin = useCallback((updates) => {
    setState(s => ({ ...s, skin: { ...s.skin, ...updates } }))
  }, [])

  const resetGame = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setState({ ...INITIAL_STATE })
    setScreen('intro')
  }, [])

  return {
    ...state,
    screen,
    pendingReward,
    particles,
    setPlayerName,
    setCharacter,
    setPet,
    confirmCharacter,
    enterZone,
    goToMap,
    goToProfile,
    goToCharacter,
    submitAnswer,
    checkZoneCompletion,
    clearReward,
    setSkin,
    resetGame,
    spawnParticles,
  }
}