// React component 'GallerySlide'. Handles a dedicated UI element and its behavior.
import Image from "next/image";
import type { GalleryItem } from "@/types/common";
import styles from "./GallerySlide.module.css";

type GallerySlideProps = {
  item: GalleryItem;
};

export default function GallerySlide({ item }: GallerySlideProps) {
  return (
    <div className={styles.slide}>
      <div className={styles.imageWrapper}>
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes="100vw"
          className={styles.image}
        />
      </div>
    </div>
  );
}
