const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/Images");
  },
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

const categoryUploadMiddleware = (req, res, next) => {
  upload.single("categoryImage")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ message: "File upload error" });
    } else if (err) {
      console.error(err);
      return res.status(500).json({ message: "Unknown error" });
    }
    next();
  });
};

const productUploadMiddleware = (req, res, next) => {
  upload.single("productImage")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ message: "File upload error" });
    } else if (err) {
      console.error(err);
      return res.status(500).json({ message: "Unknown error" });
    }
    next();
  });
};

const buisnessLogouploadmiddleware = (req, res, next) => {
  upload.single("businessLogo")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ message: "Business Logo upload error" });
    } else if (err) {
      console.error("Unknown upload error:", err);
      return res.status(500).json({ message: "Unknown error" });
    }
    console.log("Uploaded file info:", req.file); // Log the uploaded file info
    next();
  });
};

const degreeuploadmiddleware = (req, res, next) => {
  upload.single("degree")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ message: "Degree Document upload error" });
    } else if (err) {
      console.error(err);
      return res.status(500).json({ message: "Unknown error" });
    }
    next();
  });
};

module.exports = {
  categoryUploadMiddleware,
  productUploadMiddleware,
  buisnessLogouploadmiddleware,
  degreeuploadmiddleware,
};
