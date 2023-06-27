"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const superUser_1 = __importDefault(require("../controllers/superUser"));
const student_1 = __importDefault(require("../controllers/student"));
const verifyToken_1 = require("../helpers/verifyToken");
const router = express_1.default.Router();
router.post('/login', superUser_1.default.superUserLogin);
router.post('/register', superUser_1.default.superUserRegister);
router.get('/quizzes', verifyToken_1.verifyToken, student_1.default.getAllQuizzes);
router.get('/students', verifyToken_1.verifyToken, superUser_1.default.getAllStudents);
router.get('/students', verifyToken_1.verifyToken, superUser_1.default.getAllFaculties);
exports.default = router;
