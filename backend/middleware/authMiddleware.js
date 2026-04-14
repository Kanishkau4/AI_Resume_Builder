import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
    try {
        // get token from header
        const token = req.headers.authorization.split(" ")[1];

        // check if token exists
        if (!token) {
            return res.status(401).json({ message: "Not authorized, no token" });
        }

        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Not authorized, token failed" });
    }
}

export default protect;
