import "./orderc.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Order() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("lastOrder");
    console.log("Raw localStorage data:", data);

    if (data) {
      const parsed = JSON.parse(data);
      console.log("Parsed order:", parsed);
      setOrder(parsed);
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

      <h1 className="h1order-confirmed">Order Confirmed</h1>

      <div className="ordered">
        <p className="para-order">Items Ordered</p>

        <div className="cards">
          {order.items.map((item) => (
            <div className="dish-card" key={item._id}>
              <img src={item.itemsrc} alt={item.itemname} />

              <div className="texts">
                <p className="dishname">
                  <span>{item.itemname}</span>
                </p>
                <p className="catagory">Qty: {item.quantity}</p>
              </div>

              <p className="amt">₹{item.itemprice}</p>
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => navigate("/canteen")}>
        Back to Menu
      </button>
    </>
  );
}

export default Order;