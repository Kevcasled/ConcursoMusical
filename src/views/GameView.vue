<template>
  <div class="game-page">
    <div v-if="store.gameState === 'welcome'" class="welcome-wrapper">
      <div class="welcome-card">
        <div class="welcome-icon">🎵</div>
        <h2>¡Adivina la Canción!</h2>
        <p class="welcome-sub">Escucha fragmentos de 5 segundos y adivina el título correcto</p>

        <div class="steps">
          <div class="step">
            <span class="step-num">1</span>
            <span>Escucha el fragmento de la canción</span>
          </div>
          <div class="step">
            <span class="step-num">2</span>
            <span>Elige la respuesta correcta entre 4 opciones</span>
          </div>
          <div class="step">
            <span class="step-num">🏆</span>
            <span>Gana 10 puntos por cada respuesta correcta</span>
          </div>
        </div>

        <div class="name-form">
          <label for="playerName">Tu nombre</label>
          <input
            id="playerName"
            v-model="nameInput"
            type="text"
            placeholder="Introduce tu nombre"
            @keyup.enter="startGame"
            maxlength="20"
          />
          <button
            class="btn-start"
            :disabled="!nameInput.trim()"
            @click="startGame"
          >
            ▶ Comenzar Juego
          </button>
        </div>
      </div>
    </div>

    <QuizGame v-else-if="store.gameState === 'playing'" />

    <GameResult v-else-if="store.gameState === 'finished'" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useGameStore } from '../stores/gameStore.js'
import QuizGame from '../components/QuizGame.vue'
import GameResult from '../components/GameResult.vue'

const store = useGameStore()
const nameInput = ref('')

function startGame() {
  if (!nameInput.value.trim()) return
  store.startGame(nameInput.value.trim())
}
</script>

<style scoped>
.game-page {
  min-height: calc(100vh - 73px);
  background: linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f97316 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.welcome-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}

.welcome-card {
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  max-width: 480px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.welcome-icon {
  font-size: 3rem;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.welcome-card h2 {
  font-size: 1.5rem;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.welcome-sub {
  color: #6b7280;
  margin-bottom: 2rem;
  font-size: 0.95rem;
}

.steps {
  text-align: left;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.step {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #4b5563;
  font-size: 0.95rem;
}

.step-num {
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  flex-shrink: 0;
}

.name-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  text-align: left;
}

.name-form label {
  font-weight: 600;
  color: #374151;
  font-size: 0.95rem;
}

.name-form input {
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

.name-form input:focus {
  border-color: #a855f7;
}

.btn-start {
  background: linear-gradient(135deg, #a855f7, #ec4899);
  color: white;
  border: none;
  padding: 0.875rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.2s;
  margin-top: 0.5rem;
}

.btn-start:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
}

.btn-start:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
