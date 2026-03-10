type IconProps = {
  color?: string;
  height?: string;
  width?: string;
};

const DownIcon = ({ color = "currentColor", height, width }: IconProps) => {
  return (
    <svg width={width || "11"} height={height || "6"} viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.17222 5.19999C5.13784 5.19999 5.04818 5.17704 4.99936 5.13064L0.277159 0.63033C0.177558 0.535104 0.173652 0.376405 0.269346 0.276867C0.36604 0.177235 0.524239 0.174329 0.622808 0.269054L5.17222 4.6037L9.75067 0.269023C9.85127 0.174298 10.0095 0.177204 10.1041 0.276836C10.1998 0.376468 10.1959 0.535167 10.0963 0.630298L5.37223 5.13061C5.29723 5.17718 5.23472 5.19999 5.17222 5.19999Z"
        fill={color}
        stroke={color}
        strokeWidth="0.4"
      />
    </svg>
  );
};

export default DownIcon;
