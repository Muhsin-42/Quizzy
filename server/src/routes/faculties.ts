import express from 'express';
import { Router } from 'express';
import facultiesController from '../controllers/faculty';
import { verifyToken } from '../helpers/verifyToken';
const router: Router = express.Router();

router.post('/login', facultiesController.facultyLogin);
router.post('/register', facultiesController.facultyRegister);
router.post('/quiz/:facultyId',verifyToken,facultiesController.addQuiz)
router.get('/quizzes/:facultyId',verifyToken,facultiesController.getFacultyQuizzes)

export default router;