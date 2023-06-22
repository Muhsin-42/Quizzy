import { Request, Response, NextFunction } from 'express';
import { Student  } from '../models/studentsModel';
import { SuperUser, validate } from '../models/superUsersModel';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import QuizModel from '../models/QuizModel';

interface DecodedToken extends JwtPayload {
  email: string;
}

const superUsersController = {
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
      const user = await SuperUser.findOne({ email: email });
      next();
    } catch (error) {
      res.status(400).json({ status: 'error', error: 'Invalid token' });
    }
  },

  superUserLogin: async (req: Request, res: Response) => {
    console.log('req body',req.body );
    
    try {
      const superUser = await SuperUser.findOne({ email: req.body.email });
      if (!superUser) {
        res.status(401).send({ message: 'Invalid Email or Password' });
      } else {
        const validPassword = await bcrypt.compare(req.body.password, superUser.password);
        if (!validPassword) {
          return res.status(401).send({ message: 'Invalid Email or password' });
        }
  
        const secretKey: Secret = process.env.JWT_SECRET_KEY || '';
        const token = jwt.sign({ email: superUser.email }, secretKey, { expiresIn: '1h' });
  
        console.log(token);
        
        res.status(200).json({ token, user: superUser });
      }
    } catch (error) {
      console.log(error);
      
      res.status(500).send({ message: 'Internal Server Error' });
    }
  },

  superUserRegister: async (req: Request, res: Response) => {
    try {
      const { error } = validate(req.body);
      console.log(error)
      if (error)
        return res.status(401).send({ message: error.details[0].message });

      let superUser = await SuperUser.findOne({ email: req.body.email });
      if (superUser)
        return res.status(409).send({ message: "User with given email already Exist!", emailExists: true });
      
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      
      superUser = await new SuperUser({ ...req.body, password: hashPassword }).save();

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
      console.log('Error:', error);
      res.status(500).json({ error: 'Failed to fetch quizzes' });
    }
  }
};

export = superUsersController;