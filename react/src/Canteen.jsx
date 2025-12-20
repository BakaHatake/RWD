import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "./navbar"; 
import "./canteen.css";

function Canteen() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const kitchen = searchParams.get("kitchen");

  const kitchenImages = {
    "Main Course": "https://res.cloudinary.com/dxijfcgpw/image/upload/v1765875597/WhatsApp_Image_2025-12-15_at_21.23.13_86254f98_qe7fjr.jpg",
    "Quick Bites": "https://res.cloudinary.com/dxijfcgpw/image/upload/v1765875779/WhatsApp_Image_2025-12-15_at_21.30.24_dd9efbca_lzredk.jpg",
    "Beverages": "https://res.cloudinary.com/dxijfcgpw/image/upload/v1765875779/WhatsApp_Image_2025-12-15_at_21.30.24_dd9efbca_lzredk.jpg",
    "Sweet Tooth": "https://res.cloudinary.com/dxijfcgpw/image/upload/v1765875779/WhatsApp_Image_2025-12-15_at_21.30.24_dd9efbca_lzredk.jpg",
  };

  const heroImage = kitchenImages[kitchen] || kitchenImages["Main Course"];

  useEffect(() => {
    if (!kitchen) return;

    async function fetchItems() {
      try {
        setLoading(true);
        const res = await fetch("https://rwd.up.railway.app/auth/filter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ category: kitchen }),
        });

        if (!res.ok) throw new Error("Network response was not ok");

        const data = await res.json();
        console.log("DATA:",data)
        if (Array.isArray(data)) {
          setItems(data);
        } else if (data.items) {
          setItems(data.items);
        } else {
          setItems([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
  }, [kitchen]);

  if (!kitchen) return <div className="para">Please select a kitchen</div>;

  return (
    <>
      {/* 1. Add Navbar here */}
      <Navbar />

      {/* 2. Hero Section */}
      <div
        className="hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-overlay">
           <h1 className="hero-title">{kitchen}</h1>
        </div>
      </div>

      <div className="para">{kitchen} Specials</div>

      {loading ? (
        <div className="para">Loading dishes...</div>
      ) : (
        <div className="dish">
          {items.length > 0 ? (
            items.map((item) => (
              <div className="acard" key={item._id || Math.random()}>
                <div className="card">
                  <div className="image">
                    <img 
                      src={item.imageUrl || "https://via.placeholder.com/250"} 
                      alt={item.name} 
                    />
                  </div>
                  <div className="card-body">
                    <h4 className="dish-name">{item.name}</h4>
                    <p className="paisa">₹{item.price}</p>
                    <button className="add-btn">Add +</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="para">No items found.</div>
          )}
        </div>
      )}
    </>
  );
}

export default Canteen;