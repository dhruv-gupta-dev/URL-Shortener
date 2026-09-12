require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const urlRoutes = require('./routes/urlRoutes');
const { redirectToLongUrl } = require('./controllers/urlController');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api',urlRoutes);

app.get('/:code', redirectToLongUrl);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});