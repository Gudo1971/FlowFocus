// ---------------------------------------------
// Session Controller
// Handles fetching and creating focus sessions
// ---------------------------------------------

import { Request, Response } from "express";
import { sessionService } from "../services/sessionService.js";

// ---------------------------------------------
// GET /sessions
// Supports optional date filtering via ?from= & ?to=
// ---------------------------------------------
export const getSessions = async (req: Request, res: Response) => {
  try {
    const { from, to } = req.query;

    // Normalize query parameters to strings or undefined
    const filters = {
      from: typeof from === "string" ? from : undefined,
      to: typeof to === "string" ? to : undefined,
    };

    const sessions = await sessionService.getAll(filters);

    res.status(200).json(sessions);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to fetch sessions";
    res.status(400).json({ error: message });
  }
};

// ---------------------------------------------
// POST /sessions
// Creates a new focus session
// ---------------------------------------------
export const createSession = async (req: Request, res: Response) => {
  try {
    const session = await sessionService.create(req.body);
    res.status(201).json(session);
  } catch (err) {
    res.status(400).json({ error: "Failed to create session" });
  }
};
