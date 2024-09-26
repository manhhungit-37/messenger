'use client';

import { FullMessageType } from "@app/conversations/types/conversation.types";
import useConversation from "@hooks/useConversation";
import { useEffect, useRef, useState } from "react";
import MessageBox from "../../../components/MessageBox";
import axios from "axios";
import { pusherClient } from "@libs/pusher";
import { find } from "lodash";

interface Props {
  messages: FullMessageType[];
}

function ConversationBody({
  messages,
}: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messageList, setMessageList] = useState(messages);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId as string);
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessageList((current) => {
        if (find(current, { id: message.id })) return current;

        return [...current, message];
      });

      bottomRef?.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessageList((current) => current.map((currentMessage) => {
        if (currentMessage.id === newMessage.id) {
          return newMessage;
        }

        return currentMessage;
      }));
    }

    pusherClient.bind('messages:new', messageHandler);
    pusherClient.bind('message:update', updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId as string);
      pusherClient.unbind('messages:new', messageHandler);
      pusherClient.unbind('message:update', updateMessageHandler);
    }
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messageList.map((message, i) => (
        <MessageBox
          isLast={i === messageList.length-1}
          key={message.id}
          data={message}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  );
}

export default ConversationBody;