"use client";

import { useState } from "react";
import { AutoResizingTextArea } from "./AutoResizingTextArea";
import { Empty } from "./Empty";
import { Message } from "./Message";
import { Button } from "../ui/button";
import { ArrowUp } from "lucide-react";

const MESSAGE_DUMMY = [
  { id: "1", content: "dummy data1", role: "user" },
  { id: "2", content: "dummy data2", role: "assistant" },
];

export function Chat() {
  const [value, setValue] = useState("");

  return (
    <div className="flex flex-col w-[80%] h-full mx-auto">
      {/* 채팅 영역 */}
      <div className="flex-1">
        {MESSAGE_DUMMY.length === 0 ? (
          <Empty />
        ) : (
          <>
            {MESSAGE_DUMMY.map((message) => (
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
      <div className="pb-5">
        <form className="flex items-center justify-center gap-4">
          <AutoResizingTextArea
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button type="submit" size="icon">
            <ArrowUp />
          </Button>
        </form>
      </div>
    </div>
  );
}
