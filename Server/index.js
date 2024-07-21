const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://rohitkmt8002:Rk8002@cluster0.6umpowz.mongodb.net//', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a schema
const likeSchema = new mongoose.Schema({
  ip: { type: String, unique: true },
  liked: { type: Boolean, default: true },
});

const Like = mongoose.model('Like', likeSchema);

// Routes
app.post('/like', async (req, res) => {
  const ip = req.ip;

  try {
    let like = await Like.findOne({ ip });
    if (like) {
      return res.status(400).json({ message: 'IP has already liked' });
    }

    like = new Like({ ip });
    await like.save();
    res.status(201).json({ message: 'Like recorded' });
  } catch (error) {
    console.error('Error saving like:', error);
    res.status(500).json({ message: 'Error saving like', error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
