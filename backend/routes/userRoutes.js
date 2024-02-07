import express from "express";
import {
  createUser,
  getAllUsers,
  getUser,
  loginUser,
  logoutUser,
} from "../controllers/userController.js";
import {
  authenticate,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get(`/:id`, getUser);
router.get(`/`, authenticate, authorizedAdmin, getAllUsers);
router.post(`/`, createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
