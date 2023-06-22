import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const tokenSchema = new Schema<{
  userId: mongoose.Types.ObjectId;
  token: string;
  createdAt: Date;
}>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600, // 1hr
  },
});

export = mongoose.model<{
  userId: mongoose.Types.ObjectId;
  token: string;
  createdAt: Date;
}>('token', tokenSchema);
