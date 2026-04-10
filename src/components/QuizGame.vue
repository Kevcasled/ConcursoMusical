<template>
  <div class="quiz-wrapper">
    <div class="quiz-card">

      <div class="quiz-header">
        <div class="player-info">
          <span class="player-name">{{ store.playerName }}</span>
        </div>
        <div class="score-badge">🏆 {{ store.score }} puntos</div>
      </div>

      <div class="question-progress">
        <span class="question-label">Pregunta {{ store.currentQuestionIndex + 1 }} de {{ store.totalQuestions }}</span>
        <span class="accuracy-label">{{ store.accuracyPercent }}%</span>
      </div>
      <div class="progress-bar-outer">
        <div class="progress-bar-inner" :style="{ width: store.progressPercent + '%' }"></div>
      </div>

      <div class="audio-section">
        <button class="play-btn" @click="replayAudio" :disabled="answered">
          <Play :size="18" fill="white" color="white" />
        </button>
        <div class="audio-progress-outer">
          <div class="audio-progress-inner" :style="{ width: audioProgress + '%' }"></div>
        </div>
        <Volume2 :size="20" stroke-width="2" />
      </div>
      <p class="audio-label">Reproducir fragmento de 5 segundos</p>

      <div class="question-section">
        <h3>¿Qué canción es?</h3>
        <p v-if="answered" class="song-reveal">
          {{ store.currentQuestion.title }} — {{ store.currentQuestion.artist }}
        </p>
      </div>

      <div class="options-grid">
        <button
          v-for="option in store.currentQuestion.shuffledOptions"
          :key="option"
          class="option-btn"
          :class="getOptionClass(option)"
          :disabled="answered"
          @click="selectAnswer(option)"
        >
          <span class="option-text">{{ option }}</span>
          <span v-if="answered && option === store.currentQuestion.correct" class="option-icon correct-icon">✓</span>
          <span v-else-if="answered && option === selectedAnswer && option !== store.currentQuestion.correct" class="option-icon wrong-icon">✗</span>
        </button>
      </div>

      <transition name="fade">
        <div v-if="answered" class="feedback-box" :class="feedbackType">
          <span class="feedback-emoji">{{ feedbackEmoji }}</span>
          <p class="feedback-msg">{{ feedbackMessage }}</p>
        </div>
      </transition>

      <transition name="fade">
        <button v-if="answered" class="btn-next" @click="goNext">
          {{
            store.currentQuestionIndex < store.totalQuestions - 1
              ? 'Siguiente Pregunta →'
              : 'Ver Resultados 🏆'
          }}
        </button>
      </transition>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { Howl } from 'howler'
import { useGameStore } from '../stores/gameStore.js'
import { Play, Volume2 } from 'lucide-vue-next'

const store = useGameStore()

const answered = ref(false)
const selectedAnswer = ref(null)
const feedbackType = ref('')
const feedbackMessage = ref('')
const feedbackEmoji = ref('')

const audioProgress = ref(0)
let currentSound = null
let audioInterval = null
let audioStartTime = 0
let listenTimeThisQuestion = 0

const TOTAL_TIME = 30
const timeLeft = ref(TOTAL_TIME)
const timerPercent = computed(() => (timeLeft.value / TOTAL_TIME) * 100)
let timerInterval = null

function playAudio() {
  if (currentSound) {
    currentSound.stop()
    currentSound.unload()
  }
  clearInterval(audioInterval)
  audioProgress.value = 0

  const question = store.currentQuestion
  currentSound = new Howl({
    src: [question.audio],
    html5: true,
    onload() {
      const duration = currentSound.duration()
      const maxStart = Math.max(0, duration - 5)
      const startPos = Math.random() * maxStart
      audioStartTime = startPos
      listenTimeThisQuestion = 0

      currentSound.seek(startPos)
      currentSound.play()

      const fragmentDuration = 5000
      const startMs = Date.now()

      audioInterval = setInterval(() => {
        const elapsed = Date.now() - startMs
        listenTimeThisQuestion = elapsed / 1000
        audioProgress.value = Math.min((elapsed / fragmentDuration) * 100, 100)

        if (elapsed >= fragmentDuration) {
          currentSound.stop()
          clearInterval(audioInterval)
        }
      }, 100)
    },
    onloaderror() {
      console.warn('No se pudo cargar el audio:', question.audio)
    }
  })
}

function replayAudio() {
  if (!answered.value) {
    playAudio()
  }
}

function stopAudio() {
  if (currentSound) {
    currentSound.stop()
    currentSound.unload()
    currentSound = null
  }
  clearInterval(audioInterval)
  audioProgress.value = 0
}

function startTimer() {
  clearInterval(timerInterval)
  timeLeft.value = TOTAL_TIME

  timerInterval = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) {
      clearInterval(timerInterval)
      if (!answered.value) {
        timeout()
      }
    }
  }, 1000)
}

function stopTimer() {
  clearInterval(timerInterval)
}

function selectAnswer(option) {
  if (answered.value) return
  stopTimer()
  stopAudio()
  selectedAnswer.value = option
  answered.value = true

  const result = store.answerQuestion(option, listenTimeThisQuestion)
  showFeedback(result)
}

