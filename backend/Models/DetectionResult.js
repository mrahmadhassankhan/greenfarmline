const mongoose = require('mongoose');

const detectionResultSchema = new mongoose.Schema({
    farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Farmer', required: true },
    imageUrl: { type: String, required: true },
    disease: { type: String, required: true },
    confidence: { type: Number, required: true },
    recommendations: { type: [String], required: true },
    detectedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('DetectionResult', detectionResultSchema);
