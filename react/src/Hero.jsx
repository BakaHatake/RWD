import circle from "./Rassets/circlee.png";
function Hero() {
  return (
    <div className="hero">
      <div className="hero-content">
      <img className="image" src={circle} alt="picc" />
        <h1 className="hero-title">Central Mess</h1>

        <p className="hero-subtitle">
          North Indian • South Indian
        </p>

        <div className="hero-info">
          <button className="open-btn">Open Now</button>
          <span className="rating">⭐ 4.5</span>
        </div>
      </div>
    </div>
  );
}

export default Hero;