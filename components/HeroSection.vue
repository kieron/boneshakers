<template>
  <section class="hero">
    <div class="hero-bg"></div>
    <div class="hero-content">
      <div class="skull-logo">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="45" rx="35" ry="40"/>
          <ellipse cx="35" cy="40" rx="10" ry="12" fill="#0a0a0a"/>
          <ellipse cx="65" cy="40" rx="10" ry="12" fill="#0a0a0a"/>
          <ellipse cx="50" cy="55" rx="5" ry="8" fill="#0a0a0a"/>
          <rect x="38" y="75" width="5" height="12" rx="1"/>
          <rect x="47" y="75" width="5" height="12" rx="1"/>
          <rect x="56" y="75" width="5" height="12" rx="1"/>
        </svg>
      </div>
      <h1>Boneshakers</h1>
      <p>Tattoo & Piercing Studio</p>
      <a href="#contact" class="btn">Book a Consultation</a>
    </div>
  </section>
</template>

<style scoped>
.hero {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=1920&h=1080&fit=crop');
  background-size: cover;
  background-position: center;
}

.hero-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
}

.skull-logo {
  width: 200px;
  height: 200px;
  margin: 0 auto 30px;
  background: var(--darker);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid var(--accent);
}

.skull-logo svg {
  width: 120px;
  height: 120px;
  fill: var(--accent);
}

.hero h1 {
  font-size: 4rem;
  margin-bottom: 20px;
  letter-spacing: 8px;
}

.hero p {
  font-size: 1.2rem;
  color: var(--text-muted);
  margin-bottom: 30px;
  letter-spacing: 3px;
  text-transform: uppercase;
}

@media (max-width: 968px) {
  .hero h1 {
    font-size: 2.5rem;
  }
}

@media (max-width: 600px) {
  .hero h1 {
    font-size: 2rem;
    letter-spacing: 4px;
  }

  .skull-logo {
    width: 150px;
    height: 150px;
  }

  .skull-logo svg {
    width: 80px;
    height: 80px;
  }
}
</style>
