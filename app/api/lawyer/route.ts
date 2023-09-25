import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { description, instructions, seed, categoryId,name } = await req.json();
    const user = await currentUser();
    console.log(user,req.json());
    // TODO -> Check for admin role

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!description || !instructions || !seed || !categoryId||!name) {
      return new NextResponse("Missing required fields", { status: 400 });
    }
    const lawyer = await prismadb.lawyer.create({
      data: {
        categoryId,
        name,
        userId: user.id,
        userName: user.firstName,
        description,
        instructions,
        seed,
      },
    });
    return NextResponse.json(lawyer)
  } catch (error) {
    console.log("error in api/lawyer:post", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

