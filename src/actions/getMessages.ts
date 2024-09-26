import { prisma } from "@libs/prismadb";

async function getMessages(conversationId: string) {
  try {
    const messages = prisma.message.findMany({
      where: {
        conversationId,
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    return messages;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default getMessages;