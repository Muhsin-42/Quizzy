import { Request, Response } from 'express';
import { Student  } from '../models/studentsModel';
import { SuperUser, validate } from '../models/superUsersModel';
import bcrypt from 'bcrypt';
import jwt, {  Secret } from 'jsonwebtoken';
import { Faculty } from '../models/facultiesModel';


const superUsersController = {

  superUserLogin: async (req: Request, res: Response) => {
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
  
        res.status(200).json({ token, user: superUser });
      }
    } catch (error) {
      
      res.status(500).send({ message: 'Internal Server Error' });
    }
  },

  superUserRegister: async (req: Request, res: Response) => {
    try {
      const { error } = validate(req.body);
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

  getAllStudents: async (req: Request, res: Response) =>{
    try {
      const students = await Student.find();
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch quizzes' });
    }
  },

  getAllFaculties: async (req: Request, res: Response) =>{
    try {
      const faculties = await Faculty.find();
      res.status(200).json(faculties);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch quizzes' });
    }
  }
};

export = superUsersController;