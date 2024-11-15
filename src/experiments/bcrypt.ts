import bcrypt from "bcryptjs";
import { hash } from "crypto";

async function hashPasswords(): Promise<void> {
  const hashedAdminPassword = await bcrypt.hash("adminpass", 10);
  const hashedUserPassword = await bcrypt.hash("userpass", 10);
  const hashedGuestPassword = await bcrypt.hash("guestpass", 10);

  console.log("hashedAdminPassword:", hashedAdminPassword);
  console.log("hashedUserPassword:", hashedUserPassword);
  console.log("hashedGuestPassword:", hashedGuestPassword);
}

hashPasswords();
// Output:
