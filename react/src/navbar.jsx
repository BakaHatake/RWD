function Navbar() {
  return (
    <div className="navbar">
      <h2 className="logo">Canteen Connect</h2>

        <div className="right">
            <div className="cart" id="cart">
                <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="#FF7043" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7.2998 5H22L20 12H8.37675M21 16H9L7 3H4M4 8H2M5 11H2M6 14H2"/>
                    <circle cx="9" cy="20" r="1"/>
                    <circle cx="20" cy="20" r="1"/>
                </svg>
            </div>

            <div className="profile-icon">
                <svg width="50" height="50" viewBox="0 0 16 16" fill="#ffffff">
                    <path d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z"/>
                    <path d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z"/>
                </svg>
            </div>
        </div>
    </div>
  );
}

export default Navbar;