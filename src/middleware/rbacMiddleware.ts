import { Request, Response, NextFunction } from "express";
import { hasPermission } from "../config/authConfig";
import { Role } from "../types";
import { AuthenticatedRequest } from "../types";

export function authorize(action: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const authRequest = req as unknown as AuthenticatedRequest;

    // Ensure that req.user.role is checked for the action
    if (!authRequest.user || !hasPermission(authRequest.user.role, action)) {
      res.status(403).send("You do not have the required permissions");
      return;
    }

    next();
  };
}
