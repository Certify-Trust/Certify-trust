// import FooterLogo from "@/assets/footerLogo";
import InstagramIcon from "@/assets/icons/InstagramIcon";
import Logo from "@/assets/icons/Logo";
import SocialIcon from "@/assets/icons/SocialIcon";
import XIcon from "@/assets/icons/XIcon";
import { year } from "@/constants/date";
import { footerNavigation, navigation } from "@/constants/navigation";
import Link from "next/link";

function Footer() {
  return (
    <section className="relative min-h-[352px] bg-[#080808]">
      <svg
        className="pointer-events-none absolute top-0 left-0 min-h-[352px] w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_f_687_3922)">
          <path
            d="M347 37.5747L-309 -244.925L-254 -831.5L-387.5 3.57458L389.5 78.5747L649 -175.425H907L1086.5 -80.4253L1283.5 -134.425L1620.5 65.0747L1875 -139.425L1580.5 -706.925L1564 -217.925L580 -72.9253L347 37.5747Z"
            fill="url(#paint0_radial_687_3922)"
          />
        </g>
        <defs>
          <filter
            id="filter0_f_687_3922"
            x="-617.5"
            y="-1061.5"
            width="2722.5"
            height="1370.07"
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
              result="effect1_foregroundBlur_687_3922"
            />
          </filter>
          <radialGradient
            id="paint0_radial_687_3922"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(474.895 -717.012) rotate(90) scale(145.201 363.221)"
          >
            <stop stopColor="#E5EDFF" />
            <stop offset="1" stopColor="#3842E2" />
          </radialGradient>
        </defs>
      </svg>
      <div className="z-30 px-6 py-[56px] text-[#FFFFFF]">
        <div className="m-auto flex max-w-[1280px] flex-col justify-between gap-[60px] min-[735px]:flex-row">
          <div className="z-10">
            <Logo />
            {/* <p className="mt-6 max-w-[315px] text-lg font-normal">
              We are a fund by founders for founders in Africa and around the
              world.
            </p> */}

            <div className="mt-5 flex items-center gap-[20.5px]">
              <XIcon />
              <InstagramIcon />
              <SocialIcon />
            </div>
          </div>

          <div className="flex w-[270px] justify-between min-[380px]:w-[335px]">
            <div>
              <h5 className="text-lg font-[450] text-[#FCFCFC]">Company</h5>

              <div className="mt-4 flex flex-col gap-1">
                {footerNavigation().map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="flex cursor-pointer items-center gap-2 text-base font-light transition-colors hover:text-gray-500"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h5 className="text-lg font-[450] text-[#FCFCFC]">Reources</h5>

              <div className="mt-4 flex flex-col gap-1">
                <Link
                  href="/"
                  className="flex cursor-pointer items-center gap-2 text-base font-light transition-colors hover:text-gray-500"
                >
                  Work with us
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* bottom */}

        <div className="m-auto mt-[64px] flex max-w-[1280px] justify-between border-t border-[#FFFFFF29]">
          <div className="mt-[15px] flex w-full flex-col items-center gap-5 min-[551px]:flex-row min-[551px]:justify-between">
            <div className="flex flex-wrap gap-3 text-sm font-normal">
              <p>Certifytrusts © Copyright {year}</p>
            </div>

            <div className="flex items-center gap-5">
              <p>Privacy Policy</p>
              <p>Accessibility</p>
              <p>Terms of services</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
