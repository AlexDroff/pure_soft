"use client";

import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { IconButton } from "@/components/ui";
import { useI18n } from "@/providers/locale-provider";
import { getYouTubeEmbedUrl } from "@/utils/youtube.utils";
import styles from "./VideoModal.module.css";

type VideoModalProps = {
  youtubeId: string | null;
  videoTitle: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function VideoModal({
  youtubeId,
  videoTitle,
  isOpen,
  onClose,
}: VideoModalProps) {
  const { t } = useI18n();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const embedUrl = youtubeId ? getYouTubeEmbedUrl(youtubeId) : null;

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusableSelector =
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const focusableElements = dialogRef.current
      ? Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector),
        )
      : [];
    (focusableElements[0] || dialogRef.current)?.focus();

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      if (previouslyFocusedRef.current?.isConnected) {
        previouslyFocusedRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen || !youtubeId || !embedUrl) {
    return null;
  }

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label={t("videoGallery.modal.dialogAriaLabel")}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <IconButton
          icon={<IoClose size={24} />}
          label={t("videoGallery.modal.closeAriaLabel")}
          onClickAction={onClose}
          variant="borderless"
          className={styles.closeButton}
        />

        <div className={styles.player}>
          <iframe
            src={embedUrl}
            title={videoTitle}
            className={styles.iframe}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
