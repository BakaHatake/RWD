const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

let todos = [];

app.get("/api/todos", (req, res) => {
  console.log("Fetching all todos");
  console.log("Total todos:", todos.length);
  res.json(todos);
});

app.post("/api/todos", (req, res) => {
  const { text } = req.body;

  if (!text) {
    console.log("Todo creation failed: text missing");
    return res.status(400).json({ message: "Todo text required" });
  }

  const todo = {
    id: Date.now(),
    text
  };

  todos.push(todo);

  console.log("Todo added:", todo);
  res.json(todo);
});

app.delete("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const beforeCount = todos.length;

  todos = todos.filter(todo => todo.id !== id);

  if (todos.length === beforeCount) {
    console.log("Delete failed, todo not found:", id);
    return res.status(404).json({ message: "Todo not found" });
  }

  console.log("Todo deleted:", id);
  console.log("Remaining todos:", todos.length);

  res.json({ message: "Todo deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
