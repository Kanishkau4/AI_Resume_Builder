import Resume from "../models/Resume.js";
import openai from "../config/ai.js";

// @desc    Enhance resume's professional summary using AI
// @route   POST /api/ai/enhance-summary
// @access  Private
export const enhanceProfessionalSummary = async (req, res) => {
    try {
        // get data from request body
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: "User content is required" });
        }

        // enhance professional summary
        const response = await openai.chat.completions.create({
            model: process.env.GEMINI_MODEL,
            messages: [
                { role: "system", content: "You are a resume expert. Your task is to enhance the user's professional summary. The summary should be 2-3 sentences long and highlight the user's skills, experience, and achievements. Make it compelling and ATS friendly. and only return text not any other thing." },
                { role: "user", content: userContent },
            ],
        });

        // send response
        return res.status(201).json({ enhancedSummary: response.choices[0].message.content });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// @desc    Enhance resume's job description using AI
// @route   POST /api/ai/enhance-job-description
// @access  Private
export const enhanceJobDescription = async (req, res) => {
    try {
        // get data from request body
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: "User content is required" });
        }

        // enhance job description
        const response = await openai.chat.completions.create({
            model: process.env.GEMINI_MODEL,
            messages: [
                { role: "system", content: "You are a resume expert. Your task is to enhance the user's job description. The job description should be 2-3 sentences long and highlight key responsibilities and achievements. Use action verbs and quantify achievements where possible. Make it compelling and ATS friendly. and only return text not any other thing." },
                { role: "user", content: userContent },
            ],
        });

        // send response
        return res.status(201).json({ resume: response.choices[0].message.content });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// @desc    Upload resume to the Database
// @route   POST /api/ai/upload-resume
// @access  Private
export const uploadResume = async (req, res) => {
    try {
        // get data from request body
        const { resumeText, title } = req.body;
        const userId = req.userId;

        if (!resumeText || !title) {
            return res.status(400).json({ message: "Resume and title are required" });
        }

        const systemPrompt = `
        You are an expert AI Agent to extract data from the resume.
        `

        const userPrompt = `
        Extract the data from this resume: ${resumeText}

        provide data in the following JSON format with no additional text before or after:
        {
            personal_info: {
        image: { type: String, default: "" },
        full_name: { type: String, default: "" },
        profession: { type: String, default: "" },
        email: { type: String, default: "" },
        phone: { type: String, default: "" },
        location: { type: String, default: "" },
        linkedin: { type: String, default: "" },
        website: { type: String, default: "" },
    },
    professional_summary: { type: String, default: "" },
    experience: [
        {
            company: { type: String, default: "" },
            position: { type: String, default: "" },
            start_date: { type: Date, default: "" },
            end_date: { type: Date, default: "" },
            description: { type: String, default: "" },
            is_current: { type: Boolean, default: false },
        }
    ],
    education: [
        {
            institution: { type: String, default: "" },
            degree: { type: String, default: "" },
            field: { type: String, default: "" },
            graduation_date: { type: String, default: "" },
            gpa: { type: String, default: "" },
            description: { type: String, default: "" },
        }
    ],
    skills: [{ type: String }],
    projects: [
        {
            name: { type: String, default: "" },
            type: { type: String, default: "" },
            description: { type: String, default: "" },
        }
    ]
    }
        `
        // extract data from resume
        const response = await openai.chat.completions.create({
            model: process.env.GEMINI_MODEL,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            response_format: { type: "json_object" },
        });

        const resumeData = JSON.parse(response.choices[0].message.content);
        const resume = await Resume.create({
            userId,
            title,
            ...resumeData,
        });
        // send response
        res.json({ resumeId: resume._id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

