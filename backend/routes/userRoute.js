import express from "express";
import { registerUser, authUser, getUserData, getUserResumes } from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authUser);
router.get("/data", protect, getUserData);
router.get("/resumes", protect, getUserResumes);

export default router;