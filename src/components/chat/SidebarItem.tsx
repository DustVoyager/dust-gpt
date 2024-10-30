"use client";

import Link from "next/link";
import { ChangeEvent, ReactNode, useEffect, useRef, useState } from "react";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { cn } from "@/src/lib/utils";
import { useSheetStore } from "../../../store/sheet";
import toast from "react-hot-toast";
import { deleteConversation, updateConversation } from "@/actions/conversation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useModalStore } from "@/store/modal";
import { ModalFooter } from "../modal/ModalFooter";
import { BASE_URL } from "@/constants/routes";

type Props = {
  item: {
    id: string;
    href: string;
    icon: ReactNode;
    label: string;
  };
};

export default function SidebarItem({ item }: Props) {
  const { id, href, icon, label } = item;
  const pathname = usePathname();
  const params = useParams<{ conversationId: string }>();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [value, setValue] = useState(label);
  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);
  const setOpen = useSheetStore((state) => state.setOpen);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleBlur = async () => {
    setIsEditMode(false);
    if (value !== label) {
      try {
        updateConversation(id, value);
      } catch (error) {
        console.log(error);
        toast.error("이름 수정에 실패하였습니다.");
      }
    }
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "enter") {
      await handleBlur();
    }
  };

  const handleDelete = async () => {
    try {
      await deleteConversation(id);
      toast.success("대화 삭제에 성공하였습니다.");

      if (params.conversationId === id) {
        router.push(BASE_URL);
      }

      closeModal();
    } catch (error) {
      console.log(error);
      toast.error("대화 삭제에 실패했습니다.");
    }
  };

  const clickDelete = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    // 모달 로직
    openModal({
      title: "정말 삭제하겠습니까?",
      description: "삭제 후에는 데이터 복구를 할 수 없습니다.",
      footer: <ModalFooter onCancel={closeModal} onConfirm={handleDelete} />,
    });
  };

  const clickEdit = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsEditMode(true);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  return (
    <Link
      href={href}
      scroll={false}
      className={cn(
        "flex items-center justify-between text-sm p-3 group hover:text-white hover:bg-white/10 rounded-lg",
        isMenuOpen || pathname === href
          ? "text-white bg-white/10"
          : "text-zinc-400"
      )}
      onClick={() => setOpen(false)}
    >
      {/* label 영역 */}
      <div className="flex items-center gap-2">
        {icon}{" "}
        {isEditMode ? (
          <input
            value={value}
            onChange={handleChange}
            onClick={(event) => event.preventDefault()}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="bg-transparent border border-zinc-400 rounded-lg px-2 py-1"
            ref={inputRef}
          />
        ) : (
          <div className="w-[180px] truncate">{label}</div>
        )}
      </div>

      {/* 드롭다운 메뉴 영역 */}
      {id !== "new" && (
        <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <DropdownMenuTrigger asChild>
            <div onClick={handleMenu}>
              <Ellipsis
                className={cn(
                  "group-hover:block text-gray-400 hover:text-white",
                  isMenuOpen ? "block text-wthie" : "md:hidden text-gray-400"
                )}
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="gap-2" onClick={clickEdit}>
              <Pencil size={18} />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2" onClick={clickDelete}>
              <Trash size={18} />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </Link>
  );
}
