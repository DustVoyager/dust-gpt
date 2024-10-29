"use client";

import { useEffect, useRef } from "react";
import { useChat } from "ai/react";
import { AutoResizingTextArea } from "./AutoResizingTextArea";
import { Empty } from "./Empty";
import { Message } from "./Message";
import { Button } from "../ui/button";
import { ArrowUp } from "lucide-react";
import { useModelStore } from "../../../store/model";
import { useParams, useRouter } from "next/navigation";
import { addMessages, createConversation } from "../../../actions/conversation";
import { CHAT_ROUTES } from "../../../constants/routes";

export function Chat() {
  const router = useRouter();
  const params = useParams<{ conversationId: string }>();
  console.log(params);
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    onFinish: async (message) => {
      // param -> conversationId가 없으면 새로운 대화 페이지
      if (!params.conversationId) {
        // 1. create conversation
        const conversation = await createConversation(input);
        // 2. add message
        await addMessages(conversation.id, input, message.content);

        router.push(`${CHAT_ROUTES.CONVERSATIONS}/${conversation.id}`);
      } else {
        // param -> converstaionId가 있으면 기존 대화 페이지
        // 1. add message
      }
    },
  });
  const model = useModelStore((state) => state.model);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col w-[80%] h-full mx-auto">
      {/* 채팅 영역 */}
      <div className="flex-1">
        {messages.length === 0 ? (
          <Empty />
        ) : (
          <>
            {messages.map((message) => (
              <Message
                key={message.id}
                name={"user"}
                content={message.content}
                role={message.role}
              />
            ))}
          </>
        )}
      </div>

      {/* input 영역 */}
      <div className="pb-5 sticky bottom-0 bg-white">
        <form
          className="flex items-center justify-center gap-4"
          onSubmit={(e) => handleSubmit(e, { data: { model } })}
        >
          <AutoResizingTextArea value={input} onChange={handleInputChange} />
          <Button type="submit" size="icon">
            <ArrowUp />
          </Button>
        </form>
      </div>
      <div ref={scrollRef} />
    </div>
  );
}
