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
import jwt from 'jsonwebtoken';
import http from 'http';
import { Server as SocketIoServer } from 'socket.io';

import verifyToken from './middleware/verifyToken.js';

console.log("Using JWT secret:", process.env.JWT_SECRET);

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5001;

// NEW: Socket.IO setup
const io = new SocketIoServer(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use('/uploads', express.static(path.resolve('./uploads')));

// Mongo URI
const uri = `mongodb+srv://btayloragent:${process.env.PASS_KEY}@cluster0.zollofg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create upload folders
const avatarDir = path.resolve('./uploads/profile-pics');
const bannerDir = path.resolve('./uploads/banner-pics');
fs.mkdirSync(avatarDir, { recursive: true });
fs.mkdirSync(bannerDir, { recursive: true });

// Multer setup
const avatarStorage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, avatarDir),
  filename: (_, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const bannerStorage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, bannerDir),
  filename: (_, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const uploadAvatar = multer({ storage: avatarStorage });
const uploadBanner = multer({ storage: bannerStorage });

// --- Mongoose Schemas ---
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatarUrl: { type: String, required: true },
  bio: { type: String, default: "" },
  bannerUrl: { type: String, default: "" },
  favoriteBrands: [{ type: String }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  favorites: [
    {
      videoId: { type: String, required: true },
      videoFile: { type: String },
      videoThumbnail: { type: String },
    },
  ],
  ratings: [
    {
      videoId: { type: String, required: true },
      rating: { type: Number, required: true },
    }
  ],
});
userSchema.index({ username: 1 });
const User = mongoose.model("User", userSchema);

const commentSchema = new mongoose.Schema({
  videoId: { type: String, required: true },
  username: { type: String, required: true },
  avatarUrl: { type: String },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
commentSchema.index({ videoId: 1 });
const Comment = mongoose.model("Comment", commentSchema);

// NEW: Message Schema for Chat
const messageSchema = new mongoose.Schema({
  channelName: { type: String, required: true },
  content: { type: String, required: true },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true },
  avatarUrl: { type: String },
  timestamp: { type: Date, default: Date.now }
});
messageSchema.index({ channelName: 1, timestamp: 1 });
const Message = mongoose.model('Message', messageSchema);


// DB connection
async function connectDb() {
  try {
    await mongoose.connect(uri);
    console.log("✅ Successfully connected to MongoDB!");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
}

// --- API Routes (Existing and New for Chat) ---

// Signup (no auth required)
app.post("/signup", async (req, res) => {
  try {
    const { username, password, email, avatarUrl, bio } = req.body;
    if (!username || !password || !email || !avatarUrl)
      return res.status(400).send("All fields are required");

    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).send("Username already taken");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      hashedPassword,
      email,
      avatarUrl,
      bio: bio || "",
      favoriteBrands: [],
      followers: [],
      following: [],
      favorites: [],
      ratings: [],
    });

    await newUser.save();
    res.status(201).send({
      message: "User created successfully",
      user: {
        _id: newUser._id, // ✅ This is the corrected line
        username: newUser.username,
        email: newUser.email,
        avatarUrl: newUser.avatarUrl,
        bio: newUser.bio,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    if (err.code === 11000) return res.status(400).send("Duplicate field");
    res.status(500).send("Signup failed");
  }
});

// Login (no auth required)
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send("User not found");

    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) return res.status(400).send("Invalid password");

    const token = jwt.sign(
      { userId: user._id.toString(), username: user.username, avatarUrl: user.avatarUrl },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '7d' }
    );

    res.status(200).send({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
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

// Get profile (no auth needed)
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

// Update bio (protected)
app.put("/api/users/:id/bio", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { bio } = req.body;

    if (id !== req.userId) {
      return res.status(403).send("Unauthorized to update this bio");
    }

    const updatedUser = await User.findByIdAndUpdate(id, { bio }, { new: true }).select("-hashedPassword");
    if (!updatedUser) return res.status(404).send("User not found");
    res.status(200).json({ bio: updatedUser.bio });
  } catch (err) {
    console.error("Bio update error:", err.message);
    res.status(500).send("Failed to update bio");
  }
});

// Upload avatar (protected)
app.post("/api/users/:id/profile-pic", verifyToken, uploadAvatar.single("avatar"), async (req, res) => {
  try {
    const userId = req.params.id;
    if (userId !== req.userId) {
      return res.status(403).send("Unauthorized to update this avatar");
    }

    const avatarUrl = `/uploads/profile-pics/${req.file.filename}`;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
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

// Upload banner (protected)
app.post("/api/users/:id/banner-pic", verifyToken, uploadBanner.single("banner"), async (req, res) => {
  try {
    const userId = req.params.id;
    if (userId !== req.userId) {
      return res.status(403).send("Unauthorized to update this banner");
    }

    const bannerUrl = `/uploads/banner-pics/${req.file.filename}`;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
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

// Post comment (protected)
app.post("/api/comments", verifyToken, async (req, res) => {
  try {
    const { videoId, username, avatarUrl, text } = req.body;
    if (!videoId || !username || !text) return res.status(400).send("Missing fields");

    if (username !== req.username) {
      return res.status(403).send("Username mismatch");
    }

    const newComment = new Comment({ videoId, username, avatarUrl, text });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    console.error("Comment error:", err.message);
    res.status(500).send("Failed to post comment");
  }
});

// Get comments (no auth)
app.get("/api/comments/:videoId", async (req, res) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId }).sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (err) {
    console.error("Fetch comments error:", err.message);
    res.status(500).send("Failed to fetch comments");
  }
});

// Products (no auth)
let cosmeticsData;
axios.get('https://makeup-api.herokuapp.com/api/v1/products.json')
  .then(response => { cosmeticsData = response.data; })
  .catch(error => { console.error('Products fetch error:', error.message); });

app.get("/api/Products", async (req, res) => {
  if (!cosmeticsData) return res.status(500).send("Products not available");
  res.json(cosmeticsData);
});

// Videos (PEXELS) (no auth)
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

// SEARCH USERS (no auth)
app.get("/api/users/search", async (req, res) => {
  const { q } = req.query;
  console.log("🔍 Search query received:", q);

  if (!q || q.trim() === "") {
    return res.status(400).send("Query is required");
  }

  try {
    const users = await User.find({
      username: { $regex: q, $options: "i" },
    })
      .select("username avatarUrl _id")
      .limit(10);

    res.status(200).json(users);
  } catch (error) {
    console.error("User search error:", error.message);
    res.status(500).send("Failed to search users");
  }
});

// --- FAVORITE BRANDS ROUTES ---
// Save or update favorite brands (protected)
app.put('/api/users/:id/favorite-brands', verifyToken, async (req, res) => {
  try {
    const userId = req.params.id;
    if (userId !== req.userId) return res.status(403).send('Unauthorized');

    const { favoriteBrands } = req.body;
    if (!Array.isArray(favoriteBrands)) {
      return res.status(400).send('Invalid input. favoriteBrands must be an array.');
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { favoriteBrands: favoriteBrands.slice(0, 5) },
      { new: true }
    ).select("favoriteBrands");

    if (!updatedUser) return res.status(404).send('User not found');

    res.status(200).json({
      message: 'Favorite brands updated successfully',
      favoriteBrands: updatedUser.favoriteBrands
    });
  } catch (err) {
    console.error('Save favorite brands error:', err);
    res.status(500).send('Failed to save brands');
  }
});

// Get favorite brands (protected)
app.get('/api/users/:id/favorite-brands', verifyToken, async (req, res) => {
  try {
    const userId = req.params.id;
    if (userId !== req.userId) return res.status(403).send('Unauthorized');

    const user = await User.findById(userId).select("favoriteBrands");

    if (!user) return res.status(404).send('User not found');

    res.status(200).json({ favoriteBrands: user.favoriteBrands || [] });
  } catch (err) {
    console.error('Get favorite brands error:', err);
    res.status(500).send('Failed to fetch brands');
  }
});

// --- FOLLOW / UNFOLLOW ROUTES ---

// Follow user
app.post('/api/users/:id/follow', verifyToken, async (req, res) => {
  try {
    const userToFollowId = req.params.id;
    const currentUserId = req.userId;

    if (userToFollowId === currentUserId) {
      return res.status(400).json({ error: "You can't follow yourself" });
    }

    const userToFollow = await User.findById(userToFollowId);
    const currentUser = await User.findById(currentUserId);

    if (!userToFollow || !currentUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!userToFollow.followers.includes(currentUserId)) {
      userToFollow.followers.push(currentUserId);
      currentUser.following.push(userToFollowId);

      await userToFollow.save();
      await currentUser.save();
    }

    res.status(200).json({ message: 'Followed successfully' });
  } catch (err) {
    console.error("Follow error:", err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Unfollow user
app.post('/api/users/:id/unfollow', verifyToken, async (req, res) => {
  try {
    const userToUnfollowId = req.params.id;
    const currentUserId = req.userId;

    const userToUnfollow = await User.findById(userToUnfollowId);
    const currentUser = await User.findById(currentUserId);

    if (!userToUnfollow || !currentUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    userToUnfollow.followers = userToUnfollow.followers.filter(
      (id) => id.toString() !== currentUserId
    );
    currentUser.following = currentUser.following.filter(
      (id) => id.toString() !== userToUnfollowId
    );

    await userToUnfollow.save();
    await currentUser.save();

    res.status(200).json({ message: 'Unfollowed successfully' });
  } catch (err) {
    console.error("Unfollow error:", err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Check if current user is following a user
app.get('/api/users/:id/is-following', verifyToken, async (req, res) => {
  try {
    const userIdToCheck = req.params.id;
    const currentUserId = req.userId;

    if (!currentUserId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const currentUser = await User.findById(currentUserId);
    if (!currentUser) return res.status(404).json({ error: 'Current user not found' });

    const isFollowing = currentUser.following.some(
      (id) => id.toString() === userIdToCheck
    );

    res.status(200).json({ isFollowing: isFollowing });
  } catch (err) {
    console.error("Check following error:", err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get users a user is following (with avatar and username)
app.get('/api/users/:id/following', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('following', 'username avatarUrl');
    if (!user) return res.status(404).send("User not found");

    res.status(200).json({ following: user.following });
  } catch (err) {
    console.error("Error fetching following list:", err.message);
    res.status(500).send("Server error");
  }
});

// Favorites routes (protected)
app.get('/api/users/:id/favorites', verifyToken, async (req, res) => {
  try {
    const userId = req.params.id;
    if (userId !== req.userId) return res.status(403).send('Unauthorized');

    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found');

    res.status(200).json(user.favorites);
  } catch (err) {
    console.error("Get favorites error:", err);
    res.status(500).send("Failed to fetch favorites");
  }
});

app.post('/api/users/:id/favorites', verifyToken, async (req, res) => {
  try {
    const userId = req.params.id;
    if (userId !== req.userId) return res.status(403).send('Unauthorized');

    const { videoId, videoFile, videoThumbnail } = req.body;
    if (!videoId) return res.status(400).send('videoId is required');

    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found');

    const exists = user.favorites.some(fav => fav.videoId === videoId);
    if (!exists) {
      user.favorites.push({ videoId, videoFile, videoThumbnail });
      await user.save();
    }

    res.status(200).json(user.favorites);
  } catch (error) {
    console.error('Add favorite error:', error);
    res.status(500).send('Server error');
  }
});

app.delete('/api/users/:id/favorites/:videoId', verifyToken, async (req, res) => {
  try {
    const userId = req.params.id;
    if (userId !== req.userId) return res.status(403).send('Unauthorized');

    const { videoId } = req.params;
    if (!videoId) return res.status(400).send('videoId is required');

    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found');

    user.favorites = user.favorites.filter(fav => fav.videoId !== videoId);
    await user.save();

    res.status(200).json(user.favorites);
  } catch (error) {
    console.error('Remove favorite error:', error);
    res.status(500).send('Server error');
  }
});

// --- Ratings routes (protected)

// Get all ratings for user
app.get('/api/users/:id/ratings', verifyToken, async (req, res) => {
  try {
    const userId = req.params.id;
    if (userId !== req.userId) return res.status(403).send('Unauthorized');

    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found');

    res.status(200).json(user.ratings || []);
  } catch (err) {
    console.error('Get ratings error:', err);
    res.status(500).send('Failed to fetch ratings');
  }
});

// Get single rating for a video
app.get('/api/users/:id/ratings/:videoId', verifyToken, async (req, res) => {
  try {
    const { id, videoId } = req.params;
    if (id !== req.userId) return res.status(403).send('Unauthorized');

    const user = await User.findById(id);
    if (!user) return res.status(404).send('User not found');

    const ratingEntry = user.ratings.find(r => r.videoId === videoId);
    res.status(200).json({ rating: ratingEntry ? ratingEntry.rating : 0 });
  } catch (err) {
    console.error('Get rating error:', err);
    res.status(500).send('Server error');
  }
});

// Save or update a rating for a video
app.post('/api/users/:id/ratings', verifyToken, async (req, res) => {
  try {
    const userId = req.params.id;
    if (userId !== req.userId) return res.status(403).send('Unauthorized');

    const { videoId, rating } = req.body;
    if (!videoId || typeof rating !== 'number') return res.status(400).send('Invalid input');

    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found');

    // Find existing rating for this video
    const existingRatingIndex = user.ratings.findIndex(r => r.videoId === videoId);
    if (existingRatingIndex >= 0) {
      // Update existing rating
      user.ratings[existingRatingIndex].rating = rating;
    } else {
      // Add new rating
      user.ratings.push({ videoId, rating });
    }

    await user.save();
    res.status(200).json({ message: 'Rating saved' });
  } catch (err) {
    console.error('Save rating error:', err);
    res.status(500).send('Failed to save rating');
  }
});

// NEW: API Routes for Chat Messages
app.get('/api/channels/:channelName/messages', async (req, res) => {
  try {
    const { channelName } = req.params;
    // Fetch messages from MongoDB, sorted by timestamp ascending
    const messages = await Message.find({ channelName })
      .populate('authorId', 'username avatarUrl')
      .sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// NEW: Socket.IO for Real-time Communication
io.on('connection', (socket) => {
  console.log('A user connected via Socket.IO:', socket.id);

  // When a client joins a specific channel
  socket.on('joinChannel', (channelName) => {
    socket.join(channelName);
    console.log(`User ${socket.id} joined channel: ${channelName}`);
  });

  // When a client sends a new message
  socket.on('sendMessage', async (data) => {
    try {
      // Data expected: { channelName, content, authorId, username, avatarUrl }
      const { channelName, content, authorId, username, avatarUrl } = data;

      if (!channelName || !content || !authorId || !username) {
        console.warn('Invalid message data received:', data);
        return;
      }

      // Optional: Verify authorId against a token on the socket if more stringent auth is needed
      // For this example, we trust the client-provided authorId and username which come from the JWT on login.

      // Save the message to MongoDB
      const newMessage = new Message({
        channelName,
        content,
        authorId,
        username,
        avatarUrl,
        timestamp: new Date()
      });
      await newMessage.save();

      // Emit the new message to all clients in the specific channel room
      io.to(channelName).emit('receiveMessage', newMessage);
      console.log(`Message sent to channel ${channelName} by ${username} (${authorId}): ${content}`);
    } catch (error) {
      console.error('Error saving or broadcasting message:', error);
    }
  });

  // When a client leaves a channel
  socket.on('leaveChannel', (channelName) => {
    socket.leave(channelName);
    console.log(`User ${socket.id} left channel: ${channelName}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected from Socket.IO:', socket.id);
  });
});


// --- Start server ---
connectDb().then(() => {
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});