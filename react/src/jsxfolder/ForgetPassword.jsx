import "../css/forget.css";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
    const navigate = useNavigate();
    
    
    const [email, setEmail] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    
    const inputRef = useRef(null);

    
    useEffect(() => {
        document.body.style.overflow = "auto";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    
    const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    const isValidPhone = (val) => /^[0-9]{10}$/.test(val);

    
    const handleSendOTP = async () => {
        const val = email.trim();
        
        if (!isValidEmail(val) && !isValidPhone(val)) {
            triggerError(inputRef.current);
            alert("Please enter a valid email or phone number.");
            return;
        }

        try {
            const res = await fetch("https://rwd.up.railway.app/auth/forget", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: val }),
            });
            const data = await res.json();

            if (res.status === 200 && data.success) {
                setOtpSent(true); 
                alert("OTP Sent Successfully!");
            } else {
                triggerError(inputRef.current);
                alert(data.message || "Failed to send OTP.");
            }
        } catch (error) {
            console.error("Error:", error);
            
            alert("Server Error.");
        }
    };

    
    const handleVerifyOTP = async () => {
        const otpValue = otp.join("").trim();
        if (otpValue.length !== 6) {
            alert("Please enter the complete 6-digit code.");
            return;
        }

        try {
            const res = await fetch("https://rwd.up.railway.app/auth/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp: otpValue }),
            });
            const data = await res.json();

            if (res.status === 200 && data.success) {
                localStorage.setItem("resetEmail", email);
                navigate("/reset");
            } else {
                alert("Invalid OTP.");
                setOtp(["", "", "", "", "", ""]);
            }
        } catch (err) {
            console.error(err);
            alert("Verification Failed.");
        }
    };

    
    const handleOtpChange = (index, value) => {
        if (value.length > 1) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 5) document.getElementById(`otp-${index + 1}`).focus();
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`).focus();
        }
    };

    const triggerError = (el) => {
        if(el) {
            el.classList.add("error");
            setTimeout(() => el.classList.remove("error"), 300);
            el.focus();
        }
    };

    return (
        <div className="card">
            
            { }
            <div onClick={() => navigate("/login")} className="back-link">
                ← Back to Login
            </div>

            <h1>Forgot Password</h1>
            <p className="desc-text">
                Enter your registered email or phone number to receive a verification code.
            </p>

            { }
            <div className="input-group">
                <label className="input-label">Email Address or Phone Number</label>
                <input
                    type="text"
                    ref={inputRef}
                    className={otpSent ? "input-success" : ""}
                    placeholder="Enter email or phone number"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={otpSent} 
                />
                
                <button className="btn-get-otp" onClick={handleSendOTP}>
                    {otpSent ? "Resend OTP" : "Get OTP"}
                </button>
            </div>

            { }
            <div className={`otp-section ${otpSent ? "visible" : ""}`}>
                
                <div className="divider">VERIFY</div>

                <div className="input-group">
                    <label className="input-label">Enter the 6-Digit Verification Code</label>
                    <div className="otp-container">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                className="otp-box"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                            />
                        ))}
                    </div>
                </div>

                <button className="btn-verify" onClick={handleVerifyOTP}>
                    Verify & Proceed
                </button>
            </div>

        </div>
    );
}

export default ForgetPassword;