import imagekit from "../config/imageKit.js";
import Resume from "../models/Resume.js";
import fs from "fs";

// @desc    Create a new resume
// @route   POST /api/resumes
// @access  Private
export const createResume = async (req, res) => {
    try {
        // get data from request body
        const { title } = req.body;

        // create resume
        const newResume = await Resume.create({
            userId: req.userId,
            title,
        });

        // send response
        return res.status(201).json(newResume);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// @desc    Update a resume
// @route   PUT /api/resumes/update
// @access  Private
export const updateResume = async (req, res) => {
    try {
        // get data from request body
        const { resumeId, resumeData, removeBackground, title } = req.body;
        const image = req.file;

        let updateFields = {};
        if (title) updateFields.title = title;

        if (resumeData) {
            let parsedData = typeof resumeData === 'string' ? JSON.parse(resumeData) : JSON.parse(JSON.stringify(resumeData));
            updateFields = { ...updateFields, ...parsedData };
        }

        // upload image to imagekit
        if (image) {
            const imageBufferData = fs.createReadStream(image.path);
            const response = await imagekit.files.upload({
                file: imageBufferData,
                fileName: image.originalname || `resume-image-${Date.now()}.png`,
                folder: "user-resumes",
                transformation: {
                    pre: "w-300,h-300,fo-face,z-0.75" + (removeBackground === 'true' || removeBackground === true ? ",e-bgremove" : "")
                }
            });

            if (!updateFields.personal_info) updateFields.personal_info = {};
            updateFields.personal_info.image = response.url;
        }

        const resume = await Resume.findOneAndUpdate({ _id: resumeId, userId: req.userId }, updateFields, { new: true });

        // send response
        return res.status(200).json(resume);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


// @desc    Delete a resume
// @route   DELETE /api/resumes/:id
// @access  Private
export const deleteResume = async (req, res) => {
    try {
        // delete resume
        const deletedResume = await Resume.findOneAndDelete({ _id: req.params.resumeId, userId: req.userId });

        // send response
        return res.status(200).json(deletedResume);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// @desc    Get a resume
// @route   GET /api/resumes/get
// @access  Private
export const getResume = async (req, res) => {
    try {
        // get resume from database
        const resume = await Resume.findOne({ _id: req.params.resumeId, userId: req.userId });

        // check if resume exists
        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        // remove unnecessary fields
        resume.__v = undefined;
        resume.createdAt = undefined;
        resume.updatedAt = undefined;

        // send response
        return res.status(200).json(resume);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// @desc    Get a resume
// @route   GET /api/resumes/public
// @access  Public
export const getPublicResume = async (req, res) => {
    try {
        // get resume from database
        const resume = await Resume.findById({ public: true, _id: req.params.resumeId });

        // check if resume exists
        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        // send response
        return res.status(200).json(resume);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
