"use client";

import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";

const Hero = () => {
  return (
    <section className="mt-28 min-h-[697px] px-6">
      <div className="mx-auto flex max-w-[1280px] items-center">
        <div className="flex w-1/2 flex-col gap-8">
          <h1 className="text-[60px] leading-[65px] font-semibold">
            The world’s first open‑source blockchain credentials platform.
          </h1>
          <p className="text-xl leading-[28px] text-gray-600 sm:max-w-[596.8988647460938px]">
            Velocity Digital is a founder-led seed fund. Our team blends
            operator experience, investing discipline, and deep local context to
            help African startups move faster and go further.
          </p>
        </div>

        <motion.div
          // variants={imageVariant}
          className="relative aspect-[7/6] w-[48%] flex-1"
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
