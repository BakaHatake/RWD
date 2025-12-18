import { useNavigate } from "react-router-dom";
import "./notfound.css";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="nf-container">
      <h1 className="nf-logo">Canteen Connect</h1>

      <div className="nf-box">
        <div className="nf-404">
          <span>4</span>
          <img
            src="https://res.cloudinary.com/dxijfcgpw/image/upload/v1764751586/Untitled_20design_20-_202025-09-16T110643.939_tigb9a.jpg"
            alt="confused"
          />
          <span>4</span>
        </div>

        <p className="nf-text">NOT FOUND</p>

        <button onClick={() => navigate("/")} className="nf-btn">
          ← Back To Home
        </button>
      </div>
    </div>
  );
}

export default NotFound;