import express from 'express';
import axios from 'axios';
import cors from 'cors'; // Import cors using ES modules syntax
import 'dotenv/config';
import { createClient } from 'pexels';

const app = express();
const port = 5001;
let cosmeticsData = await axios.get('https://makeup-api.herokuapp.com/api/v1/products.json');

// Use the CORS middleware
app.use(cors()); // Allow requests from any origin


// Alternatively, configure CORS to allow specific origins
// app.use(cors({
//     origin: 'http://localhost:5173' // Replace with your frontend's URL
// }));

app.get('/api/Products', async (req, res) => {
    try {
        // const response = await axios.get('https://makeup-api.herokuapp.com/api/v1/products.json');

        res.json(cosmeticsData.data);
    } catch (error) {
        console.error('Error fetching Products:', error.message);
        res.status(500).send('Error fetching Products');
    }
});

app.get('/api/MakeUpVids', async (req, res) => {
    const client = createClient(process.env.VID_KEY);
    const query = 'african american  women applying makeup';
    let videos;

    try {
        videos = await client.videos.search({ query, per_page: 9 });
        console.log("videos", videos);
        res.status(200).send({ videos });
    } catch (error) {
        console.error('Error fetching videos:', error.message);
        res.status(500).send('Error fetching videos');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
