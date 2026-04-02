// React component 'Modal'. Handles a dedicated UI element and its behavior.
"use client";

import { useEffect } from "react";
import clsx from "clsx";
import styles from "./Modal.module.css";
import IconButton from "../IconButton/IconButton";
import { IoClose } from "react-icons/io5";

type ModalProps = {
  isOpen: boolean;
  onCloseAction: () => void;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
};

export default function Modal({
  isOpen,
  onCloseAction,
  children,
  className,
  ariaLabel = "Dialog window",
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseAction();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onCloseAction]);

  if (!isOpen) return null;

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onCloseAction();
    }
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div
        className={clsx(styles.modal, className)}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
      >
        <IconButton
          icon={<IoClose size={22} />}
          label="Close modal"
          onClickAction={onCloseAction}
          className={styles.closeButton}
        />

        {children}
      </div>
    </div>
  );
}
