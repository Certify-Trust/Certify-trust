"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import avatar from "@/public/auth/signup.svg";
import GoBackButton from "@/components/back-button";
import { year } from "@/constants/date";
import SignupLayer from "@/components/layers/SignupLayer";
import MessageIcon from "@/assets/icons/MessageIcon";
import Logo from "@/assets/icons/Logo";

const VerifyEmailScreen = () => {
  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  return (
    <div className="flex min-h-screen">
      <div className="px-4 py-8 sm:w-1/2 sm:p-8">
        <GoBackButton />

        <div className="flex h-full flex-col space-y-6">
          <div className="flex flex-1 flex-col items-center justify-center gap-8">
            <div className="mb-2 flex flex-col items-center justify-center">
              <Logo />
              <h2 className="text-center text-[32px] text-gray-900">
                Verify your email address
              </h2>
            </div>
            <MessageIcon />

            <div className="max-w-150 text-center text-gray-600">
              <p>
                We sent a verification email to <b>sani@certifytrusts.com</b>
              </p>
              <p>
                Please check your email to verify your Certifytrusts account
              </p>
            </div>

            <Button type="submit" size="full" className="">
              Resent Verification Link
              {/* {isLoading ? (
              <div>
                <PacmanLoader color="white" size={10} />
              </div>
            ) : (
              'Log in'
            )} */}
            </Button>

            <div className="flex justify-center text-sm">
              <p>
                Already verified?
                <Link href="/auth/login" className="pl-1 text-[#5324FB]">
                  Login
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-auto flex flex-wrap gap-3 text-sm font-normal">
            <p>© {year} Certifytrusts Inc. All right reserved.</p>
          </div>
        </div>
      </div>

      <div className="hidden items-center justify-center bg-[#100049] p-2 sm:fixed sm:top-0 sm:right-0 sm:flex sm:h-screen sm:w-1/2">
        <SignupLayer className="top-0 right-0" />

        <Image src={avatar} alt="" />

        <SignupLayer className="bottom-0 left-0" />
      </div>
    </div>
  );
};

export default VerifyEmailScreen;
