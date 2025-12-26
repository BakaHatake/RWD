import { useState } from "react";
import "../css/topup.css";


function Topup() {
    
  const [amount, setAmount] = useState(0);
  const currentBalance = 1000;

  const quickAdd = (value) => {
    setAmount(value);
  };

  const handlePay = () => {
    if (amount <= 0) {
      alert("Enter a valid amount");
      return;
    }
    alert(`Proceeding to pay ₹${amount}`);
    // 👉 later: Razorpay / Stripe / backend API
  };

  return (
    
    <div className="topup-page">
      <h1 className="topup-title">Top-Up</h1>

      <div className="balance-card">
        <p>CURRENT BALANCE</p>
        <h2>₹ {currentBalance}</h2>
      </div>

      <div className="topup-row">
        <div className="quick-add">
          <p className="addw">Add To Wallet</p>
          <div className="amount-buttons">
            <button onClick={() => quickAdd(200)}>200</button>
            <button onClick={() => quickAdd(500)}>500</button>
            <button onClick={() => quickAdd(750)}>750</button>
          </div>
        </div>

        <div className="custom-amount">
          <p className="amt-para">Enter Amount</p>
          <input
            type="number"
            placeholder="₹ ____"
            value={amount || ""}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
      </div>

      <button class="pay-btn">
  <span class="pay-text">PAY</span>
  <span class="arrow-circle">
    <span class="arrow"></span>
  </span>
</button>
</div>
  );
}

export default Topup;