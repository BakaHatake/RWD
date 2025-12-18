import { useEffect, useState } from "react";

function Hero() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
        // const url = "http://localhost:8080/auth/filter";
      const url = "https://rwd.up.railway.app/auth/filter";

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category: "Main Course" }),
      });

      const data = await res.json();
      setItems(data); // store API data
    }

    fetchItems();
  }, []);

  return (
    <>
      <div className="para">Main Course Specials</div>

      <div className="dish" id="dish">
        {items.map((item) => (
          <div className="acard" key={item._id}>
            <div className="card">
              <div className="image">
                <img src={item.imageUrl} alt={item.name} />
              </div>

              <div className="card-body">
                <h4 className="dish-name">{item.name}</h4>
                <p className="paisa">₹{item.price}</p>
                <button className="add-btn">Add +</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Hero;