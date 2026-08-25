import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Format currency in Bangladeshi Taka (৳)
export function formatCurrency(amount) {
  const value = Number(amount) || 0;
  return "৳" + new Intl.NumberFormat("en-IN").format(value);
}

// Normalize a stored image path into a usable src.
// Handles absolute URLs, protocol-relative paths and already-rooted
// public paths, otherwise roots it at "/" so it never breaks on sub-routes.
export function imageSrc(path) {
    if (!path) return null;
    if (/^(https?:)?\/\//.test(path)) return path;
    return path.startsWith("/") ? path : `/${path}`;
}

// Product uploads historically exist in two DB formats:
// "product_images/file.jpg" and just "file.jpg". Normalize both.
export function productImageSrc(path) {
    if (!path) return null;
    if (/^(https?:)?\/\//.test(path)) return path;

    const normalized = path.replace(/^\/+/, "").replace(/^public\//, "");
    if (normalized.startsWith("product_images/")) {
        return `/${normalized}`;
    }

    return `/product_images/${normalized}`;
}

export const DEMO_IMAGE = "/product_images/demo/cat-1.png";

// Swap a broken <img> to the local demo image so cards never show a broken icon.
export function imageFallback(event) {
    if (event.currentTarget.src !== imageSrc(DEMO_IMAGE)) {
        event.currentTarget.src = imageSrc(DEMO_IMAGE);
    }
}

// Format date
export function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}
