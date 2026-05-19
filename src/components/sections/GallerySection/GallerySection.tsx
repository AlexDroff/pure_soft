// React component 'GallerySection'. Handles a dedicated UI element and its behavior.
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { gallery } from "@/data/gallery";
import type { GalleryItem } from "@/types/common";
import { Container } from "@/components/layout";
import { IconButton } from "@/components/ui";
import { useI18n } from "@/providers/locale-provider";
import { getYouTubeThumbnailUrl } from "@/utils/youtube.utils";
import GalleryVideoDialog from "@/components/gallery/GalleryVideoDialog/GalleryVideoDialog";
import styles from "./GallerySection.module.css";

const GALLERY_IMAGE_QUALITY = 95;
const SWIPE_THRESHOLD = 48;

const getImageSrc = (item: GalleryItem) => {
  if (item.type === "image") {
    return item.src;
  }
  return item.thumbnail || getYouTubeThumbnailUrl(item.src) || "";
};

const getNextIndex = (current: number, delta: number, total: number) => {
  if (total <= 0) return 0;
  return (current + delta + total) % total;
};

export default function GallerySection() {
  const { t } = useI18n();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<GalleryItem | null>(null);
  const previewCardRef = useRef<HTMLDivElement | null>(null);
  const previewCloseButtonRef = useRef<HTMLButtonElement | null>(null);
  const previewTriggerRef = useRef<HTMLButtonElement | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const hasSwipedRef = useRef(false);

  const slidesCount = gallery.length;
  const currentItem = gallery[currentIndex];
  const currentImageSrc = currentItem ? getImageSrc(currentItem) : "";

  const handlePrev = () => {
    setCurrentIndex((prev) => getNextIndex(prev, -1, slidesCount));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => getNextIndex(prev, 1, slidesCount));
  };

  const handleImageClick = (trigger: HTMLButtonElement) => {
    if (hasSwipedRef.current) {
      hasSwipedRef.current = false;
      return;
    }

    const item = gallery[currentIndex];
    if (!item) return;
    if (item.type === "youtube") {
      setSelectedVideo(item);
      return;
    }
    previewTriggerRef.current = trigger;
    setExpandedIndex(currentIndex);
  };

  const handleClosePreview = () => {
    setExpandedIndex(null);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLButtonElement>) => {
    const touch = event.touches[0];
    if (!touch) return;
    touchStartXRef.current = touch.clientX;
    touchStartYRef.current = touch.clientY;
    hasSwipedRef.current = false;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLButtonElement>) => {
    const startX = touchStartXRef.current;
    const startY = touchStartYRef.current;
    const touch = event.changedTouches[0];
    touchStartXRef.current = null;
    touchStartYRef.current = null;
    if (startX === null || startY === null || !touch) return;

    const deltaX = touch.clientX - startX;
    const deltaY = touch.clientY - startY;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if (absX < SWIPE_THRESHOLD || absX <= absY) return;

    hasSwipedRef.current = true;

    if (deltaX < 0) {
      handleNext();
      return;
    }

    handlePrev();
  };

  const handleTouchCancel = () => {
    touchStartXRef.current = null;
    touchStartYRef.current = null;
    hasSwipedRef.current = false;
  };

  const handleSliderKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      handlePrev();
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      handleNext();
    }
  };

  useEffect(() => {
    if (expandedIndex === null) return;

    const focusableSelector =
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const focusableElements = previewCardRef.current
      ? Array.from(
          previewCardRef.current.querySelectorAll<HTMLElement>(
            focusableSelector,
          ),
        )
      : [];

    (previewCloseButtonRef.current || focusableElements[0] || previewCardRef.current)?.focus();

    const handleEscapeAndTrap = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClosePreview();
        return;
      }

      if (event.key !== "Tab" || !previewCardRef.current) return;

      const activeFocusable = Array.from(
        previewCardRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      );

      if (activeFocusable.length === 0) {
        event.preventDefault();
        previewCardRef.current.focus();
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
      document.removeEventListener("keydown", handleEscapeAndTrap);
      if (previewTriggerRef.current?.isConnected) {
        previewTriggerRef.current.focus();
      }
    };
  }, [expandedIndex]);

  return (
    <section className={styles.section}>
      <Container>
        <div
          className={styles.slider}
          role="region"
          aria-label={t("gallery.controls.sliderAriaLabel")}
          tabIndex={0}
          onKeyDown={handleSliderKeyDown}
        >
          <div className={styles.viewport}>
            <div className={styles.viewportTrack}>
              <div className={styles.arrowDock}>
                <IconButton
                  icon={<IoChevronBack size={40} />}
                  label={t("gallery.controls.previousSlideAriaLabel")}
                  className={styles.navButton}
                  onClickAction={handlePrev}
                />
              </div>

              <div className={styles.frame}>
                <div className={styles.slideStack}>
                  {currentItem && currentImageSrc && (
                    <button
                      key={currentItem.id}
                      type="button"
                      className={styles.card}
                      onClick={(event) => handleImageClick(event.currentTarget)}
                      onTouchStart={handleTouchStart}
                      onTouchEnd={handleTouchEnd}
                      onTouchCancel={handleTouchCancel}
                      aria-label={t("gallery.controls.goToImageAriaTemplate", {
                        index: currentIndex + 1,
                      })}
                    >
                        <div className={styles.imageWrapper}>
                          <Image
                            src={currentImageSrc}
                            alt={t(`gallery.itemsAlt.${currentItem.id}`)}
                            fill
                            sizes="(min-width: 1024px) 600px, (min-width: 768px) 600px, 92vw"
                            quality={GALLERY_IMAGE_QUALITY}
                            className={styles.image}
                          />
                          {currentItem.type === "youtube" && (
                            <span className={styles.videoBadge} aria-hidden="true">
                              VIDEO
                            </span>
                          )}
                        </div>
                    </button>
                  )}
                </div>
              </div>

              <div className={styles.arrowDock}>
                <IconButton
                  icon={<IoChevronForward size={40} />}
                  label={t("gallery.controls.nextSlideAriaLabel")}
                  className={styles.navButton}
                  onClickAction={handleNext}
                />
              </div>
            </div>
          </div>
        </div>

        {expandedIndex !== null && (() => {
          const expandedItem = gallery[expandedIndex];
          const previewSrc = getImageSrc(expandedItem);
          return previewSrc ? (
            <div
              className={styles.previewOverlay}
              role="dialog"
              aria-modal="true"
              aria-label={t("gallery.preview.dialogAriaLabel")}
              onClick={handleClosePreview}
            >
              <div
                ref={previewCardRef}
                className={styles.previewCard}
                onClick={(event) => event.stopPropagation()}
                tabIndex={-1}
              >
                <button
                  ref={previewCloseButtonRef}
                  type="button"
                  className={styles.previewClose}
                  onClick={handleClosePreview}
                  aria-label={t("gallery.preview.closeAriaLabel")}
                >
                  {t("gallery.preview.closeButtonText")}
                </button>

                <div className={styles.previewImageWrapper}>
                  <Image
                    src={previewSrc}
                    alt={t(`gallery.itemsAlt.${expandedItem.id}`)}
                    fill
                    sizes="(min-width: 1024px) 920px, 100vw"
                    quality={GALLERY_IMAGE_QUALITY}
                    className={styles.previewImage}
                  />
                </div>
              </div>
            </div>
          ) : null;
        })()}

        <GalleryVideoDialog
          item={selectedVideo}
          isOpen={selectedVideo !== null}
          onClose={handleCloseVideo}
        />
      </Container>
    </section>
  );
}
