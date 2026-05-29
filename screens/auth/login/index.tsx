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
import { ArrowLeft, Loader } from "lucide-react";
import GoBackButton from "@/components/back-button";
import { year } from "@/constants/date";
import useAppSelector from "@/hooks/useAppSelector";
import SignupLayer from "@/components/layers/SignupLayer";
import recipientIMG from "@/public/auth/recipientIMG.svg";
import RecipientLogin from "@/components/auth/RecipientLogin";
import { useRouter } from "next/navigation";
import { useSignIn } from "@/hooks/useAuth";
import { toast } from "sonner";
import { handleApiError } from "@/lib/errorHelper";
import useAppDispatch from "@/hooks/useAppDispatch";
import { setUser } from "@/redux/reducers/userSlice";

const schema = z.object({
  email: z
    .string()
    .email("Invalid email")
    .nonempty("Email is required")
    .trim()
    .toLowerCase(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormData = z.infer<typeof schema>;

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const { mutate, isPending } = useSignIn();
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
    mutate(data, {
      onSuccess: (response) => {
        const session = response.session;

        if (!session) {
          toast.error("Invalid login response");
          return;
        }
        toast.success("Login successful");
        dispatch(
          setUser({
            user: session.user,
            accessToken: session.accessToken,
          }),
        );

        push("/dashboard/overview");
      },
      onError: handleApiError,
    });

    // push("/auth/code-verification");
  };
  return selectedRole === "issuer" ? (
    <div className="flex h-screen">
      <div className="relative hidden items-center justify-center bg-[#000000] p-2 sm:flex sm:w-1/2">
        <SignupLayer className="top-0 right-0" />
        <Image src={loginImage} alt="" loading="eager" />
        <SignupLayer className="bottom-0 left-0" />
      </div>
      <div className="px-4 py-8 sm:w-1/2 sm:p-8">
        <GoBackButton />

        <div className="flex h-full flex-col">
          <div className="flex flex-1 flex-col justify-center gap-8">
            <h2 className="text-center text-[32px] text-gray-900 sm:text-left">
              Login to the Premier Digital Credential Platform!
            </h2>

            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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

                <CustomInput
                  name="password"
                  id="password"
                  label="Password"
                  type="password"
                  labelClass="text-gray-700"
                  placeholder="Enter your password"
                  error={
                    errors.password?.message
                      ? String(errors.password.message)
                      : undefined
                  }
                />

                <div className="flex justify-end">
                  <Link
                    href="/auth/reset-password"
                    className="items-end text-sm text-[#5324FB]"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  size="full"
                  className="flex items-center gap-2"
                  disabled={!isValid || isPending}
                >
                  {isPending && <Loader className="h-4 w-4 animate-spin" />}
                  <span>Login</span>
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
    <RecipientLogin />
  );
};

export default LoginScreen;
