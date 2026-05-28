"use client";

import React, { useRef, useState } from "react";
import * as fabric from "fabric";
import { cn } from "@/lib/utils";
import { SideTab, Template } from "@/types/editor";
import { TEMPLATES } from "@/constants/editor";
import CanvasArea, { CanvasAreaHandle } from "@/components/canvas/CanvasArea";
import { Icon, icons } from "@/components/canvas/Icons";

// ─── Template thumbnail
const TemplateThumb = ({
  tpl,
  isPortrait,
  onClick,
}: {
  tpl: Template;
  isPortrait: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="flex-shrink-0 cursor-pointer overflow-hidden rounded border border-transparent transition-all hover:border-[#5324FB]"
    style={{
      width: isPortrait ? "30%" : "45%",
      height: isPortrait ? 116 : 78,
      background: tpl.bg,
    }}
    title={tpl.label}
  >
    <div className="flex h-full w-full flex-col items-center justify-center gap-0.5 p-1">
      <div
        className="text-[5px] font-bold tracking-widest"
        style={{ color: tpl.accent === "#ffffff" ? "#fff" : "#555" }}
      >
        CERTIFICATE
      </div>
      <div
        className="text-[4px]"
        style={{ color: tpl.accent === "#ffffff" ? "#ccc" : "#888" }}
      >
        OF ACHIEVEMENT
      </div>
      <div className="mt-1 text-[6px] font-bold" style={{ color: tpl.accent }}>
        {tpl.label === "Navy" ? "[recipient.name]" : "[RECIPIENT.NAME]"}
      </div>
    </div>
  </button>
);

// ─── Main Component
const CreateDesigns: React.FC = () => {
  const canvasAreaRef = useRef<CanvasAreaHandle | null>(null);

  const [activeTab, setActiveTab] = useState<SideTab>("templates");
  const [hasUnsaved, setHasUnsaved] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const navItems: { tab: SideTab; icon: keyof typeof icons; label: string }[] =
    [
      { tab: "myDesigns", icon: "myDesigns", label: "My Designs" },
      { tab: "templates", icon: "templates", label: "Templates" },
      { tab: "text", icon: "text", label: "Text" },
      { tab: "elements", icon: "elements", label: "Elements" },
      { tab: "attributes", icon: "attributes", label: "Attributes" },
      { tab: "qrCode", icon: "qrCode", label: "QR Code" },
      { tab: "document", icon: "document", label: "Document" },
    ];

  // ── Sidebar panel content
  const renderPanelContent = () => {
    if (activeTab === "templates") {
      return (
        <div className="space-y-5">
          {Object.entries(TEMPLATES).map(([section, tpls]) => {
            const isPortrait = section.includes("PORTRAIT");
            return (
              <div key={section}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">
                    {section}
                  </span>
                  <button className="text-xs font-semibold text-[#D6CBFF] hover:text-[#D6CBFF]/80">
                    ALL
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tpls.map((tpl) => (
                    <TemplateThumb
                      key={tpl.id}
                      tpl={tpl}
                      isPortrait={isPortrait}
                      onClick={() => {
                        canvasAreaRef.current?.loadTemplate(tpl, section);
                        setSheetOpen(false);
                      }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    if (activeTab === "text") {
      return (
        <div>
          <button
            onClick={() => {
              canvasAreaRef.current?.addText();
              setSheetOpen(false);
            }}
            className="w-full cursor-pointer bg-[#5324FB] py-2 text-sm text-white transition-all duration-300 hover:bg-[#5324FB]/80"
          >
            Add Text
          </button>
        </div>
      );
    }

    if (activeTab === "elements") {
      const shapes: { label: string; factory: () => fabric.Object }[] = [
        {
          label: "Rectangle",
          factory: () =>
            new fabric.Rect({
              left: 200,
              top: 160,
              width: 120,
              height: 80,
              fill: "transparent",
              stroke: "#c9a84c",
              strokeWidth: 2,
            }),
        },
        {
          label: "Circle",
          factory: () =>
            new fabric.Circle({
              left: 240,
              top: 160,
              radius: 40,
              fill: "transparent",
              stroke: "#c9a84c",
              strokeWidth: 2,
            }),
        },
        {
          label: "Line",
          factory: () =>
            new fabric.Line([150, 220, 470, 220], {
              stroke: "#c9a84c",
              strokeWidth: 1.5,
            }),
        },
      ];
      return (
        <div className="space-y-2">
          <p className="mb-3 text-xs text-gray-400">Add shapes & lines</p>
          {shapes.map(({ label, factory }) => (
            <button
              key={label}
              onClick={() => {
                canvasAreaRef.current?.addShape(factory);
                setSheetOpen(false);
              }}
              className="w-full rounded px-3 py-2 text-left text-sm text-gray-300 transition-colors hover:bg-gray-700"
            >
              + {label}
            </button>
          ))}
        </div>
      );
    }

    return (
      <div className="flex h-32 items-center justify-center">
        <p className="text-center text-xs text-gray-500">
          No options available
          <br />
          for this panel.
        </p>
      </div>
    );
  };

  const handleMobileTab = (tab: SideTab) => {
    if (activeTab === tab && sheetOpen) {
      setSheetOpen(false);
    } else {
      setActiveTab(tab);
      setSheetOpen(true);
    }
  };

  return (
    <div
      className="flex h-screen flex-col overflow-hidden bg-gray-950 text-white"
      style={{ fontFamily: "'Open Sans', sans-serif" }}
    >
      {/* ── Top Bar ── */}
      <header className="flex h-[52px] flex-shrink-0 items-center justify-between gap-2 bg-[#5324FB] px-3 sm:px-6">
        <button className="flex flex-shrink-0 cursor-pointer items-center gap-1.5 text-sm text-white transition-colors hover:text-white/80">
          <Icon d={icons.chevronLeft} size={16} />
          <span className="hidden sm:inline">Close</span>
        </button>

        <div className="flex min-w-0 flex-1 items-center justify-center gap-2">
          <span className="max-w-[140px] truncate text-sm text-white sm:max-w-none">
            Untitled
          </span>
          <button className="flex-shrink-0 cursor-pointer text-white hover:text-white/60">
            <Icon d={icons.edit} size={15} />
          </button>
        </div>

        <div className="flex flex-shrink-0 items-center gap-2 sm:gap-3">
          {hasUnsaved && (
            <span className="hidden text-xs text-white italic lg:inline">
              You have unsaved changes
            </span>
          )}
          {hasUnsaved && (
            <span
              className="h-2 w-2 flex-shrink-0 rounded-full bg-yellow-400 lg:hidden"
              title="Unsaved changes"
            />
          )}
          <button
            onClick={() => setHasUnsaved(false)}
            className="cursor-pointer rounded border border-white bg-[#6C45FF] px-2.5 py-1.5 text-xs font-semibold transition-colors hover:bg-[#6C45FF]/60 sm:px-3.5 sm:py-2"
          >
            <span className="hidden sm:inline">Save and Close</span>
            <span className="sm:hidden">Save</span>
          </button>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* ── Desktop Nav Rail ── */}
        <nav className="hidden w-[122px] shrink-0 flex-col items-center gap-1 bg-[#303030] py-2 min-[1027px]:flex">
          {navItems.map(({ tab, icon, label }) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                activeTab === tab ? "bg-[#3D464D]" : "",
                "flex h-[88px] w-full cursor-pointer flex-col items-center justify-center gap-2 transition-colors duration-300 hover:bg-[#3D464D]",
              )}
            >
              {typeof icons[icon] === "string" ? (
                <Icon d={icons[icon] as string} size={20} />
              ) : (
                icons[icon]
              )}
              <span className="text-center text-xs leading-tight">{label}</span>
            </button>
          ))}
        </nav>

        {/* ── Desktop Side Panel ── */}
        <aside
          className="hidden flex-shrink-0 flex-col overflow-hidden min-[1027px]:flex"
          style={{
            width: 260,
            background: "#3D464D",
            borderRight: "1px solid #333",
          }}
        >
          <div className="px-3 pt-3 pb-1">
            <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
              {navItems.find((n) => n.tab === activeTab)?.label}
            </p>
          </div>
          <div className="flex-1 overflow-y-auto px-3 py-3">
            {renderPanelContent()}
          </div>
        </aside>

        {/* ── Canvas Area */}
        <CanvasArea
          activeTab={activeTab}
          sheetOpen={sheetOpen}
          setSheetOpen={setSheetOpen}
          onUnsavedChange={setHasUnsaved}
          imperativeRef={canvasAreaRef}
        />

        {/* ── Mobile slide-up sheet */}
        <div
          className={cn(
            "absolute right-0 bottom-0 left-0 z-30 flex flex-col rounded-t-2xl bg-[#3D464D] transition-transform duration-300 ease-in-out min-[1027px]:hidden",
            sheetOpen ? "translate-y-0" : "translate-y-full",
          )}
          style={{ maxHeight: "60%" }}
        >
          <div className="mx-auto mt-3 mb-2 h-1 w-9 flex-shrink-0 rounded-full bg-white/20" />
          <p className="flex-shrink-0 border-b border-white/10 pb-2 text-center text-[10px] font-bold tracking-widest text-gray-400 uppercase">
            {navItems.find((n) => n.tab === activeTab)?.label}
          </p>
          <div className="flex-1 overflow-y-auto p-4">
            {renderPanelContent()}
          </div>
        </div>
      </div>

      {/* ── Mobile Bottom Nav ── */}
      <nav
        className="flex flex-shrink-0 overflow-x-auto border-t border-[#222] bg-[#303030] min-[1027px]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {navItems.map(({ tab, icon, label }) => (
          <button
            key={tab}
            onClick={() => handleMobileTab(tab)}
            className={cn(
              activeTab === tab && sheetOpen ? "text-white" : "text-white/50",
              "flex min-w-[56px] flex-shrink-0 cursor-pointer flex-col items-center justify-center gap-1 px-3 py-2 transition-colors hover:text-white",
            )}
          >
            {typeof icons[icon] === "string" ? (
              <Icon d={icons[icon] as string} size={18} />
            ) : (
              icons[icon]
            )}
            <span className="text-[9px] leading-tight whitespace-nowrap">
              {label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default CreateDesigns;
