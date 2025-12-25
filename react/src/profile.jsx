import "./profile.css";
import { useState } from "react";

function Profile({ open }) {
  if (!open) return null;

  return (
    <div className="profile-popup-card">
      {/* Header */}
      <div className="profile-header-card">
        <div className="profile-avatar">👤</div>
        <h2>John Doe</h2>
      </div>

      {/* Balance */}
      <div className="profile-balance-row">
        <div>
          <p className="balance-label">Current Balance</p>
          <h3 className="balance-amount">₹ 1000</h3>
        </div>
        <button className="topup-btn">Top-Up</button>
      </div>

      {/* Actions */}
      <div className="profile-actions">
        <div className="action-card">
          <div className="icon">💲</div>
          Orders
        </div>
        <div className="action-card">
          <div className="icon">✉️</div>
          Contact Us
        </div>
      </div>

      {/* Info */}
      <div className="profile-info">+91 0123456789</div>
      <div className="profile-info">johndoe@gmail.com</div>

      {/* Logout */}
      <button className="logout-btn">Log Out</button>
    </div>
  );
}

export default Profile;