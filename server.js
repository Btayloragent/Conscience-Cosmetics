import express from 'express';
import axios from 'axios';
import cors from 'cors'; 
import 'dotenv/config';
import { createClient } from 'pexels';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const app = express();
const port = 5001;

app.use(express.json());
app.use(cors()); 

// MongoDB connection URI
const uri = `mongodb+srv://btayloragent:${process.env.PASS_KEY}@cluster0.zollofg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Define user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
});

const User = mongoose.model("User", userSchema);

// ✅ Define comment schema
const commentSchema = new mongoose.Schema({
    videoId: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Comment = mongoose.model("Comment", commentSchema);

// Connect to MongoDB
async function connectDb() {
    try {
        await mongoose.connect(uri);
        console.log("Successfully connected to MongoDB!");
    } catch (error) {
        console.log("Error connecting to MongoDB: " + error.message);
        process.exit(1);
    }
}

// Create a new user with password hashing
app.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send("Username and password are required");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, hashedPassword });
        await newUser.save();

        res.status(201).send({ message: "User created successfully", user: { username: newUser.username } });
    } catch (error) {
        console.error("Error signing up: ", error.message);
        res.status(500).send("Error signing up, username may already be taken");
    }
});

// Login route
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send("Username and password are required");
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send("User not found");
        }

        const isMatch = await bcrypt.compare(password, user.hashedPassword);
        if (!isMatch) {
            return res.status(400).send("Invalid password");
        }

        res.status(200).send({ message: "Login successful", user: { username: user.username } });
    } catch (error) {
        console.error("Error logging in: ", error.message);
        res.status(500).send("Error logging in");
    }
});

// ✅ Comment POST route
app.post("/api/comments", async (req, res) => {
    try {
        const { videoId, username, text } = req.body;
        if (!videoId || !username || !text) {
            return res.status(400).send("Missing fields");
        }

        const newComment = new Comment({ videoId, username, text });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        console.error("Error posting comment:", error.message);
        res.status(500).send("Failed to post comment");
    }
});

// ✅ Comment GET route for a specific video
app.get("/api/comments/:videoId", async (req, res) => {
    try {
        const { videoId } = req.params;
        const comments = await Comment.find({ videoId }).sort({ createdAt: -1 });
        res.status(200).json(comments);
    } catch (error) {
        console.error("Error fetching comments:", error.message);
        res.status(500).send("Failed to fetch comments");
    }
});

// Endpoint for fetching cosmetic products
let cosmeticsData;
axios.get('https://makeup-api.herokuapp.com/api/v1/products.json')
    .then(response => {
        cosmeticsData = response.data;
    })
    .catch(error => {
        console.error('Error fetching Products:', error.message);
    });

app.get('/api/Products', async (req, res) => {
    try {
        if (!cosmeticsData) {
            return res.status(500).send('Products data is not available');
        }
        res.json(cosmeticsData);
    } catch (error) {
        console.error('Error fetching Products:', error.message);
        res.status(500).send('Error fetching Products');
    }
});

// Endpoint for fetching makeup videos from Pexels
app.get('/api/MakeUpVids', async (req, res) => {
    const client = createClient(process.env.VID_KEY);
    const query = 'african american women applying makeup';

    try {
        let videos = await client.videos.search({ query, per_page: 9 });
        res.status(200).send({ videos });
    } catch (error) {
        console.error('Error fetching videos:', error.message);
        res.status(500).send('Error fetching videos');
    }
});

// Start the server and connect to MongoDB
app.listen(port, async () => {
    await connectDb();
    console.log(`Server is running on http://localhost:${port}`);
});
