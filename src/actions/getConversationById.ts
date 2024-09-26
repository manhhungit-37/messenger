import { prisma } from "@libs/prismadb";
import getCurrentUser from "./getCurrentUser";

async function getConversationById(conversationId: string) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email) return null;

    const conversation = prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true
      }
    });

    return conversation;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default getConversationById;