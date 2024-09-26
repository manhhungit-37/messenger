import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

async function getSession() {
  return await getServerSession(authOptions);
}

export default getSession;