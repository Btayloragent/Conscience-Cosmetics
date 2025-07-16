import express from 'express';
import axios from 'axios';
import cors from 'cors';
import 'dotenv/config';
import { createClient } from 'pexels';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const app = express();
const port = 5001;

app.use(express.json());
app.use(cors());

// Static file serving for uploaded images
app.use('/uploads', express.static(path.resolve('./uploads')));

// MongoDB URI
const uri = `mongodb+srv://btayloragent:${process.env.PASS_KEY}@cluster0.zollofg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create necessary folders
const avatarDir = path.resolve('./uploads/profile-pics');
const bannerDir = path.resolve('./uploads/banner-pics');
fs.mkdirSync(avatarDir, { recursive: true });
fs.mkdirSync(bannerDir, { recursive: true });

// Multer configs
const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, avatarDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const bannerStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, bannerDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const uploadAvatar = multer({ storage: avatarStorage });
const uploadBanner = multer({ storage: bannerStorage });

// Schema Definitions
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatarUrl: { type: String, required: true },
  bio: { type: String, default: "" },
  bannerUrl: { type: String, default: "" },
});
userSchema.index({ username: 1 });
const User = mongoose.model("User", userSchema);

const commentSchema = new mongoose.Schema({
  videoId: { type: String, required: true },
  username: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
commentSchema.index({ videoId: 1 });
const Comment = mongoose.model("Comment", commentSchema);

// MongoDB Connect
async function connectDb() {
  try {
    await mongoose.connect(uri);
    console.log("✅ Successfully connected to MongoDB!");
  } catch (error) {
    console.log("❌ Error connecting to MongoDB: " + error.message);
    process.exit(1);
  }
}

// ✅ SIGNUP
app.post("/signup", async (req, res) => {
  try {
    const { username, password, email, avatarUrl, bio } = req.body;
    if (!username || !password || !email || !avatarUrl) {
      return res.status(400).send("All fields are required");
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).send("Username already taken");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      hashedPassword,
      email,
      avatarUrl,
      bio: bio || "",
    });

    await newUser.save();
    res.status(201).send({
      message: "User created successfully",
      user: {
        username: newUser.username,
        email: newUser.email,
        avatarUrl: newUser.avatarUrl,
        bio: newUser.bio,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    if (error.code === 11000) return res.status(400).send("Duplicate field");
    res.status(500).send("Signup failed");
  }
});

// ✅ LOGIN
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send("User not found");

    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) return res.status(400).send("Invalid password");

    res.status(200).send({
      message: "Login successful",
      user: {
        username: user.username,
        email: user.email,
        avatarUrl: user.avatarUrl,
        bio: user.bio,
        bannerUrl: user.bannerUrl,
      },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).send("Login failed");
  }
});

// ✅ GET PROFILE
app.get("/api/profile", async (req, res) => {
  try {
    const { username } = req.query;
    const user = await User.findOne({ username }).select("-hashedPassword");
    if (!user) return res.status(404).send("User not found");
    res.status(200).json(user);
  } catch (err) {
    console.error("Profile fetch error:", err.message);
    res.status(500).send("Error fetching profile");
  }
});

// ✅ UPDATE BIO
app.put("/api/users/:id/bio", async (req, res) => {
  try {
    const { id } = req.params;
    const { bio } = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, { bio }, { new: true }).select("-hashedPassword");
    if (!updatedUser) return res.status(404).send("User not found");
    res.status(200).json({ bio: updatedUser.bio });
  } catch (err) {
    console.error("Bio update error:", err.message);
    res.status(500).send("Failed to update bio");
  }
});

// ✅ UPLOAD AVATAR
app.post("/api/users/:id/profile-pic", uploadAvatar.single("avatar"), async (req, res) => {
  try {
    const avatarUrl = `/uploads/profile-pics/${req.file.filename}`;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { avatarUrl },
      { new: true }
    ).select("-hashedPassword");
    if (!updatedUser) return res.status(404).send("User not found");
    res.status(200).json({ avatarUrl });
  } catch (err) {
    console.error("Avatar upload error:", err.message);
    res.status(500).send("Failed to upload avatar");
  }
});

// ✅ UPLOAD BANNER
app.post("/api/users/:id/banner-pic", uploadBanner.single("banner"), async (req, res) => {
    console.log("File uploaded:", req.file); // ✅ LOG THIS
  console.log("User ID:", req.params.id);

  try {
    const bannerUrl = `/uploads/banner-pics/${req.file.filename}`;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { bannerUrl },
      { new: true }
    ).select("-hashedPassword");
    if (!updatedUser) return res.status(404).send("User not found");
    res.status(200).json({ bannerUrl });
  } catch (err) {
    console.error("Banner upload error:", err.message);
    res.status(500).send("Failed to upload banner");
  }
});

// ✅ POST COMMENT
app.post("/api/comments", async (req, res) => {
  try {
    const { videoId, username, text } = req.body;
    if (!videoId || !username || !text) {
      return res.status(400).send("Missing fields");
    }
    const newComment = new Comment({ videoId, username, text });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    console.error("Comment error:", err.message);
    res.status(500).send("Failed to post comment");
  }
});

// ✅ GET COMMENTS
app.get("/api/comments/:videoId", async (req, res) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId }).sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (err) {
    console.error("Fetch comments error:", err.message);
    res.status(500).send("Failed to fetch comments");
  }
});

// ✅ COSMETIC PRODUCTS
let cosmeticsData;
axios.get('https://makeup-api.herokuapp.com/api/v1/products.json')
  .then(response => { cosmeticsData = response.data; })
  .catch(error => { console.error('Products fetch error:', error.message); });

app.get("/api/Products", async (req, res) => {
  if (!cosmeticsData) return res.status(500).send("Products not available");
  res.json(cosmeticsData);
});

// ✅ MAKEUP VIDEOS (PEXELS)
const pexelsClient = createClient(process.env.VID_KEY);

app.get("/api/MakeUpVids", async (req, res) => {
  try {
    const query = "african american women applying makeup";
    const videos = await pexelsClient.videos.search({ query, per_page: 9 });
    res.status(200).send({ videos });
  } catch (err) {
    console.error("Pexels video error:", err.message);
    res.status(500).send("Failed to fetch videos");
  }
});

// ✅ START SERVER
app.listen(port, async () => {
  await connectDb();
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
