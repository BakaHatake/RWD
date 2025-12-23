const express = require("express")
const path = require("path")

const app = express()

// Base directory
const BASE = __dirname

// Directories
const HTML_DIR = path.join(BASE, "html")
const CSS_DIR = path.join(BASE, "css")
const JS_DIR = path.join(BASE, "js")

// 🔹 Home route → menu.html
app.get("/", (req, res) => {
  res.sendFile(path.join(HTML_DIR, "menu.html"));
})

// 🔹 Serve any HTML file
app.get("/:filename", (req, res) => {
  res.sendFile(path.join(HTML_DIR, req.params.filename));
})

// 🔹 Serve CSS
app.use("/css", express.static(CSS_DIR))

// 🔹 Serve JS
app.use("/js", express.static(JS_DIR))

// 🔹 Start server
const PORT = process.env.PORT || 8080
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});