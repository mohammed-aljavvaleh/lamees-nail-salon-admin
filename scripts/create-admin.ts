import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env") });

import { PrismaClient } from "../app/generated/prisma/index.js";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash("123456", 12);
  await prisma.admin.create({
    data: { username: "lamees", passwordHash: hash },
  });
  console.log("Admin created!");
}

main().then(() => prisma.$disconnect());