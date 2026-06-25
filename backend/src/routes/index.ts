import { Router } from "express";
import { healthController } from "../controllers/healthController.js";
import sessionRoutes from "./sessionRoutes.js";

const router = Router();

router.get("/health", healthController);
router.use("/sessions", sessionRoutes);

export default router;
