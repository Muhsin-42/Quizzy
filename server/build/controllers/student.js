"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const studentsModel_1 = require("../models/studentsModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const QuizModel_1 = __importDefault(require("../models/QuizModel"));
const studentsController = {
    studentLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const student = yield studentsModel_1.Student.findOne({ email: req.body.email });
            if (!student) {
                res.status(401).send({ message: 'Invalid Email or Password' });
            }
            else {
                const validPassword = yield bcrypt_1.default.compare(req.body.password, student.password);
                if (!validPassword) {
                    return res.status(401).send({ message: 'Invalid Email or password' });
                }
                const secretKey = process.env.JWT_SECRET_KEY || '';
                const token = jsonwebtoken_1.default.sign({ email: student.email }, secretKey, { expiresIn: '1h' });
                const studentDetails = {
                    _id: student._id,
                    fullname: student.fullname,
                    email: student.email
                };
                res.status(200).json({ token, user: studentDetails });
            }
        }
        catch (error) {
            res.status(500).send({ message: 'Internal Server Error' });
        }
    }),
    studentRegister: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { error } = (0, studentsModel_1.validate)(req.body);
            if (error)
                return res.status(401).send({ message: error.details[0].message });
            let user = yield studentsModel_1.Student.findOne({ email: req.body.email });
            if (user)
                return res.status(409).send({ message: "User with given email already Exist!", emailExists: true });
            const salt = yield bcrypt_1.default.genSalt(Number(process.env.SALT));
            const hashPassword = yield bcrypt_1.default.hash(req.body.password, salt);
            user = yield new studentsModel_1.Student(Object.assign(Object.assign({}, req.body), { password: hashPassword })).save();
            res.status(201).send({ message: "Email Sent to your account, please verify" });
        }
        catch (error) {
            res.status(500).send({ message: "Internal Server Error" });
        }
    }),
    getAllQuizzes: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const quizzes = yield QuizModel_1.default.find();
            res.status(200).json(quizzes);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch quizzes' });
        }
    }),
    getAllStudents: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const students = yield studentsModel_1.Student.find();
            res.status(200).json(students);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch students' });
        }
    })
};
module.exports = studentsController;
