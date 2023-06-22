import express from 'express';
import { Router } from 'express';
import superUsersController from '../controllers/superUser';
const router: Router = express.Router();

router.post('/login', superUsersController.superUserLogin);
router.post('/register', superUsersController.superUserRegister);
// router.get('/quizzes',studentsController.getAllQuizzes)

export default router;