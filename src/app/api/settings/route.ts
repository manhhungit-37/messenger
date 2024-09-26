import getCurrentUser from "@actions/getCurrentUser";
import { prisma } from "@libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    const body = await request.json();
    const {
      name,
      image
    } = body;

    if (!currentUser?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const updateUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        image,
        name,
      }
    });

    return NextResponse.json(updateUser); 
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}