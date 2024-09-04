import express from 'express';
import axios from 'axios';
const app = express();
const port = 5000;
import 'dotenv/config'


app.get('/api/videos', async (req, res) => {
    try {
        const response = await get('https://api.pexels.com/videos/popular', {
            headers: {
                Authorization: process.env.VID_KEY, 
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching videos');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

