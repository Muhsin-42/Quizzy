import { Request, Response } from 'express';
import { Student, validate } from '../models/studentsModel';
import bcrypt from 'bcrypt';
import jwt, {  Secret } from 'jsonwebtoken';
import QuizModel from '../models/QuizModel';
import { IStudent } from '../helpers/interfaces';

const studentsController = {


  studentLogin: async (req: Request, res: Response) => {
    try {
      const student = await Student.findOne({ email: req.body.email });
      if (!student) {
        res.status(401).send({ message: 'Invalid Email or Password' });
      } else {
        const validPassword = await bcrypt.compare(req.body.password, student.password);
        if (!validPassword) {
          return res.status(401).send({ message: 'Invalid Email or password' });
        }
  
        const secretKey: Secret = process.env.JWT_SECRET_KEY || '';
        const token = jwt.sign({ email: student.email }, secretKey, { expiresIn: '1h' });
        
        const studentDetails: IStudent = {
          _id: student._id,
          fullname: student.fullname,
          email: student.email
        }
        res.status(200).json({ token, user: studentDetails });
      }
    } catch (error) {    
      res.status(500).send({ message: 'Internal Server Error' });
    }
  },

  studentRegister: async (req: Request, res: Response) => {
    try {
      const { error } = validate(req.body);
      if (error)
        return res.status(401).send({ message: error.details[0].message });

      let user = await Student.findOne({ email: req.body.email });
      if (user)
        return res.status(409).send({ message: "User with given email already Exist!", emailExists: true });
      
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      
      user = await new Student({ ...req.body, password: hashPassword }).save();

      res.status(201).send({ message: "Email Sent to your account, please verify" });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  getAllQuizzes: async (req: Request, res: Response) =>{
    try {
      const quizzes = await QuizModel.find();
      res.status(200).json(quizzes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch quizzes' });
    }
  },

  getAllStudents: async (req: Request, res: Response) =>{
    try {
      const students = await Student.find();
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch students' });
    }
  }
};

export = studentsController;