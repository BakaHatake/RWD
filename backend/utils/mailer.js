const fetch = require("node-fetch");

async function sendOTPEmail(to, otp) {
    const apiKey = process.env.BREVO_API_KEY;

    if (!apiKey) throw new Error("Missing BREVO_API_KEY");

    const payload = {
        sender: { 
            email: "aanush748@gmail.com",  
            name: "BAKA TEAM" 
        },
        to: [{ email: to }],
        subject: "Your OTP Code",
        htmlContent: `
            <p>Your OTP is <strong>${otp}</strong></p>
            <p>This code expires in 5 minutes.</p>
            <br/>
            <p>Regards,<br/><b>BAKA TEAM</b></p>
        `
    };

    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "api-key": apiKey
        },
        body: JSON.stringify(payload)
    });

    if (!res.ok) {
        const err = await res.text();
        console.log("BREVO SEND ERROR →", err);
        throw new Error("Brevo error: " + err);
    }

    return true;
}

module.exports = sendOTPEmail;
