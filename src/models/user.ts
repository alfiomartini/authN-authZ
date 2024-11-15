import { Role } from "../types";

export interface User {
  id: string;
  username: string;
  password: string;
  role: Role;
}

// Simulating a user database with mock users

/* export const users: User[] = [
    {
      id: "1",
      username: "admin",
      password: "$2a$10$GLnJQ5zzLyx5ibgtjSHRruPUh9NJTTMDUnPPhSvfojPYO4EtgXhOq", //hashed adminpass
      role: "Admin",
    },
    {
      id: "2",
      username: "user",
      password: "$2a$10$cLR20/UMVJ622V3QC/qpce0FIpU3PMuq7u4c/oRoqN6n9gSfbXe/S", //hashed userpass
      role: "User",
    },
    {
      id: "3",
      username: "guest",
      password: "2a$10$PXQHzRkD.TG3aT1VRTSkpO4KxkSnzexhWUSEPxNhppGV5C4p958o6", //hashed guestpass
      role: "Guest",
    },
  ]; */

export const users: User[] = [];
