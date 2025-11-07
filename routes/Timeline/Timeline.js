const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

/**
 * GET /timeline
 * Returns the development timeline from TimeLine.md
 */
router.get('/', (req, res) => {
    try {
        const timelinePath = path.join(__dirname, '../../timeline.json'); // Correct file path for JavaScript
        const timelineContent = require(timelinePath); // Import the JavaScript file as a module

        res.json({
            success: true,
            data: timelineContent // Assuming `articles` is the key in the exported object
        });
    } catch (error) {
        console.error('Error reading timeline:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to read timeline',
            error: error.message
        });
    }
});

/**
 * GET /timeline/raw
 * Returns the raw markdown content
 */
router.get('/raw', (req, res) => {
    try {
        const timelinePath = path.join(__dirname, '../../TimeLine.md');
        const timelineContent = fs.readFileSync(timelinePath, 'utf-8');

        res.setHeader('Content-Type', 'text/markdown');
        res.send(timelineContent);
    } catch (error) {
        console.error('Error reading timeline:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to read timeline',
            error: error.message
        });
    }
});

module.exports = router;
