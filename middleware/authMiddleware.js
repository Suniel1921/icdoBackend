const JWT = require("jsonwebtoken");
const authModel = require("../model/authModel");



//*********************PROTECT ROUTES USING TOKEN *******************
// requireLogin middleware
exports.requireLogin = async (req, res, next) => {
    // Get the token from the request headers
    const token = req.header('Authorization');

    // Check if the token is present
    if (!token) {
        return res.status(401).send({ success: false, message: "Unauthorized: Missing token" });
    }

    try {
        const decoded = JWT.verify(token.replace("Bearer ", ""), process.env.SECRET_KEY);
        // Attach the user information to the request object for further use
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Error decoding token:", error);
        return res.status(401).send({ success: false, message: "Unauthorized: Invalid token!" });
    }
};



// *********************ISADMIN*******************************
// isAdmin middleware
exports.isAdmin = async (req, res, next) => {
    try {
        const user = await authModel.findById(req.user._id);
        if (!user || user.role !== 1) {
            return res.status(403).json({ success: false, message: "You do not have permission to access this resource." });
        }
        next();
    } catch (error) {
        console.error("Error in isAdmin middleware:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};





