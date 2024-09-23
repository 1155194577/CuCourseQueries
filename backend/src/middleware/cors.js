// src/middleware/corsMiddleware.js
const corsMiddleware = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allow specific methods

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(204); // No content for preflight
  }

  next(); // Proceed to the next middleware or route handler
};

export default corsMiddleware;
