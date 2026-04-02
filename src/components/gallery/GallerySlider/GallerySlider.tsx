// React component 'GallerySlider'. Handles a dedicated UI element and its behavior.
"use client";

import { useState } from "react";
import type { GalleryItem } from "@/types/common";
import { IconButton } from "@/components/ui";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import GallerySlide from "../GallerySlide/GallerySlide";
import styles from "./GallerySlider.module.css";

type GallerySliderProps = {
  items: GalleryItem[];
};

export default function GallerySlider({ items }: GallerySliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  if (items.length === 0) return null;

  return (
    <div className={styles.slider}>
      <GallerySlide item={items[currentIndex]} />

      <div className={styles.controls}>
        <IconButton
          icon={<IoChevronBack size={20} />}
          label="Previous slide"
          onClickAction={handlePrev}
        />

        <div className={styles.dots}>
          {items.map((item, index) => (
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

        <IconButton
          icon={<IoChevronForward size={20} />}
          label="Next slide"
          onClickAction={handleNext}
        />
      </div>
    </div>
  );
}
