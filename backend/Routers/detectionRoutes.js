const express = require("express");
const router = express.Router();
const DetectionResult = require("../Models/DetectionResult");
const User = require("../Models/user");

// Save detection result (Only for Farmers)
router.post("/save", async (req, res) => {
  try {
    const { user, disease, confidence, recommendations, imageUrl } = req.body;
    const userExists = await User.findOne({ email: user.email });
    const userId = userExists._id;

    // Check if the user is a farmer
    if (user.role !== "farmer") {
      return res
        .status(403)
        .json({ message: "Only farmers can save detection results." });
    }

    // Save result to database
    const newDetection = new DetectionResult({
      farmerId: userId,
      imageUrl,
      disease,
      confidence,
      recommendations,
    });

    await newDetection.save();
    res.status(201).json({ message: "Detection result saved successfully!" });
  } catch (error) {
    console.error("Error saving detection result:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get detection history for a specific farmer
router.get("/history/:farmerEmail", async (req, res) => {
  try {
    const { farmerEmail } = req.params;

    const userExists = await User.findOne({ email: farmerEmail });
    const farmerId = userExists._id;

    // Find detection results for the farmer
    const history = await DetectionResult.find({ farmerId });

    if (!history.length) {
      return res.status(200).json({ message: "No detection history found." });
    }

    res.status(200).json(history);
  } catch (error) {
    console.error("Error fetching detection history:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
