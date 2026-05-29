"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import GoBackButton from "@/components/back-button";
import SignupLayer from "@/components/layers/SignupLayer";

import loginImage from "@/public/auth/login.svg";

import { year } from "@/constants/date";
import { useResendIssuerOTP, useVerifyIssuer } from "@/hooks/useAuth";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { handleApiError } from "@/lib/errorHelper";
import useAppSelector from "@/hooks/useAppSelector";
import useAppDispatch from "@/hooks/useAppDispatch";
import { setSignUpEmail } from "@/redux/reducers/email";

const CodeVerification = () => {
  const [cooldown, setCooldown] = useState(0);
  const { push } = useRouter();
  const dispatch = useAppDispatch();
  const { mutate, isPending: verifying } = useVerifyIssuer();
  const { mutate: resend, isPending: resending } = useResendIssuerOTP();
  const email = useAppSelector((state) => state.signUpEmail.signUpEmail);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value.slice(-1);

    setOtp(updatedOtp);

    // Move focus forward
    if (value && index < otp.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    // Move back on backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }

    // Arrow navigation
    if (e.key === "ArrowRight" && index < otp.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, otp.length);

    if (!pastedData) return;

    const updatedOtp = [...otp];

    pastedData.split("").forEach((char, index) => {
      updatedOtp[index] = char;
    });

    setOtp(updatedOtp);

    const focusIndex = Math.min(pastedData.length, otp.length - 1);
    inputsRef.current[focusIndex]?.focus();
  };

  const isComplete = otp.every((digit) => digit !== "");

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const handleSubmit = () => {
    const code = otp.join("");

    mutate(
      { code },
      {
        onSuccess: (response) => {
          toast.success(response?.message || " success");
          dispatch(setSignUpEmail(null));
          push("/auth/login");
          // push("/dashboard/overview");
        },
        onError: handleApiError,
      },
    );
  };

  const resendCode = () => {
    if (!email) {
      toast.error("Email not found. Please restart signup.");
      return;
    }

    resend(
      { email },
      {
        onSuccess: (response) => {
          toast.success(response?.message || "OTP sent successfully");

          setCooldown(20);
        },
        onError: handleApiError,
      },
    );
  };

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="relative hidden w-full items-center justify-center bg-black p-2 sm:flex sm:w-1/2">
        <SignupLayer className="top-0 right-0" />

        <Image
          src={loginImage}
          alt="Verification Illustration"
          loading="eager"
        />

        <SignupLayer className="bottom-0 left-0" />
      </div>

      {/* Right Section */}
      <div className="w-full px-4 py-8 sm:w-1/2 sm:p-8">
        <div className="flex items-center justify-between">
          <GoBackButton />

          <Link href="/" className="text-sm font-medium text-[#F04438]">
            Log Out
          </Link>
        </div>

        <div className="flex h-full flex-col">
          <div className="flex flex-1 flex-col justify-center gap-8">
            <div>
              <h2 className="text-center text-[32px] leading-tight text-gray-900">
                We’ve sent a code to your email address.
              </h2>

              <p className="mt-3 text-center text-gray-600">
                Check your email inbox for your sign in code.
              </p>
            </div>

            {/* OTP Inputs */}
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputsRef.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={1}
                  value={digit}
                  aria-label={`OTP digit ${index + 1}`}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  className="h-12.5 w-10 border-b border-[#222C996B] text-center text-2xl font-semibold text-[#101828] transition-all outline-none focus:border-[#5324FB] focus:ring-0 focus:ring-[#5324FB]/20 min-[1168px]:w-20 sm:h-18"
                />
              ))}
            </div>

            {/* Buttons */}
            <div className="mt-14 flex flex-col gap-4 min-[709px]:flex-row">
              <Button
                onClick={resendCode}
                disabled={resending || cooldown > 0}
                variant="ghost"
                size="full"
                className="flex flex-1 items-center gap-2 font-semibold text-gray-700"
              >
                {resending && <Loader className="h-4 w-4 animate-spin" />}
                <span>
                  {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend Code"}
                </span>
              </Button>

              <Button
                type="button"
                size="full"
                className="flex flex-1 items-center gap-2"
                disabled={!isComplete || verifying}
                onClick={handleSubmit}
              >
                {verifying && <Loader className="h-4 w-4 animate-spin" />}
                <span> Verify Email</span>
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto flex flex-wrap gap-3 text-sm font-normal">
            <p>© {year} Certifytrusts Inc. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeVerification;
