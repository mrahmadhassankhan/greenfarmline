const express = require("express");
const authMiddleware = require("../middlewares/auth");
const roleMiddleware = require("../middlewares/role");
const router = express.Router();

router.use(authMiddleware);
// Store the time when the server started
const serverStartTime = Date.now();

// Function to format uptime
const formatUptime = (milliseconds) => {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);

  seconds %= 60;
  minutes %= 60;
  hours %= 24;

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

// Route to get system uptime
router.get("/", roleMiddleware(["admin"]), (req, res) => {
  const uptime = Date.now() - serverStartTime;
  res.json({ uptime: formatUptime(uptime) });
});

module.exports = router;
