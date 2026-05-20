"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/layout";
import { SectionTitle } from "@/components/ui";
import VideoModal from "@/components/video/VideoModal";
import { videos } from "@/data/videos";
import { useI18n } from "@/providers/locale-provider";
import { getYouTubeThumbnailUrl } from "@/utils/youtube.utils";
import styles from "./VideoGallerySection.module.css";

const VIDEO_POSTER_SIZES =
  "(min-width: 1024px) 360px, (min-width: 768px) 46vw, 94vw";

export default function VideoGallerySection() {
  const { t } = useI18n();
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [selectedVideoTitle, setSelectedVideoTitle] = useState("");

  const handleOpenVideo = (youtubeId: string, title: string) => {
    setSelectedVideoId(youtubeId);
    setSelectedVideoTitle(title);
  };

  const handleCloseVideo = () => {
    setSelectedVideoId(null);
    setSelectedVideoTitle("");
  };

  return (
    <section className={styles.section}>
      <Container>
        <header className={styles.header}>
          <SectionTitle className={styles.title}>
            {t("videoGallery.title")}
          </SectionTitle>
          <p className={styles.description}>{t("videoGallery.description")}</p>
        </header>

        <div className={styles.grid}>
          {videos.map((item) => {
            const isInteractive = Boolean(item.youtubeId);
            const cardTitle = t(item.titleKey);
            const thumbnailSrc = getYouTubeThumbnailUrl(item.youtubeId);
            const openVideoAriaLabel = t(
              "videoGallery.controls.openVideoAriaTemplate",
              { title: cardTitle },
            );

            const cardMedia = (
              <>
                <div className={styles.posterArea}>
                  {thumbnailSrc ? (
                    <Image
                      src={thumbnailSrc}
                      alt={cardTitle}
                      fill
                      sizes={VIDEO_POSTER_SIZES}
                      className={styles.poster}
                    />
                  ) : (
                    <div className={styles.posterFallback} aria-hidden="true" />
                  )}
                  <span className={styles.playIndicator} aria-hidden="true">
                    PLAY
                  </span>
                </div>

                <div className={styles.content}>
                  <h3 className={styles.cardTitle}>{cardTitle}</h3>
                  <p className={styles.cardCaption}>{t(item.descriptionKey)}</p>
                </div>
              </>
            );

            return (
              <article
                key={item.id}
                className={`${styles.card} ${isInteractive ? styles.cardInteractive : styles.cardDisabled}`}
              >
                {isInteractive ? (
                  <button
                    type="button"
                    className={styles.cardButton}
                    onClick={() => handleOpenVideo(item.youtubeId, cardTitle)}
                    aria-label={openVideoAriaLabel}
                  >
                    {cardMedia}
                  </button>
                ) : (
                  <div className={styles.cardStatic}>{cardMedia}</div>
                )}
              </article>
            );
          })}
        </div>

        <VideoModal
          youtubeId={selectedVideoId}
          videoTitle={selectedVideoTitle}
          isOpen={selectedVideoId !== null}
          onClose={handleCloseVideo}
        />
      </Container>
    </section>
  );
}
