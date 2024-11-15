import { Request, Response } from "express";

export const getData = (req: Request, res: Response) => {
  res.send("Data retrieval successful");
};

export const createData = (req: Request, res: Response) => {
  res.send("Data creation successful");
};
