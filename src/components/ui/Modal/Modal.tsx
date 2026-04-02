// React component 'Modal'. Handles a dedicated UI element and its behavior.
"use client";

import { useEffect, useRef } from "react";
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
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousFocusedElement =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const focusableSelector =
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const focusableElements = modalRef.current
      ? Array.from(
          modalRef.current.querySelectorAll<HTMLElement>(focusableSelector),
        )
      : [];

    (focusableElements[0] || modalRef.current)?.focus();

    const handleEscapeAndTrap = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseAction();
        return;
      }

      if (event.key !== "Tab" || !modalRef.current) return;

      const activeFocusable = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      );

      if (activeFocusable.length === 0) {
        event.preventDefault();
        modalRef.current.focus();
        return;
      }

      const firstElement = activeFocusable[0];
      const lastElement = activeFocusable[activeFocusable.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscapeAndTrap);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.removeEventListener("keydown", handleEscapeAndTrap);
      previousFocusedElement?.focus();
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
        ref={modalRef}
        className={clsx(styles.modal, className)}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        tabIndex={-1}
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
