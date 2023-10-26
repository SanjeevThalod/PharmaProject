import User from "../Models/userModel.mjs";
import { generateToken, verifyToken } from '../Config/jwt.mjs';
import bcrypt from 'bcryptjs';

// Create a user
const createUser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        if (!name || !email || !password || !phone) {
            res.status(404).json({ success: false, message: 'Enter all details' });
        }
        const findEmail = await User.findOne({ email });
        if (findEmail) {
            return res.status(409).json({ success: false, message: 'Email Already in Use' });
        }
        const hash = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            name,
            email,
            password: hash,
            phone
        });
        const token = await generateToken({ userId: newUser._id }, 604800);
        return res.status(201).json({ success: true, token });
    } catch (error) {
        return res.status(500).json({ error: 'Error creating user' });
    }
};

// Log in a user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(404).json({ success: 'false', message: 'All fields are required' });
        }
        const findUser = await User.findOne({ email });
        if (!findUser) {
            return res.status(404).json({ success: false, message: 'Email not registered' });
        }
        const compare = await bcrypt.compare(password, findUser.password);
        if (!compare) {
            return res.status(401).json({ success: false, message: 'Wrong password' });
        }
        const token = await generateToken({ userId: findUser._id }, 604800);

        return res.status(200).json({ success: true, message: 'LoggedIn', token });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get all users
const getUsers = async (req, res) => {
    try {
        const allUsers = await User.find({});
        return res.status(200).json({ success: true, allUsers });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};

// Get a user by ID
const getUserId = async (req, res) => {
    try {
        const { userId } = req.user;
        const user = await User.findById(userId).select("-password");
        return res.status(200).json({ success: true, user });
    } catch (error) {
        return res.status(500).json({ success: false, error });
    }
};

// Export the controller functions
export { createUser, loginUser, getUsers, getUserId };