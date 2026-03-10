"use client";

import { useState, useEffect } from "react";
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
  const [showDesktopNav, setShowDesktopNav] = useState(false);
  const [manualOverride, setManualOverride] = useState(false);

  // Navbar shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY >= 60;
      setBoxShadow(scrolled);

      // If user scrolls back to top, remove manual override
      if (!scrolled) {
        setManualOverride(false);
        setShowDesktopNav(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = nav ? "hidden" : "auto";
  }, [nav]);

  const toggleDesktopNav = () => {
    setShowDesktopNav((prev) => !prev);
    setManualOverride(true);
  };

  const toggleNav = () => setNav(!nav);

  return (
    <>
      <nav
        className={`fixed top-0 z-50 h-[103px] w-full border-b border-white/20 bg-[#FFFFFF1F] px-6 backdrop-blur-sm transition-all duration-300 ${boxShadow ? "shadow-sm" : ""}`}
      >
        <div className="mx-auto flex h-full max-w-[1312px] items-center justify-between">
          <Link href="/" className="hidden cursor-pointer min-[931px]:block">
            <Logo />
          </Link>
          <Link href="/" className="cursor-pointer min-[931px]:hidden">
            <Logo width={112} height={35} />
          </Link>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            // key={(manualOverride ? showDesktopNav : boxShadow).toString()}
            className="hidden items-center gap-6 gap-8 min-[931px]:flex"
          >
            {navigation().map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`font-spline flex items-center gap-2 text-base font-[380] transition-colors hover:text-[#3842E2] ${
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

            {/* <div className=""> */}
            <button className="cursor-pointer rounded-[100px] bg-[#5324FB] px-3 py-2 text-white">
              Get Certifytrusts
            </button>

            <DonateIcon />
            {/* </div> */}
          </motion.div>

          {/* Hamburger */}
          <div
            className="cursor-pointer min-[931px]:hidden"
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

        {/* <div className="border-b pb-8 border-gray-300 my-6">
          <p>Building Africa’s Next Generation of Tech Leaders</p>
        </div> */}

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
          {/* <Button className="bg-[#F3F3F3] text-[#667085] rounded-none w-full">Partner with Us</Button>
          <Button className="bg-black text-white rounded-none w-full">Apply Now</Button> */}
        </div>

        {/* <div className="text-sm text-gray-600 mt-10">
          Got questions? <a className="underline font-semibold cursor-pointer">Contact Us</a>
        </div> */}
      </aside>
    </>
  );
}
