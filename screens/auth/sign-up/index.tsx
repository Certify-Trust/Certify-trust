"use client";
import CustomInput from "@/components/custom-input/custom-input";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import avatar from "@/public/auth/signup.svg";
import GoBackButton from "@/components/back-button";
import { year } from "@/constants/date";
import SignupLayer from "@/components/layers/SignupLayer";
import { useRouter } from "next/navigation";
import useAppSelector from "@/hooks/useAppSelector";
import RecipientSignUp from "@/components/auth/RecipientSignUp";
import useAppDispatch from "@/hooks/useAppDispatch";
import { setSelectedRole } from "@/redux/reducers/authSlice";
import { Loader } from "lucide-react";
import { useRegisterIssuer } from "@/hooks/useAuth";
import { toast } from "sonner";
import { handleApiError } from "@/lib/errorHelper";
import { setSignUpEmail } from "@/redux/reducers/email";

const schema = z
  .object({
    first_name: z.string().min(1, "First name is required"),

    last_name: z.string().min(1, "Last name is required"),

    phone: z.string().min(6, "Phone number must be at least 6 digits"),

    email: z.string().email("Invalid email").trim().toLowerCase(),

    password: z.string().min(8, "Password must be at least 8 characters"),

    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

const SignupScreen = () => {
  const { push } = useRouter();
  const dispatch = useAppDispatch();
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

  const { mutate, isPending } = useRegisterIssuer();

  const onSubmit = (data: FormData) => {
    const { confirmPassword, ...payload } = data;

    mutate(payload, {
      onSuccess: (response) => {
        toast.success(response?.message || "Account created successfully");

        dispatch(setSignUpEmail(payload.email));
        push("/auth/code-verification");
        // push("/auth/verify-email");
      },

      onError: handleApiError,
    });
  };
  return selectedRole === "issuer" ? (
    <div className="flex min-h-screen">
      <div className="px-4 py-8 sm:w-1/2 sm:p-8">
        <GoBackButton />

        <div className="flex h-full flex-col space-y-6">
          <div className="flex flex-1 flex-col justify-center gap-8">
            <div className="mb-2">
              <h2 className="text-center text-[32px] text-gray-900 sm:text-left">
                Join the Premier Digital Credential Platform!
              </h2>
              <p className="mt-3 text-center text-gray-600">
                Issue shareable, verifiable digital badges and certificates
              </p>
            </div>

            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="">
                <div className="grid gap-x-5 min-[830px]:grid-cols-2">
                  <CustomInput
                    name="first_name"
                    id="first_name"
                    label="First Name"
                    type="text"
                    labelClass="text-gray-700"
                    placeholder="Enter your First Name"
                    // error={errors.first_name?.message ? String(errors.first_name.message) : undefined}
                  />

                  <CustomInput
                    name="last_name"
                    id="last_name"
                    label="Last Name"
                    type="text"
                    labelClass="text-gray-700"
                    placeholder="Enter your Last Name"
                    // error={errors.last_name?.message ? String(errors.last_name.message) : undefined}
                  />
                </div>

                <div className="grid gap-x-5 min-[830px]:grid-cols-2">
                  <CustomInput
                    name="email"
                    id="email"
                    label="Work Email Address"
                    type="email"
                    placeholder="Enter your work email address"
                    error={
                      errors.email?.message
                        ? String(errors.email.message)
                        : undefined
                    }
                  />
                  <CustomInput
                    name="phone"
                    id="email"
                    label="Contact Phone Number"
                    type="number"
                    placeholder="Enter your Contact Phone Number"
                    error={
                      errors.phone?.message
                        ? String(errors?.phone.message)
                        : undefined
                    }
                  />
                </div>
                <div className="grid gap-x-5 min-[830px]:grid-cols-2">
                  <CustomInput
                    name="password"
                    id="password"
                    label="Password"
                    type="password"
                    placeholder="Create password"
                    error={
                      errors.password?.message
                        ? String(errors.password.message)
                        : undefined
                    }
                  />
                  <CustomInput
                    name="confirmPassword"
                    id="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm password"
                    error={
                      errors.confirmPassword?.message
                        ? String(errors?.confirmPassword.message)
                        : undefined
                    }
                  />
                </div>

                <div className="mt-2 mb-6 flex flex-wrap gap-1 text-sm text-gray-700">
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
                  disabled={!isValid || isPending}
                >
                  <div className="flex items-center gap-2">
                    {isPending && <Loader className="h-4 w-4 animate-spin" />}
                    <span>Sign Up</span>
                  </div>
                </Button>
              </form>
            </FormProvider>

            <div className="flex flex-col items-center gap-4 text-sm min-[851px]:flex-row min-[851px]:justify-between">
              <p>
                Already have an account?
                <Link href="/auth/login" className="pl-1 text-[#5324FB]">
                  Login
                </Link>
              </p>

              <button
                onClick={() => dispatch(setSelectedRole("recipient"))}
                className="text-[#5324FB] underline underline-offset-2"
              >
                I’m a credential holder
              </button>
            </div>
          </div>

          <div className="mt-auto flex flex-wrap gap-3 text-sm font-normal">
            <p>© {year} Certifytrusts Inc. All right reserved.</p>
          </div>
        </div>
      </div>

      <div className="hidden items-center justify-center bg-[#0F2465] p-2 sm:fixed sm:top-0 sm:right-0 sm:flex sm:h-screen sm:w-1/2">
        <SignupLayer className="top-0 right-0" />

        <Image src={avatar} alt="" loading="eager" />

        <SignupLayer className="bottom-0 left-0" />
      </div>
    </div>
  ) : (
    <RecipientSignUp fromIssuer />
  );
};

export default SignupScreen;
