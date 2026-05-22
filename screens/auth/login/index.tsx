"use client";
import CustomInput from "@/components/custom-input/custom-input";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import loginImage from "@/public/auth/login.svg";
import { ArrowLeft } from "lucide-react";
import GoBackButton from "@/components/back-button";
import { year } from "@/constants/date";

const schema = z.object({
  email: z
    .string()
    .email("Invalid email")
    .nonempty("Email is required")
    .trim()
    .toLowerCase(),
});

type FormData = z.infer<typeof schema>;

const LoginScreen = () => {
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  return (
    <div className="flex h-screen">
      <div className="hidden items-center justify-center bg-[#000000] p-2 sm:flex sm:w-1/2">
        <Image src={loginImage} alt="" />
      </div>
      <div className="px-4 py-8 sm:w-1/2 sm:p-8">
        <GoBackButton />

        <div className="flex h-full flex-col">
          <div className="flex flex-1 flex-col justify-center gap-8">
            <h2 className="text-center text-[32px] text-gray-900 sm:text-left">
              Login to the Premier Digital Credential Platform!
            </h2>

            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <CustomInput
                  name="email"
                  id="email"
                  label="Work Email Address"
                  type="email"
                  labelClass="text-gray-700"
                  placeholder="Enter your work email address"
                  // error={errors.email?.message ? String(errors.email.message) : undefined}
                />

                <div className="flex justify-end">
                  <Link
                    href="/auth/forgot-password"
                    className="items-end text-sm text-[#5324FB]"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button type="submit" size="full" className="">
                  Login
                  {/* {isLoading ? (
              <div>
                <PacmanLoader color="white" size={10} />
              </div>
            ) : (
              'Log in'
            )} */}
                </Button>
              </form>
            </FormProvider>

            <div className="flex justify-center text-sm">
              <p>
                Don&apos;t have an account?
                <Link href="/auth/sign-up" className="pl-1 text-[#5324FB]">
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-auto flex flex-wrap gap-3 text-sm font-normal">
            <p>© {year} Certifytrusts Inc. All right reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
