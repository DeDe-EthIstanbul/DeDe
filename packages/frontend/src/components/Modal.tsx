import { useState } from "react";
import { Dialog } from "@headlessui/react";

interface IModal {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children?: any;
}

export default function Modal({ isOpen, setIsOpen, children }: IModal) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-[#051316]/70" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="mx-auto max-w-sm rounded-lg bg-brand-text py-6 px-8 flex flex-col items-center justify-center">
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
