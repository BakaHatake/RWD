const express = require("express");
require("dotenv").config();
require("./models/db");

// const cors = require("cors"); 
const auth = require("./routes/auth");

const app = express(); 

// app.use(cors({
//   origin: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true
// }));

// app.options("*", cors());

/* ======================= */

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
