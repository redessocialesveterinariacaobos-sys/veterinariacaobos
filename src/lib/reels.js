export function reelFile(href) {
  const match = String(href).match(/reel\/([^/?#]+)/);
  return match ? `/assets/videos/reels/${match[1]}.mp4` : href;
}
