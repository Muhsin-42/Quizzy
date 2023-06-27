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
const superUsersModel_1 = require("../models/superUsersModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const facultiesModel_1 = require("../models/facultiesModel");
const superUsersController = {
    superUserLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const superUser = yield superUsersModel_1.SuperUser.findOne({ email: req.body.email });
            if (!superUser) {
                res.status(401).send({ message: 'Invalid Email or Password' });
            }
            else {
                const validPassword = yield bcrypt_1.default.compare(req.body.password, superUser.password);
                if (!validPassword) {
                    return res.status(401).send({ message: 'Invalid Email or password' });
                }
                const secretKey = process.env.JWT_SECRET_KEY || '';
                const token = jsonwebtoken_1.default.sign({ email: superUser.email }, secretKey, { expiresIn: '1h' });
                res.status(200).json({ token, user: superUser });
            }
        }
        catch (error) {
            res.status(500).send({ message: 'Internal Server Error' });
        }
    }),
    superUserRegister: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { error } = (0, superUsersModel_1.validate)(req.body);
            if (error)
                return res.status(401).send({ message: error.details[0].message });
            let superUser = yield superUsersModel_1.SuperUser.findOne({ email: req.body.email });
            if (superUser)
                return res.status(409).send({ message: "User with given email already Exist!", emailExists: true });
            const salt = yield bcrypt_1.default.genSalt(Number(process.env.SALT));
            const hashPassword = yield bcrypt_1.default.hash(req.body.password, salt);
            superUser = yield new superUsersModel_1.SuperUser(Object.assign(Object.assign({}, req.body), { password: hashPassword })).save();
            res.status(201).send({ message: "Email Sent to your account, please verify" });
        }
        catch (error) {
            res.status(500).send({ message: "Internal Server Error" });
        }
    }),
    getAllStudents: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const students = yield studentsModel_1.Student.find();
            res.status(200).json(students);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch quizzes' });
        }
    }),
    getAllFaculties: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const faculties = yield facultiesModel_1.Faculty.find();
            res.status(200).json(faculties);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch quizzes' });
        }
    })
};
module.exports = superUsersController;
