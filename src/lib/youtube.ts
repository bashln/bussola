const PADRAO_YOUTUBE =
  /^https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?(?:[^&]*&)*v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})(?:[?&#].*)?$/i;

export function youtubeId(url: string): string | null {
  return url.match(PADRAO_YOUTUBE)?.[1] ?? null;
}
