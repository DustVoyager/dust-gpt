import { message } from "../../../db/schema";
import { Empty } from "./Empty";
import { Message } from "./Message";

const MESSAGE_DUMMY = [
  { id: "1", content: "dummy data1", role: "user" },
  { id: "2", content: "dummy data2", role: "assistant" },
];

export function Chat() {
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
    </div>
  );
}
