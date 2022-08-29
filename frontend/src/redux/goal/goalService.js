import axios from "axios";

const registerGoal = async (user, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.post("/api/goal", user, config);
  return res.data;
};

const getGoal = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get("/api/goal", config);
  return res.data;
};

const deleteGoal = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.delete("/api/goal/" + goalId, config);
  return res.data;
};

const goalService = {
  registerGoal,
  getGoal,
  deleteGoal,
};

export default goalService;
