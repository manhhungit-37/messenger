'use client';

import useConversation from "@hooks/useConversation";
import clsx from "clsx";

function Conversations() {
  const { isOpen } = useConversation();

  return (
    <div className={clsx("lg:pl-80 h-full lg:block", isOpen ? "block" : "hidden")}>
      
    </div>
);
}

export default Conversations;