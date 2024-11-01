"use client";

import { useModalStore } from "@/store/modal";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";

export function Modal() {
  const open = useModalStore((state) => state.open);
  const closeModal = useModalStore((state) => state.closeModal);
  const config = useModalStore((state) => state.config);

  const { title, description, content, footer } = config || {};
  console.log("footer", footer);

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {content}
        <DialogFooter className="gap-2">{footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
