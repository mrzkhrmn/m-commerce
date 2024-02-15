import express from "express";
import {
  authenticate,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", authenticate, createCategory);
router.put("/:id", authenticate, authorizedAdmin, updateCategory);
router.delete("/:id", authenticate, authorizedAdmin, deleteCategory);

export default router;
