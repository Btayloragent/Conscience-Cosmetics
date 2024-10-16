import express from 'express';
import axios from 'axios';
import cors from 'cors'; // Import cors using ES modules syntax
import 'dotenv/config';
import { createClient } from 'pexels';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const app = express();
const port = 5001;

app.use(express.json());
app.use(cors()); // Allow requests from any origin

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

// Connect to MongoDB
async function connectDb() {
    try {
        await mongoose.connect(uri);
        console.log("Successfully connected to MongoDB!");
    } catch (error) {
        console.log("Error connecting to MongoDB: " + error.message);
        process.exit(1); // Exit the app if DB connection fails
    }
}


// Get user by ID with ObjectId validation
app.get("/users/:id", async (req, res) => {
    try {
        let id = req.params.id;

        // Check if the ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send("Invalid User ID");
        }

        let foundUser = await User.findById(id);
        if (!foundUser) {
            return res.status(404).send("User not found");
        }

        res.status(200).send(foundUser);
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).send(error.message);
    }
});

// Create a new user with password hashing
app.post("/users", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Ensure the password is provided
        if (!password) {
            return res.status(400).send("Password is required");
        }

        // Hash the password
        let hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user and save to the database
        const newUser = new User({ username, hashedPassword });
        await newUser.save();

        res.status(201).send(newUser);
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).send(error.message);
    }
});

// Add login route for user authentication
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Ensure both username and password are provided
        if (!username || !password) {
            return res.status(400).send("Username and password are required");
        }

        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send("User not found");
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.hashedPassword);
        if (!isMatch) {
            return res.status(400).send("Invalid password");
        }

        // Successful login
        res.status(200).send("Login successful");
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).send("Error logging in");
    }
});

// Endpoint for fetching cosmetic products
let cosmeticsData = await axios.get('https://makeup-api.herokuapp.com/api/v1/products.json');
app.get('/api/Products', async (req, res) => {
    try {
        res.json(cosmeticsData.data);
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
        console.log("Videos:", videos);
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
