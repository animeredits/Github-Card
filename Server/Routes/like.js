const express = require('express');
const router = express.Router();
const Like = require('../Schema/Like');

router.post('/like', async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log('IP:', ip);

  try {
    let like = await Like.findOne({ ip });
    if (like) {
      console.log('IP has already liked');
      return res.status(400).json({ message: 'IP has already liked' });
    }

    like = new Like({ ip });
    await like.save();
    console.log('Like recorded');
    res.status(201).json({ message: 'Like recorded' });
  } catch (error) {
    console.error('Error saving like:', error);
    res.status(500).json({ message: 'Error saving like', error });
  }
});


module.exports = router;
