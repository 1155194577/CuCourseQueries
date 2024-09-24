import { Request, Response, NextFunction } from 'express';

const corsMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allow specific methods

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.sendStatus(204); // No content for preflight
    return;
  }

  next(); // Proceed to the next middleware or route handler
};

export default corsMiddleware;
