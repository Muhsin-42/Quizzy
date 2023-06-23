import express from 'express';
import { Router } from 'express';
import superUsersController from '../controllers/superUser';
import studentsController from '../controllers/student';
import { verifyToken } from '../helpers/verifyToken';
const router: Router = express.Router();

router.post('/login', superUsersController.superUserLogin);
router.post('/register', superUsersController.superUserRegister);
router.get('/quizzes',verifyToken,studentsController.getAllQuizzes)
router.get('/students',verifyToken,superUsersController.getAllStudents)
router.get('/students',verifyToken,superUsersController.getAllFaculties)

export default router;