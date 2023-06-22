import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './utils/connection';
import studentRoutes from './routes/students';
import facultyRoutes from  './routes/faculties'

const app = express();
dotenv.config();

// Connect to database
connectDB();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('common'));

app.use(cors({
  // origin: [ 'http://localhost:5173','http://127.0.0.1:3000','http://127.0.0.1:4000'],
  origin:'*'
}));

// routes
app.use('/api/student', studentRoutes);
app.use('/api/faculty', facultyRoutes);

const server = app.listen(process.env.PORT, () => {
  console.log(`server is ready at ${process.env.PORT}`);
});
