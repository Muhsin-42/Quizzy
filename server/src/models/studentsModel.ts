import mongoose, { Document, Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import passwordComplexity from 'joi-password-complexity';

interface IStudent extends Document {
  fullname: string;
  email: string;
  password: string;
  profilePicture: string;
  isStudent: boolean;
  isActive: boolean;
  generateAuthToken: () => string;
}

const StudentSchema: Schema<IStudent> = new Schema<IStudent>(
  {
    fullname: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      min: 3,
    },
    profilePicture: {
      type: String,
      default: '',
    },
    isStudent:{
        type:Boolean,
        default: true
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

StudentSchema.methods.generateAuthToken = function (): string {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY!, {
    expiresIn: '7d',
  });
  return token;
};

const Student = mongoose.model<IStudent>('students', StudentSchema);

const validate = (data: any): Joi.ValidationResult => {
  const schema = Joi.object({
    fullname: Joi.string().required().label('fullname'),
    email: Joi.string().email().required().label('email'),
    password: passwordComplexity().required().label('password'),
  });
  return schema.validate(data);
};

export { Student, validate };
