const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 静的ファイルの提供
app.use(express.static(path.join(__dirname, 'dist')));

app.post('/api/github/callback', async (req, res) => {
  const { code } = req.body;
  
  try {
    const response = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: process.env.VITE_GITHUB_CLIENT_ID,
      client_secret: process.env.VITE_GITHUB_CLIENT_SECRET,
      code,
    }, {
      headers: {
        Accept: 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error exchanging code for token:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to exchange code for token' });
  }
});

// すべてのルートをindex.htmlにリダイレクト（クライアントサイドルーティング用）
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});