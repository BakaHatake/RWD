const express = require("express");
require("dotenv").config();
require("./models/db");

const cors = require("cors");
const auth = require("./routes/auth");

const app = express();

app.use(cors());


// app.use(cors({
//   origin: [
//     "http://localhost:8080",
//     "http://127.0.0.1:8080",
//     "https://rwd-eight.vercel.app",
//     "https://rwd-tau.vercel.app"
//   ],
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true
// }));


// app.options("*", cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend working");
});

app.get("/second", (req, res) => {
  res.send("Second page");
});

app.use("/auth", auth);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Express running on ${PORT}`);
});
