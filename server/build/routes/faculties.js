"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const faculty_1 = __importDefault(require("../controllers/faculty"));
const verifyToken_1 = require("../helpers/verifyToken");
const router = express_1.default.Router();
router.post('/login', faculty_1.default.facultyLogin);
router.post('/register', faculty_1.default.facultyRegister);
router.post('/quiz/:facultyId', verifyToken_1.verifyToken, faculty_1.default.addQuiz);
router.get('/quizzes/:facultyId', verifyToken_1.verifyToken, faculty_1.default.getFacultyQuizzes);
router.get('/faculties', verifyToken_1.verifyToken, faculty_1.default.getAllFaculties);
exports.default = router;