function timeout() {
  stopAudio()
  selectedAnswer.value = null
  answered.value = true

  const result = store.answerQuestion(null, listenTimeThisQuestion)
  showFeedback(result)
}

function showFeedback(result) {
  if (result === 'correct') {
    feedbackType.value = 'feedback-correct'
    feedbackEmoji.value = '🎉'
    feedbackMessage.value = '¡Correcto! +10 puntos'
  } else if (result === 'wrong') {
    feedbackType.value = 'feedback-wrong'
    feedbackEmoji.value = '😅'
    feedbackMessage.value = '¡Fallaste! -5 puntos'
  } else {
    feedbackType.value = 'feedback-timeout'
    feedbackEmoji.value = '⏰'
    feedbackMessage.value = 'Se acabó el tiempo. Sin cambios en la puntuación'
  }
}

function getOptionClass(option) {
  if (!answered.value) return ''
  if (option === store.currentQuestion.correct) return 'option-correct'
  if (option === selectedAnswer.value) return 'option-wrong'
  return 'option-disabled'
}

function goNext() {
  answered.value = false
  selectedAnswer.value = null
  feedbackType.value = ''
  feedbackMessage.value = ''
  feedbackEmoji.value = ''
  audioProgress.value = 0
  listenTimeThisQuestion = 0

  store.nextQuestion()
}

function initQuestion() {
  answered.value = false
  selectedAnswer.value = null
  feedbackType.value = ''
  feedbackMessage.value = ''
  feedbackEmoji.value = ''
  audioProgress.value = 0
  listenTimeThisQuestion = 0

  startTimer()
  playAudio()
}

onMounted(() => {
  initQuestion()
})

onUnmounted(() => {
  stopAudio()
  stopTimer()
})

watch(() => store.currentQuestionIndex, () => {
  if (store.gameState === 'playing') {
    initQuestion()
  }
})
</script>

<style scoped>
.quiz-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1.5rem;
}

.quiz-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  max-width: 560px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.quiz-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.player-name {
  font-weight: 600;
  color: #374151;
  font-size: 0.95rem;
}

.score-badge {
  background: linear-gradient(135deg, #a855f7, #ec4899);
  color: white;
  padding: 0.35rem 0.9rem;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.9rem;
}

.question-progress {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #6b7280;
  margin-bottom: 0.4rem;
}

.progress-bar-outer {
  background: #e5e7eb;
  border-radius: 4px;
  height: 6px;
  margin-bottom: 1rem;
  overflow: hidden;
}

.progress-bar-inner {
  background: linear-gradient(135deg, #a855f7, #ec4899);
  height: 100%;
  border-radius: 4px;
  transition: width 0.4s ease;
}

.audio-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #f9fafb;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  margin-bottom: 0.4rem;
}

.play-btn {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: opacity 0.2s;
}

.play-btn:hover:not(:disabled) { opacity: 0.85; }
.play-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.audio-progress-outer {
  flex: 1;
  background: #e5e7eb;
  border-radius: 4px;
  height: 6px;
  overflow: hidden;
}

.audio-progress-inner {
  background: linear-gradient(135deg, #a855f7, #ec4899);
  height: 100%;
  border-radius: 4px;
  transition: width 0.1s linear;
}

.audio-label {
  text-align: center;
  font-size: 0.8rem;
  color: #9ca3af;
  margin-bottom: 1.25rem;
}

.question-section {
  text-align: center;
  margin-bottom: 1.25rem;
}

.question-section h3 {
  font-size: 1.1rem;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.song-reveal {
  font-size: 0.9rem;
  color: #a855f7;
  font-weight: 600;
}

.options-grid {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.option-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  font-size: 0.95rem;
  color: #374151;
  text-align: left;
  transition: border-color 0.2s, background 0.2s;
}

.option-btn:hover:not(:disabled) {
  border-color: #a855f7;
  background: #faf5ff;
}

.option-btn:disabled { cursor: not-allowed; }

.option-correct {
  border-color: #22c55e !important;
  background: #f0fdf4 !important;
  color: #15803d !important;
}

.option-wrong {
  border-color: #ef4444 !important;
  background: #fef2f2 !important;
  color: #b91c1c !important;
}

.option-disabled {
  opacity: 0.5;
}

.option-icon {
  font-size: 1.1rem;
  font-weight: 700;
}

.correct-icon { color: #22c55e; }
.wrong-icon { color: #ef4444; }

.feedback-box {
  border-radius: 10px;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  font-weight: 500;
}

.feedback-correct {
  background: #f0fdf4;
  color: #15803d;
  border: 1px solid #bbf7d0;
}

.feedback-wrong {
  background: #fef2f2;
  color: #b91c1c;
  border: 1px solid #fecaca;
}

.feedback-timeout {
  background: #fffbeb;
  color: #92400e;
  border: 1px solid #fde68a;
}

.feedback-emoji { font-size: 1.4rem; }
.feedback-msg { font-size: 0.95rem; }

.btn-next {
  width: 100%;
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

.btn-next:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.fade-enter-active,
.fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }
</style>
