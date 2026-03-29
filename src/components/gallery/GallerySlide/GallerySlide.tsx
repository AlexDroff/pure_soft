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
        <Image src={item.image} alt={item.alt} fill className={styles.image} />
      </div>
    </div>
  );
}
