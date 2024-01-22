
import jwt from "jsonwebtoken";
// Middleware function to check if the user is authenticated
const authenticateToken = (req, res, next) => {
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
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(400).json({ message: "There was an error", error });
    }
};
export default authenticateToken;




