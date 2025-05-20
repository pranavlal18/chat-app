import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        console.log("Cookies Received:", req.cookies); // Debugging

        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Not authenticated (No token found)" });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.SECRET_KEY);
        } catch (error) {
            console.error("JWT Verification Error:", error.message);
            return res.status(401).json({ message: "Invalid token" });
        }

        console.log("Decoded Token:", decoded); // Debugging

        if (!decoded || !decoded._id) {
            return res.status(401).json({ message: "Invalid token payload" });
        }

        const user = await User.findById(decoded._id).select("-password");
        console.log("User Found:", user); // Debugging

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user; // Attach user to request
        next(); // Proceed
    } 
    catch (error) {
        console.error("Authentication error:", error.message);
        return res.status(500).json({ message: "Server error" });
    }
};
