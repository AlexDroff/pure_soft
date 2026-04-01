"use client";

import Image from "next/image";
import { useState } from "react";
import { gallery } from "@/data/gallery";
import { Container } from "@/components/layout";
import styles from "./GallerySection.module.css";

export default function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setExpandedIndex(index);
  };

  const handleClosePreview = () => {
    setExpandedIndex(null);
  };

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.slider}>
          <div className={styles.viewport}>
            <div className={styles.strip}>
              {gallery.map((item, index) => {
                const offset = index - currentIndex;
                const wrappedOffset =
                  offset > gallery.length / 2
                    ? offset - gallery.length
                    : offset < -gallery.length / 2
                      ? offset + gallery.length
                      : offset;

                const isActive = wrappedOffset === 0;
                const isNear = Math.abs(wrappedOffset) === 1;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`${styles.card} ${
                      isActive
                        ? styles.activeCard
                        : isNear
                          ? styles.nearCard
                          : styles.farCard
                    }`}
                    onClick={() => handleImageClick(index)}
                    aria-label={`Go to gallery image ${index + 1}`}
                  >
                    <div className={styles.imageWrapper}>
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="(min-width: 1440px) 214px, (min-width: 768px) 176px, 118px"
                        className={styles.image}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className={styles.controls}>
            <button
              type="button"
              className={styles.navButton}
              onClick={handlePrev}
              aria-label="Previous slide"
            >
              <Image
                src="/icons/arrow-left.svg"
                alt=""
                width={12}
                height={12}
                className={styles.navIcon}
              />
            </button>

            <div className={styles.dots}>
              {gallery.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={`${styles.dot} ${
                    currentIndex === index ? styles.activeDot : ""
                  }`}
                  onClick={() => handleDotClick(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              className={styles.navButton}
              onClick={handleNext}
              aria-label="Next slide"
            >
              <Image
                src="/icons/arrow-right.svg"
                alt=""
                width={12}
                height={12}
                className={styles.navIcon}
              />
            </button>
          </div>
        </div>

        {expandedIndex !== null && (
          <div
            className={styles.previewOverlay}
            role="dialog"
            aria-modal="true"
            aria-label="Gallery image preview"
            onClick={handleClosePreview}
          >
            <div
              className={styles.previewCard}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className={styles.previewClose}
                onClick={handleClosePreview}
                aria-label="Close image preview"
              >
                ×
              </button>

              <div className={styles.previewImageWrapper}>
                <Image
                  src={gallery[expandedIndex].image}
                  alt={gallery[expandedIndex].alt}
                  fill
                  sizes="(min-width: 1024px) 920px, 100vw"
                  className={styles.previewImage}
                />
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
