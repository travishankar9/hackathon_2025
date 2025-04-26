const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// ROUTES
app.use('/api/auth', authRoutes);         // /api/auth/login, /api/auth/register
app.use('/api/posts', postRoutes);        // /api/posts/, /api/posts/:id, /api/posts/create
app.use('/api/user', userRoutes);         // /api/user/:id/posts, /api/user/:id/interested

app.get('/', (req, res) => {
  res.send('Welcome to FurnishU backend!');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
