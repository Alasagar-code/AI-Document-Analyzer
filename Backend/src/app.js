import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
const app = express();

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:5174',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Existing middleware
app.use(express.json());
app.use(cookieParser());
// ... other middleware ...

// Routes
import authRoutes from './routes/authRoutes.js';
import docRoutes from './routes/docRoutes.js';

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/docs', docRoutes);

export default app;
