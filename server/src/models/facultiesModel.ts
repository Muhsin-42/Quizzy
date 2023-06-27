import mongoose, { Document, Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import passwordComplexity from 'joi-password-complexity';

interface IFaculty extends Document {
  fullname: string;
  email: string;
  password: string;
  profilePicture: string;
  isFaculty: boolean;
  isActive: boolean;
  generateAuthToken: () => string;
}

const FacultySchema: Schema<IFaculty> = new Schema<IFaculty>(
  {
    fullname: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
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
    isFaculty:{
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

FacultySchema.methods.generateAuthToken = function (): string {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY!, {
    expiresIn: '7d',
  });
  return token;
};

const Faculty = mongoose.model<IFaculty>('faculties', FacultySchema);

const validate = (data: any): Joi.ValidationResult => {
  const schema = Joi.object({
    fullname: Joi.string().required().label('fullname'),
    email: Joi.string().email().required().label('email'),
    password: passwordComplexity().required().label('password'),
  });
  return schema.validate(data);
};

export { Faculty, validate };
