'use client';

import { FullConversationType } from "@app/conversations/types/conversation.types";
import Avatar from "@components/Avatar";
import AvatarGroup from "@components/AvatarGroup";
import useOtherUser from "@hooks/useOtherUser";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

interface Props {
  data: FullConversationType;
  selected?: boolean;
}

function ConversationBox({
  data,
  selected,
}: Props) {
  const otherUsers = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];
    
    return messages[messages.length-1];
  }, [data.messages]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) return false;

    const seenArray = lastMessage.seen || [];

    if (!session.data?.user?.email) return false;

    return seenArray.filter((user) => user.email === session.data.user!.email).length !== 0;
  }, [session.data?.user, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) return 'Sent an image';
    if (lastMessage?.body) return lastMessage.body;
    return 'Started a conversation';
  }, [lastMessage]);
  
  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  return (
    <div className={clsx("w-full relative flex items-center space-x-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer p-3", selected ? "bg-neutral-100" : "bg-white")} onClick={handleClick}>
      {data.isGroup ? (
        <AvatarGroup users={data.users} />
      ) : (
        <Avatar user={otherUsers} />
      )}
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-md font-medium text-gray-900">
              {data?.name || otherUsers?.name || ''}
            </p>
            {lastMessage?.createdAt && (
              <p className="text-xs text-gray-400 font-light">
                {format(new Date(lastMessage.createdAt), 'p')}
              </p>
            )}
          </div>
          <div className={clsx("truncate text-sm", hasSeen ? "text-gray-500" : "text-black font-medium")}>
            {lastMessageText}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConversationBox;