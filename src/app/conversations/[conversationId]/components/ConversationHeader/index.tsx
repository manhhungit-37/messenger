'use client';

import Avatar from "@components/Avatar";
import useOtherUser from "@hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import ProfileDrawer from "../ProfileDrawer";
import AvatarGroup from "@components/AvatarGroup";
import useActiveList from "@hooks/useActiveList";

interface Props {
  conversation: Conversation & {
    users: User[];
  }
}

function ConversationHeader({
  conversation,
}: Props) {
  const otherUser = useOtherUser(conversation);
  const [drawOpen, setDrawOpen] = useState(false);
  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email ?? '') !== -1;

  const statusText = useMemo(() => {
    if (conversation.isGroup) return `${conversation.users.length} members`;
    return isActive ? 'Active' : 'Offline';
  }, [conversation, isActive]);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawOpen}
        onClose={() => setDrawOpen(false)}
      />
      <div className="bg-white w-full flex border-b sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
        <div className="flex gap-3 items-center">
          <Link className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer" href="/conversations">
            <HiChevronLeft size={32} />
          </Link>
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}
          <div className="flex flex-col">
            <div>
              {conversation.name || otherUser.name} 
            </div>
            <div className="text-sm font-light text-neutral-500">
              {statusText}
            </div>
          </div>
        </div>
        <HiEllipsisHorizontal
          size={32}
          className="text-sky-500 cursor-pointer hover:text-sky-600 transition"
          onClick={() => setDrawOpen(true)}
        />
      </div>
    </>
  );
}

export default ConversationHeader;