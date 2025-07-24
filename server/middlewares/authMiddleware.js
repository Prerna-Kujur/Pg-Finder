const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables from .env file

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]?.slice(7);

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token" });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized Token" });
        }

        req.userId = decoded.userId;
        next();
    });
};

module.exports = verifyToken;