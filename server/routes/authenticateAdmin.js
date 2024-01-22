import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
// Middleware function to check if the user is authenticated
const authenticateAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        // Check if the token exists
        if (!token) {
            return res
                .status(401)
                .json({ message: "Access denied. Token missing." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded user information to the request object
        req.user = decoded;
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res
                .status(403)
                .json({ message: "Access denied. User not available." });
        }

        if (!user.isAdmin) {
            return res
                .status(403)
                .json({ message: "Access denied. User not admin." });
        }

        next();
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(400).json({ message: "There was an error", error });
    }
};
export default authenticateAdmin;
