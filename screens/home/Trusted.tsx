"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const logos = [
  { src: "/trusted/edusproute.svg", alt: "edusproute" },
  { src: "/trusted/thrive.svg", alt: "thrive" },
  { src: "/trusted/Quiickops.svg", alt: "Quiickops" },
  { src: "/trusted/nob.svg", alt: "NOB" },
  { src: "/trusted/tech.svg", alt: "Abuja Tech Converge" },
];

const Trusted = () => {
  return (
    <section className="w-full bg-white py-12 sm:py-16">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 sm:px-6">
        <p className="text-center font-sans text-base text-gray-600">
          Trusted by leading associations, and technology companies
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
                  width={40}
                  height={40}
                  className="h-6 w-auto sm:h-7 md:h-8 lg:h-9"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Trusted;
