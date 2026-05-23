"use client";
import CustomInput from "@/components/custom-input/custom-input";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import loginImage from "@/public/auth/login.svg";
import GoBackButton from "@/components/back-button";
import { year } from "@/constants/date";
import useAppSelector from "@/hooks/useAppSelector";
import SignupLayer from "@/components/layers/SignupLayer";
import recipientIMG from "@/public/auth/recipientIMG.svg";
import RecipientLogin from "@/components/auth/RecipientLogin";
import { useRouter } from "next/navigation";
import RecipientResetPassword from "@/components/auth/RecipientResetPassword";

const schema = z.object({
  email: z
    .string()
    .email("Invalid email")
    .nonempty("Email is required")
    .trim()
    .toLowerCase(),
});

type FormData = z.infer<typeof schema>;

const ResetPasswordScreen = () => {
  const { push } = useRouter();
  const selectedRole = useAppSelector((state) => state.auth.selectedRole);

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = methods;

  const onSubmit = (data: FormData) => {
    console.log(data);

    push("/dashboard/login");
  };
  return selectedRole === "issuer" ? (
    <div className="flex h-screen">
      <div className="relative hidden items-center justify-center bg-[#000000] p-2 sm:flex sm:w-1/2">
        <SignupLayer className="top-0 right-0" />
        <Image src={loginImage} alt="" loading="eager" />
        <SignupLayer className="bottom-0 left-0" />
      </div>
      <div className="w-full px-4 py-8 sm:w-1/2 sm:p-8">
        <GoBackButton />

        <div className="flex h-full flex-col">
          <div className="flex flex-1 flex-col justify-center gap-8">
            <h2 className="text-center text-[32px] text-gray-900 sm:text-left">
              Reset Password
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
                  error={
                    errors.email?.message
                      ? String(errors.email.message)
                      : undefined
                  }
                />

                <div className="mt-14 mb-6 flex flex-wrap gap-1 text-sm text-gray-700">
                  <span>By signing up, you agree to our </span> {"  "}
                  <Link href="#" className="text-nowrap text-[#5324FB]">
                    Terms & Conditions
                  </Link>
                  and
                  <Link href="#" className="text-[#5324FB]">
                    Privacy Policy
                  </Link>
                </div>

                <Button
                  type="submit"
                  size="full"
                  className=""
                  disabled={!isValid}
                >
                  Send Reset Email
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
  ) : (
    // receipient
    <RecipientResetPassword />
  );
};

export default ResetPasswordScreen;
