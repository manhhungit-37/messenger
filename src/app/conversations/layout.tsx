import Sidebar from "@components/Sidebar";
import ConversationList from "./components/ConversationList";
import getCurrentUser from "@actions/getCurrentUser";
import getConversations from "@actions/getConversations";
import { ReactNode } from "react";
import getUsers from "@actions/getUsers";

async function ConversationsLayout({
  children
}: { children: ReactNode }) {
  const user = await getCurrentUser();
  const conversations = await getConversations();
  const users = await getUsers();

  if (!user) return null;

  return (
    <Sidebar user={user}>
      <div className="h-full">
        <ConversationList
          users={users}
          conversations={conversations}
        />
        {children}
      </div>
    </Sidebar>
  );
}

export default ConversationsLayout;