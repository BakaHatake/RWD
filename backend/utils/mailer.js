const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

async function sendOTPEmail(to, otp) {
    return transporter.sendMail({
        from: `"BAKA Verification" <${process.env.MAIL_USER}>`,
        to,
        subject: "Your OTP Code",
        text: `Your OTP is ${otp}. It expires in 5 minutes.`,
    });
}

module.exports = sendOTPEmail;
