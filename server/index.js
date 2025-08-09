import express from 'express';
import session from 'express-session';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import passport from 'passport';


dotenv.config();

const app = express();

const clientOrigin = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(cors({ origin: clientOrigin, credentials: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'change_me',
    resave: false,
    saveUninitialized: false
  })
);

import './config/passport.js';
app.use(passport.initialize());
app.use(passport.session());


import authRoutes from './routes/auth.js';
import apiRoutes from './routes/api.js';

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('Git Management server running');
});

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/gitmanager';
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
