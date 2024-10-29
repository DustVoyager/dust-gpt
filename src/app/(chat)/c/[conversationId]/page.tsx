import { getMessagesByConversation } from "@/data/conversations";
import { Chat } from "@/src/components/chat/Chat";

type Props = {
  params: {
    conversationId: string;
  };
};

export default async function ConversationPage({
  params: { conversationId },
}: Props) {
  const messages = await getMessagesByConversation(conversationId);
  return <Chat initialMessages={messages} />;
}
