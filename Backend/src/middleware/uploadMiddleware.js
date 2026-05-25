import multer from "multer";

const storage = multer.memoryStorage();
const maxFileSize = Number(process.env.MAX_FILE_SIZE || 52428800); // default 50MB

const upload = multer({
  storage,
  limits: { fileSize: maxFileSize },
  fileFilter(req, file, cb) {
    console.log("Hello0000000000",req, file);
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"), false);
    }
    cb(null, true);
  },
});

export default upload;
