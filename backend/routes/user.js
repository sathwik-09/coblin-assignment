import { Router } from "express";
import { getProfile } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/profile", authMiddleware, getProfile);

export default router;
