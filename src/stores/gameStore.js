import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { songs as allSongs } from '../data/songs.js'

export const useGameStore = defineStore('game', () => {
  // Estado
  const playerName = ref('')
  const score = ref(0)
  const currentQuestionIndex = ref(0)
  const gameState = ref('welcome') // 'welcome' | 'playing' | 'finished'
  const selectedQuestions = ref([])
  const correctAnswers = ref(0)
  const totalListenTime = ref(0) // segundos totales escuchados (desempate)
  const rankings = ref(JSON.parse(localStorage.getItem('musicalRankings') || '[]'))
  const currentPlayerRankPosition = ref(null)

  // Computadas
  const currentQuestion = computed(() => selectedQuestions.value[currentQuestionIndex.value])
  const totalQuestions = computed(() => selectedQuestions.value.length)
  const progressPercent = computed(() =>
    totalQuestions.value > 0 ? Math.round(((currentQuestionIndex.value) / totalQuestions.value) * 100) : 0
  )
  const accuracyPercent = computed(() => {
    if (currentQuestionIndex.value === 0) return 0
    return Math.round((correctAnswers.value / currentQuestionIndex.value) * 100)
  })
  const finalAccuracy = computed(() =>
    totalQuestions.value > 0 ? Math.round((correctAnswers.value / totalQuestions.value) * 100) : 0
  )

  // Acciones
  function startGame(name) {
    playerName.value = name
    score.value = 0
    currentQuestionIndex.value = 0
    correctAnswers.value = 0
    totalListenTime.value = 0
    currentPlayerRankPosition.value = null

    // Seleccionar 10 canciones aleatorias de las 20
    const shuffled = [...allSongs].sort(() => Math.random() - 0.5)
    selectedQuestions.value = shuffled.slice(0, 10).map(song => ({
      ...song,
      // Mezclar las opciones aleatoriamente
      shuffledOptions: [...song.options].sort(() => Math.random() - 0.5)
    }))

    gameState.value = 'playing'
  }

  function answerQuestion(answer, listenTime) {
    totalListenTime.value += listenTime
    const question = currentQuestion.value

    if (answer === null) {
      // Sin respuesta a tiempo
      return 'timeout'
    } else if (answer === question.correct) {
      score.value += 10
      correctAnswers.value++
      return 'correct'
    } else {
      score.value = Math.max(0, score.value - 5)
      return 'wrong'
    }
  }

  function nextQuestion() {
    if (currentQuestionIndex.value < totalQuestions.value - 1) {
      currentQuestionIndex.value++
    } else {
      endGame()
    }
  }

  function endGame() {
    saveToRanking()
    gameState.value = 'finished'
  }

  function saveToRanking() {
    const entry = {
      name: playerName.value,
      score: score.value,
      accuracy: finalAccuracy.value,
      correct: correctAnswers.value,
      listenTime: totalListenTime.value,
      date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
    }

    const updated = [...rankings.value, entry]

    // Ordenar: puntuación DESC, en empate menor tiempo de escucha gana
    updated.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      return a.listenTime - b.listenTime
    })

    // Guardar top 10
    rankings.value = updated.slice(0, 10)
    localStorage.setItem('musicalRankings', JSON.stringify(rankings.value))

    // Calcular posición del jugador actual
    const pos = rankings.value.findIndex(r =>
      r.name === entry.name &&
      r.score === entry.score &&
      r.listenTime === entry.listenTime
    )
    currentPlayerRankPosition.value = pos >= 0 ? pos + 1 : null
  }

  function resetGame() {
    playerName.value = ''
    score.value = 0
    currentQuestionIndex.value = 0
    correctAnswers.value = 0
    totalListenTime.value = 0
    selectedQuestions.value = []
    currentPlayerRankPosition.value = null
    gameState.value = 'welcome'
  }

  return {
    // Estado
    playerName,
    score,
    currentQuestionIndex,
    gameState,
    selectedQuestions,
    correctAnswers,
    totalListenTime,
    rankings,
    currentPlayerRankPosition,
    // Computadas
    currentQuestion,
    totalQuestions,
    progressPercent,
    accuracyPercent,
    finalAccuracy,
    // Acciones
    startGame,
    answerQuestion,
    nextQuestion,
    endGame,
    resetGame
  }
})
