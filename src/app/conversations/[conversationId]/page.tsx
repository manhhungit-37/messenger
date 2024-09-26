import getConversationById from "@actions/getConversationById";
import getMessages from "@actions/getMessages";
import EmptyState from "@app/users/components/EmptyState";
import ConversationHeader from "./components/ConversationHeader";
import ConversationBody from "./components/ConversationBody";
import ConversationForm from "./components/ConversationForm";

interface Props {
  params: {
    conversationId: string;
  }
}

async function Conversation({ params }: Props) {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    )
  }

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <ConversationHeader conversation={conversation} />
        <ConversationBody messages={messages} />
        <ConversationForm />
      </div>
    </div>
  );
}

export default Conversation;