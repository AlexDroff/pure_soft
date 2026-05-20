// React component 'GallerySection'. Handles a dedicated UI element and its behavior.
"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { gallery } from "@/data/gallery";
import type { GalleryItem } from "@/types/common";
import { Container } from "@/components/layout";
import { IconButton } from "@/components/ui";
import { useI18n } from "@/providers/locale-provider";
import styles from "./GallerySection.module.css";

const GALLERY_IMAGE_QUALITY = 95;
const SWIPE_THRESHOLD = 48;
type SlideDirection = "next" | "prev";

const getNextIndex = (current: number, delta: number, total: number) => {
  if (total <= 0) return 0;
  return (current + delta + total) % total;
};

export default function GallerySection() {
  const { t } = useI18n();
  const prefersReducedMotion = useReducedMotion();
  const photoItems = gallery.filter((item): item is GalleryItem & { type: "image" } => item.type === "image");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<SlideDirection>("next");
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const slidesCount = photoItems.length;
  const activeIndex = slidesCount > 0 ? currentIndex % slidesCount : 0;
  const activeItem = photoItems[activeIndex];

  const slideVariants = {
    enter: (activeDirection: SlideDirection) => ({
      opacity: 0,
      x: prefersReducedMotion ? 0 : activeDirection === "next" ? 72 : -72,
      scale: prefersReducedMotion ? 1 : 0.985,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    exit: (activeDirection: SlideDirection) => ({
      opacity: 0,
      x: prefersReducedMotion ? 0 : activeDirection === "next" ? -72 : 72,
      scale: prefersReducedMotion ? 1 : 0.985,
    }),
  };

  const handlePrev = () => {
    setDirection("prev");
    setCurrentIndex((prev) => getNextIndex(prev, -1, slidesCount));
  };

  const handleNext = () => {
    setDirection("next");
    setCurrentIndex((prev) => getNextIndex(prev, 1, slidesCount));
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    if (!touch) return;
    touchStartXRef.current = touch.clientX;
    touchStartYRef.current = touch.clientY;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
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

    if (deltaX < 0) {
      handleNext();
      return;
    }

    handlePrev();
  };

  const handleTouchCancel = () => {
    touchStartXRef.current = null;
    touchStartYRef.current = null;
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
                  <AnimatePresence initial={false} custom={direction}>
                    {activeItem && (
                      <motion.div
                        key={activeItem.id}
                        className={`${styles.card} ${styles.slideLayer}`}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                        onTouchCancel={handleTouchCancel}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          duration: prefersReducedMotion ? 0.01 : 0.36,
                          ease: "easeOut",
                        }}
                      >
                        <div className={styles.imageWrapper}>
                          <Image
                            src={activeItem.src}
                            alt={t(`gallery.itemsAlt.${activeItem.id}`)}
                            fill
                            sizes="(min-width: 1024px) 600px, (min-width: 768px) 600px, 92vw"
                            quality={GALLERY_IMAGE_QUALITY}
                            className={styles.image}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
      </Container>
    </section>
  );
}
