"use client";

import { useRef, useEffect, useCallback } from "react";
import { Bold, Italic, Underline, Link, List, ListOrdered } from "lucide-react";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
}

const RichTextEditor = ({
  value,
  onChange,
  placeholder = "Copy and paste or type description here.",
  rows = 4,
  className,
}: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);

  // Set initial content only once — never on re-render
  useEffect(() => {
    if (editorRef.current && !isInitialized.current) {
      editorRef.current.innerHTML = value;
      isInitialized.current = true;
    }
  }, []);

  const execCmd = useCallback((command: string, cmdValue?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, cmdValue);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleToolClick = (command: string) => {
    if (command === "createLink") {
      const url = prompt("Enter URL:");
      if (url) execCmd(command, url);
    } else {
      execCmd(command);
    }
  };

  const tools = [
    { icon: Bold, command: "bold", title: "Bold" },
    { icon: Italic, command: "italic", title: "Italic" },
    { icon: Underline, command: "underline", title: "Underline" },
    { icon: Link, command: "createLink", title: "Link" },
    { icon: ListOrdered, command: "insertOrderedList", title: "Ordered List" },
    { icon: List, command: "insertUnorderedList", title: "Unordered List" },
  ];

  return (
    <div className={cn("overflow-hidden rounded-lg border border-[#D0D5DD]", className)}>
      {/* Toolbar */}
      <div className="flex items-center gap-1 border-b border-[#EAECF0] px-3 py-2">
        {tools.map(({ icon: Icon, command, title }) => (
          <button
            key={command}
            type="button"
            title={title}
            onMouseDown={(e) => {
              e.preventDefault(); // keep focus in editor
              handleToolClick(command);
            }}
className={cn(
  "flex h-7 w-7 items-center justify-center rounded text-[#344054] transition hover:bg-[#F2F4F7]",
  document.queryCommandState(command) && "bg-[#F9F5FF] text-[#7F56D9]"
)}
          >
            <Icon size={14} />
          </button>
        ))}
      </div>

      {/* Editable area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        data-placeholder={placeholder}
        style={{ minHeight: `${rows * 1.5}rem` }}
        className={cn(
          "w-full px-4 py-3 text-sm text-[#344054] focus:outline-none",
          "empty:before:text-[#98A2B3] empty:before:content-[attr(data-placeholder)]"
        )}
      />
    </div>
  );
};

export default RichTextEditor;