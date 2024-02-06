import express from "express";
import {
  createUser,
  getAllUsers,
  getUser,
  loginUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get(`/:id`, getUser);
router.get(`/`, getAllUsers);
router.post(`/`, createUser);
router.post("/login", loginUser);

export default router;
