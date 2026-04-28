import multer from "multer";

export const errorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      error: err.code === "LIMIT_FILE_SIZE"
        ? "File too large (max 5MB)"
        : err.message,
    });
  }

  if (err) {
    return res.status(400).json({
      error: err.message || "Something went wrong",
    });
  }

  next();
};