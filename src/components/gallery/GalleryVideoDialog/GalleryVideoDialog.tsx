"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import type { GalleryItem } from "@/types/common";
import { useI18n } from "@/providers/locale-provider";
import { getYouTubeEmbedUrl } from "@/utils/youtube.utils";
import styles from "./GalleryVideoDialog.module.css";

type GalleryVideoDialogProps = {
  item: GalleryItem | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function GalleryVideoDialog({
  item,
  isOpen,
  onClose,
}: GalleryVideoDialogProps) {
  const { t } = useI18n();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const embedUrl =
    item && item.type === "youtube" ? getYouTubeEmbedUrl(item.src) : null;

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusableSelector =
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const focusableElements = modalRef.current
      ? Array.from(modalRef.current.querySelectorAll<HTMLElement>(focusableSelector))
      : [];

    (focusableElements[0] || modalRef.current)?.focus();

    const handleEscapeAndTrap = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
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

    document.addEventListener("keydown", handleEscapeAndTrap);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.removeEventListener("keydown", handleEscapeAndTrap);
      if (previouslyFocusedRef.current?.isConnected) {
        previouslyFocusedRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item || item.type !== "youtube" || !embedUrl) {
    return null;
  }

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-label={t("gallery.preview.dialogAriaLabel")}
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
        tabIndex={-1}
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label={t("gallery.preview.closeAriaLabel")}
        >
          ×
        </button>

        <div className={styles.videoContainer}>
          <iframe
            src={embedUrl}
            title={item.alt}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={styles.iframe}
          />
        </div>
      </div>
    </div>
  );
}