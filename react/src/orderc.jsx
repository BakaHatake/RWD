import "./orderc.css";
import { useNavigate } from "react-router-dom";

// import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
function Order() {
  // const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("lastOrder");
    if (data) {
      setOrder(JSON.parse(data));
    }
  }, []);

  if (!order) {
    return <h2>No order found</h2>;
  }

  return (
    <>
    <header className="navbar">
      <div className="nav-left">
        <div className="logo-circle">C</div>
        <span className="brand-name">Canteen Connect</span>
      </div>

      <div className="profile-circle">JD</div>
    </header>
    <div className="main1">
    <main className="main-white">
         <img src="https://res.cloudinary.com/dxijfcgpw/image/upload/v1766212708/Screenshot_2025-12-20_120733_fj4tnn.png" alt="picc" />
    </main>
    </div>

    <svg className="back-btn"
    onClick={() => navigate("https://rwd-eight.vercel.app/html/menu.html")}
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

        <div className="cards">
          {order.items.map((item) => (
            <div className="dish-card" key={item._id}>
              <img src={item.itemsrc} alt={item.itemname} />

              <div className="texts">
                <p className="dishname">
                  {/* veg icon */}
                  <svg width={20} height={20} viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="4" fill="none" stroke="#4CAF50" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="5" fill="#4CAF50" />
                  </svg>
                  <span>{item.itemname}</span>
                </p>

                <p className="catagory">From: Central Mess</p>
              </div>

              <p className="amt">₹{item.itemprice}₹50</p>
            </div>
          ))};
        </div>
    </div>

    </>
  );
}

export default Order;