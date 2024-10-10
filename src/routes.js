const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Route to handle text post
router.post('/post', (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).send('Text is required.');
    }
    // Text post handling logic
    res.status(200).json({ message: 'Text posted successfully', text });
});

// Route to handle image upload
router.post('/upload/image', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No image uploaded.');
    }
    res.status(200).json({ message: 'Image uploaded successfully', file: req.file.filename });
});

// Route to handle video upload
router.post('/upload/video', upload.single('video'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No video uploaded.');
    }
    res.status(200).json({ message: 'Video uploaded successfully', file: req.file.filename });
});

module.exports = router;
