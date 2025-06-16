const express = require('express');
const router = express.Router();
const fs = require('fs');

// 載入雅思數據，更新路徑
const ieltsData = require('../IELTS_100_Sentence-main/sentences.json');

// 定義雅思 API 端點
router.get('/ielts', (req, res) => {
  const randomSentence = ieltsData[Math.floor(Math.random() * ieltsData.length)];
  res.json(randomSentence);
});

module.exports = router;
