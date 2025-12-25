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

    if (!order) return (
        <div className="oc-page-wrapper" style={{alignItems:'center', justifyContent:'center'}}>
            <h2>Loading Order...</h2>
        </div>
    );

    return (
        
        <div className="oc-page-wrapper">
            
            { }
            <header className="oc-navbar">
                <div className="oc-nav-left">
                    <div className="oc-logo-circle">C</div>
                    <span className="oc-brand-name">Canteen Connect</span>
                </div>
                <div className="oc-profile-circle">JD</div>
            </header>

            { }
            <div className="oc-banner-section">
                <div className="oc-back-btn-container">
                    <svg
                        className="oc-back-btn"
                        onClick={() => navigate("/menu")} 
                        width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="#F47C4F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                    >
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </div>

                <div className="oc-status-badge">Order Confirmed</div>

                <img
                    className="oc-hero-img"
                    src="https://res.cloudinary.com/dxijfcgpw/image/upload/v1766212708/Screenshot_2025-12-20_120733_fj4tnn.png"
                    alt="Character"
                />
            </div>

            { }
            <div className="oc-details-container">
                <h2 className="oc-section-title">Items Ordered</h2>

                <div className="oc-items-list">
                    {order.items.map((item) => (
                        <div className="oc-item-card" key={item._id}>
                            <img src={item.itemsrc} alt={item.itemname} className="oc-item-img" />
                            
                            <div className="oc-item-text">
                                <div className="oc-item-name">
                                    { }
                                    <svg width={16} height={16} viewBox="0 0 24 24">
                                        <rect x="2" y="2" width="20" height="20" rx="4" fill="none" stroke="#4CAF50" strokeWidth="2" />
                                        <circle cx="12" cy="12" r="5" fill="#4CAF50" />
                                    </svg>
                                    <span>{item.itemname}</span>

                                    {item.quantity > 1 && (
                                        <span className="oc-qty-badge">x{item.quantity}</span>
                                    )}
                                </div>
                                <span className="oc-item-sub">From: Central Mess</span>
                            </div>

                            <div className="oc-item-price">₹{item.itemprice * item.quantity}</div>
                        </div>
                    ))}
                </div>

                <button className="oc-home-btn" onClick={() => navigate("/menu")}>
                    Back to Menu
                </button>
            </div>

        </div>
    );
}

export default Order;