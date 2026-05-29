"use client";

import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import HeroGradient from "@/components/gradients/HeroGradient";

const Hero = () => {
  return (
    <section className="relative mt-28 min-h-[697px] py-10 sm:py-[96px]">
      <HeroGradient />

      <div className="px-6">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-y-8 min-[1024px]:flex-row min-[1024px]:items-center">
          <div className="flex w-full flex-col gap-8 min-[1024px]:w-1/2">
            <h1 className="text-[48px] leading-tight font-semibold sm:text-[60px]">
              The world’s first open‑source blockchain credentials platform.
            </h1>
            <p className="text-xl leading-[28px] text-gray-600 min-[1024px]:max-w-[596.9px]">
              Issue secure and highly customizable digital credentials that not
              only scale seamlessly with your organization but also maintain
              their trustworthiness and integrity over time.
            </p>
          </div>

          <motion.div
            // variants={imageVariant}
            className="relative aspect-[7/6] w-full flex-1 min-[1024px]:w-[48%]"
          >
            <Image
              src="/home/Hero.png"
              alt="Hero"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
