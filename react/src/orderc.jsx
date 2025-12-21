import "./orderc.css";

function Order() {
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
  <div className="cards">
    <div className="dish-card">
      
      <img src="https://res.cloudinary.com/dxijfcgpw/image/upload/v1766209278/canteen_mess_banner_whztni.png" alt="yoooo" />
      <div className="texts">
      <p className="dishname">Chicken Biriyani</p>
      <p className="catagory">From:Central Mess</p>
      </div>
      <p className="amt">$120</p>
    </div>
  </div>
</div>
    </>
  );
}

export default Order;