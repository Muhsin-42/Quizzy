import mongoose, { Document, Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import passwordComplexity from 'joi-password-complexity';
import { IUser } from '../helpers/interfaces';


const SuperUserSchema: Schema<IUser> = new Schema<IUser>(
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
    isSuperUser:{
        type:Boolean,
        default: true
    }
  },
  { timestamps: true }
);

SuperUserSchema.methods.generateAuthToken = function (): string {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY!, {
    expiresIn: '7d',
  });
  return token;
};

const SuperUser = mongoose.model<IUser>('superusers', SuperUserSchema);

const validate = (data: any): Joi.ValidationResult => {
  const schema = Joi.object({
    fullname: Joi.string().required().label('fullname'),
    email: Joi.string().email().required().label('email'),
    password: passwordComplexity().required().label('password'),
  });
  return schema.validate(data);
};

export { SuperUser , validate };
