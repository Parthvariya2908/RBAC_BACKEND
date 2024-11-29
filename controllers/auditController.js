const AuditLog = require('../models/auditModel');

const recordAuditLog = async (userId, action) => {
    try {
        await AuditLog.create({ userId, action });
    } catch (error) {
        console.error('Failed to record audit log:', error.message);
    }
};

module.exports = { recordAuditLog };
