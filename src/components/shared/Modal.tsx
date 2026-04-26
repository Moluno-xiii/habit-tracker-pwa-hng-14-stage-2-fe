"use client";

import { PropsWithChildren, useEffect, useId } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";

type Props = PropsWithChildren<{
  open: boolean;
  onClose: () => void;
  title?: string;
  eyebrow?: string;
  size?: "sm" | "md";
  testId?: string;
}>;

const Modal = ({
  open,
  onClose,
  title,
  eyebrow,
  size = "md",
  testId,
  children,
}: Props) => {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  const widthClass = size === "sm" ? "sm:max-w-md" : "sm:max-w-xl";

  return createPortal(
    <div
      data-testid={testId}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
    >
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="bg-ink/65 anim-fade absolute inset-0 backdrop-blur-[1px]"
      />
      <div
        className={`bg-paper border-ink/15 anim-sheet relative w-full ${widthClass} grain max-h-[92vh] overflow-y-auto border-t sm:rounded-none sm:border`}
      >
        <div className="border-ink/15 relative flex items-start justify-between gap-6 border-b px-6 pt-6 pb-5 sm:px-8 sm:pt-7">
          <div className="min-w-0">
            {eyebrow && (
              <p className="ledger-num text-ink-soft mb-2 text-[10px] tracking-[0.22em] uppercase">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                id={titleId}
                className="font-display text-ink text-2xl leading-[1.05] text-balance italic sm:text-[1.75rem]"
              >
                {title}
              </h2>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-ink-soft hover:bg-ink/5 hover:text-ink -mt-1 -mr-2 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors"
          >
            <HiXMark className="h-5 w-5" />
          </button>
        </div>
        <div className="relative px-6 py-6 sm:px-8 sm:py-7">{children}</div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
