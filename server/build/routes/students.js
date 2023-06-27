"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_1 = __importDefault(require("../controllers/student"));
const verifyToken_1 = require("../helpers/verifyToken");
const router = express_1.default.Router();
router.post('/login', student_1.default.studentLogin);
router.post('/register', student_1.default.studentRegister);
router.get('/quizzes', verifyToken_1.verifyToken, student_1.default.getAllQuizzes);
router.get('/students', verifyToken_1.verifyToken, student_1.default.getAllStudents);
exports.default = router;
