'use client';

import { FullMessageType } from "@app/conversations/types/conversation.types";
import Avatar from "@components/Avatar";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import ImageModal from "../ImageModal";

interface Props {
  data: FullMessageType;
  isLast?: boolean;
}

function MessageBox({
  data,
  isLast,
}: Props) {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);
  
  const isOwn = session.data?.user?.email === data.sender.email;
  const seenListStr = useMemo(() => {
    return (data.seen || [])
    .filter((user) => user.email !== data.sender.email)
    .map((user) => user.name)
    .join(', ');
  }, [data.seen, data.sender.email]);

  const container = clsx("flex gap-3 p-4", isOwn && "justify-end");
  const avatar = clsx(isOwn && "order-2");
  const body = clsx("flex flex-col gap-2", isOwn && "items-end");
  const message = clsx("text-sm w-fit overflow-hidden", isOwn ? "bg-sky-500 text-white" : "bg-gray-100", data.image ? "rounded-md p-0" : "rounded-full py-2 px-3")

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">
            {data.sender.name}
          </div>
          <div className="text-xs text-gray-400">
            {format(new Date(data.createdAt), 'p')}
          </div>
        </div>
        <div className={message}>
          <ImageModal
            src={data.image ?? ''}
            isOpen={imageModalOpen}
            onClose={() => setImageModalOpen(false)}
          />
          {data.image ? (
            <Image
              onClick={() => setImageModalOpen(true)}
              alt="Image"
              width={288}
              height={288}
              src={data.image}
              className="object-cover cursor-pointer hover:scale-110 transition translate"
            />
          ) : (
            <div>{data.body}</div>
          )}
        </div>
        {isLast && isOwn && seenListStr.length > 0 && (
          <div className="text-xs font-light text-gray-500">
            {`Seen by ${seenListStr}`}
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageBox;