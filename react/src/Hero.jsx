import circle from "./Rassets/circlee.png";
function Hero() {
  return (
    <>
 <div className="hero">
   <div className="hero-content">
  <svg
    width="50"
    height="80"
    viewBox="0 0 80 130"
    xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="40" fill="#F47C4F" />
    <path
      d="M45 24
      L29 40
      L45 56
      M29 40
      H55"
      fill="none"
      stroke="#FFE6DB"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
      <h1 className="hero-title">Central Mess</h1>
      <p className="hero-subtitle">
    North Indian •  South Indian •  Lunch & Dinner 
  </p>

     <div className="hero-info">
       <button className="open-btn">Open Now</button>
        <span className="rating">⭐ 4.5</span>
     </div>
     </div>
  </div>
  <div className="para">Main Course Specials</div>
 <div className="acard">
  <div className="card" id="card">
    <div className="image">
  <img src="https://res.cloudinary.com/dxijfcgpw/image/upload/v1764751586/Untitled_20design_20-_202025-09-16T110643.939_tigb9a.jpg" alt="food" />
  </div>
      <div className="card-body">
        <h4 className="dish-name">Veg Thali</h4>
        <p className="paisa">₹100</p>
        <button className="add-btn">Add +</button>
       </div>
      </div>
  </div>
</>
  );
}

export default Hero;