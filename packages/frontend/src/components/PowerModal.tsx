import { Dialog } from "@headlessui/react";
import { useState } from "react";

interface IPowerModal {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children?: any;
}

export default function PowerModal({
  isOpen,
  setIsOpen,
  children,
}: IPowerModal) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-11"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-[#051316]/70" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 z-11">
        {/* The actual dialog panel  */}
        <div className="relative">
          <Dialog.Panel className="mx-auto max-w-sm rounded-lg bg-brand-text py-6 px-8 flex flex-col border border-brand-primary z-11">
            {children}
          </Dialog.Panel>
          <div className="w-full h-full bg-brand-secondary absolute rounded-lg top-1 left-1 -z-10"></div>
        </div>
      </div>
    </Dialog>
  );
}
