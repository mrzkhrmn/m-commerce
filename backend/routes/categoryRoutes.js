import express from "express";
import {
  authenticate,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", authenticate, createCategory);
router.put("/:id", authenticate, authorizedAdmin, updateCategory);
router.delete("/:id", authenticate, authorizedAdmin, deleteCategory);
router.get("/", authenticate, getAllCategories);
router.get("/:id", authenticate, authorizedAdmin, getCategoryById);

export default router;
