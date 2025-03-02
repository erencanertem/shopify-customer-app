import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import customerRoutes from './routes/customers.js';

dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:5173', // Development
    'https://shopify-customer-app-frontend.onrender.com', // Production - Render
    'https://your-app-name.up.railway.app' // Production - Railway (update with your actual domain)
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/customers', customerRoutes);

const PORT = process.env.PORT || 7999;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});