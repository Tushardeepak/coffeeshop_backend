import express from "express";
import mongoose from "mongoose";
import Cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import storyRoutes from "./routes/storyRoutes.js";

//App Config
const app = express();
const port = process.env.PORT || 8080;
const hostname = "0.0.0.0";
const connectionUrl =
  "mongodb+srv://practice:lKUC6mY3tBEjyYzC@cluster0.0w40f.mongodb.net/coffeeshop?retryWrites=true&w=majority";

//Middleware
app.use(express.json());
app.use(Cors());

//DB Config
mongoose.connect(connectionUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//API Endpoints
app.use("/coffeeshop", userRoutes);
app.use("/coffeeshop", storyRoutes);

//Listener
app.listen(port, hostname, () => console.log(`Listen to port ${port}`));
