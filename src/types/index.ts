export type Role = "Admin" | "User" | "Guest";

export const RoleHiearchy: Role[] = ["Guest", "User", "Admin"];

export interface AuthenticatedRequest extends Request {
  headers: Headers & {
    authorization?: string;
  };
  user: {
    username: string;
    role: Role;
  };
}
