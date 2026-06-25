import { Request, Response } from "express";
import { sessionService } from "../services/sessionService.js";

export const getSessions = async (req: Request, res: Response) => {
  try {
    const { from, to } = req.query;
    console.log("sessions filter trigger", { from, to });
    const sessions = await sessionService.getAll({
      from: typeof from === "string" ? from : undefined,
      to: typeof to === "string" ? to : undefined,
    });

    res.status(200).json(sessions);
  } catch (err) {
    console.error(err);
    const message =
      err instanceof Error ? err.message : "Failed to fetch sessions";
    res.status(400).json({ error: message });
  }
};

export const createSession = async (req: Request, res: Response) => {
  try {
    const session = await sessionService.create(req.body);
    res.status(201).json(session);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to create session" });
  }
};
