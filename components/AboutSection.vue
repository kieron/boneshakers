<template>
  <section id="about">
    <div class="container">
      <div class="section-header">
        <h2>About Us</h2>
        <div class="divider"></div>
      </div>
      <div class="about-content">
        <div class="about-text">
          <h3>Our Story</h3>
          <p>Boneshakers Tattoo Studio has been serving the community with exceptional tattoo artistry and professional piercing services. Our team of dedicated artists brings years of combined experience and a passion for creating unique, meaningful body art.</p>
          <p>We pride ourselves on maintaining the highest standards of hygiene and using only premium quality inks and equipment. Every client receives personalized attention, whether it's your first tattoo or you're adding to your collection.</p>
          <p>Our studio provides a welcoming, comfortable environment where creativity thrives. We believe that getting a tattoo should be an enjoyable experience from consultation to completion.</p>
        </div>
        <img class="about-image" src="https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=600&h=400&fit=crop" alt="Tattoo Studio" />
      </div>
      <div class="location-info">
        <h4>Find Us</h4>
        <p class="address">123 High Street<br>Your Town<br>AB1 2CD</p>
        <p class="hours-label"><strong>Opening Hours:</strong></p>
        <p class="hours">Monday - Saturday: 10am - 6pm<br>Sunday: Closed</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
#about {
  background:
    radial-gradient(ellipse at 50% 0%, rgba(201, 162, 39, 0.03) 0%, transparent 40%),
    var(--darker);
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.about-text h3 {
  font-size: 1.8rem;
  margin-bottom: 20px;
}

.about-text p {
  color: var(--text-muted);
  margin-bottom: 20px;
}

.about-image {
  height: 400px;
  border-radius: 10px;
  object-fit: cover;
  width: 100%;
}

.location-info {
  margin-top: 40px;
  padding: 30px;
  background: var(--dark);
  border-radius: 10px;
  border-left: 4px solid var(--accent);
}

.location-info h4 {
  color: var(--accent);
  margin-bottom: 15px;
}

.address,
.hours {
  color: var(--text-muted);
}

.hours-label {
  margin-top: 15px;
}

@media (max-width: 968px) {
  .about-content {
    grid-template-columns: 1fr;
  }
}
</style>
