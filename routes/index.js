var express = require("express");
const todo = require("./todo");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/createTodo", async (req, res, next) => {
  try {
    console.log(req.body)
    const newTodo = await todo.create(req.body);
    res.status(200).json({
      message: "new todo created successFUlly",
      status: "success",
      newTodo,
    });
  } catch (err) {
    console.log(err),
      res.status(500).json({
        message: err,
        status: "failed",
      });
  }
});

router.get("/getTodo/:todoId", async (req, res, next) => {
  try {
    const currentTOdo = await todo.findOne({
      _id: req.params.todoId,
    });

    if (!currentTOdo) {
      res.status(404).json({
        message: "no todo found with this todo id",
        status: "failed",
      });
    }

    res.status(200).json({
      message: "todo found",
      todo: currentTOdo,
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err,
      status: "failed",
    });
  }
});

router.get("/getUserTodo/:userId", async (req, res, next) => {
  try {
    const currentTOdo = await todo.find({
      uid: req.params.userId,
    });

    if (!currentTOdo) {
      res.status(404).json({
        message: "no todo found for this user",
        status: "failed",
      });
    }
    res.status(200).json({
      message: "user todo found",
      todo: currentTOdo,
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err,
      status: "failed",
    });
  }
});

router.get("/delete/:todoId", async (req, res, next) => {
  try {
    const deletedTodo = await todo.findOneAndDelete({
      _id: req.params.todoId,
    });

    res.status(200).json({
      message: "todo deleted successfully",
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err,
      status: "failed",
    });
  }
});

router.post("/updateTodo/:todoId", async (req, res, next) => {
  try {
    const updatedTodo = await todo.findOneAndUpdate(
      {
        _id: req.params.todoId,
      },
      req.body
    );

    res.status(200).json({
      message: "todo Updated successfully",
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err,
      status: "failed",
    });
  }
});

module.exports = router;
