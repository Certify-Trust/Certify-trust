"use client";

import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";

const Hero = () => {
  return (
    <section className="mt-28 min-h-[697px] px-6 py-10 sm:py-[96px]">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-y-8 min-[1024px]:flex-row min-[1024px]:items-center">
        <div className="flex w-full flex-col gap-8 min-[1024px]:w-1/2">
          <h1 className="text-[48px] leading-tight font-semibold sm:text-[60px]">
            The world’s first open‑source blockchain credentials platform.
          </h1>
          <p className="text-xl leading-[28px] text-gray-600 min-[1024px]:max-w-[596.9px]">
            Velocity Digital is a founder-led seed fund. Our team blends
            operator experience, investing discipline, and deep local context to
            help African startups move faster and go further.
          </p>
        </div>

        <motion.div
          // variants={imageVariant}
          className="relative aspect-[7/6] w-full flex-1 min-[1024px]:w-[48%]"
        >
          <Image
            src="/home/Hero.svg"
            alt="Hero"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 45vw"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
