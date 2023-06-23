import { Request, Response } from 'express';
import { Faculty, validate } from '../models/facultiesModel';
import bcrypt from 'bcrypt';
import jwt, {  Secret } from 'jsonwebtoken';
import QuizModel from '../models/QuizModel';
import { IQuiz } from '../helpers/interfaces';

const facultiesController = {

  facultyLogin: async (req: Request, res: Response) => {
    try {
      const student = await Faculty.findOne({ email: req.body.email });
      if (!student) {
        res.status(401).send({ message: 'Invalid Email or Password' });
      } else {

        const validPassword = await bcrypt.compare(req.body.password, student.password);
        if (!validPassword) return res.status(401).send({ message: 'Invalid Email or password' })
  
        const secretKey: Secret = process.env.JWT_SECRET_KEY || '';
        const token = jwt.sign({ email: student.email }, secretKey, { expiresIn: '1h' });
        res.status(200).json({ token, user: student });
      }
    } catch (error) {
      res.status(500).send({ message: 'Internal Server Error' });
    }
  },

  facultyRegister: async (req: Request, res: Response) => {
    try {
      const { error } = validate(req.body);
      if (error)
        return res.status(401).send({ message: error.details[0].message });

      let user = await Faculty.findOne({ email: req.body.email });
      if (user) return res.status(409).send({ message: "User with given email already Exist!", emailExists: true });
      
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      
      user = await new Faculty({ ...req.body, password: hashPassword }).save();

      res.status(201).send({ message: "Email Sent to your account, please verify" });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },


  addQuiz:  async (req: Request, res: Response) => {
    try {
      const { title, description, difficulty, tags,  questions, totalQuestions } = req.body;
      const author = req.params.facultyId;

      // Create a new quiz document
      const newQuiz: IQuiz = new QuizModel({
        title,
        difficulty,
        totalQuestions,
        tags,
        author,
        questions,
      });
  
      // Save the quiz to the database
      const savedQuiz = await newQuiz.save();
  
      res.status(201).json(savedQuiz);
    } catch (error) {
      console.log('eee ',error);
      res.status(500).json({ error: 'Failed to create quiz' });
    }
  },

  getFacultyQuizzes: async (req: Request, res: Response) =>{
    try {
      const {facultyId} = req.params;
      const quizzes = await QuizModel.find({author: Object(facultyId)});
      res.status(200).json(quizzes);
    } catch (error) {
      console.log('Error:', error);
      res.status(500).json({ error: 'Failed to fetch quizzes' });
    }
  },

  getAllFaculties: async (req: Request, res: Response) =>{
    try {
      const faculties = await Faculty.find();
      res.status(200).json(faculties);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch students' });
    }
  }
};

export = facultiesController;