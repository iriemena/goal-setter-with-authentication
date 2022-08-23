const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

// GET GOALS
const getGoal = asyncHandler(async (req, res) => {
  // get a user goal
  const goal = await Goal.find({ user: req.user.id });
  res.json(goal);
});

// CREATE GOALS
const postGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add your goal");
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.json(goal);
});

// EDIT/UPDATE A GOAL
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  //   check for the user
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(400);
    throw new Error("User not authorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedGoal);
});

// DELETE A GOAL
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  //   check the user
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(400);
    throw new Error("User not authorized");
  }

  goal.remove();
  res.json({ id: goal._id });
});

module.exports = {
  getGoal,
  postGoal,
  updateGoal,
  deleteGoal,
};
