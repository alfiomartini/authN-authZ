import { Role } from "../types";

type Permissions = {
  [key in Role]: string[];
};

export const permissions: Permissions = {
  Admin: ["create", "read", "update", "delete"],
  User: ["read"],
  Guest: ["read"],
};

export function hasPermission(role: Role, action: string): boolean {
  return permissions[role]?.includes(action) ?? false;
}
