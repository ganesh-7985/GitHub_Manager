import express from 'express';
import session from 'express-session';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import passport from 'passport';

// Load environment variables
dotenv.config();

// Initialise Express app
const app = express();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || true, credentials: true }));
app.use(express.json());

// Session configuration. In production you should store sessions in a
// persistent store such as Redis or Mongo.
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'change_me',
    resave: false,
    saveUninitialized: false
  })
);

// Initialise Passport strategies
import './config/passport.js';
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/gitmanager';
mongoose
  .connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
import authRoutes from './routes/auth.js';
import apiRoutes from './routes/api.js';

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Git Management server running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});