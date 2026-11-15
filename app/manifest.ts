import type { MetadataRoute } from "next";
import { pageByPath, siteName } from "./site-seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: "NephroHaven",
    description: pageByPath("/").description,
    start_url: "/",
    display: "browser",
    background_color: "#faf8f4",
    theme_color: "#102a34",
    lang: "en",
    icons: [{ src: "/images/nephrohaven-color.webp", sizes: "440x347", type: "image/webp" }],
  };
}
