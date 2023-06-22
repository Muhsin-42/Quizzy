import { Schema, Document, Model, model } from 'mongoose';
import { IQuiz } from '../helpers/interfaces';


const QuizSchema: Schema<IQuiz> = new Schema<IQuiz>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: false,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'faculties',
      required: true,
    },
    questions: [
      {
        question: {
          type: String,
        },
        options: {
          type: [String],
        },
        answer: {
          type: Number,
        },
      },
    ],
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const QuizModel: Model<IQuiz> = model<IQuiz>('quizs', QuizSchema);

export default QuizModel;