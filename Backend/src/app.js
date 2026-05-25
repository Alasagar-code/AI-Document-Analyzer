import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
const app = express();

// CORS Configuration
const allowedOrigins = [
  process.env.FRONTEND_URL_LOCAL,
  process.env.FRONTEND_URL_PROD,
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow server-to-server requests (no origin header)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS policy: origin '${origin}' is not allowed`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Set-Cookie'],
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
