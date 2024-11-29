const Content = require('../models/contentModel');

const getContentByRole = async (req, res) => {
    try {
        const userRole = req.user.role.name;

        const contents = await Content.find({ roleAccess: userRole });

        if (!contents || contents.length === 0) {
            return res.status(404).json({ message: "No content available for your role." });
        }

        return res.json({ contents });
    } catch (error) {
        console.error("Error fetching content:", error.message);
        res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = { getContentByRole };
