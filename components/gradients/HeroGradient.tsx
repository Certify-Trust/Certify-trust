import React from "react";

const HeroGradient = () => {
  return (
    <svg
      className="absolute min-h-[697px] w-full"
      // width="1440"
      // height="1505"
      viewBox="0 0 1440 1505"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_f_0_496)">
        <path
          d="M-432.917 -282.39L-378.834 293.597L-533.094 411.918L99.4968 654.469L271.777 650.88L885.541 568.236L1434.95 530.429L1541.52 1239.39L1985.5 1274.69L1946.53 918.982L1738.22 788.804L2483.47 797.074L1455.05 390.056L321.711 619.802L-119.605 391.845L-432.917 -282.39Z"
          fill="url(#paint0_radial_0_496)"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_0_496"
          x="-763.094"
          y="-512.39"
          width="3476.56"
          height="2017.08"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="115"
            result="effect1_foregroundBlur_0_496"
          />
        </filter>
        <radialGradient
          id="paint0_radial_0_496"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(384.933 660.5) rotate(106.536) scale(170.388 416.895)"
        >
          <stop stopColor="#E5EDFF" />
          <stop offset="1" stopColor="#CBD5FF" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default HeroGradient;
