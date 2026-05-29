"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";

import SignupLayer from "../layers/SignupLayer";
import Image from "next/image";
import GoBackButton from "../back-button";
import CustomInput from "../custom-input/custom-input";
import Link from "next/link";
import { Button } from "../ui/button";
import { year } from "@/constants/date";
import recipientIMG from "@/public/auth/recipientIMG.svg";
import CustomTab from "../customTab";
import { useRouter } from "next/navigation";
import { useSignInRecipint } from "@/hooks/useAuth";
import { toast } from "sonner";
import { setUser } from "@/redux/reducers/userSlice";
import { handleApiError } from "@/lib/errorHelper";
import useAppDispatch from "@/hooks/useAppDispatch";
import { Loader } from "lucide-react";

const getSchema = (activeTab: keyof typeof tabConfig) =>
  z
    .object({
      email: z
        .string()
        .email("Invalid email")
        .nonempty("Email is required")
        .trim()
        .toLowerCase(),

      password: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (
        activeTab === "tab1" &&
        (!data.password || data.password.length < 6)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["password"],
          message: "Password must be at least 6 characters",
        });
      }
    });

// type FormData = z.infer<typeof schema>;
type FormData = {
  email: string;
  password?: string;
};

const tabConfig = {
  tab1: {
    heading: "Open the door to your success!",
    subheading: "Get certified, enhance your skills, and reach new heights!",
    submitLabel: "Login",
    showPassword: true,
  },
  tab2: {
    heading:
      "Retrieve certificates or badges associated with your email address",
    subheading: "",
    submitLabel: "Retrieve my certificates",
    showPassword: false,
  },
};

const tabs = [
  { value: "tab1", label: "Login to your Earner Account", content: null },
  { value: "tab2", label: "Access without Password", content: null },
];

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const RecipientLogin = () => {
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const [activeTab, setActiveTab] = useState<keyof typeof tabConfig>("tab1");
  const { mutate, isPending } = useSignInRecipint();

  const { heading, subheading, submitLabel, showPassword } =
    tabConfig[activeTab];

  const methods = useForm<FormData>({
    resolver: zodResolver(getSchema(activeTab)),
    mode: "onChange",
  });

  const {
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
  };

  return (
    <motion.div
      className="flex h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      {/* Left Section */}
      <div className="relative hidden items-center justify-center overflow-hidden bg-[#0F2465] p-2 sm:flex sm:w-1/2">
        <SignupLayer className="top-0 left-0" />

        <div>
          <Image src={recipientIMG} alt="" loading="eager" />
        </div>

        <SignupLayer className="bottom-0 left-0" />
      </div>

      {/* Right Section */}
      <motion.div
        className="w-full px-4 py-8 sm:w-1/2 sm:p-8"
        variants={fadeIn}
        // initial="hidden"
        animate="visible"
      >
        <GoBackButton />

        <div className="flex h-full flex-col">
          <div className="flex flex-1 flex-col justify-center gap-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <CustomTab
                tabs={tabs}
                defaultValue="tab1"
                onValueChange={(val) =>
                  setActiveTab(val as keyof typeof tabConfig)
                }
              />
            </motion.div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-center text-[32px] leading-tight text-gray-900 sm:text-left">
                {heading}
              </h2>

              <p className="text-gray-600">{subheading}</p>
            </motion.div>

            <FormProvider {...methods}>
              <motion.form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
              >
                <CustomInput
                  name="email"
                  id="email"
                  label="Email Address"
                  type="email"
                  labelClass="text-gray-700"
                  placeholder="Enter your email address"
                  error={errors.email?.message}
                />

                {showPassword && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <CustomInput
                      name="password"
                      id="password"
                      label="Password"
                      type="password"
                      labelClass="text-gray-700 mt-6"
                      placeholder="Enter your password"
                      error={errors.password?.message}
                    />

                    <div className="mt-2 flex justify-end">
                      <Link
                        href="/auth/reset-password"
                        className="text-sm text-[#5324FB]"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </motion.div>
                )}

                <div>
                  <Button
                    type="submit"
                    size="full"
                    className={`${!showPassword && "mt-5"} flex items-center gap-2`}
                    disabled={!isValid}
                  >
                    {isPending && <Loader className="h-4 w-4 animate-spin" />}
                    {submitLabel}
                  </Button>
                </div>
              </motion.form>
            </FormProvider>

            <motion.div
              className="flex justify-center text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p>
                New to Certifytrusts?
                <Link href="/auth/sign-up" className="pl-1 text-[#5324FB]">
                  Create Account
                </Link>
              </p>
            </motion.div>
          </div>

          <div className="mt-auto flex flex-wrap gap-3 text-sm font-normal">
            <p>© {year} Certifytrusts Inc. All right reserved.</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RecipientLogin;
