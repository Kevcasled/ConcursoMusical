<template>
  <div>
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <div class="badge">🎵 ¡Nuevo Juego!</div>
        <h1>¿Cuánto sabes de música?</h1>
        <p class="description">
          Pon a prueba tu conocimiento musical. Escucha fragmentos de 5 segundos y
          adivina la canción correcta entre 4 opciones. ¡Compite por las mejores puntuaciones!
        </p>
        <div class="buttons">
          <RouterLink to="/jugar" class="btn-primary">▶ Comenzar a Jugar</RouterLink>
          <RouterLink to="/ranking" class="btn-secondary">🏆 Ver Ranking</RouterLink>
        </div>
        <div class="icon-container">
          <div class="headphones-icon">
            <Headphones :size="52" color="white" />
          </div>
        </div>
      </div>
    </section>

    <!-- How it works section -->
    <section class="how-it-works">
      <h2>¿Cómo funciona?</h2>
      <p class="subtitle">Un juego simple pero adictivo que pondrá a prueba tus conocimientos musicales</p>
      <div class="features">
        <div class="feature-card">
          <div class="feature-icon music">
            <Music2 :size="40" />
          </div>
          <h3>Escucha</h3>
          <p>Reproduce un fragmento de 5 segundos de una canción popular</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon target">
            <Target :size="40" />
          </div>
          <h3>Adivina</h3>
          <p>Elige la respuesta correcta entre 4 opciones posibles</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon crown">
            <Trophy :size="40" />
          </div>
          <h3>Compite</h3>
          <p>Gana 10 puntos por respuesta correcta y sube en el ranking</p>
        </div>
      </div>
    </section>

    <!-- Stats section -->
    <section class="stats">
      <div class="stat">
        <div class="stat-number">10</div>
        <div class="stat-label">Preguntas por partida</div>
      </div>
      <div class="stat">
        <div class="stat-number">100</div>
        <div class="stat-label">Puntos máximos</div>
      </div>
      <div class="stat">
        <div class="stat-number">5s</div>
        <div class="stat-label">Por canción</div>
      </div>
    </section>

    <!-- CTA section -->
    <section class="cta">
      <div class="cta-card">
        <div class="cta-icon">🏆</div>
        <h2>¿Listo para el desafío?</h2>
        <p>Demuestra que eres un experto musical y alcanza el top del ranking</p>
        <RouterLink to="/jugar" class="btn-cta">▶ Empezar Ahora</RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Headphones, Music2, Target, Trophy } from 'lucide-vue-next'
</script>

<style scoped>
/* Hero Section */
.hero {
  background: url('/cover.jpg') center center / cover no-repeat;
  position: relative;
  overflow: hidden;
  min-height: 600px;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(109, 40, 217, 0.82) 0%, rgba(168, 85, 247, 0.72) 40%, rgba(236, 72, 153, 0.68) 100%);
  z-index: 0;
}

.hero-content {
  padding: 4rem 2rem 6rem;
  text-align: center;
  color: white;
  position: relative;
  z-index: 1;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(10px);
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.description {
  max-width: 600px;
  margin: 0 auto 2rem;
  font-size: 1.1rem;
  line-height: 1.6;
  opacity: 0.95;
}

.buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 3rem;
}

.btn-primary,
.btn-secondary {
  padding: 0.875rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
  display: inline-block;
}

.btn-primary {
  background: white;
  color: #a855f7;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}

.icon-container {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.headphones-icon {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

/* How it works */
.how-it-works {
  padding: 4rem 2rem;
  text-align: center;
  background: white;
}

.how-it-works h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #1f2937;
}

.subtitle {
  color: #6b7280;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  padding: 2rem;
  border-radius: 12px;
  background: #f9fafb;
  transition: transform 0.3s, box-shadow 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.feature-icon.music {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: white;
}

.feature-icon.target {
  background: linear-gradient(135deg, #ec4899, #be185d);
  color: white;
}

.feature-icon.crown {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: white;
}

.feature-card h3 {
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
  color: #1f2937;
}

.feature-card p {
  color: #6b7280;
  line-height: 1.6;
}

/* Stats */
.stats {
  background: linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f97316 100%);
  padding: 3rem 2rem;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 2rem;
  color: white;
}

.stat { text-align: center; }

.stat-number {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  opacity: 0.9;
}

/* CTA */
.cta {
  padding: 4rem 2rem;
  background: white;
  display: flex;
  justify-content: center;
}

.cta-card {
  background: linear-gradient(135deg, #7c3aed, #a855f7);
  color: white;
  border-radius: 16px;
  padding: 3rem 4rem;
  text-align: center;
  max-width: 600px;
  width: 100%;
}

.cta-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.cta-card h2 {
  font-size: 1.8rem;
  margin-bottom: 0.75rem;
}

.cta-card p {
  opacity: 0.9;
  margin-bottom: 2rem;
}

.btn-cta {
  display: inline-block;
  background: white;
  color: #7c3aed;
  padding: 0.875rem 2rem;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

</style>
