"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const logos = [
  { src: "/tools/moodle.svg", alt: "moodle Post" },
  { src: "/tools/canvas.svg", alt: "canvas" },
  { src: "/tools/open.svg", alt: "open" },
  { src: "/tools/blackboard.svg", alt: "blackboard" },
  { src: "/tools/googleClass.svg", alt: "googleClass" },
  { src: "/tools/wordpress.svg", alt: "wordpress" },
];

const Tools = () => {
  return (
    <section className="w-full bg-white py-12 sm:py-16">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-6">
        <p className="text-center font-sans text-[40px] leading-tight font-semibold text-gray-900">
          Connect to the tools you already trust
        </p>

        {/* Carousel */}
        <div className="relative w-full overflow-hidden">
          {/* Edge fade */}
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-white via-transparent to-white" />

          <motion.div
            className="flex w-max items-center gap-8 sm:gap-12"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            }}
          >
            {[...logos, ...logos].map((logo, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center py-3"
                // subtle bobbing effect
                // animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "mirror",
                  delay: index * 0.3,
                }}
                whileHover={{ scale: 1.15 }}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={76}
                  height={76}
                  className="h-14 w-auto md:h-19"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Tools;
