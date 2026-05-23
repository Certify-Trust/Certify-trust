"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const icons = {
  billing: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M8.66927 3.33333C8.66927 4.06971 7.02765 4.66667 5.0026 4.66667C2.97756 4.66667 1.33594 4.06971 1.33594 3.33333M8.66927 3.33333C8.66927 2.59695 7.02765 2 5.0026 2C2.97756 2 1.33594 2.59695 1.33594 3.33333M8.66927 3.33333V4.33333M1.33594 3.33333V11.3333C1.33594 12.0697 2.97756 12.6667 5.0026 12.6667M5.0026 7.33333C4.89024 7.33333 4.77906 7.3315 4.66927 7.3279C2.80044 7.26666 1.33594 6.69552 1.33594 6M5.0026 10C2.97756 10 1.33594 9.40305 1.33594 8.66667M14.6693 7.66667C14.6693 8.40305 13.0276 9 11.0026 9C8.97756 9 7.33594 8.40305 7.33594 7.66667M14.6693 7.66667C14.6693 6.93029 13.0276 6.33333 11.0026 6.33333C8.97756 6.33333 7.33594 6.93029 7.33594 7.66667M14.6693 7.66667V12.6667C14.6693 13.403 13.0276 14 11.0026 14C8.97756 14 7.33594 13.403 7.33594 12.6667V7.66667M14.6693 10.1667C14.6693 10.903 13.0276 11.5 11.0026 11.5C8.97756 11.5 7.33594 10.903 7.33594 10.1667"
        stroke="#344054"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  issuerVerification: (
    <svg
      width="11"
      height="16"
      viewBox="0 0 11 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.89 9.25996L2.08333 15.3333L5.41667 13.3333L8.75 15.3333L7.94333 9.25329M10.0833 5.33329C10.0833 7.91062 7.994 9.99996 5.41667 9.99996C2.83934 9.99996 0.75 7.91062 0.75 5.33329C0.75 2.75596 2.83934 0.666626 5.41667 0.666626C7.994 0.666626 10.0833 2.75596 10.0833 5.33329Z"
        stroke="#344054"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  settings: (
    <svg
      width="14"
      height="16"
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.26271 12.9142L5.65234 13.7905C5.76817 14.0514 5.95719 14.273 6.19649 14.4286C6.43579 14.5841 6.71508 14.6669 7.00049 14.6668C7.2859 14.6669 7.56519 14.5841 7.80449 14.4286C8.04378 14.273 8.23281 14.0514 8.34864 13.7905L8.73827 12.9142C8.87696 12.6033 9.11027 12.3441 9.40493 12.1735C9.70146 12.0025 10.0445 11.9296 10.3849 11.9653L11.3383 12.0668C11.622 12.0968 11.9084 12.0439 12.1627 11.9144C12.417 11.7849 12.6283 11.5844 12.7709 11.3372C12.9136 11.0902 12.9817 10.807 12.9667 10.5221C12.9517 10.2372 12.8543 9.9627 12.6864 9.73202L12.122 8.95646C11.921 8.67825 11.8136 8.34337 11.8153 8.00016C11.8152 7.65789 11.9236 7.3244 12.1249 7.04757L12.6894 6.27201C12.8573 6.04133 12.9547 5.76688 12.9696 5.48195C12.9846 5.19701 12.9166 4.91386 12.7738 4.66683C12.6312 4.41965 12.42 4.21916 12.1657 4.08965C11.9114 3.96014 11.625 3.90718 11.3412 3.9372L10.3879 4.03868C10.0474 4.07444 9.70442 4.00158 9.4079 3.83053C9.11265 3.659 8.87928 3.3984 8.74123 3.08609L8.34864 2.20979C8.23281 1.94894 8.04378 1.72731 7.80449 1.57176C7.56519 1.41622 7.2859 1.33345 7.00049 1.3335C6.71508 1.33345 6.43579 1.41622 6.19649 1.57176C5.95719 1.72731 5.76817 1.94894 5.65234 2.20979L5.26271 3.08609C5.12466 3.3984 4.89129 3.659 4.59604 3.83053C4.29952 4.00158 3.95649 4.07444 3.61604 4.03868L2.65975 3.9372C2.37597 3.90718 2.08957 3.96014 1.83529 4.08965C1.58101 4.21916 1.36976 4.41965 1.22715 4.66683C1.08437 4.91386 1.01634 5.19701 1.03133 5.48195C1.04632 5.76688 1.14368 6.04133 1.3116 6.27201L1.87604 7.04757C2.07734 7.3244 2.18574 7.65789 2.18567 8.00016C2.18574 8.34244 2.07734 8.67593 1.87604 8.95276L1.3116 9.72831C1.14368 9.95899 1.04632 10.2335 1.03133 10.5184C1.01634 10.8033 1.08437 11.0865 1.22715 11.3335C1.3699 11.5805 1.58117 11.7809 1.83542 11.9104C2.08967 12.0399 2.37599 12.093 2.65975 12.0631L3.61308 11.9616C3.95353 11.9259 4.29656 11.9987 4.59308 12.1698C4.88943 12.3408 5.12389 12.6015 5.26271 12.9142Z"
        stroke="#344054"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.9993 10.0002C8.10387 10.0002 8.9993 9.10473 8.9993 8.00016C8.9993 6.89559 8.10387 6.00016 6.9993 6.00016C5.89473 6.00016 4.9993 6.89559 4.9993 8.00016C4.9993 9.10473 5.89473 10.0002 6.9993 10.0002Z"
        stroke="#344054"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  manageAttributes: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.66659 4.66671H4.67325M13.7266 8.94004L8.94659 13.72C8.82275 13.844 8.6757 13.9424 8.51384 14.0095C8.35198 14.0766 8.17847 14.1111 8.00325 14.1111C7.82803 14.1111 7.65453 14.0766 7.49267 14.0095C7.3308 13.9424 7.18375 13.844 7.05992 13.72L1.33325 8.00004V1.33337H7.99992L13.7266 7.06004C13.9749 7.30986 14.1143 7.64779 14.1143 8.00004C14.1143 8.35229 13.9749 8.69022 13.7266 8.94004Z"
        stroke="#344054"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  teamMembers: (
    <svg
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.3334 12.75V11.4167C11.3334 10.7094 11.0525 10.0311 10.5524 9.53105C10.0523 9.03095 9.37399 8.75 8.66675 8.75H3.33341C2.62617 8.75 1.94789 9.03095 1.4478 9.53105C0.9477 10.0311 0.666748 10.7094 0.666748 11.4167V12.75M15.3334 12.75V11.4167C15.333 10.8258 15.1363 10.2518 14.7743 9.78488C14.4123 9.3179 13.9055 8.98438 13.3334 8.83667M10.6667 0.836667C11.2404 0.983534 11.7488 1.31713 12.1118 1.78487C12.4749 2.25261 12.672 2.82789 12.672 3.42C12.672 4.01211 12.4749 4.58739 12.1118 5.05513C11.7488 5.52287 11.2404 5.85647 10.6667 6.00333M8.66675 3.41667C8.66675 4.88943 7.47284 6.08333 6.00008 6.08333C4.52732 6.08333 3.33341 4.88943 3.33341 3.41667C3.33341 1.94391 4.52732 0.75 6.00008 0.75C7.47284 0.75 8.66675 1.94391 8.66675 3.41667Z"
        stroke="#344054"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  help: (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.47667 5.41667C5.6334 4.97111 5.94277 4.5954 6.34997 4.35609C6.75717 4.11677 7.23593 4.02929 7.70145 4.10914C8.16697 4.18899 8.58921 4.43102 8.89338 4.79235C9.19756 5.15369 9.36404 5.61101 9.36333 6.08333C9.36333 7.41667 7.36333 8.08333 7.36333 8.08333M7.41667 10.75H7.42333M14.0833 7.41667C14.0833 11.0986 11.0986 14.0833 7.41667 14.0833C3.73477 14.0833 0.75 11.0986 0.75 7.41667C0.75 3.73477 3.73477 0.75 7.41667 0.75C11.0986 0.75 14.0833 3.73477 14.0833 7.41667Z"
        stroke="#344054"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  logout: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.0007 5.33333L14.6673 8M14.6673 8L12.0007 10.6667M14.6673 8H6.00065M10.0007 2.80269C9.15082 2.29218 8.16415 2 7.11176 2C3.92078 2 1.33398 4.68629 1.33398 8C1.33398 11.3137 3.92078 14 7.11176 14C8.16415 14 9.15082 13.7078 10.0007 13.1973"
        stroke="#344054"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

type MenuItem =
  | {
      type: "link";
      label: string;
      href: string;
      icon: React.ReactNode;
      onClickExtra?: () => void;
    }
  | {
      type: "button";
      label: string;
      icon: React.ReactNode;
      onClick: () => void;
    };

const baseItemClass =
  "flex cursor-pointer text-sm font-medium text-gray-700 items-center px-4 py-2 hover:bg-gray-50";

function ProfileMenu() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLUListElement | null>(null);

  const close = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  const menuItems: MenuItem[] = [
    {
      type: "link",
      label: "Billing",
      href: "#",
      icon: icons.billing,
      onClickExtra: close,
    },
    {
      type: "link",
      label: "Issuer Verification",
      href: "#",
      icon: icons.issuerVerification,
      onClickExtra: close,
    },
    {
      type: "link",
      label: "Settings",
      href: "#",
      icon: icons.settings,
      onClickExtra: close,
    },
    {
      type: "link",
      label: "Manage Attributes",
      href: "#",
      icon: icons.manageAttributes,
      onClickExtra: close,
    },
    {
      type: "link",
      label: "Team Members",
      href: "#",
      icon: icons.teamMembers,
      onClickExtra: close,
    },
    {
      type: "link",
      label: "Help",
      href: "#",
      icon: icons.help,
      onClickExtra: close,
    },
    {
      type: "button",
      label: "Logout",
      icon: icons.logout,
      onClick: () => {
        /* handleLogout() */ close();
        router.push("/");
      },
    },
  ];

  return (
    <div className="relative inline-block">
      {/* Avatar trigger */}
      <div
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gray-200 font-medium text-gray-600"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span>S.K</span>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-3 z-10 mt-2 w-60 rounded-lg bg-white py-2 shadow-lg">
          <ul className="text-gray-700" ref={modalRef}>
            <div className="flex h-15.5 items-center gap-2 pl-2.5">
              <div
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-600"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-haspopup="true"
                aria-expanded={isOpen}
              >
                <span>S.K</span>
              </div>

              <div>
                <h3 className="font-medium">Christopher Sani</h3>
                <p className="text-sm">sani.christopher@gmail.com</p>
              </div>
            </div>

            <div className="flex h-19 flex-col justify-center bg-[#F4F6FF] px-4">
              <h6 className="text-sm font-medium">CertifyTrusts</h6>
              <p className="text-xs">ID: 028845</p>
            </div>

            {/* Dynamic menu items */}
            {menuItems.map((item) =>
              item.type === "link" ? (
                <li key={item.label} className={baseItemClass}>
                  <Link
                    className="flex items-center py-[2px]"
                    href={item.href}
                    onClick={item.onClickExtra}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              ) : (
                <li key={item.label}>
                  <div onClick={item.onClick} className={baseItemClass}>
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </div>
                </li>
              ),
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
