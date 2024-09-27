import { Request, Response } from "express";

export const example_controller = (req: Request, res: Response) => {
  // res.send("Hello World! This is an example controller.");
  res.status(200).json({ test: "Hello World! This is an example controller." });
};
