import express from "express";
import {
  createUser,
  deleteCurrentUserPofile,
  deleteUserProfileById,
  getAllUsers,
  getCurrentUser,
  getUserById,
  loginUser,
  logoutUser,
  updateCurrentUserProfile,
  updateUserProfileById,
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
router.get(`/:id`, authenticate, authorizedAdmin, getUserById);
router.get(`/`, authenticate, authorizedAdmin, getAllUsers);
router.put("/profile", authenticate, updateCurrentUserProfile);
router.put("/:id", authenticate, authorizedAdmin, updateUserProfileById);
router.delete("/profile", authenticate, deleteCurrentUserPofile);
router.delete("/:id", authenticate, authorizedAdmin, deleteUserProfileById);

export default router;
