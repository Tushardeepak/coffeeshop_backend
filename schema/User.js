import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  id: {
      type: String,
      default: () =>  uuidv4().replace(/-/g, ''),
  },
});


export default mongoose.model("users", userSchema);