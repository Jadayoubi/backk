// middleware/adminAuth.js

const adminAuthMiddleware = (req, res, next) => {
    // Check if user is authenticated and is an admin
    if (req.isAuthenticated() && req.user.isAdmin) {
        return next(); // User is authenticated as admin, proceed to next middleware/route handler
    } else {
        return res.status(403).json({ message: 'Unauthorized access' });
    }
};

module.exports = adminAuthMiddleware;
