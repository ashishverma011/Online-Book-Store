import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const signToken = (user) =>
    jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const signup = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        if (await User.findOne({ email }))
            return res.status(400).json({ message: "User already exists" });

        const hashPassword = await bcryptjs.hash(password, 10);
        const createdUser = await new User({ fullname, email, password: hashPassword, role: "user" }).save();
        const token = signToken(createdUser);

        res.status(201).json({
            message: "User created successfully",
            token,
            user: { _id: createdUser._id, fullname: createdUser.fullname, email: createdUser.email, role: createdUser.role },
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcryptjs.compare(password, user.password)))
            return res.status(400).json({ message: "Invalid email or password" });

        const token = signToken(user);
        res.status(200).json({
            message: "Login successful",
            token,
            user: { _id: user._id, fullname: user.fullname, email: user.email, role: user.role },
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
