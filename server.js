const PORT = 8000;
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();
const API_KEY = process.env.URL;
const OpenAIApi = require('openai');

const openai = new OpenAIApi({ apiKey: API_KEY });

app.post('/images', async (req, res) => {
  try {
    const message = req.body.message;
    const image = await openai.images.generate({ prompt: message });

    res.json(image.data);
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ error: 'An error occurred while generating the image.' });
  }
});

app.listen(PORT, () => console.log('Your server is running on port ' + PORT));
