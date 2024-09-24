import { Request, Response } from 'express';

export const example_controller = (req: Request, res: Response) => {
  res.send("Hello World! This is an example controller.");
};
