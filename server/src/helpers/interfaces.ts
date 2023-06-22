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
  tags?: string[];
  author: Schema.Types.ObjectId;
  questions: IQuizQuestion[];
  isDelete: boolean;
  createdAt: Date;
  updatedAt: Date;
}
