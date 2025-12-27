import "../css/profile.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topup from "./topup";
function Profile({ open, onClose }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (open) {
      const fetchProfile = async () => {
        setLoading(true);
        const key = localStorage.getItem("key");
        if (!key) {
          setLoading(false);
          return;
        }

        try {
          const res = await fetch(`https://rwd.up.railway.app/auth/profile?key=${key}`);
          const data = await res.json();
          if (data.success) {
            setUser(data.body);
          }
        } catch (error) {
          console.error("Failed to fetch profile:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProfile();
    }
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* 🔥 BACKDROP */}
      <div className="profile-backdrop" onClick={onClose}></div>

      {/* 🔥 POPUP */}
      <div className="profile-popup-card">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '20px', fontSize: '18px', fontWeight: 'bold', color: '#FF7043' }}>Loading...</div>
        ) : (
          <>
            {/* Header */}
            <div className="profile-header-card">
              <div className="profile-avatar">👤</div>
              <h2>{user?.name || "User"}</h2>
            </div>

            {/* Balance */}
            <div className="profile-balance-row">
              <div>
                <p className="balance-label">Current Balance</p>
                <h3 className="balance-amount">₹ {user?.balance !== undefined ? user.balance : "0"}</h3>
              </div>
              <button className="topup-btn" onClick={() => navigate("/Topup")} 
              >Top-Up</button>
            </div>

            {/* Actions */}
            <div className="profile-actions">
              <div className="action-card">
                <div className="profile-action-icon">💲</div>
                Orders
              </div>
              <div className="action-card">
                <div className="profile-action-icon">✉️</div>
                Contact Us
              </div>
            </div>

            {/* Info */}
            <div className="profile-info">{user?.phone || "+91 XXXXXXXXXX"}</div>
            <div className="profile-info">{user?.email || "email@example.com"}</div>

            {/* Logout */}
            <button className="logout-btn" onClick={() => {
              localStorage.removeItem("key");
              localStorage.removeItem("gmail");
              localStorage.removeItem("token");
              window.location.reload();
            }}>Log Out</button>
          </>
        )}
      </div>
    </>
  );
}

export default Profile;