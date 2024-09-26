import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { pusherServer } from "@libs/pusher";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  try {
    const session = await getServerSession(request, response, authOptions);

    if (!session?.user?.email) {
      return response.status(401).json({ message: "Unauthorized" });
    }

    const { socket_id: socketId, channel_name: channel } = request.body;

    if (!socketId || !channel) {
      return response.status(400).json({ message: "Bad request, missing socket_id or channel_name" });
    }

    const data = { user_id: session.user.email };
    const authResponse = pusherServer.authorizeChannel(socketId, channel, data);

    return response.status(200).json(authResponse); // Ensure this returns the response
  } catch (error) {
    console.error("Error in Pusher auth handler:", error);
    return response.status(500).json({ message: "Internal Server Error" });
  }
}
