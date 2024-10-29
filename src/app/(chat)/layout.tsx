import Header from "@/src/components/chat/Header";
import Sidebar from "@/src/components/chat/Sidebar";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="md:flex h-full">
      {/* 사이드바 영역 */}
      <div className="hidden md:block w-[300px]">
        <Sidebar />
      </div>

      {/* Header + Chat 영역 */}
      <div className="flex flex-col flex-1 h-full overflow-y-auto">
        <Header />
        {children}
      </div>
    </div>
  );
}
