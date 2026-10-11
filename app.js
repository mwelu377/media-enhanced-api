require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/authRoutes');
const articleRoutes = require('./src/routes/articleRoutes');


app.use(express.json());
app.get('/', (req, res) => {
  res.send('Welcome to My Media-Enhanced API');
});

app.use('/articles', articleRoutes);
app.use('/auth', authRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error);
  });