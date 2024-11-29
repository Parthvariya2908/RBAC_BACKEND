
const Content = require('../models/contentModel');

const seedContent = async () => {
    try {
        const contents = [
            {
                title: "Admin Dashboard",
                description: "Detailed analytics and controls for administrators.",
                roleAccess: ["Admin"],
                data: { stats: { users: 500, revenue: 20000 } },
            },
            {
                title: "Moderator Panel",
                description: "Tools for managing posts and moderating comments.",
                roleAccess: ["Moderator", "Admin"],
                data: { tools: ["Delete Post", "Ban User"] },
            },
            {
                title: "User Home",
                description: "Personalized dashboard for users.",
                roleAccess: ["User", "Moderator", "Admin"],
                data: { welcomeMessage: "Welcome to your dashboard!" },
            },
        ];

        await Content.insertMany(contents);
        console.log("Content seeded successfully!");
    } catch (error) {
        console.error("Failed to seed content:", error.message);
    }
};

module.exports = seedContent;
