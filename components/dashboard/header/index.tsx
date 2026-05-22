"use client";
import { Button } from "@/components/ui/button";
// import Profile from './profile';
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
// import { NotificationProps } from '@/components/utils/types';
// import NotificationModal from '@/components/dashboard/notifications/modal';
import { Bell, MessageSquareWarning } from "lucide-react";
import { useRouter } from "next/navigation";
import ProfileMenu from "../profileMenu";
// import { email, phoneNumber } from '@/lib/constant';
// import { formatDistanceToNow } from 'date-fns';
// import { useGetAllNotifications } from '@/components/api/get/notification';
// import { useUpdateReadNotification } from '@/components/api/patch/notification';
// import { useWebSocket } from '@/components/utils/socket/useWebsocket';
// import { useUserProfile } from '@/components/api/get/user';

function DashboardHeader() {
  //   const {
  //     data: NotificationtData = [],
  //     error: notificationError,
  //     refetch: refetchNotifications,
  //   } = useGetAllNotifications();
  //   const { mutate: readUpdate } = useUpdateReadNotification();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [selectedNotificationId, setSelectedNotificationId] = useState<
    string | null
  >(null);
  const [notificationLoading, setNotificationLoading] = useState(false);

  //   const { data } = useUserProfile();

  //   const socket = useWebSocket();

  const modalRef = useRef<HTMLDivElement | null>(null);
  const bellRef = useRef<HTMLDivElement | null>(null);
  const notificationModalRef = useRef<HTMLDivElement | null>(null);

  // Transform notification data
  //   const notifications: NotificationProps[] = useMemo(() => {
  //     return (
  //       NotificationtData?.map((notification: any, index: number) => ({
  //         _id: notification._id || `${index}`,
  //         title: notification.title,
  //         type: notification.type,
  //         message: notification.message,
  //         time: formatDistanceToNow(new Date(notification.createdAt)) + ' ago',
  //         icon: notification.icon || '',
  //         isRead: notification.isRead,
  //         link: notification.link,
  //       })) || []
  //     );
  //   }, [NotificationtData]);

  //   const unreadNotificationCount = useMemo(
  //     () => notifications.filter((notification) => !notification.isRead).length,
  //     [notifications]
  //   );

  //   useEffect(() => {
  //     if (socket) {
  //       socket.on('notification', () => {
  //         refetchNotifications();
  //       });

  //       return () => {
  //         socket.off('notification');
  //       };
  //     }
  //   }, [socket]);

  //   const handleNotificationClick = (e: React.MouseEvent, notificationId: string) => {
  //     e.preventDefault();
  //     e.stopPropagation();

  //     setNotificationLoading(true);
  //     setSelectedNotificationId(notificationId);

  //     readUpdate(notificationId, {
  //       onSuccess: () => {
  //         refetchNotifications();
  //         setNotificationLoading(false);
  //       },
  //       onError: () => {
  //         setNotificationLoading(false);
  //       },
  //     });
  //   };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenNotificationModal = () => {
    setIsNotificationModalOpen((prevState) => !prevState);
  };
  const handleCloseNotificationModal = () => setIsNotificationModalOpen(false);
  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedNotificationId(null);
  };

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
    <header className="sticky top-0 left-0 z-50 flex items-center justify-between border-b border-gray-200 bg-white p-4">
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
            {/* {unreadNotificationCount > 0 ? (
              <span className="absolute right-[4px] top-[1px] flex h-[8px] w-[8px] items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white ring-1 ring-white"></span>
            ) : null} */}
          </div>
          {/* {isNotificationModalOpen && (
            <div className="absolute left-[-90px] top-14 z-50 flex items-center justify-center">
              <NotificationModal
                unreadNotificationCount={unreadNotificationCount}
                isNotificationModalOpen={isNotificationModalOpen}
                notifications={notifications}
                selectedNotificationId={selectedNotificationId}
                handleCloseNotificationModal={handleCloseNotificationModal}
                handleNotificationClick={handleNotificationClick}
                notificationModalRef={notificationModalRef}
                handleBackClick={handleBackClick}
                notificationLoading={notificationLoading}
              />
            </div>
          )} */}
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
