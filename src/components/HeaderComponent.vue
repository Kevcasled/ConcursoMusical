<template>
  <header class="header">
    <div class="container">
      <RouterLink to="/" class="logo">
        <div class="logo-circle">
          <Music2 :size="22" color="white" />
        </div>
        <span class="logo-text">Adivina la Canción</span>
      </RouterLink>
      <nav class="nav">
        <RouterLink to="/" class="nav-link"><House :size="16" /> Inicio</RouterLink>
        <RouterLink to="/jugar" class="nav-link"><Play :size="16" fill="currentColor" /> Jugar</RouterLink>
        <RouterLink to="/ranking" class="nav-link"><Trophy :size="16" /> Ranking</RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { Music2, House, Play, Trophy } from 'lucide-vue-next'
</script>

<style scoped>
.header {
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  text-decoration: none;
}

.logo-circle {
  width: 45px;
  height: 45px;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(168, 85, 247, 0.3);
}

.logo-text {
  font-size: 1.3rem;
  font-weight: 700;
  color: #a855f7;
}

.nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  color: #6b7280;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #a855f7;
  font-weight: 600;
}
</style>
