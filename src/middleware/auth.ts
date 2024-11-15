import jwt from "jsonwebtoken";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { Role, AuthenticatedRequest, RoleHiearchy } from "../types";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  console.error("Missing JWT_SECRET env variable");
  throw new Error("Missing JWT_SECRET env variable. Set it in your .env file");
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = (req as unknown as AuthenticatedRequest).headers
    .authorization as string | undefined;
  const token = authHeader?.replace("Bearer ", "");
  if (!token) {
    res.status(401).send("Access denied. No token provided.");
    return;
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET) as {
      username: string;
      role: Role;
    };
    console.log("requireAuth -> payload", payload);
    if (!payload.username || !payload.role) {
      res.status(401).send("Access denied. Invalid token.");
      return;
    }
    // Attach the user to the request object for furhter middleware to use
    (req as unknown as AuthenticatedRequest).user = payload;
    next();
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(401).send("Access denied. Invalid token.");
    return;
  }
}

export function checkRole(requiredRole: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const authRequest = req as unknown as AuthenticatedRequest;
    const userRole = authRequest.user.role;

    // Get the index of the roles in the hierarchy array
    const requiredRoleIndex = RoleHiearchy.indexOf(requiredRole as Role);
    const userRoleIndex = RoleHiearchy.indexOf(userRole);

    if (userRoleIndex < requiredRoleIndex) {
      res.status(403).send("Access denied. You do not have the required role.");
      return;
    } else next();
  };
}
