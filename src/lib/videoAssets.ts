import { existsSync } from "node:fs";
import path from "node:path";

export type VideoSource = { src: string; type: string; light?: string };

const has = (file: string) =>
  existsSync(path.join(process.cwd(), "public", file));

/**
 * Sources for the background footage, most decodable first.
 *
 * H.264 in MP4 leads because Chrome's VP9 decoder fails on some machines
 * — it reports the WebM as supported and fully buffered, then throws
 * MEDIA_ERR_DECODE the moment it asks for frames, which leaves the hero
 * looking like a still photograph. WebM stays as the fallback.
 *
 * Each entry carries its own light encode so a visitor who has asked to
 * save data is not handed the master of whichever format wins.
 */
export function heroSources(): VideoSource[] {
  const sources: VideoSource[] = [];
  if (has("nature.mp4")) {
    sources.push({
      src: "/nature.mp4",
      type: "video/mp4",
      light: has("nature-light.mp4") ? "/nature-light.mp4" : undefined,
    });
  }
  sources.push({
    src: "/nature.webm",
    type: "video/webm",
    light: has("nature-light.webm") ? "/nature-light.webm" : undefined,
  });
  return sources;
}
