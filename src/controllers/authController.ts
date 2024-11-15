import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { users, User } from "../models/user";
import { Role } from "../types";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
  console.error("Missing JWT_SECRET env variable");
  throw new Error("Missing JWT_SECRET env variable. Set it in your .env file");
}

interface SignUpBody {
  username: string;
  password: string;
  role?: Role;
}

interface SignInBody {
  username: string;
  password: string;
}

export async function signup(
  req: Request<{}, {}, SignUpBody, {}>,
  res: Response
): Promise<any> {
  try {
    let { username, password, role } = req.body as SignUpBody;
    if (!username || !password) {
      return res.status(400).send("Missing username, password ");
    }
    if (!role) {
      role = "Guest";
    }
    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
      return res.status(400).send("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = {
      id: (users.length + 1).toString(),
      username,
      password: hashedPassword,
      role,
    };
    users.push(newUser);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).send("An error occurred in signup. Please try again.");
  }
}

export async function signin(
  req: Request<{}, {}, SignInBody, {}>,
  res: Response
): Promise<any> {
  try {
    const { username, password } = req.body as SignInBody;
    if (!username || !password) {
      return res.status(400).send("Missing username or password");
    }
    const user = users.find((user) => user.username === username);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send("Invalid password");
    }

    // generate JWT with the user's roles
    const token = jwt.sign({ username, role: user.role }, JWT_SECRET, {
      expiresIn: "24h",
    });
    console.log(`token for signin in  user ${username}: `, token);
    return res.status(200).send({ token });
  } catch (error) {
    console.error("Error signing in:", error);
    return res
      .status(500)
      .send("An error occurred in signin. Please try again.");
  }
}
