const express = require("express");
const router = express.Router();
const fs = require("fs").promises;

// 加载 tarot 数据（位于 routes/ 目录下）
async function loadTarotData() {
  try {
    return require("./tarotCards.json");
  } catch (error) {
    console.error("Error loading tarot data:", error.stack);
    throw error;
  }
}

// 定义 '/cards' 端点以获取所有塔罗牌
router.get("/", async (req, res) => {
  try {
    const tarotData = await loadTarotData();
    res.json(tarotData);
  } catch (error) {
    res.status(500).json({ message: "Failed to load tarot cards", error: error.message });
  }
});

// 定义 '/cards/onecard' 端点以获取随机一张塔罗牌
router.get("/onecard", async (req, res) => {
  try {
    const tarotData = await loadTarotData();
    const randomTarotIndex = Math.floor(Math.random() * tarotData.length);
    const randomCard = tarotData[randomTarotIndex];

    res.json({
      card: {
        image: `https://tarotivate-resource.vercel.app${randomCard.image}`, // 添加图片 URL 前缀
        name: randomCard.name,
        description: randomCard.description,
        translation: randomCard.translation || "暂无翻译", // 如果没有翻译提供默认值
      },
      status: "success",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in /onecard:", error.stack); // 输出完整错误堆栈
    res.status(500).json({
      status: "error",
      message: "Failed to fetch card data",
      error: error.message, // 返回错误详情给客户端
      timestamp: new Date().toISOString(),
    });
  }
});

module.exports = router;
