import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "./navbar";
import "./canteen.css";

function Canteen() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const gmail = searchParams.get("gmail");
  const kitchen = searchParams.get("kitchen");

  const kitchenImages = {
    "Main Course":
      "https://res.cloudinary.com/dxijfcgpw/image/upload/v1765875597/WhatsApp_Image_2025-12-15_at_21.23.13_86254f98_qe7fjr.jpg",
    "Quick Bites":
      "https://res.cloudinary.com/dxijfcgpw/image/upload/v1765875779/WhatsApp_Image_2025-12-15_at_21.30.24_dd9efbca_lzredk.jpg",
    "Beverages":
      "https://res.cloudinary.com/dxijfcgpw/image/upload/v1765875779/WhatsApp_Image_2025-12-15_at_21.30.24_dd9efbca_lzredk.jpg",
    "Sweet Tooth":
      "https://res.cloudinary.com/dxijfcgpw/image/upload/v1765875779/WhatsApp_Image_2025-12-15_at_21.30.24_dd9efbca_lzredk.jpg"
  };

  const heroImage = kitchenImages[kitchen] || kitchenImages["Main Course"];
useEffect(() => {
  if (gmail) {
    localStorage.setItem("gmail", gmail);
  }
}, [gmail]);
  useEffect(() => {
    if (!kitchen) return;

    async function fetchItems() {
      try {
        setLoading(true);

        const res = await fetch(
          "https://rwd.up.railway.app/auth/filter",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ category: kitchen })
          }
        );

        if (!res.ok) throw new Error("Network error");

        const data = await res.json();

        if (Array.isArray(data)) setItems(data);
        else if (data.items) setItems(data.items);
        else setItems([]);
      } catch (err) {
        console.error(err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, [kitchen]);

  const add2cart = async (item) => {
    try {
      let gamil = localStorage.getItem("gmail");

        if (!gamil) {
            alert("Invalid User. Please Login first!");
            window.location.href = "https://rwd-eight.vercel.app/html/login.html";
            return;
        }
            // const url = "http://localhost:8080/auth/add2cart";
            const url = "https://rwd.up.railway.app/auth/add2cart";
            let price = item.price;
            let src = item.imageUrl; 
            let name = item.name;
            const Body = JSON.stringify({
                user: gamil,
                itemprice: price,
                itemsrc: src,
                itemname: name,
            });
      const res = await fetch(url,

        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: Body
        }
      );

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Failed to add item");
        return;
      }

      console.log("Added to cart:", item.name);
    } catch (err) {
      console.error("Add to cart failed:", err);
    }
  };

  if (!kitchen) {
    return <div className="para">Please select a kitchen</div>;
  }

  return (
    <>
      <Navbar />

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
              <div className="acard" key={item._id}>
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
                    <button
                      className="add-btn"
                      onClick={() => add2cart(item)}
                    >
                      Add +
                    </button>
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
