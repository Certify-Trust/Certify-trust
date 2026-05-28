// types.ts
export type FabricTextAlign =
  | "left"
  | "center"
  | "right"
  | "justify"
  | "justify-left"
  | "justify-center"
  | "justify-right";

export type SideTab =
  | "myDesigns"
  | "templates"
  | "text"
  | "elements"
  | "attributes"
  | "qrCode"
  | "document";

export interface Template {
  id: string;
  label: string;
  bg: string;
  accent: string;
}

export interface CanvasDimensions {
  w: number;
  h: number;
  label: string;
}
