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

const UploadingFileMiddleware = (req, res, next) => {
  upload.single("document")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res
        .status(500)
        .json({ message: "Image or document upload error user" });
    } else if (err) {
      console.error(err);
      return res.status(500).json({ message: "Unknown error" });
    }
    next();
  });
};
module.exports = {
  UploadingFileMiddleware,
  multer,
};
