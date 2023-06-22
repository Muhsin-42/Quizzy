import express from 'express';
import { Router } from 'express';
import facultiesController from '../controllers/faculty';
import dotenv from 'dotenv';

const router: Router = express.Router();

router.post('/login', facultiesController.facultyLogin);
router.post('/register', facultiesController.facultyRegister);

router.post('/quiz/:facultyId',facultiesController.addQuiz)


export default router;