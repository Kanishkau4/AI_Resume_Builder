import "dotenv/config"; // This ensures .env is loaded before other imports
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import resumeRoute from "./routes/resumeRoute.js";
import aiRoute from "./routes/aiRoute.js";
// connect to database
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running...");
});

// user routes
app.use("/api/users", userRoute);

// resume routes
app.use("/api/resumes", resumeRoute);

// ai routes
app.use("/api/ai", aiRoute);

export default app;