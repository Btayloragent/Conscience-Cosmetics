const express = require('express');
const axios = require('axios');
const app = express();
const port = 5000;

app.get('/api/videos', async (req, res) => {
    try {
        const response = await axios.get('https://api.pexels.com/videos/popular', {
            headers: {
                Authorization: 'SbGJLX1nqVtNrfE2G0Vrp7amvZVVCWLUlxfKRPmkp9mB9Q0hG5ECJSkq', // Replace with your API key
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
