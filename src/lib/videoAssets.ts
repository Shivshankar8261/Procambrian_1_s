import { existsSync } from "node:fs";
import path from "node:path";

/**
 * Chrome on some machines fails to decode the VP9 WebM encodes of the
 * hero footage — MediaError code 3, MEDIA_ERR_DECODE, after the first
 * frame — which leaves the hero looking like a still photograph.
 *
 * H.264 in MP4 is the one format every browser and GPU decodes. Drop a
 * `nature.mp4` into `public/` and it is offered first automatically,
 * with the WebM kept as the fallback. Resolved on the server so a
 * missing file costs a 404 on nobody's page load.
 */
export function heroSources(): { src: string; type: string }[] {
  const sources: { src: string; type: string }[] = [];
  if (existsSync(path.join(process.cwd(), "public", "nature.mp4"))) {
    sources.push({ src: "/nature.mp4", type: "video/mp4" });
  }
  sources.push({ src: "/nature.webm", type: "video/webm" });
  return sources;
}
