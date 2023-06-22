import { Request, Response, NextFunction } from 'express';
import { Faculty, validate } from '../models/facultiesModel';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import QuizModel from '../models/QuizModel';
import { IQuiz } from '../helpers/interfaces';

interface DecodedToken extends JwtPayload {
  email: string;
}

const facultiesController = {
  verifyToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader ? authHeader.split(' ')[1].trim() : undefined;

      if (!token) {
        return res.status(400).json({ status: 'error', error: 'Missing token' });
      }

      const secretKey: Secret = process.env.JWT_SECRET_KEY || '';

      const decoded = jwt.verify(token, secretKey) as DecodedToken;
      const email = decoded.email;
      const user = await Faculty.findOne({ email: email });
      next();
    } catch (error) {
      res.status(400).json({ status: 'error', error: 'Invalid token' });
    }
  },

  facultyLogin: async (req: Request, res: Response) => {
    console.log('req body',req.body );
    
    try {
      const student = await Faculty.findOne({ email: req.body.email });
      if (!student) {
        res.status(401).send({ message: 'Invalid Email or Password' });
      } else {
        const validPassword = await bcrypt.compare(req.body.password, student.password);
        if (!validPassword) {
          return res.status(401).send({ message: 'Invalid Email or password' });
        }
  
        const secretKey: Secret = process.env.JWT_SECRET_KEY || '';
        const token = jwt.sign({ email: student.email }, secretKey, { expiresIn: '1h' });
  
        console.log(token);
        
        res.status(200).json({ token, user: student });
      }
    } catch (error) {
      res.status(500).send({ message: 'Internal Server Error' });
    }
  },

  facultyRegister: async (req: Request, res: Response) => {
    try {
      const { error } = validate(req.body);
      console.log(error)
      if (error)
        return res.status(401).send({ message: error.details[0].message });

      let user = await Faculty.findOne({ email: req.body.email });
      if (user)
        return res.status(409).send({ message: "User with given email already Exist!", emailExists: true });
      
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
        description,
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
  }

};

export = facultiesController;