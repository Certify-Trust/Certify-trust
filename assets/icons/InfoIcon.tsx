const InfoIcon = ({
  width = 15,
  height = 15,
  stroke = "#344054",
  className = "",
  strokeWidth = 1.5,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`cursor-pointer hover:opacity-70 ${className}`}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M7.16667 9.83333V7.16667M7.16667 4.5H7.17333M13.8333 7.16667C13.8333 10.8486 10.8486 13.8333 7.16667 13.8333C3.48477 13.8333 0.5 10.8486 0.5 7.16667C0.5 3.48477 3.48477 0.5 7.16667 0.5C10.8486 0.5 13.8333 3.48477 13.8333 7.16667Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default InfoIcon;
