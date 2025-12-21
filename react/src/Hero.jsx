import "./canteen.css";
import { useNavigate } from "react-router-dom";
function Hero() {
    const navigate = useNavigate();
  return (
    <div className="hero">
      <div className="hero-content">
        <button className="trial-btn" onClick={() => navigate("/pageTwo")}>
        <svg  width="50" height="80" viewBox="0 0 80 130">
          <circle cx="40" cy="40" r="40" fill="#F47C4F" />
          <path
            d="M45 24 L29 40 L45 56 M29 40 H55"
            fill="none"
            stroke="#ffffffff"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        </button>
        <h1 className="hero-title">Central Mess</h1>
        <p className="hero-subtitle">
          North Indian • South Indian • Lunch & Dinner
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