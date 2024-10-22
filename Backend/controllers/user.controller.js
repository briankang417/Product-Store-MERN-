import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

//function to register a new user
export const registerUser = async (req, res) => {
    const { username, email, password } = req.body; // User will send this data

    //check if all required fields are provided
    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    try {
        //check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        //hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        //create new user instance to register
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        //store user in the database
        const savedUser = await newUser.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            userId: savedUser._id,
        });
    } catch (error) {
        console.error("Error in Register User: ", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};