const express = require("express");
const dotenv = require("dotenv");
const cardRoutes = require("./routes/cardRoutes");
const errorHandler = require("./middlewares/errorHandler");
const ieltsRoutes = require("./routes/ieltsRoutes");
const path = require('path');
const fs = require('fs');

// 加载 sentences.json
const sentences = require('./IELTS_100_Sentence-main/sentences.json');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// 根路由
app.get('/', (req, res) => {
  console.log('Root route accessed');
  res.send('Tarotivate Resource API is running');
});

// 静态文件路由
app.use(express.json());
app.use("/tarotdeck", express.static(path.join(__dirname, 'images')));
app.use('/audio', express.static(path.join(__dirname, 'IELTS_100_Sentence-main')));

// 动态音频路由
app.get('/audio/:id.m4a', (req, res) => {
  const id = parseInt(req.params.id); // 获取请求中的 ID
  const sentence = sentences.find(s => s.id === id); // 查找对应的句子

  if (!sentence || !sentence.audio) {
    return res.status(404).send('Audio file not found');
  }

  const audioPath = path.join(__dirname, 'IELTS_100_Sentence-main', sentence.audio);
  if (fs.existsSync(audioPath)) {
    res.sendFile(audioPath);
  } else {
    res.status(404).send('Audio file not found');
  }
});

//618更新组合塔罗牌和雅思内容的端点
app.get('/cardandSentence', async (req, res) => {
  try {
    // 获取随机塔罗牌
    const tarotResponse = await new Promise((resolve, reject) => {
      cardRoutes.stack[1].handle({ method: 'GET', url: '/cards/onecard' }, {
        json: (data) => resolve(data),
        status: (code) => reject(new Error(`HTTP ${code}`)),
      }, () => {});
    });

    // 获取随机雅思内容
    const ieltsResponse = await new Promise((resolve, reject) => {
      ieltsRoutes.stack[0].handle({ method: 'GET', url: '/api/ielts' }, {
        json: (data) => resolve(data),
        status: (code) => reject(new Error(`HTTP ${code}`)),
      }, () => {});
    });

    res.json({
      ...tarotResponse,
      ...ieltsResponse,
      status: "success",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch card and sentence data",
      timestamp: new Date().toISOString(),
    });
  }
});

// 其他路由
app.use("/cards", cardRoutes);
app.use("/api", ieltsRoutes);
app.use(errorHandler);

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log('Application started successfully');
});
