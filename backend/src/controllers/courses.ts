import { Request, Response } from "express";

export const getCourseController = (req: Request, res: Response) => {
  const programName = req.params.programName;
  const courseCode = req.params.courseCode;
  res.send("Hello World! This is a course controller.");
};
