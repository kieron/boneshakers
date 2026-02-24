<template>
  <section id="shop">
    <div class="container">
      <div class="section-header">
        <h2>Shop</h2>
        <div class="divider"></div>
        <p>Our online store is coming soon</p>
      </div>
      <div class="shop-coming-soon">
        <h3>Coming Soon</h3>
        <p class="coming-soon-text">We're working on bringing you exclusive Boneshakers merchandise</p>
        <div class="shop-categories">
          <div class="shop-category">
            <div class="shop-icon">&#128141;</div>
            <h4>Jewellery</h4>
          </div>
          <div class="shop-category">
            <div class="shop-icon">&#128085;</div>
            <h4>Clothing</h4>
          </div>
          <div class="shop-category">
            <div class="shop-icon">&#127912;</div>
            <h4>Art</h4>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
#shop {
  background:
    radial-gradient(ellipse at 0% 0%, rgba(201, 162, 39, 0.03) 0%, transparent 50%),
    radial-gradient(ellipse at 100% 100%, rgba(201, 162, 39, 0.02) 0%, transparent 50%),
    var(--darker);
}

.shop-coming-soon {
  text-align: center;
  padding: 60px;
  border: 2px dashed var(--border);
  border-radius: 10px;
}

.coming-soon-text {
  color: var(--text-muted);
  margin: 20px 0;
}

.shop-categories {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 30px;
  flex-wrap: wrap;
}

.shop-category {
  text-align: center;
  padding: 30px;
  background: var(--dark);
  border-radius: 10px;
  min-width: 150px;
}

.shop-category h4 {
  color: var(--accent);
  margin-top: 15px;
}

.shop-icon {
  font-size: 2.5rem;
}
</style>
