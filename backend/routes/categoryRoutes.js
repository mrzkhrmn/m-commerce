import express from "express";
import {
  authenticate,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";
import {
  createCategory,
  updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", authenticate, createCategory);
router.put("/:id", authenticate, authorizedAdmin, updateCategory);

export default router;
