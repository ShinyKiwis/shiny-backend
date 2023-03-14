import User from './user.interface';
import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema<User>({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const userModel = mongoose.model<User & mongoose.Document>('User', userSchema)

export default userModel
