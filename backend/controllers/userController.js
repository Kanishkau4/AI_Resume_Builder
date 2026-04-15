import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "4d" });
}

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = async (req, res) => {
    try {
        // get data from request body
        const { name, email, password } = req.body;

        // check if all fields are filled
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // generate token
        const token = generateToken(newUser._id);
        newUser.password = undefined;

        // send response
        return res.status(201).json({ success: true, data: newUser, token, message: "User registered successfully" });

    } catch (error) {

        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// @desc    Auth user / login
// @route   POST /api/users/login
// @access  Public
export const authUser = async (req, res) => {
    try {
        // get data from request body
        const { email, password } = req.body;

        // check if all fields are filled
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // check if password is correct
        const isPasswordCorrect = await user.matchPassword(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // generate token
        const token = generateToken(user._id);
        user.password = undefined;

        // send response
        return res.status(200).json({ success: true, data: user, token, message: "User logged in successfully" });

    } catch (error) {

        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// @desc    Get user data
// @route   GET /api/users/data
// @access  Private
export const getUserData = async (req, res) => {
    try {
        // get user from database
        const user = await User.findById(req.userId);

        // check if user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // remove password from response
        user.password = undefined;

        // send response
        return res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// @desc    Get user resumes
// @route   GET /api/users/resumes
// @access  Private
export const getUserResumes = async (req, res) => {
    try {
        // get resumes from database
        const resumes = await Resume.find({ userId: req.userId });

        // check if resumes exists
        if (!resumes) {
            return res.status(404).json({ message: "No resumes found" });
        }

        // send response
        return res.status(200).json(resumes);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


