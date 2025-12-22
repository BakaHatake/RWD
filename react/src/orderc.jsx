import "./orderc.css";
import { useEffect, useState } from "react";
function Order() {
   const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loadingWallet, setLoadingWallet] = useState(true);
  const [walletError, setWalletError] = useState("");
  

  const [orders, setOrders] = useState([]);
const [loading, setLoading] = useState(true);
  // 🔹 Fetch wallet balance
  useEffect(() => {
    async function fetchWallet() {
      try {
        const key = localStorage.getItem("gamil"); 

        if (!key) {
          setWalletError("User key not found");
          return;
        }
        let price = item.price;
            let src = item.imageUrl; 
            let name = item.name;
            const Body = JSON.stringify({
                user: gamil,
                itemprice: price,
                itemsrc: src,
                itemname: name,
            });
        const res = await fetch(
          "https://rwd.up.railway.app/auth/getwallet",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: Body
          }
        );

        const data = await res.json();

        if (!res.ok) {
          setWalletError(data.message || "Failed to fetch wallet");
          return;
        }

        // ✅ SUCCESS̀
        setBalance(data.balance);
        setTransactions(data.transactions || []);

      } catch (err) {
        console.error(err);
        setWalletError("Server error");
      } finally {
        setLoadingWallet(false);
      }
    }

    fetchWallet();
  }, []);

  return (
    <>
    <header className="navbar">
      <div className="nav-left">
        <div className="logo-circle">C</div>
        <span className="brand-name">Canteen Connect</span>
      </div>

      <div className="profile-circle">JD</div>
    </header>
    <main className="main-white">
         <img src="https://res.cloudinary.com/dxijfcgpw/image/upload/v1766212708/Screenshot_2025-12-20_120733_fj4tnn.png" alt="picc" />
    </main>
    <svg className="back-btn"
  width={55}
  height={55}
  viewBox="0 0 48 48"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M30 12L18 24L30 36"
    stroke="#F47C4F"
    strokeWidth="3" 
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <line
    x1="20"
    y1="24"
    x2="55"
    y2="24"
    stroke="#F47C4F"
    strokeWidth="3"
    strokeLinecap="round"
  />
</svg>
<h1 className="h1order-confirmed">Order Confirmed</h1>
<div className="ordered">
      <p className="para-order">Items Ordered</p>

      {loading ? (
        <p style={{ padding: "30px",fontWeight:"600",fontSize:"21px" }}>Loading orders...</p>
      ) : (
        <div className="cards">
          {orders.map((item, index) => (
            <div className="dish-card" key={index}>
              <img src={src} alt={item.itemname} />

              <div className="texts">
                <p className="dishname">
                  {/* veg icon */}
                  <svg width={20} height={20} viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="4" fill="none" stroke="#4CAF50" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="5" fill="#4CAF50" />
                  </svg>
                  <span>{name}</span>
                </p>

                <p className="catagory">From: Central Mess</p>
              </div>

              <p className="amt">₹{price}</p>
            </div>
          ))}
        </div>
      )}
    </div>

    </>
  );
}

export default Order;