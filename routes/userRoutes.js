import express from "express";
import Users from "../schema/User.js";

const routes = express.Router();

routes.post("/addUser", async (req, res) => {
  console.log(req.body);
  try {
    const users = new Users(req.body);
    const userList = Users.find({ email: req.body.email });
    if (userList.length > 0) {
      res.send({
        message: "User Already Exists",
        id: null,
      });
    } else {
      const d = await users.save(req.body);
      console.log(d);
      res.send({
        name: d.name,
        email: d.email,
        password: d.password,
        message: "New User",
        id: d.id,
      });
    }
  } catch (err) {
    console.log(err);
    res.send("User not added");
  }
});

routes.post("/getUser", async (req, res) => {
  try {
    const d = await Users.find({
      $and: [{ email: req.body.email }, { password: req.body.password }],
    });
    if (d.length > 0) {
      res.send({
        name: d[0].name,
        email: d[0].email,
        password: d[0].password,
        message: "User found",
        id: d[0].id,
      });
    } else {
      res.send({
        id: null,
        message: "No User Found, Check Email and Password",
      });
    }
  } catch (err) {
    res.send("Invalid Entry");
    console.log(err);
  }
});


export default routes;