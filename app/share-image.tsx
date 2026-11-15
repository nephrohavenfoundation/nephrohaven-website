/* eslint-disable @next/next/no-img-element -- Share images are rendered by ImageResponse, which only accepts plain img elements. */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { previewCopy, shareImageSize, type SitePage } from "./site-seo";

type ShareFont = {
  name: string;
  data: ArrayBuffer;
  weight: 400;
  style: "normal";
};

let displayFont: Promise<ShareFont> | undefined;

function arrayBuffer(data: Buffer) {
  return data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength) as ArrayBuffer;
}

function displayFontFile() {
  displayFont ??= readFile(
    join(
      process.cwd(),
      "node_modules/@fontsource/baskervville/files/baskervville-latin-400-normal.woff",
    ),
  ).then((data) => ({
    name: "Baskervville",
    data: arrayBuffer(data),
    weight: 400,
    style: "normal" as const,
  }));
  return displayFont;
}

function publicFile(path: string) {
  switch (path) {
    case "/images/nephrohaven-white.webp":
      return readFile(join(process.cwd(), "public/images/nephrohaven-white.webp"));
    case "/images/solar-care.webp":
      return readFile(join(process.cwd(), "public/images/solar-care.webp"));
    case "/images/dialysis-room.webp":
      return readFile(join(process.cwd(), "public/images/dialysis-room.webp"));
    case "/images/community-care.webp":
      return readFile(join(process.cwd(), "public/images/community-care.webp"));
    case "/images/whole-person-care.webp":
      return readFile(join(process.cwd(), "public/images/whole-person-care.webp"));
    case "/images/partnership-table.webp":
      return readFile(join(process.cwd(), "public/images/partnership-table.webp"));
    case "/images/solar-study.webp":
      return readFile(join(process.cwd(), "public/images/solar-study.webp"));
    case "/images/care-training.webp":
      return readFile(join(process.cwd(), "public/images/care-training.webp"));
    default: {
      const unknown: never = path as never;
      throw new Error(`Unknown share image: ${unknown}`);
    }
  }
}

function plainText(value: string) {
  return value.replaceAll("’", "'").replaceAll("“", '"').replaceAll("”", '"');
}

async function pngDataUrl(publicPath: string, size?: { width: number; height: number }) {
  const bytes = await publicFile(publicPath);
  const image = sharp(bytes);
  const prepared = size
    ? image.resize(size.width, size.height, { fit: "cover", position: "centre" })
    : image;
  const png = await prepared.png().toBuffer();
  return `data:image/png;base64,${png.toString("base64")}`;
}

function coverCrop(
  sourceWidth: number,
  sourceHeight: number,
  targetWidth: number,
  targetHeight: number,
  focusX: number,
  focusY: number,
) {
  const scale = Math.max(targetWidth / sourceWidth, targetHeight / sourceHeight);
  const width = Math.min(sourceWidth, Math.round(targetWidth / scale));
  const height = Math.min(sourceHeight, Math.round(targetHeight / scale));
  const left = Math.max(
    0,
    Math.min(sourceWidth - width, Math.round((sourceWidth - width) * focusX)),
  );
  const top = Math.max(
    0,
    Math.min(sourceHeight - height, Math.round((sourceHeight - height) * focusY)),
  );
  return { left, top, width, height };
}

async function heroShareImage(publicPath: string) {
  const bytes = await publicFile(publicPath);
  const source = sharp(bytes);
  const metadata = await source.metadata();
  const crop = coverCrop(
    metadata.width ?? shareImageSize.width,
    metadata.height ?? shareImageSize.height,
    shareImageSize.width,
    shareImageSize.height,
    0,
    0.49,
  );
  const png = await sharp(bytes)
    .extract(crop)
    .resize(shareImageSize.width, shareImageSize.height)
    .png()
    .toBuffer();
  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

function headlineSize(headline: string) {
  if (headline.length <= 28) return 68;
  if (headline.length <= 46) return 54;
  return 46;
}

export async function shareImage(page: SitePage) {
  if (page.kind === "home" && page.image) return heroShareImage(page.image);

  const photoSize = { width: 520, height: shareImageSize.height };
  const [logo, photo, font] = await Promise.all([
    pngDataUrl("/images/nephrohaven-white.webp"),
    page.image ? pngDataUrl(page.image, photoSize) : Promise.resolve(undefined),
    displayFontFile(),
  ]);
  const headline = plainText(page.headline);
  const description = plainText(previewCopy(page.description));
  const copyWidth = photo ? 500 : 540;

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#102a34",
        color: "#f7f6ed",
      }}
    >
      <div style={{ display: "flex", width: 16, height: "100%", background: "#a9e8c8" }} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: 664,
          height: "100%",
          padding: "52px 56px",
        }}
      >
        {photo ? (
          <img src={logo} width={150} height={118} alt="" />
        ) : (
          <div style={{ display: "flex", height: 24 }} />
        )}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              width: copyWidth,
              fontFamily: "Baskervville",
              fontSize: headlineSize(headline),
              lineHeight: 1.05,
              letterSpacing: -1,
            }}
          >
            {headline}
          </div>
          <div
            style={{
              display: "flex",
              width: copyWidth,
              marginTop: 22,
              fontFamily: "Baskervville",
              fontSize: 26,
              lineHeight: 1.35,
              color: "#c8dbe0",
            }}
          >
            {description}
          </div>
        </div>
        <div
          style={{ display: "flex", fontFamily: "Baskervville", fontSize: 22, color: "#a9e8c8" }}
        >
          Starting in Ghana
        </div>
      </div>
      {photo ? (
        <div style={{ display: "flex", width: 520, height: "100%", overflow: "hidden" }}>
          <img src={photo} width={photoSize.width} height={photoSize.height} alt="" />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            width: 520,
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={logo} width={300} height={236} alt="" />
        </div>
      )}
    </div>,
    { ...shareImageSize, fonts: [font] },
  );
}
