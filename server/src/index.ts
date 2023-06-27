import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './utils/connection';
import studentRoutes from './routes/students';
import facultyRoutes from  './routes/faculties'
import superUserRoutes from './routes/superusers';

const app = express();
dotenv.config();

// Connect to database
connectDB();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('common'));

app.use(cors({
  origin: [ 'https://quizzy-ecera.netlify.app','https://quizzy-superuser.netlify.app','https://quizzy-faculty.netlify.app']
}));

// routes
app.use('/api/student', studentRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/superuser', superUserRoutes);


const server = app.listen(process.env.PORT, () => {
  console.log(`server is ready at ${process.env.PORT}`);
});