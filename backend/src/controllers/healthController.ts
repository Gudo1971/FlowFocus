import { Request, Response } from "express";
import { healthService } from "../services/healthService.js";

export const healthController = (_req: Request, res: Response) => {
  const status = healthService();
  res.json(status);
};
