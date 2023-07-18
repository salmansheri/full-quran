import prisma from "@/lib/prismaDB";
import { SignupSchema } from "@/lib/validators/sign-up-schema";
import bcrypt from "bcrypt";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, name, password, imageUrl } = SignupSchema.parse(body);

    if (!email) {
      return new Response("Email is Required", { status: 400 });
    }

    if (!name) {
      return new Response("Name is Required", { status: 400 });
    }

    if (!password) {
      return new Response("Password is Required", { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword,
        name,
        imageUrl,
      },
    });

    return new Response(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return new Response("Not Allowed", {
        status: 422,
      });
    }
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
