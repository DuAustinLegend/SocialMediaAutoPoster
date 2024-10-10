const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Static files (Frontend files like index.html, styles.css)
app.use(express.static('public'));

// Routes
app.use('/api', routes);

// Root route
app.get('/', (req, res) => {
    res.send('Social Media Auto Poster Backend');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
