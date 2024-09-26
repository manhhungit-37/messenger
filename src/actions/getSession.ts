import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

async function getSession() {
  return await getServerSession(authOptions);
}

export default getSession;