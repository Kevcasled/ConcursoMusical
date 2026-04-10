<template>
  <div class="result-wrapper">
    <div class="result-card">

      <!-- Icono trofeo -->
      <div class="trophy-icon">🏆</div>

      <!-- Mensaje según rendimiento -->
      <h2 class="result-title">{{ performanceLabel }}</h2>
      <p class="result-sub">{{ performanceMessage }}</p>

      <!-- Puntuación final -->
      <div class="score-section">
        <p class="score-caption">Puntuación Final</p>
        <div class="score-big">{{ store.score }}</div>
        <p class="score-max">de 100 puntos posibles</p>
      </div>

      <!-- Stats -->
      <div class="stats-row">
        <div class="stat-item">
          <span class="stat-icon">✅</span>
          <span class="stat-label">Correctas</span>
          <span class="stat-value">{{ store.correctAnswers }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-icon">🎯</span>
          <span class="stat-label">Precisión</span>
          <span class="stat-value">{{ store.finalAccuracy }}%</span>
        </div>
      </div>

      <p class="answers-summary">
        Respondiste correctamente {{ store.correctAnswers }} de {{ store.totalQuestions }} preguntas
      </p>

      <!-- Posición en el ranking -->
      <div class="ranking-section">
        <p class="ranking-title">🏆 Ranking de Mejores Puntuaciones</p>
        <div v-if="store.currentPlayerRankPosition" class="ranking-position">
          <div class="position-badge">
            <span class="position-icon">{{ positionIcon }}</span>
            <div class="position-info">
              <span class="position-name">{{ store.playerName }}</span>
              <span class="position-detail">{{ store.finalAccuracy }}% de precisión · {{ store.score }} puntos</span>
            </div>
            <span class="position-num">#{{ store.currentPlayerRankPosition }}</span>
          </div>
        </div>
        <p v-else class="no-ranking">
          No has entrado en el top 10. ¡Inténtalo de nuevo para mejorar!
        </p>
      </div>

      <!-- Botones -->
      <div class="result-buttons">
        <button class="btn-play-again" @click="playAgain">▶ Jugar de Nuevo</button>
        <RouterLink to="/ranking" class="btn-ranking">🏆 Ver Ranking</RouterLink>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from '../stores/gameStore.js'

const store = useGameStore()

const performanceLabel = computed(() => {
  const acc = store.finalAccuracy
  if (acc >= 90) return '¡Excelente! 🌟'
  if (acc >= 70) return '¡Muy bien! 👏'
  if (acc >= 50) return '¡Bien hecho! 😊'
  if (acc >= 30) return 'Puedes mejorar 💪'
  return 'Sigue practicando 🎵'
})

const performanceMessage = computed(() => {
  const acc = store.finalAccuracy
  if (acc >= 90) return 'Tienes un gran conocimiento musical'
  if (acc >= 70) return 'Buen nivel musical, ¡sigue así!'
  if (acc >= 50) return 'Vas por buen camino'
  if (acc >= 30) return 'La música no es lo tuyo... ¡todavía!'
  return 'Necesitas escuchar más música 😅'
})

const positionIcon = computed(() => {
  const pos = store.currentPlayerRankPosition
  if (pos === 1) return '👑'
  if (pos === 2) return '🥈'
  if (pos === 3) return '🥉'
  return '🎵'
})

function playAgain() {
  store.resetGame()
}
</script>

<style scoped>
.result-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1.5rem;
}

.result-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  max-width: 480px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.trophy-icon {
  font-size: 3rem;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.result-title {
  font-size: 1.5rem;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.result-sub {
  color: #6b7280;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

/* Puntuación */
.score-section {
  margin-bottom: 1.5rem;
}

.score-caption {
  font-size: 0.85rem;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}

.score-big {
  font-size: 4rem;
  font-weight: 800;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.score-max {
  font-size: 0.85rem;
  color: #9ca3af;
  margin-top: 0.25rem;
}

/* Stats */
.stats-row {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 0.75rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
}

.stat-icon { font-size: 1.2rem; }
.stat-label { font-size: 0.75rem; color: #9ca3af; }
.stat-value { font-size: 1.4rem; font-weight: 700; color: #1f2937; }

.answers-summary {
  font-size: 0.85rem;
  color: #6b7280;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #f3f4f6;
}

/* Ranking */
.ranking-section {
  margin-bottom: 1.5rem;
}

.ranking-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.75rem;
}

.position-badge {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, #faf5ff, #fdf2f8);
  border: 1px solid #e9d5ff;
  border-radius: 10px;
  padding: 0.75rem 1rem;
}

.position-icon { font-size: 1.5rem; }

.position-info {
  flex: 1;
  text-align: left;
}

.position-name {
  display: block;
  font-weight: 600;
  color: #374151;
  font-size: 0.95rem;
}

.position-detail {
  display: block;
  font-size: 0.8rem;
  color: #9ca3af;
}

.position-num {
  font-weight: 800;
  color: #a855f7;
  font-size: 1.1rem;
}

.no-ranking {
  font-size: 0.9rem;
  color: #6b7280;
  background: #f9fafb;
  border-radius: 8px;
  padding: 0.75rem 1rem;
}

/* Botones */
.result-buttons {
  display: flex;
  gap: 0.75rem;
  flex-direction: column;
}

.btn-play-again {
  background: linear-gradient(135deg, #a855f7, #ec4899);
  color: white;
  border: none;
  padding: 0.875rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.2s;
}

.btn-play-again:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.btn-ranking {
  display: block;
  text-decoration: none;
  background: white;
  color: #a855f7;
  border: 2px solid #a855f7;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  transition: background 0.2s, color 0.2s;
}

.btn-ranking:hover {
  background: #faf5ff;
}
</style>
