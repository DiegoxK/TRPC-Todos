import { type ClassValue, clsx } from "clsx";
import type { RefObject } from "react";
import type { Crop } from "react-image-crop";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const cropImage = async (
  imgRef: RefObject<HTMLImageElement>,
  crop: Crop,
): Promise<Blob | undefined> => {
  const image = imgRef.current;

  if (!image || !crop) {
    throw new Error("Crop canvas does not exist");
  }

  if (crop.width === 0 || crop.height === 0) {
    return undefined;
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  const offscreen = new OffscreenCanvas(
    crop.width * scaleX,
    crop.height * scaleY,
  );
  const ctx = offscreen.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width * scaleX,
    crop.height * scaleY,
  );

  return await offscreen.convertToBlob();
};

export const generateSlug = (index: string) => {
  return encodeURIComponent(index.toLowerCase().replace(/\s+/g, "-"));
};

export const removeEmpty = (obj: Record<string, unknown>) => {
  return Object.entries(obj).reduce(
    (acc, [k, v]) => (v ? { ...acc, [k]: v } : acc),
    {},
  );
};
