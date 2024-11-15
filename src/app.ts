import express, { Request, Response } from "express";
import { signin, signup } from "./controllers/authController";
import { requireAuth, checkRole } from "./middleware/auth";
import { authorize } from "./middleware/rbacMiddleware";
import { createData, getData } from "./controllers/dataController";
import { users } from "./models/user";

const app = express();

app.use(express.json());

// Sihnup route (public)
app.post("/signup", signup);

// Signin route (public)
app.post("/signin", signin);

//Protected routes
// The check role middleware only check if the cuurent user has the required role
// It does not check if the user has the required permissions

// The authorize middleware checks if the user has the required permissions

app.get("/protected", requireAuth, (req, res) => {
  res.send("Protected route");
});

app.post(
  "/admin",
  requireAuth,
  checkRole("Admin"),
  (req: Request, res: Response) => {
    res.send("Admin route");
  }
);

app.get("/users", requireAuth, checkRole("Admin"), (req, res) => {
  res.send(users);
});

app.get("/user", requireAuth, checkRole("User"), (req, res) => {
  res.send("User route");
});

app.get("/data", requireAuth, authorize("read"), getData);
app.post("/data", requireAuth, authorize("write"), createData);

export default app;
