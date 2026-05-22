"use client";
import { X } from "lucide-react";
import React, { FC, ReactNode, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  header?: ReactNode;
  children?: ReactNode;
  headerStyle?: string;
  closeIconSize?: string;
  modalContentStyle?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full" | string;
  headerTextStyle?: string;
  showCloseIcon?: boolean;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  header,
  closeIconSize,
  children,
  headerStyle,
  headerTextStyle,
  modalContentStyle,
  size = "sm",
  showCloseIcon = true,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  let modalSizeClass = "";

  if (size === "xs") {
    modalSizeClass = "w-[544px] h-[180px]";
    closeIconSize = "text-lg";
  } else if (size === "sm") {
    modalSizeClass = "w-[560px] h-[206px]";
    closeIconSize = "text-xl";
  } else if (size === "md") {
    modalSizeClass = "w-[580px] h-[226px]";
    closeIconSize = "text-3xl";
  } else if (size === "lg") {
    modalSizeClass = "w-[600px] h-[246px]";
    closeIconSize = "text-lg";
  } else if (size === "xl") {
    modalSizeClass = "w-[650px] h-[266px]";
    closeIconSize = "text-lg";
  } else if (size === "2xl") {
    modalSizeClass = "w-[600px] h-[500px]";
    closeIconSize = "text-4xl";
  } else if (size === "3xl") {
    modalSizeClass = "w-[600px] h-auto";
    closeIconSize = "text-4xl";
  } else if (size === "xl") {
    modalSizeClass = "w-[80px] h-[550px]";
    closeIconSize = "text-5xl";
  } else if (size === "full") {
    modalSizeClass = "w-full h-full";
    closeIconSize = "text-5xl";
  } else if (typeof size === "string") {
    closeIconSize = "text-3xl";
    modalSizeClass = size;
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/70"
      style={{ zIndex: 9000, transform: "translate3d(0, 0, 0)" }}
    >
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />

      <div
        className={`no-scrollbar relative overflow-y-auto ${size === "full" ? "" : "rounded-xl"} bg-white py-6 shadow-md ${modalSizeClass} ${modalContentStyle}`}
      >
        {header && (
          <div className={`px-6 pb-4 ${headerStyle}`}>
            {showCloseIcon && (
              <span
                className={`cursor-pointer text-lg text-gray-500 ${closeIconSize}`}
                onClick={onClose}
              >
                <X />
              </span>
            )}
            <div className={`${headerTextStyle}`}>{header}</div>
          </div>
        )}

        <div className="px-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
