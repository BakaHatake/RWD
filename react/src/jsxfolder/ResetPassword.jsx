import "../css/pass.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
    const navigate = useNavigate();
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");
    const [showPass1, setShowPass1] = useState(false);
    const [showPass2, setShowPass2] = useState(false);
    const [email, setEmail] = useState("");

    useEffect(() => {
        const storedEmail = localStorage.getItem("resetEmail");
        if (storedEmail) {
            setEmail(storedEmail);
        } else {
            alert("Session expired. Please verify your email again.");
            navigate("/forget");
        }
        
        
        document.body.style.overflow = "auto";
    }, [navigate]);

    const handleReset = async () => {
        if (!pass1 || !pass2) {
            alert("Please fill in both password fields.");
            return;
        }
        if (pass1 !== pass2) {
            alert("Passwords do not match.");
            return;
        }

        try {
            const res = await fetch("https://rwd.up.railway.app/auth/reset", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    newPassword: pass1,
                    confirmPassword: pass2
                })
            });
            const data = await res.json();

            if (res.status === 200 && data.success) {
                alert("Password reset successfully! Login now.");
                localStorage.removeItem("resetEmail");
                navigate("/login");
            } else {
                alert(data.message || "Something went wrong.");
            }
        } catch (err) {
            console.error(err);
            alert("Server Error. Please try again.");
        }
    };

    return (
        <div className="card">
            <h1>Reset Password</h1>
            <p className="subtitle">
                Your identity has been verified. Create a new password to secure your account.
            </p>

            <div className="form-group">
                <label htmlFor="pass1">New Password</label>
                <div className="input-wrapper">
                    <input
                        id="pass1"
                        type={showPass1 ? "text" : "password"}
                        placeholder="Enter new password"
                        value={pass1}
                        onChange={(e) => setPass1(e.target.value)}
                    />
                    <span className="eye-icon" onClick={() => setShowPass1(!showPass1)}>
                        {showPass1 ? "🙈" : "👁️"}
                    </span>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="pass2">Confirm Password</label>
                <div className="input-wrapper">
                    <input
                        id="pass2"
                        type={showPass2 ? "text" : "password"}
                        placeholder="Re-enter new password"
                        value={pass2}
                        onChange={(e) => setPass2(e.target.value)}
                    />
                    <span className="eye-icon" onClick={() => setShowPass2(!showPass2)}>
                        {showPass2 ? "🙈" : "👁️"}
                    </span>
                </div>
            </div>

            <button className="btn-save" onClick={handleReset}>
                Save New Password
            </button>
        </div>
    );
}

export default ResetPassword;