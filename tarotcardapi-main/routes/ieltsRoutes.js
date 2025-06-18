const express = require('express');
const router = express.Router();
const fs = require('fs');

// 加载雅思数据，更新路径
const ieltsData = require('../IELTS_100_Sentence-main/sentences.json');

// 定义雅思 API 端点
router.get('/ielts', (req, res) => {
  const randomSentence = ieltsData[Math.floor(Math.random() * ieltsData.length)];
  res.json({
    ielts: {
      id: randomSentence.id,
      text: randomSentence.text,
      translation: randomSentence.translation || "暂无翻译",
      audio: `https://tarotivate-resource.vercel.app/audio/${randomSentence.audio}`, // 添加音频 URL 前缀
    },
    status: "success",
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
