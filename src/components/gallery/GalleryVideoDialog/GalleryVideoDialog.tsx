import type { GalleryItem } from "@/types/common";
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
  const embedUrl =
    item && item.type === "youtube" ? getYouTubeEmbedUrl(item.src) : null;

  if (!isOpen || !item || item.type !== "youtube" || !embedUrl) {
    return null;
  }

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close video"
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
