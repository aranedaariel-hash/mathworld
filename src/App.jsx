import { useState, useCallback } from 'react'
import { useGameState } from './hooks/useGameState'
import IntroScreen from './components/IntroScreen'
import CharacterSelect from './components/CharacterSelect'
import Map from './components/Map'
import Game3D from './components/Game3D'
import HUD from './components/HUD'
import ExerciseModal from './components/ExerciseModal'
import RewardScreen from './components/RewardScreen'
import ProfileScreen from './components/ProfileScreen'
import exercises from './data/exercises'
import { ZONE_CONFIGS } from './data/zoneConfigs'

export default function App() {
  const gs = useGameState()
  const [activeExercise, setActiveExercise] = useState(null)

  const handleInteract = useCallback((zoneId, npcIdx) => {
    const exId = `z${zoneId}_e${npcIdx + 1}`
    if (gs.completedExercises[exId]) return
    const ex = exercises.find(e => e.id === exId)
    if (ex) setActiveExercise(ex)
  }, [gs.completedExercises])

  const handleAnswer = useCallback((_answer, isCorrect) => {
    if (!activeExercise) return
    gs.submitAnswer(activeExercise, isCorrect)
    if (isCorrect) {
      gs.spawnParticles(8)
      const updatedMap = { ...gs.completedExercises, [activeExercise.id]: true }
      gs.checkZoneCompletion(gs.currentZone, updatedMap)
    }
  }, [activeExercise, gs])

  const handleCloseExercise = useCallback(() => {
    setActiveExercise(null)
  }, [])

  const zoneCfg = ZONE_CONFIGS[gs.currentZone]

  return (
    <div className="w-screen h-screen overflow-hidden relative">

      {/* Particles */}
      {gs.particles.map(p => (
        <div key={p.id} className="particle select-none"
          style={{
            left: `${p.x}%`, top: '-30px',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            fontSize: 28,
          }}>
          {p.emoji}
        </div>
      ))}

      {/* Intro */}
      {gs.screen === 'intro' && (
        <IntroScreen onStart={gs.setPlayerName} />
      )}

      {/* Selección de personaje */}
      {gs.screen === 'character' && (
        <CharacterSelect
          playerName={gs.playerName}
          selected={gs.selectedCharacter}
          onSelect={gs.setCharacter}
          selectedPet={gs.selectedPet}
          onSelectPet={gs.setPet}
          onConfirm={gs.confirmCharacter}
          onBack={() => gs.resetGame()}
        />
      )}

      {/* Mapa */}
      {gs.screen === 'map' && (
        <Map
          unlockedZones={gs.unlockedZones}
          completedExercises={gs.completedExercises}
          earnedBadges={gs.earnedBadges}
          xp={gs.xp}
          level={gs.level}
          mathCoins={gs.mathCoins}
          playerName={gs.playerName}
          streak={gs.streak}
          onEnterZone={gs.enterZone}
          onProfile={gs.goToProfile}
        />
      )}

      {/* Juego 3D */}
      {gs.screen === 'game' && (
        <div className="absolute inset-0">
          <Game3D
            zoneId={gs.currentZone}
            completedExercises={gs.completedExercises}
            onInteract={handleInteract}
            selectedCharacter={gs.selectedCharacter}
            selectedPet={gs.selectedPet}
          />
          <HUD
            xp={gs.xp}
            level={gs.level}
            mathCoins={gs.mathCoins}
            streak={gs.streak}
            zoneName={zoneCfg?.name ?? ''}
            zoneEmoji={zoneCfg?.emoji ?? ''}
            onBack={gs.goToMap}
          />
          {activeExercise && (
            <ExerciseModal
              exercise={activeExercise}
              streak={gs.streak}
              onAnswer={handleAnswer}
              onClose={handleCloseExercise}
            />
          )}
        </div>
      )}

      {/* Recompensa */}
      {gs.screen === 'reward' && (
        <RewardScreen
          badge={gs.pendingReward?.badge}
          zoneId={gs.pendingReward?.zoneId}
          onContinue={gs.clearReward}
        />
      )}

      {/* Perfil */}
      {gs.screen === 'profile' && (
        <ProfileScreen
          playerName={gs.playerName}
          xp={gs.xp}
          level={gs.level}
          mathCoins={gs.mathCoins}
          streak={gs.streak}
          bestStreak={gs.bestStreak}
          totalCorrect={gs.totalCorrect}
          totalAttempts={gs.totalAttempts}
          earnedBadges={gs.earnedBadges}
          completedExercises={gs.completedExercises}
          skin={gs.skin}
          setSkin={gs.setSkin}
          onBack={gs.goToMap}
          resetGame={gs.resetGame}
          selectedCharacter={gs.selectedCharacter}
          onChangeCharacter={gs.goToCharacter}
        />
      )}

    </div>
  )
}