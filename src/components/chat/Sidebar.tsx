import { BASE_URL, CHAT_ROUTES } from "../../../constants/routes";
import { Logo } from "./Logo";
import { MessageSquare, Plus } from "lucide-react";
import SidebarItem from "./SidebarItem";
import LogoutButton from "./LogoutButton";

const DUMMY_ITMES = [
  {
    id: "new",
    label: "새로운 대화",
    icon: <Plus />,
    href: BASE_URL,
  },
  {
    id: "1",
    label:
      "새로운 대화 긴 예시 입니다. 새로운 대화 긴 예시 입니다. 새로운 대화 긴 예시 입니다. 새로운 대화 긴 예시 입니다.",
    icon: <MessageSquare />,
    href: `${CHAT_ROUTES.CONVERSATIONS}/1`,
  },
  {
    id: "2",
    label: "일반 대화 예시입니다.",
    icon: <MessageSquare />,
    href: `${CHAT_ROUTES.CONVERSATIONS}/2`,
  },
];

export default function Sidebar() {
  return (
    <nav className="h-full p-3 bg-black flex flex-col text-white">
      {/* Logo + menu Item */}
      <div className="flex-1 overflow-y-auto">
        <Logo />
        <div className="flex flex-col gap-2 mt-10">
          {DUMMY_ITMES.map((item) => (
            <SidebarItem key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* logout button  */}
      <div className="flex justify-center">
        <LogoutButton />
      </div>
    </nav>
  );
}
