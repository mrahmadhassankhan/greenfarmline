const Log = require("../Models/LogModel");

const loggerMiddleware = async (req, res, next) => {
  const startTime = Date.now();
  const { method, url, headers, body, ip } = req;

  res.on("finish", async () => {
    try {
      const responseTime = Date.now() - startTime;
      const log = new Log({
        level: res.statusCode >= 400 ? "error" : "info",
        message: `Request to ${method} ${url}`,
        method,
        url,
        statusCode: res.statusCode,
        ip: req.ip,
        headers,
        requestBody: body,
        responseBody: res.locals.responseData || null,
        user: req.user ? req.user._id : null,
        userAgent: headers["user-agent"],
        responseTime,
      });

      await log.save();
    } catch (error) {
      console.error("Error saving log:", error);
    }
  });

  next();
};

module.exports = loggerMiddleware;
