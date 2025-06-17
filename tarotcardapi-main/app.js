const express = require("express");
const dotenv = require("dotenv");
const cardRoutes = require("./routes/cardRoutes");
const errorHandler = require("./middlewares/errorHandler");
const ieltsRoutes = require("./routes/ieltsRoutes");
const path = require('path');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  console.log('Root route accessed');
  res.send('Tarotivate Resource API is running');
});

app.use(express.json());
app.use("/tarotdeck", express.static(path.join(__dirname, 'images')));
app.use('/audio', express.static(path.join(__dirname, 'IELTS_100_Sentence-main')));
app.use("/cards", cardRoutes);
app.use("/api", ieltsRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log('Application started successfully');
});
