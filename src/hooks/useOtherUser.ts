import { FullConversationType } from "@app/conversations/types/conversation.types";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

function useOtherUser(conversation: FullConversationType | {
  users: User[];
}) {
  const session = useSession();

  const otherUsers = useMemo(() => {
    const currentEmail = session.data?.user?.email;

    const otherUserList = conversation.users.filter((user) => user.email !== currentEmail);

    return otherUserList[0];
  }, [session.data?.user?.email, conversation.users]);

  return otherUsers;
}

export default useOtherUser;