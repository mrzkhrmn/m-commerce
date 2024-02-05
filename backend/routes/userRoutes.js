import express from "express";
import {
  createUser,
  getAllUsers,
  getUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post(`/`, createUser);
router.get(`/:id`, getUser);
router.get(`/`, getAllUsers);

export default router;
