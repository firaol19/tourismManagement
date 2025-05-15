import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password, name, phone, image, role } = await req.json();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
    }

    // Hash password if provided (optional password field)
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    // Create new user (no need to assign to a variable)
    await prisma.user.create({
      data: { 
        email, 
        name, 
        phone, 
        role, // Default role
        password: hashedPassword, 
        image 
      },
    });

    return new Response(JSON.stringify({ message: "User registered successfully!" }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Something went wrong: " + error }), { status: 500 });
  }
}
