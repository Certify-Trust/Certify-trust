import MyDesignIcon from "@/assets/icons/canvas/MyDesign";
import TemplateIcon from "@/assets/icons/canvas/TemplateIcon";
import TextIcon from "@/assets/icons/canvas/TextIcon";
import ElementsIcon from "@/assets/icons/canvas/ElementsIcon";
import AttributesIcon from "@/assets/icons/canvas/AttributesIcon";
import QRCodeIcon from "@/assets/icons/canvas/QRCodeIcon";
import DocumentIcon from "@/assets/icons/canvas/DocumentIcon";
import UndoIcon from "@/assets/icons/canvas/UndoIcon";
import RedoIcon from "@/assets/icons/canvas/RedoIcon";

export const Icon = ({ d, size = 20 }: { d: string; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={d} />
  </svg>
);

export const icons = {
  close: "M18 6L6 18M6 6l12 12",
  myDesigns: <MyDesignIcon />,
  templates: <TemplateIcon />,
  text: <TextIcon />,
  elements: <ElementsIcon />,
  attributes: <AttributesIcon />,
  qrCode: <QRCodeIcon />,
  document: <DocumentIcon />,
  alignLeft: "M3 6h18M3 12h12M3 18h15",
  alignCenter: "M3 6h18M6 12h12M4.5 18h15",
  alignRight: "M3 6h18M9 12h12M6 18h15",
  valignTop: "M3 3h18M12 21V7M8 11l4-4 4 4",
  valignMid: "M3 12h18M12 21v-5M8 16l4 4 4-4M12 3v5M8 8l4-4 4 4",
  valignBot: "M3 21h18M12 3v14M8 13l4 4 4-4",
  undo: <UndoIcon />,
  redo: <RedoIcon />,
  edit: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
  chevronLeft: "M15 18l-6-6 6-6",
  chevronDown: "M6 9l6 6 6-6",
} as const;
