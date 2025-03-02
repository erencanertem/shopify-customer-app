import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import customerRoutes from './routes/customers.js';

dotenv.config();

const app = express();


const allowedOrigins = [
  'https://shopify-customer-app-1.onrender.com',
  'http://localhost:5173',
];

const corsOptions = {
  origin: (origin, callback) => {
    console.log('Origin:', origin);

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('Blocked by CORS:', origin);
      return callback(new Error('Not allowed by CORS'), false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};


app.use(cors(corsOptions));
app.use(express.json());


app.use((err, req, res, next) => {
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ message: "CORS Policy Error" });
  }
  next(err);
});

// ✅ API Routes
app.use('/api/customers', customerRoutes);

// ✅ Health Check
app.get('/', (req, res) => {
  res.send('Server is running!');
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
