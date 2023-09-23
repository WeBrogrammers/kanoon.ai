import prismadb from "@/lib/prismadb";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { lawyerId: string } }
) {
  try {
    const { description, instructions,name, seed, categoryId } = await req.json();
    const user = await currentUser();
    console.log(user, req.json());
    if (!params.lawyerId) {
      return new NextResponse("Lawyer ID required", { status: 400 });
    }
    // TODO -> Check for admin role
    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!description || !instructions || !seed || !categoryId ||!name) {
      return new NextResponse("Missing required fields", { status: 400 });
    }
    const lawyer = await prismadb.lawyer.update({
      where: { id: params.lawyerId },
      data: {  
        categoryId,
        name,
        userId: user.id,
        userName: user.firstName,
        description,
        instructions,
        seed, },
    });
    return NextResponse.json(lawyer);
  } catch (error) {
    console.log("error in api/lawyer:patch", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}


export async function DELETE( req: Request,
  { params }: { params: { lawyerId: string } }){
  try {
    const {userId} = auth()
    if(!userId){
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const lawyer = await prismadb.lawyer.delete({
      where:{
        id:params.lawyerId
      }
    })
    return NextResponse.json(lawyer);
  } catch (error) {
    console.log("error in api/lawyer:delete",error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}