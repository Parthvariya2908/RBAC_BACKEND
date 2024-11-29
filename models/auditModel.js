
const mongoose = require('mongoose');

const auditSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        action: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const AuditLog = mongoose.model('AuditLog', auditSchema);

module.exports = AuditLog;
