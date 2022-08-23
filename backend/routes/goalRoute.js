const express = require("express");
const { protectRoute } = require("../middleware/authMiddleware");
const router = express.Router();

const {
  getGoal,
  postGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

router.get("/", protectRoute, getGoal);
router.post("/", protectRoute, postGoal);
router.put("/:id", protectRoute, updateGoal);
router.delete("/:id", protectRoute, deleteGoal);

module.exports = router;
