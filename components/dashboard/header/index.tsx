"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, MessageSquareWarning } from "lucide-react";

import ProfileMenu from "../profileMenu";

function DashboardHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  const modalRef = useRef<HTMLDivElement | null>(null);
  const bellRef = useRef<HTMLDivElement | null>(null);
  const notificationModalRef = useRef<HTMLDivElement | null>(null);

  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenNotificationModal = () => {
    setIsNotificationModalOpen((prevState) => !prevState);
  };
  const handleCloseNotificationModal = () => setIsNotificationModalOpen(false);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        handleCloseModal();
      }
      if (
        notificationModalRef.current &&
        !notificationModalRef.current.contains(e.target as Node) &&
        bellRef.current &&
        !bellRef.current.contains(e.target as Node)
      ) {
        handleCloseNotificationModal();
      }
    };

    if (isModalOpen || isNotificationModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen, isNotificationModalOpen]);

  return (
    <header className="sticky top-0 left-0 z-50 flex h-20 items-center justify-between border-b border-gray-200 bg-white p-4">
      <div className="relative ml-auto flex items-center gap-6">
        <div
          ref={bellRef}
          onClick={handleOpenNotificationModal}
          aria-label="Open notifications"
        >
          <div className="relative h-5 w-5">
            <Bell
              className="h-full w-full cursor-pointer text-[#667085] transition-colors hover:text-gray-600"
              aria-label="Notifications"
            />
          </div>
        </div>

        <div className="relative h-5 w-5">
          <MessageSquareWarning
            className="h-full w-full cursor-pointer text-[#667085] transition-colors hover:text-gray-600"
            aria-label="Notifications"
          />
        </div>

        <ProfileMenu />
      </div>
    </header>
  );
}

export default DashboardHeader;
