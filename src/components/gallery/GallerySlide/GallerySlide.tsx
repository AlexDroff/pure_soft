import Image from "next/image";
import type { GalleryItem } from "@/types/common";
import { getYouTubeThumbnailUrl } from "@/utils/youtube.utils";
import styles from "./GallerySlide.module.css";

type GallerySlideProps = {
  item: GalleryItem;
  onVideoOpen?: (item: GalleryItem) => void;
};

export default function GallerySlide({ item, onVideoOpen }: GallerySlideProps) {
  const isVideo = item.type === "youtube";
  const thumbnailSrc = isVideo
    ? item.thumbnail || getYouTubeThumbnailUrl(item.src)
    : item.src;

  if (!thumbnailSrc || typeof thumbnailSrc !== "string" || thumbnailSrc.length === 0) {
    return null;
  }

  const handleClick = () => {
    if (isVideo && onVideoOpen) {
      onVideoOpen(item);
    }
  };

  if (isVideo) {
    return (
      <button
        type="button"
        className={styles.slideButton}
        onClick={handleClick}
        aria-label={item.alt}
      >
        <div className={styles.imageWrapper}>
          <Image
            src={thumbnailSrc}
            alt={item.alt}
            fill
            sizes="100vw"
            className={styles.image}
          />
          <div className={styles.playOverlay}>
            <svg
              className={styles.playIcon}
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </button>
    );
  }

  return (
    <div className={styles.slide}>
      <div className={styles.imageWrapper}>
        <Image
          src={thumbnailSrc}
          alt={item.alt}
          fill
          sizes="100vw"
          className={styles.image}
        />
      </div>
    </div>
  );
}
