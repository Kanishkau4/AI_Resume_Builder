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
                { role: "system", content: "You are a resume expert. Your task is to enhance the user's professional summary. The summary should be 1-2 sentences long and highlight the user's skills, experience, and achievements. Make it compelling and ATS friendly. and only return text not any other thing." },
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
                { role: "system", content: "You are a resume expert. Your task is to enhance the user's job description. The job description should be 1-2 sentences long and highlight key responsibilities and achievements. Use action verbs and quantify achievements where possible. Make it compelling and ATS friendly. and only return text not any other thing." },
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
        You are an expert AI Assistant specialized in resume parsing. 
        Your task is to extract information from the provided resume text and return it as a clean JSON object. 
        Be professional and ensure all data is accurately mapped.
        `

        const userPrompt = `
        Extract all relevant information from the following resume text:
        ---
        ${resumeText}
        ---

        Return ONLY a JSON object following this EXACT structure:
        {
            "personal_info": {
                "full_name": "",
                "profession": "",
                "email": "",
                "phone": "",
                "location": "",
                "linkedin": "",
                "website": ""
            },
            "professional_summary": "",
            "experience": [
                {
                    "company": "",
                    "position": "",
                    "start_date": "YYYY-MM-DD",
                    "end_date": "YYYY-MM-DD",
                    "description": "Multi-line description of responsibilities",
                    "is_current": false
                }
            ],
            "education": [
                {
                    "institution": "",
                    "degree": "",
                    "field": "",
                    "graduation_date": "YYYY-MM-DD",
                    "gpa": "",
                    "description": ""
                }
            ],
            "skills": ["Skill 1", "Skill 2"],
            "projects": [
                {
                    "name": "",
                    "type": "",
                    "description": ""
                }
            ]
        }

        - If information is missing, use an empty string "" or false for booleans.
        - CRITICAL: Dates MUST be in YYYY-MM-DD format for database compatibility. If a day or month is missing, use 01 (e.g., 2023-01-01).
        - Return ONLY the JSON object.
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

        const content = response.choices[0].message.content;
        console.log("AI Extraction Result:", content);

        let resumeData;
        try {
            resumeData = JSON.parse(content);
        } catch (parseError) {
            console.error("Failed to parse AI response:", parseError);
            return res.status(500).json({ message: "AI returned invalid data format" });
        }

        // Final cleanup for date fields to prevent Mongoose cast errors
        if (resumeData.experience) {
            resumeData.experience = resumeData.experience.map(exp => ({
                ...exp,
                start_date: exp.start_date || undefined,
                end_date: exp.end_date || undefined
            }));
        }

        const resume = await Resume.create({
            userId,
            title,
            ...resumeData,
        });

        res.json({ resumeId: resume._id });
    } catch (error) {
        console.error("Resume Upload Error:", error);
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
}

