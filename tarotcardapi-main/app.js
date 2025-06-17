const express = require("express");
const dotenv = require("dotenv");
const cardRoutes = require("./routes/cardRoutes"); // Import modular route handlers
const errorHandler = require("./middlewares/errorHandler"); // Import error handling middleware
const ieltsRoutes = require("./routes/ieltsRoutes"); // 新增雅思路由

dotenv.config();
const app = express();
const port = process.env.PORT || 3000; // Use a default port if PORT environment variable is not defined

app.use(express.json());

app.use("/tarotdeck", express.static("images"));

// Mount the cardRoutes router
app.use("/cards", cardRoutes);

// Mount the ieltsRoutes router under /api
app.use("/api", ieltsRoutes);

// Add static file serving for audio
app.use('/audio', express.static('./IELTS_100_Sentence-main'));

// Handle errors using the errorHandler middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
