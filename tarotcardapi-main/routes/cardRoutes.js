const express = require("express");
const router = express.Router();


// Define the '/cards' endpoint to retrieve all cards
router.get("/", (req, res) => {
  res.json(tarotCards);
});

router.get("/onecard", (req, res) => {
  const randomIndex = Math.floor(Math.random() * tarotCards.length);
  const randomCard = tarotCards[randomIndex];
  res.json(randomCard);
});

module.exports = router;
