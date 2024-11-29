

const permissionCheck = (requiredPermissions) => {
    return async (req, res, next) => {
        const user = req.user; // Retrieved from authMiddleware
        const userPermissions = user.role.permissions;

        const hasPermission = requiredPermissions.every((perm) =>
            userPermissions.includes(perm)
        );

        if (!hasPermission) {
            return res.status(403).json({ message: "Access denied!" });
        }
        next();
    };
};

module.exports = { permissionCheck };
