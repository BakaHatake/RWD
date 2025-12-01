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
async function welcome(name, phone, usn, gender, to, key) {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) throw new Error("Missing BREVO_API_KEY");

    const payload = {
        sender: {
            email: "aanush748@gmail.com",
            name: "BAKA TEAM"
        },
        to: [{ email: to }],
        subject: "Welcome Message",
        htmlContent: `
<pre style="font-family: Arial; white-space: pre-wrap; font-size: 15px; color:#000;">

🎉 Welcome to Canteen Connect!

Hi ${name},

Welcome to Canteen Connect! We’re so excited to have you on board 🚀
Thanks for signing up. You're officially part of the inner circle now.

Here are your details:
Name: ${name}
Phone: ${phone}
USN: ${usn}
Gender: ${gender}

Your unique key for assistance & order verification:
</pre>

<div style="padding:10px; background:#eee; border-radius:6px; font-size:18px; text-align:center; font-family: Arial;">
${key}
</div>

<pre style="font-family: Arial; white-space: pre-wrap; font-size: 15px; color:#000;">

If you have any questions or need help, feel free to reach out anytime 📩
Happy exploring! 🌐✨

Best regards,
BAKA TEAM 😎

</pre>
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


module.exports = {sendOTPEmail,welcome};
