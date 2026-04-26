"use client";

import Modal from "./Modal";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  eyebrow?: string;
  testId?: string;
  confirmTestId?: string;
};

const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = false,
  eyebrow = "Confirmation",
  testId,
  confirmTestId = "confirm-delete-button",
}: Props) => {
  const accent = destructive
    ? "bg-vermillion text-paper border-vermillion hover:bg-vermillion-deep"
    : "bg-ink text-paper border-ink hover:bg-ink-soft";

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      eyebrow={eyebrow}
      size="sm"
      testId={testId}
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${
            destructive
              ? "border-vermillion text-vermillion bg-vermillion/5"
              : "border-ink/20 text-ink"
          }`}
        >
          <HiOutlineExclamationTriangle className="h-5 w-5" />
        </div>
        <p className="text-ink-soft text-[0.95rem] leading-relaxed text-pretty">
          {message}
        </p>
      </div>

      <hr className="rule my-6" />

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          className="border-ink/25 text-ink hover:bg-ink/5 inline-flex h-11 items-center justify-center border px-5 text-sm tracking-wide uppercase transition-colors"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          data-testid={confirmTestId}
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className={`inline-flex h-11 items-center justify-center border px-5 text-sm tracking-wide uppercase transition-colors ${accent}`}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
