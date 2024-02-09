import express from "express";
import {
  createUser,
  getAllUsers,
  getCurrentUser,
  getUser,
  loginUser,
  logoutUser,
  updateUserProfile,
} from "../controllers/userController.js";
import {
  authenticate,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/profile").get(authenticate, getCurrentUser);
router.post(`/`, createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get(`/:id`, authenticate, getUser);
router.get(`/`, authenticate, authorizedAdmin, getAllUsers);
router.put("/profile", authenticate, updateUserProfile);

export default router;
