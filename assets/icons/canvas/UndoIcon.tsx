const UndoIcon = () => {
  return (
    <svg
      width="56"
      height="40"
      viewBox="0 0 50 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_137_4955)">
        <path
          d="M2 5C2 2.79086 3.79086 1 6 1H54V45H6C3.79086 45 2 43.2091 2 41V5Z"
          fill="white"
        />
        <path
          d="M6 1.5H53.5V44.5H6C4.067 44.5 2.5 42.933 2.5 41V5C2.5 3.067 4.067 1.5 6 1.5Z"
          stroke="#D0D5DD"
        />
        <path
          d="M18 21C18 21 20.005 18.2682 21.6338 16.6382C23.2627 15.0083 25.5136 14 28 14C32.9706 14 37 18.0294 37 23C37 27.9706 32.9706 32 28 32C23.8969 32 20.4351 29.2543 19.3518 25.5M24 21H18V15"
          stroke="#667085"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_137_4955"
          x="0"
          y="0"
          width="56"
          height="48"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.05 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_137_4955"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_137_4955"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default UndoIcon;
