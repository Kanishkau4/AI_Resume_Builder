import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
        default: "Untitled Resume",
    },
    public: {
        type: Boolean,
        default: false,
    },
    template: {
        type: String,
        default: "classic",
    },
    accent_color: {
        type: String,
        default: "#3B82F6",
    },
    personal_info: {
        image: String, default: "",
        full_name: String, default: "",
        profession: String, default: "",
        email: String, default: "",
        phone: String, default: "",
        location: String, default: "",
        linkedin: String, default: "",
        website: String, default: "",
    },
    professional_summary: String, default: "",
    experience: [
        {
            company: String,
            position: String,
            start_date: Date,
            end_date: Date,
            description: String,
            is_current: Boolean,
        }
    ],
    education: [
        {
            institution: String,
            degree: String,
            field: String,
            graduation_date: String,
            gpa: String,
            description: String,
        }
    ],
    skills: [{ type: String }],
    projects: [
        {
            name: String,
            type: String,
            description: String,
        }
    ],
}, {
    timestamps: true, minimize: false
})

const Resume = mongoose.model("Resume", resumeSchema)

export default Resume
