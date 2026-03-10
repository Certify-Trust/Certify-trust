"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Rating from "@/assets/icons/Rating";

export default function Testimonials({
  feedbackData,
}: {
  feedbackData: any[];
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [startIndex, setStartIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const visibleFeedbacks = isMobile
    ? [feedbackData[startIndex]]
    : feedbackData.slice(startIndex, startIndex + 3);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    const maxIndex = isMobile
      ? feedbackData.length - 1
      : feedbackData.length - 3;
    setStartIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const middleIndex = Math.floor(visibleFeedbacks.length / 2);

  const contentVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
    exit: { opacity: 0, x: -40, transition: { duration: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  const maxIndex = isMobile ? feedbackData.length - 1 : feedbackData.length - 3;
  return (
    <div className="relative mx-auto w-full max-w-7xl">
      {/* Navigation Buttons - Hidden on mobile */}
      <button
        onClick={handlePrev}
        disabled={startIndex === 0}
        className="absolute top-1/2 left-0 z-10 -translate-y-1/2 rounded-full bg-gray-200 p-2 p-2.5 shadow-md disabled:opacity-30 lg:block"
      >
        <FaChevronLeft />
      </button>

      <div className="mt-20 flex flex-row gap-6 px-4 sm:px-6 lg:flex-row lg:gap-8 lg:px-12">
        {visibleFeedbacks.map((feedback, index) => {
          const actualIndex = startIndex + index;
          // On mobile, no hover effect; on desktop, enable hover
          const isExpanded = isMobile
            ? true
            : hoveredIndex === actualIndex ||
              (hoveredIndex === null && index === middleIndex);

          return (
            <motion.div
              key={actualIndex}
              onMouseEnter={
                !isMobile ? () => setHoveredIndex(actualIndex) : undefined
              }
              onMouseLeave={!isMobile ? () => setHoveredIndex(null) : undefined}
              className={`text-grey-600 flex h-[311px] flex-col rounded-[20px] bg-gradient-to-tl from-[#E7F8F0] via-[#f1effb] to-[#fefdfe] p-6 ${
                isMobile
                  ? "h-[380px] w-[420px]"
                  : "transition-[flex] duration-500 ease-in-out"
              } ${!isMobile && isExpanded ? "flex-[1.3]" : !isMobile ? "flex-1" : ""}`}
              initial={false}
              animate={{
                opacity: isMobile ? 1 : isExpanded ? 1 : 0.9,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <AnimatePresence mode="wait">
                {isExpanded || isMobile ? (
                  <motion.div
                    key="expanded"
                    initial={isMobile ? false : "hidden"}
                    animate="visible"
                    exit={isMobile ? undefined : "exit"}
                    variants={isMobile ? undefined : contentVariants}
                    className="flex h-full flex-col"
                  >
                    <motion.div
                      variants={isMobile ? undefined : itemVariants}
                      className="mb-3 text-lg text-gray-500"
                    >
                      {feedback.topic}
                    </motion.div>

                    <motion.p
                      variants={isMobile ? undefined : itemVariants}
                      className="flex-1 text-lg leading-relaxed text-gray-800"
                    >
                      {feedback.description}
                    </motion.p>

                    <motion.p
                      variants={isMobile ? undefined : itemVariants}
                      className="mt- ml-auto text-[24px] text-gray-400"
                    >
                      {feedback.icon || <FaQuoteRight />}
                    </motion.p>

                    <motion.div
                      variants={isMobile ? undefined : itemVariants}
                      className="mt-6 flex gap-4 border-t border-gray-200 pt-2"
                    >
                      <Image
                        src={feedback.image}
                        alt={feedback.name}
                        width={56}
                        height={56}
                        className="h-14 w-14 rounded-full object-cover"
                      />
                      <div>
                        <div className="mb-1 flex gap-0.5">
                          <Rating />
                        </div>
                        <h3 className="font-semibold text-gray-700">
                          {feedback.name}
                        </h3>
                        <p className="text-sm text-gray-500">{feedback.role}</p>
                      </div>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="collapsed"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={contentVariants}
                    className="flex h-full flex-col justify-between"
                  >
                    <div className="pb-3 text-lg text-gray-500">
                      {feedback.topic}
                    </div>

                    <p className="flex-1 text-lg leading-relaxed text-gray-800">
                      {feedback.description}
                    </p>

                    <div className="mt-auto flex items-center gap-3 pt-4">
                      <Image
                        src={feedback.image}
                        alt={feedback.name}
                        width={56}
                        height={56}
                        className="h-14 w-14 rounded-full object-cover"
                      />

                      <div className="flex flex-col">
                        <Rating />
                        <h3 className="text-base font-semibold text-gray-700">
                          {feedback.name}
                        </h3>
                        <p className="text-sm text-gray-500">{feedback.role}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <button
        onClick={handleNext}
        disabled={startIndex >= maxIndex}
        className="bg:gray-100 absolute top-1/2 right-0 z-10 -translate-y-1/2 rounded-full bg-gray-200 p-2.5 shadow-md disabled:opacity-30 lg:block"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}
