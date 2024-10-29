import { getMessagesByConversation } from "@/data/conversations";
import { Chat } from "@/src/components/chat/Chat";

type Params = Promise<{ conversationId: string }>;

export default async function ConversationPage({ params }: { params: Params }) {
  const { conversationId } = await params;
  const messages = await getMessagesByConversation(conversationId);
  return <Chat initialMessages={messages} />;
}
