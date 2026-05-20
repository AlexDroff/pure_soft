export function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

function normalizeYouTubeVideoId(value: string): string | null {
  const normalizedValue = value.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(normalizedValue)) {
    return normalizedValue;
  }
  return getYouTubeVideoId(normalizedValue);
}

export function getYouTubeEmbedUrl(youtubeIdOrUrl: string): string | null {
  const videoId = normalizeYouTubeVideoId(youtubeIdOrUrl);
  if (!videoId) return null;
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
}

export function getYouTubeThumbnailUrl(youtubeId: string): string | null {
  const normalizedId = normalizeYouTubeVideoId(youtubeId);
  if (!normalizedId) return null;
  return `https://i.ytimg.com/vi/${normalizedId}/hq720.jpg`;
}
