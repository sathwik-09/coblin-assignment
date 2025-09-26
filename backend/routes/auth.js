import { Router } from "express";
import { register, signin } from "../controllers/authController.js";
import { validate } from "../middlewares/schemaValidate.js";
import { registerSchema, loginSchema } from "../schema/auth.schema.js";
import { refreshAccessToken } from "../controllers/authController.js";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/signin", validate(loginSchema), signin);
router.post("/refresh", refreshAccessToken);

export default router;
