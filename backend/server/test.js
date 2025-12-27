require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/auth/signup', (req, res) => {
  console.log('Request body:', req.body);
  res.json({ success: true, message: 'Test working' });
});

app.listen(5000, () => {
  console.log('Test server running on 5000');
});