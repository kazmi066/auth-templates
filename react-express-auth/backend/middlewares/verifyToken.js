const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    console.log("Cookies From React", req.cookies);
    const token = req.cookies.access_token || null;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
        };
        next();
    })
}

module.exports = { verifyToken };