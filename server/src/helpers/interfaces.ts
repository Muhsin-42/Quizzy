import { Document, Schema } from 'mongoose';

export interface IQuizQuestion {
  question: string;
  options: string[];
  answer: number;
}

export interface IQuiz extends Document {
  title: string;
  description: string;
  difficulty: string;
  totalQuestions: number;
  tags?: string[];
  author: Schema.Types.ObjectId;
  questions: IQuizQuestion[];
  isDelete: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser extends Document {
  fullname: string;
  email: string;
  password: string;
  isSuperUser: boolean;
  isActive: boolean;
  generateAuthToken: () => string;
}

export interface IStudent {
  _id: string;
  fullname:string;
  email: string
}