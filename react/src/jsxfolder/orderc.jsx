import "../css/orderc.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Order() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    const fetchOrder = async () => {
      if (email) {
        try {
          const url = "https://rwd.up.railway.app/auth/getorder";
          const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user: email }),
          });
          const result = await response.json();
          if (result.success && result.data && result.data.length > 0) {
            setOrder(result.data[0]);
          }
        } catch (error) {
          console.error("Error fetching order:", error);
        }
      } else {
        const data = localStorage.getItem("lastOrder");
        if (data) setOrder(JSON.parse(data));
      }
    };
    fetchOrder();
  }, [email]);

  if (!order) return <h2>No order found</h2>;

  return (
    <>
      <header className="navbar">
        <div className="nav-left">
          <div className="logo-circle">C</div>
          <span className="brand-name">Canteen Connect</span>
        </div>
        <div className="profile-circle">JD</div>
      </header>

      <div className="page-container">

        <div className="main-white">
          <div className="back-btn-container">
            <svg
              className="back-btn"
              onClick={() => navigate("https://rwd-eight.vercel.app/html/menu.html")}
              width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="#F47C4F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </div>

          <div className="h1order-confirmed">Order Confirmed</div>

          <img
            src="https://res.cloudinary.com/dxijfcgpw/image/upload/v1766212708/Screenshot_2025-12-20_120733_fj4tnn.png"
            alt="Character"
          />
        </div>

        <div className="ordered">
          <h2 className="para-order">Items Ordered</h2>

          <div className="cards">
            {order.items.map((item) => (
              <div className="dish-card" key={item._id}>
                <img src={item.itemsrc} alt={item.itemname} />
                <div className="texts">
                  <div className="dishname">
                    <svg width={16} height={16} viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="4" fill="none" stroke="#4CAF50" strokeWidth="2" />
                      <circle cx="12" cy="12" r="5" fill="#4CAF50" />
                    </svg>
                    <span>{item.itemname}</span>

                    {item.quantity > 1 && (
                      <span className="qty-badge">x{item.quantity}</span>
                    )}
                  </div>
                  <span className="catagory">From: Central Mess</span>
                </div>

                <div className="amt">₹{item.itemprice * item.quantity}</div>
              </div>
            ))}
          </div>

          <button className="pro-btn" onClick={() => navigate("/canteen")}>
            Back to Menu
          </button>
        </div>

      </div>
    </>
  );
}

export default Order;