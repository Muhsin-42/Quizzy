import express from 'express';
import { Router } from 'express';
import studentsController from '../controllers/student';
import dotenv from 'dotenv';

const router: Router = express.Router();

router.post('/login', studentsController.studentLogin);
router.post('/register', studentsController.studentRegister);

router.get('/quizzes',studentsController.getAllQuizzes)

export default router;