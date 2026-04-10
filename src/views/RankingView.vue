<template>
  <div class="ranking-page">
    <div class="ranking-container">

      <!-- Cabecera -->
      <div class="ranking-header">
        <div class="ranking-icon">🏆</div>
        <h1>Tabla de Clasificación</h1>
        <p>Los mejores jugadores de todos los tiempos</p>
        <span class="badge-top">Top 10 Jugadores</span>
      </div>

      <!-- Sin puntuaciones -->
      <div v-if="store.rankings.length === 0" class="empty-state">
        <div class="empty-icon">🏆</div>
        <h3>Aún no hay puntuaciones</h3>
        <p>¡Sé el primero en aparecer en el ranking!</p>
        <RouterLink to="/jugar" class="btn-play">▶ Jugar Ahora</RouterLink>
      </div>

      <!-- Lista de puntuaciones -->
      <div v-else class="rankings-list">
        <div
          v-for="(entry, index) in store.rankings"
          :key="index"
          class="ranking-entry"
          :class="{
            'entry-gold': index === 0,
            'entry-silver': index === 1,
            'entry-bronze': index === 2,
            'entry-current': isCurrentPlayer(entry, index)
          }"
        >
          <!-- Icono de posición -->
          <div class="entry-position">
            <span v-if="index === 0" class="pos-icon">👑</span>
            <span v-else-if="index === 1" class="pos-icon">🥈</span>
            <span v-else-if="index === 2" class="pos-icon">🥉</span>
            <span v-else class="pos-num">#{{ index + 1 }}</span>
          </div>

          <!-- Info del jugador -->
          <div class="entry-info">
            <div class="entry-name-row">
              <span class="entry-name">{{ entry.name }}</span>
              <span v-if="index === 0" class="entry-badge gold">👑 Campeón</span>
              <span v-else-if="index === 1" class="entry-badge silver">🥈 Segundo</span>
              <span v-else-if="index === 2" class="entry-badge bronze">🥉 Tercero</span>
            </div>
            <div class="entry-meta">
              <span>🎯 {{ entry.accuracy }}% de precisión</span>
              <span class="meta-sep">·</span>
              <span>📅 {{ entry.date }}</span>
            </div>
          </div>

          <!-- Puntuación -->
          <div class="entry-score">
            <span class="score-value">{{ entry.score }}</span>
            <span class="score-unit">puntos</span>
          </div>
        </div>

        <!-- Mensaje si el jugador actual no está en el top 10 -->
        <div
          v-if="store.playerName && store.gameState === 'finished' && !store.currentPlayerRankPosition"
          class="not-in-top"
        >
          <p>No has llegado al top 10. ¡Inténtalo de nuevo!</p>
        </div>
      </div>

      <!-- Botones inferiores -->
      <div class="ranking-footer">
        <RouterLink to="/" class="btn-home">← Volver al Inicio</RouterLink>
        <RouterLink to="/jugar" class="btn-play-footer">▶ Jugar Ahora</RouterLink>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '../stores/gameStore.js'

const store = useGameStore()

function isCurrentPlayer(entry, index) {
  if (!store.playerName || store.gameState !== 'finished') return false
  return store.currentPlayerRankPosition === index + 1
}
</script>

<style scoped>
.ranking-page {
  min-height: calc(100vh - 73px);
  background: linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f97316 100%);
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.ranking-container {
  max-width: 640px;
  width: 100%;
}

/* Cabecera */
.ranking-header {
  text-align: center;
  color: white;
  margin-bottom: 2rem;
}

.ranking-icon {
  font-size: 3rem;
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  backdrop-filter: blur(10px);
}

.ranking-header h1 {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.25rem;
}

.ranking-header p {
  opacity: 0.9;
  margin-bottom: 0.75rem;
}

.badge-top {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.3rem 0.9rem;
  border-radius: 20px;
  font-size: 0.85rem;
  backdrop-filter: blur(10px);
}

/* Estado vacío */
.empty-state {
  background: white;
  border-radius: 16px;
  padding: 3rem 2rem;
  text-align: center;
  margin-bottom: 1.5rem;
}

.empty-icon {
  font-size: 3rem;
  opacity: 0.3;
  margin-bottom: 1rem;
}

.empty-state h3 {
  font-size: 1.2rem;
  color: #374151;
  margin-bottom: 0.5rem;
}

.empty-state p {
  color: #6b7280;
  margin-bottom: 1.5rem;
}

.btn-play {
  display: inline-block;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.95rem;
  transition: opacity 0.2s;
}

.btn-play:hover { opacity: 0.9; }

/* Lista de rankings */
.rankings-list {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.ranking-entry {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #f3f4f6;
  transition: background 0.2s;
}

.ranking-entry:last-child { border-bottom: none; }

.ranking-entry:hover { background: #fafafa; }

/* Posiciones especiales */
.entry-gold {
  background: linear-gradient(135deg, #fffbeb, #fef3c7);
  border-left: 4px solid #fbbf24;
}

.entry-silver {
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
  border-left: 4px solid #94a3b8;
}

.entry-bronze {
  background: linear-gradient(135deg, #fff7ed, #ffedd5);
  border-left: 4px solid #fb923c;
}

/* Jugador actual resaltado */
.entry-current {
  background: linear-gradient(135deg, #faf5ff, #fdf2f8) !important;
  border-left: 4px solid #a855f7 !important;
  box-shadow: 0 0 0 2px rgba(168, 85, 247, 0.2);
}

/* Icono posición */
.entry-position {
  width: 40px;
  text-align: center;
  flex-shrink: 0;
}

.pos-icon { font-size: 1.5rem; }

.pos-num {
  font-size: 1rem;
  font-weight: 700;
  color: #9ca3af;
}

/* Info jugador */
.entry-info {
  flex: 1;
  min-width: 0;
}

.entry-name-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.2rem;
}

.entry-name {
  font-weight: 700;
  color: #1f2937;
  font-size: 0.95rem;
}

.entry-badge {
  font-size: 0.7rem;
  padding: 0.15rem 0.5rem;
  border-radius: 10px;
  font-weight: 600;
}

.entry-badge.gold { background: #fef3c7; color: #92400e; }
.entry-badge.silver { background: #f1f5f9; color: #475569; }
.entry-badge.bronze { background: #ffedd5; color: #9a3412; }

.entry-meta {
  font-size: 0.78rem;
  color: #9ca3af;
  display: flex;
  gap: 0.4rem;
  align-items: center;
}

.meta-sep { opacity: 0.5; }

/* Puntuación */
.entry-score {
  text-align: right;
  flex-shrink: 0;
}

.score-value {
  display: block;
  font-size: 1.4rem;
  font-weight: 800;
  color: #a855f7;
  line-height: 1;
}

.score-unit {
  font-size: 0.72rem;
  color: #9ca3af;
}

/* Mensaje no en top */
.not-in-top {
  padding: 1rem;
  text-align: center;
  font-size: 0.9rem;
  color: #6b7280;
  background: #f9fafb;
  border-top: 1px dashed #e5e7eb;
}

/* Footer */
.ranking-footer {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}

.btn-home,
.btn-play-footer {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  transition: opacity 0.2s, transform 0.2s;
}

.btn-home {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
}

.btn-home:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

.btn-play-footer {
  background: white;
  color: #a855f7;
  font-weight: 700;
}

.btn-play-footer:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

</style>
