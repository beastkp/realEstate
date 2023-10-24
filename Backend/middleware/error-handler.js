const error = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal SErver error";
  return res.status(statusCode).json({ success: false, statusCode, message });
};

export default error;