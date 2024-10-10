require('dotenv').config();
const express = require('express');
const axios = require('axios');
const router = express.Router();

// Replace these URLs with the correct OAuth endpoints for each platform
const FACEBOOK_AUTH_URL = 'https://www.facebook.com/v10.0/dialog/oauth';
const INSTAGRAM_AUTH_URL = 'https://api.instagram.com/oauth/authorize';
const TIKTOK_AUTH_URL = 'https://open-api.tiktok.com/oauth/authorize';
const YOUTUBE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';

// Redirect URIs (your server endpoint that will handle OAuth callbacks)
const REDIRECT_URI = 'http://localhost:3000/auth/callback';

// Routes to start OAuth flow for each platform

// Facebook OAuth
router.get('/facebook', (req, res) => {
    const facebookAuthUrl = `${FACEBOOK_AUTH_URL}?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${REDIRECT_URI}&scope=public_profile,email`;
    res.redirect(facebookAuthUrl);
});

// Instagram OAuth
router.get('/instagram', (req, res) => {
    const instagramAuthUrl = `${INSTAGRAM_AUTH_URL}?client_id=${process.env.INSTAGRAM_APP_ID}&redirect_uri=${REDIRECT_URI}&scope=user_profile,user_media`;
    res.redirect(instagramAuthUrl);
});

// TikTok OAuth
router.get('/tiktok', (req, res) => {
    const tiktokAuthUrl = `${TIKTOK_AUTH_URL}?client_key=${process.env.TIKTOK_APP_KEY}&redirect_uri=${REDIRECT_URI}&scope=user.info.basic,video.list`;
    res.redirect(tiktokAuthUrl);
});

// YouTube OAuth
router.get('/youtube', (req, res) => {
    const youtubeAuthUrl = `${YOUTUBE_AUTH_URL}?client_id=${process.env.YOUTUBE_API_KEY}&redirect_uri=${REDIRECT_URI}&scope=https://www.googleapis.com/auth/youtube.readonly&response_type=code`;
    res.redirect(youtubeAuthUrl);
});

// Callback route to handle OAuth response from each platform
router.get('/callback', async (req, res) => {
    const { code } = req.query;

    if (!code) {
        return res.status(400).send('Authorization code not provided');
    }

    try {
        // Handle OAuth callback logic here: exchange the code for an access token
        // You'll need to exchange the code for an access token depending on the platform
        // For simplicity, we'll demonstrate with Facebook (similar logic for other platforms)
        const response = await axios.get(`https://graph.facebook.com/v10.0/oauth/access_token`, {
            params: {
                client_id: process.env.FACEBOOK_APP_ID,
                client_secret: process.env.FACEBOOK_APP_SECRET,
                redirect_uri: REDIRECT_URI,
                code,
            }
        });

        const accessToken = response.data.access_token;
        res.status(200).json({ accessToken });
    } catch (error) {
        console.error('Error exchanging code for access token', error);
        res.status(500).send('Error during authentication');
    }
});

module.exports = router;
