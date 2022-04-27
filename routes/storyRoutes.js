import express from "express";
import Story from "../schema/Story.js";

const routes = express.Router();

routes.post("/addStory", async (req, res) => {
  const story = new Story(req.body);
  try {
    const response = await story.save();
    console.log(response);
    res.send("Story Added");
  } catch (err) {
    res.send("Story Not Added");
    console.log(err);
  }
});

routes.post("/getStories", async (req, res) => {
  try {
    const response = await Story.find().sort({ timestamp: -1 });
    console.log(response);
    res.send(response);
  } catch (err) {
    res.send("Not Found");
    console.log(err);
  }
});

routes.post("/getStory", async (req, res) => {
  try {
    const response = await Story.find({ id: req.body.id });
    console.log(response);
    res.send({
      title: response[0].title,
      story: response[0].story,
      author: response[0].author,
      email: response[0].email,
      date: response[0].date,
      id: response[0].id,
      likes: response[0].likes,
    });
  } catch (err) {
    res.send("Not Found");
    console.log(err);
  }
});

routes.post("/deleteStory", async (req, res) => {
  try {
    const response = Story.deleteOne({ id: req.body.id });
    res.send("Deleted");
  } catch (err) {
    res.send("Not Deleted");
    console.log(err);
  }
});

routes.post("/editStory", async (req, res) => {
  try {
    const response = await Story.updateOne(
      { id: req.body.id },
      {
        $set: {
          title: req.body.title,
          story: req.body.story,
        },
      }
    );
    console.log(response);
    res.send("Updated");
  } catch (err) {
    res.send("Not Updated");
    console.log(err);
  }
});

routes.post("/likeStory", async (req, res) => {
  try {
    const response = await Story.updateOne(
      { id: req.body.id },
      {
        $set: {
          likes: req.body.likes,
        },
      }
    );
    console.log(response);
    res.send("Like Updated");
  } catch (err) {
    res.send("Error Occurred");
    console.log(err);
  }
});

export default routes;
