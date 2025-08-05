import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
  <h1>Fresh Groceries Delivered to Your Doorstep</h1>
  <p>Explore a wide range of fresh fruits, vegetables, and household essentials at affordable prices.</p>
  <button className="btn-primary">
    <span role="img" aria-label="cart">
🏷️</span> Shop Now
  </button>
</div>

      <div className="hero-image">
        <img src="https://i.pinimg.com/736x/b5/6b/f2/b56bf29cca030ba5e8b4f8265ea64e69.jpg" alt="Fresh produce" />
      </div>
    </section>
  );
}

export default Hero;
