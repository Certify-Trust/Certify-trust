import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import card from "@/public/dashboard/card.svg";
import card1 from "@/public/dashboard/card1.svg";
import Logo from "@/assets/icons/Logo";

const SignInModal = () => {
  return (
    <div className="mx-auto flex max-w-169.5 flex-col items-center justify-center gap-6">
      <Logo />
      <div className="">
        <h3 className="text-2xl font-semibold text-gray-900">
          Sign in to Certifytrusts
        </h3>
        <p className="mt-1.5 text-base text-gray-600">
          Choose one of the two options below.
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-5 min-[482px]:flex-row">
        {/* CARD 1 */}
        <div className="flex min-h-43.5 cursor-pointer flex-col items-center rounded-lg border border-gray-200 p-4 transition-all duration-300 hover:border-[#5324FB]">
          <Image src={card} alt="" />

          <h6 className="font-medium text-gray-700">I’m a credential issuer</h6>

          <p className="text-center text-xs text-gray-600">
            Design and issue branded, verifiable badges & certificates
          </p>
        </div>

        {/* CARD 2 */}
        <div className="flex min-h-43.5 cursor-pointer flex-col items-center rounded-lg border border-gray-200 p-4 transition-all duration-300 hover:border-[#5324FB]">
          <Image src={card1} alt="" />

          <h6 className="font-medium text-gray-700">I’m a credential issuer</h6>

          <p className="text-center text-xs text-gray-600">
            Design and issue branded, verifiable badges & certificates
          </p>
        </div>
      </div>

      <Button size="full" className="mt-4">
        Continue
      </Button>

      <div className="flex justify-center text-center text-sm text-gray-600">
        <p>
          Need to create an issuer/company account?
          <Link
            href="/auth/sign-up"
            className="pl-1 font-semibold text-[#5324FB]"
          >
            Get started
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInModal;
