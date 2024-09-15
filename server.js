import express from 'express';
import axios from 'axios';
import cors from 'cors'; // Import cors using ES modules syntax
import 'dotenv/config';
import { createClient } from 'pexels';
import  mongoose from 'mongoose'
import  bcrypt  from 'bcrypt'

const app = express();
const port = 5001;

app.use(express.json());



const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    hashedPassword: {
        type: String,
        required: true
    },
})
const User = mongoose.model("User", userSchema)


// get user
app.get("/users/:id", async (req, res) => {
    try {
        let id = req.params.id
        let foundUser = await User.findById(id)
        if (!foundUser) {
            res.status(404).send("user not found")
        }
        res.status(200).send(foundUser)
    } catch (error) {
        console.log("error" + error)
        res.status(400).send(error)
    }
});



// creating a user
app.post("/users", async (req, res) => {
    try {
        const { username, password } = req.body;
        let hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ username, hashedPassword })
        await newUser.save();
        res.status(201).send(newUser)
    } catch (error) {
        console.log("error:" + error);
        res.status(400).send(error)
    }
});


const uri = "mongodb+srv://btayloragent:vscode5@cluster0.zollofg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function connectDb() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
    console.log("error: " + error);
  }
}

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

app.listen(port, async() => {
    await connectDb().catch(console.dir);
    console.log(`Express API: localhost:${port}`)
})