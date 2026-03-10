"use client";

import { useState, useEffect, useRef } from "react";
import { Link as LinkScroll } from "react-scroll";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Logo from "@/assets/icons/Logo";

import { motion, AnimatePresence } from "framer-motion";
import { navigation } from "@/constants/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DonateIcon from "@/assets/icons/DonateIcon";
// import MenuIcon from "@/assets/icons/MenuIcon";

export default function Header() {
  const pathname = usePathname();

  const [nav, setNav] = useState(false);
  const [boxShadow, setBoxShadow] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const donateRef = useRef<HTMLDivElement | null>(null);

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  useEffect(() => {
    document.body.style.overflow = nav ? "hidden" : "auto";
  }, [nav]);

  const toggleNav = () => setNav(!nav);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        modalRef.current &&
        !modalRef.current.contains(target) &&
        donateRef.current &&
        !donateRef.current.contains(target)
      ) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 z-50 h-[103px] w-full border-b border-[#E8E8E8] bg-[#FFFFFF1F] bg-white px-6 backdrop-blur-sm transition-all duration-300 ${boxShadow ? "shadow-sm" : ""}`}
      >
        <div className="relative mx-auto flex h-full max-w-[1312px] items-center justify-between">
          <Link href="/" className="hidden cursor-pointer sm:block">
            <Logo />
          </Link>
          <Link href="/" className="cursor-pointer sm:hidden">
            <Logo width={119} height={40} />
          </Link>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="hidden items-center gap-6 gap-8 min-[730px]:flex"
          >
            {navigation().map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center gap-2 text-base font-[380] transition-colors hover:text-[#3842E2] ${
                    isActive ? "text-[#3842E2]" : "text-[#080808]"
                  }`}
                >
                  {item.title}
                  {item.icon && (
                    <span className="flex items-center">{item.icon}</span>
                  )}
                </Link>
              );
            })}

            <button className="cursor-pointer rounded-[100px] bg-[#5324FB] px-3 py-2 text-white">
              Get Certifytrusts
            </button>

            <div ref={donateRef} onClick={toggleModal}>
              <DonateIcon />
            </div>
          </motion.div>

          {/* Hamburger */}
          <div
            className="cursor-pointer min-[730px]:hidden"
            onClick={toggleNav}
          >
            {/* <AiOutlineMenu size={25} /> */}

            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.75 5.25H20.25C20.6646 5.25 21 4.91456 21 4.54219C21 4.16981 20.6625 3.75 20.25 3.75H0.75C0.335438 3.75 0 4.08562 0 4.45781C0 4.83 0.335438 5.25 0.75 5.25ZM23.25 11.25H3.75C3.33562 11.25 3 11.5875 3 12C3 12.4125 3.33544 12.75 3.75 12.75H23.25C23.6625 12.75 24 12.4125 24 12C24 11.5875 23.6625 11.25 23.25 11.25ZM20.25 18.75H0.75C0.335438 18.75 0 19.0854 0 19.4578C0 19.8302 0.335438 20.25 0.75 20.25H20.25C20.6646 20.25 21 19.9146 21 19.5422C21 19.1698 20.6625 18.75 20.25 18.75Z"
                fill="black"
              />
            </svg>
          </div>

          {isModalOpen && (
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="absolute top-[90px] right-0 min-h-[220px] w-fit rounded-md border border-gray-200 bg-white px-5 py-6"
            >
              <div className="flex items-start gap-4">
                <svg
                  width="29"
                  height="29"
                  viewBox="0 0 29 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.45915 13.3051C6.37628 12.771 6.33328 12.2238 6.33328 11.6667C6.33328 5.77563 11.1403 1 17.0701 1C22.9999 1 27.807 5.77563 27.807 11.6667C27.807 12.9974 27.5617 14.2713 27.1135 15.446C27.0205 15.69 26.9739 15.812 26.9528 15.9072C26.9319 16.0016 26.9238 16.068 26.9215 16.1646C26.9192 16.2621 26.9324 16.3696 26.9589 16.5844L27.4957 20.9447C27.5538 21.4167 27.5828 21.6527 27.5043 21.8243C27.4355 21.9746 27.3133 22.094 27.1615 22.1593C26.9881 22.2339 26.7528 22.1994 26.2823 22.1304L22.0353 21.5079C21.8135 21.4754 21.7026 21.4591 21.6017 21.4597C21.5018 21.4603 21.4326 21.4676 21.3349 21.4882C21.236 21.509 21.1098 21.5563 20.8573 21.6508C19.6796 22.092 18.4032 22.3333 17.0701 22.3333C16.5125 22.3333 15.9649 22.2911 15.4302 22.2097M8.50877 27.6667C12.462 27.6667 15.6667 24.3834 15.6667 20.3333C15.6667 16.2832 12.462 13 8.50877 13C4.55558 13 1.35088 16.2832 1.35088 20.3333C1.35088 21.1475 1.48037 21.9306 1.7194 22.6623C1.82044 22.9716 1.87096 23.1263 1.88754 23.2319C1.90485 23.3422 1.90789 23.4042 1.90144 23.5156C1.89526 23.6224 1.86855 23.7431 1.81513 23.9844L1 27.6667L4.99307 27.1213C5.21102 27.0916 5.32 27.0767 5.41516 27.0773C5.51536 27.078 5.56854 27.0834 5.66681 27.103C5.76014 27.1216 5.89888 27.1706 6.17636 27.2685C6.90746 27.5266 7.69214 27.6667 8.50877 27.6667Z"
                    stroke="#5324FB"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <div>
                  <h6 className="font-semibold text-gray-900">Donate</h6>
                  <p className="max-w-[346px] text-sm text-gray-600">
                    Discover how individuals and businesses can contribute to
                    Certifytrusts and the open-source community.
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-start gap-4">
                <svg
                  width="29"
                  height="26"
                  viewBox="0 0 29 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.99991 14.3333C4.99991 9.91506 8.58163 6.33333 12.9999 6.33333M4.99991 14.3333C4.99991 16.5312 5.88621 18.522 7.3209 19.9679C7.45926 20.1074 7.52844 20.1771 7.56928 20.2442C7.60825 20.3081 7.63093 20.3632 7.64834 20.4361C7.66657 20.5124 7.66657 20.5993 7.66657 20.7731V23.9333C7.66657 24.3067 7.66657 24.4934 7.73924 24.636C7.80315 24.7614 7.90514 24.8634 8.03058 24.9273C8.17319 25 8.35987 25 8.73324 25H11.2666C11.6399 25 11.8266 25 11.9692 24.9273C12.0947 24.8634 12.1967 24.7614 12.2606 24.636C12.3332 24.4934 12.3332 24.3067 12.3332 23.9333V23.4C12.3332 23.0266 12.3332 22.8399 12.4059 22.6973C12.4698 22.5719 12.5718 22.4699 12.6972 22.406C12.8399 22.3333 13.0265 22.3333 13.3999 22.3333H15.2666C15.6399 22.3333 15.8266 22.3333 15.9692 22.406C16.0947 22.4699 16.1967 22.5719 16.2606 22.6973C16.3332 22.8399 16.3332 23.0266 16.3332 23.4V23.9333C16.3332 24.3067 16.3332 24.4934 16.4059 24.636C16.4698 24.7614 16.5718 24.8634 16.6972 24.9273C16.8399 25 17.0265 25 17.3999 25H19.9333C20.3067 25 20.4934 25 20.636 24.9273C20.7614 24.8634 20.8634 24.7614 20.9273 24.636C21 24.4934 21 24.3067 21 23.9333V22.6324C21 22.363 21 22.2283 21.0384 22.1202C21.0751 22.0165 21.1214 21.944 21.2 21.867C21.2819 21.7867 21.4207 21.7222 21.6982 21.5934C23.0079 20.9854 24.1254 20.0334 24.9348 18.8536C25.0772 18.6461 25.1483 18.5423 25.2243 18.4811C25.297 18.4225 25.3622 18.3881 25.4517 18.3613C25.5452 18.3333 25.6562 18.3333 25.8783 18.3333H26.6C26.9734 18.3333 27.1601 18.3333 27.3027 18.2607C27.4281 18.1968 27.5301 18.0948 27.594 17.9693C27.6667 17.8267 27.6667 17.64 27.6667 17.2667V12.7143C27.6667 12.3589 27.6667 12.1812 27.6006 12.044C27.5351 11.908 27.4253 11.7982 27.2893 11.7327C27.1522 11.6667 26.9745 11.6667 26.619 11.6667C26.3617 11.6667 26.2331 11.6667 26.1295 11.6317C26.0177 11.5941 25.9394 11.544 25.8583 11.4584C25.7831 11.379 25.7218 11.2462 25.599 10.9806C25.2051 10.1283 24.6655 9.35703 24.0123 8.69872C23.874 8.55927 23.8048 8.48955 23.764 8.4225C23.725 8.35852 23.7023 8.30345 23.6849 8.23059C23.6667 8.15423 23.6667 8.06734 23.6667 7.89357V6.4141C23.6667 5.93404 23.6667 5.69401 23.5667 5.53267C23.4791 5.39134 23.3419 5.28784 23.1819 5.24246C22.9994 5.19066 22.7686 5.2566 22.307 5.38848L19.1435 6.29229C19.0898 6.30765 19.0629 6.31533 19.0356 6.32072C19.0113 6.32551 18.9868 6.32895 18.9621 6.33101C18.9344 6.33333 18.9062 6.33333 18.8499 6.33333H12.9999M4.99991 14.3333H3.66667C2.19391 14.3333 1 13.1394 1 11.6667C1 10.6796 1.53626 9.81783 2.33333 9.35675M12.9999 6.33333H18.2861C18.3172 6.1156 18.3333 5.89301 18.3333 5.66667C18.3333 3.08934 16.244 1 13.6667 1C11.0893 1 9 3.08934 9 5.66667C9 6.22294 9.09733 6.75648 9.27589 7.25118C10.3882 6.66508 11.6553 6.33333 12.9999 6.33333Z"
                    stroke="#5324FB"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <div>
                  <h6 className="font-semibold text-gray-900">
                    Join Community
                  </h6>
                  <p className="max-w-[346px] text-sm text-gray-600">
                    Join us in making a difference! Discover how you can support
                    Certifytrusts and others.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* ===== OVERLAY ===== */}
      {nav && (
        <div onClick={toggleNav} className="fixed inset-0 z-40 bg-black/70" />
      )}

      {/* ===== DRAWER ===== */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-[75%] bg-white p-6 transition-transform duration-500 ease-in-out sm:w-[60%] sm:p-10 md:w-[45%] ${nav ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between">
          <Link href={"/"} onClick={toggleNav}>
            <Logo width={112} height={35} />
          </Link>
          <button onClick={toggleNav} className="rounded-full p-3 shadow-lg">
            <AiOutlineClose />
          </button>
        </div>

        <div className="mt-24 flex flex-col gap-8">
          {navigation().map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={toggleNav}
                className={`font-spline flex items-center gap-2 border-b border-gray-300 pb-3 text-base transition-colors hover:text-[#3842E2] ${
                  isActive ? "text-[#3842E2]" : "text-[#080808]"
                }`}
              >
                {item.title}
                {/* {item.icon && (
                  <span className="flex items-center">{item.icon}</span>
                )} */}
              </Link>
            );
          })}

          {/* <div onClick={() => setIsModalOpen(true)}>
            <DonateIcon />
          </div> */}

          <button className="cursor-pointer rounded-[100px] bg-[#5324FB] px-3 py-2 text-white">
            Get Certifytrusts
          </button>
        </div>
      </aside>
    </>
  );
}
