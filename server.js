import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import genreRoutes from './routes/genreRoute.js';
import movieRoutes from './routes/movieRoutes.js';
import cors from 'cors';

//configure env
dotenv.config();

//database connect
connectDB();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/genre', genreRoutes);
app.use('/api/v1/movie', movieRoutes);

//rest api
app.get('/', (req, res) => {
  res.send('<h1>Wellcome to Movie app</h1>');
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(`Server is running on ${process.env.DEV_MODE} mode on port ${PORT}  `.bgCyan.white);
});
