"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import * as fabric from "fabric";
import { cn } from "@/lib/utils";
import RedoIcon from "@/assets/icons/canvas/RedoIcon";
import UndoIcon from "@/assets/icons/canvas/UndoIcon";
import { CanvasDimensions, FabricTextAlign, SideTab } from "@/types/editor";
import {
  DEFAULT_DIMS,
  FONTS,
  FONT_SIZES,
  SECTION_CONFIG,
} from "@/constants/editor";
import { Template } from "@/types/editor";
import { Icon, icons } from "./Icons";

// ─── Props
export interface CanvasAreaProps {
  activeTab: SideTab;
  sheetOpen: boolean;
  setSheetOpen: (open: boolean) => void;
  onDimsChange?: (dims: CanvasDimensions) => void;
  onUnsavedChange?: (hasUnsaved: boolean) => void;
  imperativeRef?: React.MutableRefObject<CanvasAreaHandle | null>;
}

export interface CanvasAreaHandle {
  loadTemplate: (tpl: Template, section: string) => void;
  addText: () => void;
  addShape: (factory: () => fabric.Object) => void;
  dims: CanvasDimensions;
}

const CanvasArea: React.FC<CanvasAreaProps> = ({
  activeTab,
  sheetOpen,
  setSheetOpen,
  onDimsChange,
  onUnsavedChange,
  imperativeRef,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const canvasScrollRef = useRef<HTMLDivElement>(null);

  const [selectedFont, setSelectedFont] = useState("Open Sans");
  const [selectedSize, setSelectedSize] = useState(14);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [textColor, setTextColor] = useState("#000000");
  const [hasSelection, setHasSelection] = useState(false);

  const [history, setHistory] = useState<string[]>([]);
  // Use a ref for historyIndex so callbacks always read the latest value
  // without needing to be re-created on every index change.
  const historyIndexRef = useRef(-1);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const [dims, setDims] = useState<CanvasDimensions>(DEFAULT_DIMS);
  const [canvasScale, setCanvasScale] = useState(1);

  // ── Scale canvas to fit container
  useEffect(() => {
    const updateScale = () => {
      if (!canvasScrollRef.current) return;
      const available = canvasScrollRef.current.clientWidth - 32;
      const scale = Math.min(1, available / dims.w);
      setCanvasScale(scale);
    };
    updateScale();
    const ro = new ResizeObserver(updateScale);
    if (canvasScrollRef.current) ro.observe(canvasScrollRef.current);
    return () => ro.disconnect();
  }, [dims.w]);

  // ── Draw Certificate
  const drawCertificate = useCallback((canvas: fabric.Canvas) => {
    canvas.clear();
    canvas.backgroundColor = "#faf8f3";

    const W = canvas.getWidth();
    const H = canvas.getHeight();
    const gold = "#c9a84c";
    const isPortrait = H > W;
    const noInteract = { selectable: false, evented: false } as const;

    canvas.add(
      new fabric.Rect({
        left: 24,
        top: 24,
        width: W - 48,
        height: H - 48,
        stroke: gold,
        strokeWidth: 1.5,
        fill: "",
        ...noInteract,
      }),
    );
    canvas.add(
      new fabric.Rect({
        left: 30,
        top: 30,
        width: W - 60,
        height: H - 60,
        stroke: gold,
        strokeWidth: 0.5,
        fill: "",
        ...noInteract,
      }),
    );

    const corner = (x: number, y: number, sx: number, sy: number) => {
      canvas.add(
        new fabric.Group(
          [
            new fabric.Circle({
              left: 0,
              top: 0,
              radius: 6,
              fill: "",
              stroke: gold,
              strokeWidth: 1.2,
            }),
            new fabric.Circle({
              left: 2,
              top: 2,
              radius: 3,
              fill: gold,
              strokeWidth: 0,
            }),
            new fabric.Line([10, 0, 30, 0], { stroke: gold, strokeWidth: 1.2 }),
            new fabric.Line([0, 10, 0, 30], { stroke: gold, strokeWidth: 1.2 }),
          ],
          {
            left: x,
            top: y,
            scaleX: sx,
            scaleY: sy,
            originX: "left",
            originY: "top",
            ...noInteract,
          },
        ),
      );
    };
    corner(24, 24, 1, 1);
    corner(W - 24, 24, -1, 1);
    corner(24, H - 24, 1, -1);
    corner(W - 24, H - 24, -1, -1);

    for (const y of [56, 60]) {
      canvas.add(
        new fabric.Line([80, y, W - 80, y], {
          stroke: gold,
          strokeWidth: y === 56 ? 1 : 0.5,
          ...noInteract,
        }),
      );
    }
    for (const y of [H - 56, H - 60]) {
      canvas.add(
        new fabric.Line([80, y, W - 80, y], {
          stroke: gold,
          strokeWidth: y === H - 56 ? 1 : 0.5,
          ...noInteract,
        }),
      );
    }

    const cx = W / 2;

    if (isPortrait) {
      const textW = W - 80;
      canvas.add(
        new fabric.Textbox("CERTIFICATE", {
          left: cx,
          top: 90,
          originX: "center",
          originY: "top",
          fontSize: 28,
          fontFamily: "Georgia, serif",
          fill: "#2c2c2c",
          charSpacing: 400,
          textAlign: "center",
          width: textW,
        }),
      );
      canvas.add(
        new fabric.Textbox("OF ACHIEVEMENT", {
          left: cx,
          top: 132,
          originX: "center",
          originY: "top",
          fontSize: 12,
          fontFamily: "Open Sans, sans-serif",
          fill: "#555",
          charSpacing: 250,
          textAlign: "center",
          width: textW,
        }),
      );
      canvas.add(
        new fabric.Line([cx - 60, 158, cx + 60, 158], {
          stroke: gold,
          strokeWidth: 0.8,
          ...noInteract,
        }),
      );
      canvas.add(
        new fabric.Textbox("THIS CERTIFICATE IS PROUDLY PRESENTED TO", {
          left: cx,
          top: 200,
          originX: "center",
          originY: "top",
          fontSize: 9,
          fontFamily: "Open Sans, sans-serif",
          fill: "#666",
          charSpacing: 100,
          textAlign: "center",
          width: textW,
        }),
      );
      canvas.add(
        new fabric.Textbox("[RECIPIENT.NAME]", {
          left: cx,
          top: 224,
          originX: "center",
          originY: "top",
          fontSize: 30,
          fontFamily: "Georgia, serif",
          fontWeight: "bold",
          fill: "#1a1a1a",
          textAlign: "center",
          width: textW,
        }),
      );
      canvas.add(
        new fabric.Line([100, 278, W - 100, 278], {
          stroke: "#999",
          strokeWidth: 0.8,
          ...noInteract,
        }),
      );
      canvas.add(
        new fabric.Textbox("HAS SUCCESSFULLY COMPLETED THE COURSE", {
          left: cx,
          top: 298,
          originX: "center",
          originY: "top",
          fontSize: 9,
          fontFamily: "Open Sans, sans-serif",
          fill: "#666",
          charSpacing: 100,
          textAlign: "center",
          width: textW,
        }),
      );
      canvas.add(
        new fabric.Textbox("[GROUP.COURSE_NAME]", {
          left: cx,
          top: 322,
          originX: "center",
          originY: "top",
          fontSize: 15,
          fontFamily: "Open Sans, sans-serif",
          fontWeight: "bold",
          fill: "#2c2c2c",
          textAlign: "center",
          width: textW,
        }),
      );
      const sigY = H - 140;
      canvas.add(
        new fabric.Line([70, sigY, 195, sigY], {
          stroke: "#aaa",
          strokeWidth: 0.8,
          ...noInteract,
        }),
      );
      canvas.add(
        new fabric.Textbox("[CREDENTIAL.ISSUED_ON]", {
          left: 132,
          top: sigY - 20,
          originX: "center",
          originY: "top",
          fontSize: 8,
          fontFamily: "Open Sans, sans-serif",
          fill: "#888",
          textAlign: "center",
          width: 140,
        }),
      );
      canvas.add(
        new fabric.Textbox("DATE", {
          left: 132,
          top: sigY + 8,
          originX: "center",
          originY: "top",
          fontSize: 8,
          fontFamily: "Open Sans, sans-serif",
          fill: "#777",
          charSpacing: 120,
          textAlign: "center",
          width: 80,
        }),
      );
      canvas.add(
        new fabric.Line([W - 195, sigY, W - 70, sigY], {
          stroke: "#aaa",
          strokeWidth: 0.8,
          ...noInteract,
        }),
      );
      canvas.add(
        new fabric.Textbox("SIGNATURE", {
          left: W - 132,
          top: sigY + 8,
          originX: "center",
          originY: "top",
          fontSize: 8,
          fontFamily: "Open Sans, sans-serif",
          fill: "#777",
          charSpacing: 120,
          textAlign: "center",
          width: 120,
        }),
      );
    } else {
      canvas.add(
        new fabric.Textbox("CERTIFICATE", {
          left: cx,
          top: 78,
          originX: "center",
          originY: "top",
          fontSize: 32,
          fontFamily: "Georgia, serif",
          fill: "#2c2c2c",
          charSpacing: 400,
          textAlign: "center",
          width: 500,
        }),
      );
      canvas.add(
        new fabric.Textbox("OF ACHIEVEMENT", {
          left: cx,
          top: 120,
          originX: "center",
          originY: "top",
          fontSize: 13,
          fontFamily: "Open Sans, sans-serif",
          fill: "#555",
          charSpacing: 250,
          textAlign: "center",
          width: 500,
        }),
      );
      canvas.add(
        new fabric.Textbox("THIS CERTIFICATE IS PROUDLY PRESENTED TO", {
          left: cx,
          top: 175,
          originX: "center",
          originY: "top",
          fontSize: 10.5,
          fontFamily: "Open Sans, sans-serif",
          fill: "#666",
          charSpacing: 120,
          textAlign: "center",
          width: 500,
        }),
      );
      canvas.add(
        new fabric.Textbox("[RECIPIENT.NAME]", {
          left: cx,
          top: 196,
          originX: "center",
          originY: "top",
          fontSize: 36,
          fontFamily: "Georgia, serif",
          fontWeight: "bold",
          fill: "#1a1a1a",
          textAlign: "center",
          width: 500,
        }),
      );
      canvas.add(
        new fabric.Line([160, 252, W - 160, 252], {
          stroke: "#999",
          strokeWidth: 0.8,
          ...noInteract,
        }),
      );
      canvas.add(
        new fabric.Textbox("HAS SUCCESSFULLY COMPLETED THE COURSE", {
          left: cx,
          top: 263,
          originX: "center",
          originY: "top",
          fontSize: 10.5,
          fontFamily: "Open Sans, sans-serif",
          fill: "#666",
          charSpacing: 120,
          textAlign: "center",
          width: 500,
        }),
      );
      canvas.add(
        new fabric.Textbox("[GROUP.COURSE_NAME]", {
          left: cx,
          top: 284,
          originX: "center",
          originY: "top",
          fontSize: 16,
          fontFamily: "Open Sans, sans-serif",
          fontWeight: "bold",
          fill: "#2c2c2c",
          textAlign: "center",
          width: 500,
        }),
      );
      canvas.add(
        new fabric.Line([120, 328, 270, 328], {
          stroke: "#aaa",
          strokeWidth: 0.8,
          ...noInteract,
        }),
      );
      canvas.add(
        new fabric.Textbox("[CREDENTIAL.ISSUED_ON]", {
          left: 195,
          top: 313,
          originX: "center",
          originY: "top",
          fontSize: 9,
          fontFamily: "Open Sans, sans-serif",
          fill: "#888",
          textAlign: "center",
          width: 160,
        }),
      );
      canvas.add(
        new fabric.Textbox("DATE", {
          left: 195,
          top: 333,
          originX: "center",
          originY: "top",
          fontSize: 9,
          fontFamily: "Open Sans, sans-serif",
          fill: "#777",
          charSpacing: 120,
          textAlign: "center",
          width: 80,
        }),
      );
      canvas.add(
        new fabric.Line([370, 328, 510, 328], {
          stroke: "#aaa",
          strokeWidth: 0.8,
          ...noInteract,
        }),
      );
      canvas.add(
        new fabric.Textbox("SIGNATURE", {
          left: 440,
          top: 333,
          originX: "center",
          originY: "top",
          fontSize: 9,
          fontFamily: "Open Sans, sans-serif",
          fill: "#777",
          charSpacing: 120,
          textAlign: "center",
          width: 120,
        }),
      );
    }

    canvas.renderAll();
  }, []);

  // ── History helpers
  const saveToHistory = useCallback((canvas: fabric.Canvas) => {
    const json = JSON.stringify(canvas.toJSON());
    setHistory((prev) => {
      const next = [...prev.slice(0, historyIndexRef.current + 1), json];
      historyIndexRef.current = next.length - 1;
      setHistoryIndex(next.length - 1);
      return next;
    });
  }, []);

  const undo = useCallback(() => {
    if (historyIndexRef.current <= 0 || !fabricRef.current) return;
    const idx = historyIndexRef.current - 1;
    historyIndexRef.current = idx;
    setHistoryIndex(idx);
    setHistory((prev) => {
      fabricRef
        .current!.loadFromJSON(JSON.parse(prev[idx]))
        .then(() => fabricRef.current!.renderAll());
      return prev;
    });
  }, []);

  const redo = useCallback(() => {
    setHistory((prev) => {
      if (historyIndexRef.current >= prev.length - 1 || !fabricRef.current)
        return prev;
      const idx = historyIndexRef.current + 1;
      historyIndexRef.current = idx;
      setHistoryIndex(idx);
      fabricRef
        .current!.loadFromJSON(JSON.parse(prev[idx]))
        .then(() => fabricRef.current!.renderAll());
      return prev;
    });
  }, []);

  // ── Selection handler
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectionEvent = useCallback((e: any) => {
    setHasSelection(true);
    const selected = e.selected ?? (e.target ? [e.target] : []);
    const obj = selected[0];
    if (obj && obj.type === "textbox") {
      const t = obj as fabric.Textbox;
      setSelectedFont((t.fontFamily as string) || "Open Sans");
      setSelectedSize(t.fontSize ?? 14);
      setIsBold(t.fontWeight === "bold");
      setIsItalic(t.fontStyle === "italic");
      setIsUnderline(!!t.underline);
      setTextColor((t.fill as string) || "#000000");
    }
  }, []);

  // ── Init Fabric
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: DEFAULT_DIMS.w,
      height: DEFAULT_DIMS.h,
      backgroundColor: "#faf8f3",
      selection: true,
    });
    fabricRef.current = canvas;
    drawCertificate(canvas);
    saveToHistory(canvas);

    canvas.on("selection:created", handleSelectionEvent);
    canvas.on("selection:updated", handleSelectionEvent);
    canvas.on("selection:cleared", () => setHasSelection(false));
    canvas.on("object:modified", () => {
      if (!fabricRef.current) return;
      saveToHistory(fabricRef.current);
      onUnsavedChange?.(true);
    });
    canvas.on("object:added", () => onUnsavedChange?.(true));

    return () => {
      canvas.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Text helpers
  const addText = useCallback(() => {
    if (!fabricRef.current) return;
    const t = new fabric.Textbox("Text", {
      left: 200,
      top: 150,
      width: 200,
      fontSize: 14,
      fontFamily: selectedFont,
      fill: textColor,
      textAlign: "center",
    });
    fabricRef.current.add(t);
    fabricRef.current.setActiveObject(t);
    fabricRef.current.renderAll();
    saveToHistory(fabricRef.current);
    onUnsavedChange?.(true);
  }, [selectedFont, textColor, saveToHistory, onUnsavedChange]);

  const applyTextProp = useCallback(
    (prop: Partial<fabric.Textbox>) => {
      const canvas = fabricRef.current;
      if (!canvas) return;
      const obj = canvas.getActiveObject();
      if (obj?.type === "textbox") {
        (obj as fabric.Textbox).set(prop as unknown);
        canvas.renderAll();
        saveToHistory(canvas);
        onUnsavedChange?.(true);
      }
    },
    [saveToHistory, onUnsavedChange],
  );

  const toggleBold = () => {
    const v = !isBold;
    setIsBold(v);
    applyTextProp({ fontWeight: v ? "bold" : "normal" });
  };
  const toggleItalic = () => {
    const v = !isItalic;
    setIsItalic(v);
    applyTextProp({ fontStyle: v ? "italic" : "normal" });
  };
  const toggleUnderline = () => {
    const v = !isUnderline;
    setIsUnderline(v);
    applyTextProp({ underline: v });
  };
  const changeFont = (f: string) => {
    setSelectedFont(f);
    applyTextProp({ fontFamily: f });
  };
  const changeSize = (s: number) => {
    setSelectedSize(s);
    applyTextProp({ fontSize: s });
  };
  const changeColor = (c: string) => {
    setTextColor(c);
    applyTextProp({ fill: c });
  };
  const setAlign = (a: FabricTextAlign) => applyTextProp({ textAlign: a });

  // ── Load Template
  const loadTemplate = useCallback(
    (tpl: Template, section: string) => {
      const canvas = fabricRef.current;
      if (!canvas) return;
      const config = SECTION_CONFIG[section] ?? DEFAULT_DIMS;
      canvas.setDimensions({ width: config.w, height: config.h });
      setDims(config);
      onDimsChange?.(config);
      drawCertificate(canvas);
      if (tpl.bg !== "#faf8f3") {
        canvas.backgroundColor = tpl.bg;
        const textFill = tpl.accent === "#ffffff" ? "#ffffff" : tpl.accent;
        canvas.getObjects().forEach((obj) => {
          if (obj.type === "textbox")
            (obj as fabric.Textbox).set({ fill: textFill });
        });
        canvas.renderAll();
      }
      onUnsavedChange?.(true);
      saveToHistory(canvas);
    },
    [drawCertificate, onDimsChange, onUnsavedChange, saveToHistory],
  );

  const addShape = useCallback(
    (factory: () => fabric.Object) => {
      if (!fabricRef.current) return;
      fabricRef.current.add(factory());
      fabricRef.current.renderAll();
      saveToHistory(fabricRef.current);
    },
    [saveToHistory],
  );

  // ── Expose imperative handle
  useEffect(() => {
    if (imperativeRef) {
      imperativeRef.current = { loadTemplate, addText, addShape, dims };
    }
  }, [imperativeRef, loadTemplate, addText, addShape, dims]);

  const showTextToolbar = activeTab === "text" || hasSelection;
  const scaledW = dims.w * canvasScale;
  const scaledH = dims.h * canvasScale;

  return (
    <main
      className="relative flex flex-1 flex-col items-center overflow-hidden"
      style={{ background: "#2d2d3d" }}
    >
      {sheetOpen && (
        <div
          className="absolute inset-0 z-20 bg-black/50 min-[1027px]:hidden"
          onClick={() => setSheetOpen(false)}
        />
      )}

      {/* Toolbar*/}
      <div className="flex w-full min-w-0 flex-shrink-0 items-center border-b border-gray-800 bg-gray-900">
        {showTextToolbar && (
          <div className="scrollbar-thin flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto px-3 py-1.5">
            <label className="relative flex-shrink-0 cursor-pointer">
              <div
                className="h-7 w-7 rounded border border-gray-600"
                style={{ background: textColor }}
              />
              <input
                type="color"
                value={textColor}
                onChange={(e) => changeColor(e.target.value)}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            </label>

            <select
              value={selectedFont}
              onChange={(e) => changeFont(e.target.value)}
              className="h-7 flex-shrink-0 rounded border border-gray-600 bg-gray-800 px-2 text-xs text-gray-200"
              style={{ minWidth: 120 }}
            >
              {FONTS.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>

            <select className="hidden h-7 w-20 flex-shrink-0 rounded border border-gray-600 bg-gray-800 px-2 text-xs text-gray-200 min-[1027px]:block">
              <option>Normal</option>
              <option>Bold</option>
              <option>Light</option>
            </select>

            {[
              {
                ch: "B",
                active: isBold,
                fn: toggleBold,
                s: { fontWeight: "bold" } as React.CSSProperties,
              },
              {
                ch: "I",
                active: isItalic,
                fn: toggleItalic,
                s: { fontStyle: "italic" } as React.CSSProperties,
              },
              {
                ch: "U",
                active: isUnderline,
                fn: toggleUnderline,
                s: { textDecoration: "underline" } as React.CSSProperties,
              },
            ].map(({ ch, active, fn, s }) => (
              <button
                key={ch}
                onClick={fn}
                style={s}
                className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded text-sm transition-colors ${
                  active
                    ? "bg-[#5324FB] text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {ch}
              </button>
            ))}

            <div className="h-5 w-px flex-shrink-0 bg-gray-700" />

            {[
              { icon: "alignLeft", a: "left" },
              { icon: "alignCenter", a: "center" },
              { icon: "alignRight", a: "right" },
            ].map(({ icon, a }) => (
              <button
                key={a}
                onClick={() => setAlign(a as FabricTextAlign)}
                className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded bg-gray-800 text-gray-300 transition-colors hover:bg-gray-700"
              >
                <Icon
                  d={icons[icon as keyof typeof icons] as string}
                  size={14}
                />
              </button>
            ))}

            <div className="h-5 w-px flex-shrink-0 bg-gray-700" />

            {(["valignTop", "valignMid", "valignBot"] as const).map((icon) => (
              <button
                key={icon}
                className="hidden h-7 w-7 flex-shrink-0 items-center justify-center rounded bg-gray-800 text-gray-300 transition-colors hover:bg-gray-700 sm:flex"
              >
                <Icon d={icons[icon] as string} size={14} />
              </button>
            ))}

            <div className="hidden h-5 w-px flex-shrink-0 bg-gray-700 sm:block" />

            <select
              value={selectedSize}
              onChange={(e) => changeSize(Number(e.target.value))}
              className="h-7 w-16 flex-shrink-0 rounded border border-gray-600 bg-gray-800 px-2 text-xs text-gray-200"
            >
              {FONT_SIZES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <span className="hidden flex-shrink-0 text-xs text-gray-400 min-[1027px]:inline">
              Size
            </span>
          </div>
        )}

        <div className="ml-auto flex flex-shrink-0 items-center gap-0.5 px-2 py-1.5">
          <button
            onClick={undo}
            disabled={historyIndex <= 0}
            title="Undo"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded text-gray-400 transition-all hover:bg-gray-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400"
          >
            {typeof icons.undo === "string" ? (
              <Icon d={icons.undo} size={16} />
            ) : (
              icons.undo
            )}
          </button>
          <button
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            title="Redo"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded text-gray-400 transition-all hover:bg-gray-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400"
          >
            {typeof icons.redo === "string" ? (
              <Icon d={icons.redo} size={16} />
            ) : (
              icons.redo
            )}
          </button>
        </div>
      </div>

      <p className="flex-shrink-0 pt-3 pb-2 text-[10px] tracking-widest text-gray-500 uppercase">
        {dims.label}
      </p>

      <div
        ref={canvasScrollRef}
        className="custom-scrollbar flex w-full flex-1 flex-col items-center overflow-auto px-4 pb-6"
      >
        <div style={{ width: scaledW, height: scaledH, flexShrink: 0 }}>
          <div
            style={{
              width: dims.w,
              height: dims.h,
              transformOrigin: "top left",
              transform: `scale(${canvasScale})`,
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
            }}
          >
            <canvas ref={canvasRef} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CanvasArea;
