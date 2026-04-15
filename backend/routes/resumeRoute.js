import express from "express";
import { createResume, updateResume, deleteResume, getResume, getPublicResume } from "../controllers/resumeController.js";
import protect from "../middleware/authMiddleware.js";
import upload from "../config/multer.js";

const resumeRouter = express.Router();

resumeRouter.post("/create", protect, createResume);
resumeRouter.put("/update", protect, upload.single("image"), updateResume);
resumeRouter.delete("/delete/:resumeId", protect, deleteResume);
resumeRouter.get("/get/:resumeId", protect, getResume);
resumeRouter.get("/public/:resumeId", getPublicResume);

export default resumeRouter;