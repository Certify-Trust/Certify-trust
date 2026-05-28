// constants.ts

import { CanvasDimensions, Template } from "@/types/editor";

export const SECTION_CONFIG: Record<string, CanvasDimensions> = {
  "US-LETTER LANDSCAPE": { w: 620, h: 440, label: "US-LETTER · LANDSCAPE" },
  "US-LETTER PORTRAIT": { w: 440, h: 570, label: "US-LETTER · PORTRAIT" },
  "A4 LANDSCAPE": { w: 620, h: 440, label: "A4 · LANDSCAPE" },
  "A4 PORTRAIT": { w: 440, h: 623, label: "A4 · PORTRAIT" },
};

export const DEFAULT_DIMS: CanvasDimensions =
  SECTION_CONFIG["US-LETTER LANDSCAPE"];

export const TEMPLATES: Record<string, Template[]> = {
  "US-LETTER LANDSCAPE": [
    { id: "ul-1", label: "Classic", bg: "#faf8f3", accent: "#c9a84c" },
    { id: "ul-2", label: "Navy", bg: "#1a2a6c", accent: "#ffffff" },
  ],
  "US-LETTER PORTRAIT": [
    { id: "up-1", label: "Classic", bg: "#faf8f3", accent: "#c9a84c" },
    { id: "up-2", label: "Navy", bg: "#1a2a6c", accent: "#ffffff" },
  ],
  "A4 LANDSCAPE": [
    { id: "a4l-1", label: "Classic", bg: "#faf8f3", accent: "#c9a84c" },
    { id: "a4l-2", label: "Navy", bg: "#1a2a6c", accent: "#ffffff" },
  ],
  "A4 PORTRAIT": [
    { id: "a4p-1", label: "Classic", bg: "#faf8f3", accent: "#c9a84c" },
    { id: "a4p-2", label: "Navy", bg: "#1a2a6c", accent: "#ffffff" },
  ],
};

export const FONTS = [
  "Open Sans",
  "Georgia",
  "Times New Roman",
  "Arial",
  "Playfair Display",
  "Montserrat",
  "Roboto",
];

export const FONT_SIZES = [
  8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 60, 72,
];

// export const navItems = [
//   { tab: "myDesigns" as const, label: "My Designs" },
//   { tab: "templates" as const, label: "Templates" },
//   { tab: "text" as const, label: "Text" },
//   { tab: "elements" as const, label: "Elements" },
//   { tab: "attributes" as const, label: "Attributes" },
//   { tab: "qrCode" as const, label: "QR Code" },
//   { tab: "document" as const, label: "Document" },
// ];
