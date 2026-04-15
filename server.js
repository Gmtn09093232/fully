const express = require("express");
const db = require("./db");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));


// GET BALANCE
app.get("/balance", (req, res) => {
  const userId = req.query.userId;

  db.query(
    "SELECT balance FROM users WHERE telegram_id = ?",
    [userId],
    (err, result) => {
      if (!result.length) return res.json({ balance: 0 });
      res.json({ balance: result[0].balance });
    }
  );
});


// PLAY (BUY CARD)
app.post("/play", (req, res) => {
  const { userId, cost } = req.body;

  db.query(
    "SELECT balance FROM users WHERE telegram_id=?",
    [userId],
    (err, result) => {
      const bal = result[0].balance;

      if (bal < cost) return res.json({ success: false });

      db.query(
        "UPDATE users SET balance = balance - ? WHERE telegram_id=?",
        [cost, userId]
      );

      res.json({ success: true });
    }
  );
});


// WIN REWARD
app.post("/win", (req, res) => {
  const { userId, reward } = req.body;

  db.query(
    "UPDATE users SET balance = balance + ? WHERE telegram_id=?",
    [reward, userId]
  );

  res.json({ success: true });
});


app.listen(3000, () => console.log("Server running"));