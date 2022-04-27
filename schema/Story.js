import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const storySchema = mongoose.Schema({
  id: {
    type: String,
    default: () => uuidv4().replace(/-/g, ""),
  },
  title: String,
  story: String,
  author: String,
  email: String,
  date: String,
  likes: {
    type: String,
    default: "",
  },
  timestamp: {
    type: String,
    default: () => new Date().getTime().toString(),
  },
});

export default mongoose.model("story", storySchema);
