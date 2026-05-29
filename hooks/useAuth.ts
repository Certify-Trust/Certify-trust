import Auth_API from "@/services/api/auth";
import {
  AuthResponse,
  LoginPayload,
  OTPPayload,
  RegisterPayload,
  VerifyPayload,
} from "@/types/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getSession, signIn } from "next-auth/react";

const useSignIn = () => {
  return useMutation({
    mutationFn: async (userData: LoginPayload) => {
      const res = await signIn("credentials", {
        redirect: false,
        email: userData.email,
        password: userData.password,
      });

      if (res && !res.error) {
        const session = await getSession();

        if (session && session.accessToken) {
          const authToken = session.accessToken;
          localStorage.setItem("authToken", authToken);
        }

        return { res, session };
      } else {
        throw new Error(res?.error || "Failed to sign in");
      }
    },
  });
};

const useRegisterIssuer = () => {
  return useMutation<AuthResponse, Error, RegisterPayload>({
    mutationFn: (userData) =>
      Auth_API.registerIssuer(userData).then((res) => res.data),
  });
};
const useRegisterRecipient = () => {
  return useMutation<AuthResponse, Error, RegisterPayload>({
    mutationFn: (userData) =>
      Auth_API.registerReceipient(userData).then((res) => res.data),
  });
};

const useVerifyIssuer = () => {
  return useMutation<AuthResponse, Error, VerifyPayload>({
    mutationFn: (userData) =>
      Auth_API.verifyIssuer(userData).then((res) => res.data),
  });
};
const useVerifyRecipient = () => {
  return useMutation<AuthResponse, Error, VerifyPayload>({
    mutationFn: (userData) =>
      Auth_API.verifyRecipient(userData).then((res) => res.data),
  });
};

const useResendIssuerOTP = () => {
  return useMutation<AuthResponse, Error, OTPPayload>({
    mutationFn: (userData) =>
      Auth_API.resendIssuerOTP(userData).then((res) => res.data),
  });
};
const useResendRecipientOTP = () => {
  return useMutation<AuthResponse, Error, OTPPayload>({
    mutationFn: (userData) =>
      Auth_API.resendRecipientOTP(userData).then((res) => res.data),
  });
};

// const useForgotPassword = () => {
//   return useMutation({
//     mutationFn: (userData) =>
//       Auth_API.forgotPassword(userData).then((res) => res.data),
//   });
// };

// const useVerifyPassword = (verificationToken: string) => {
//   return useQuery({
//     queryKey: ["verifyPassword", verificationToken],
//     queryFn: () => Auth_API.verifyPassword(verificationToken),
//   });
// };

// const useResendVerificationMail = () => {
//   return useMutation({
//     mutationFn: (userData) =>
//       Auth_API.resendVerificationMail(userData).then((res) => res.data),
//   });
// };

// const useResetPassword = () => {
//   return useMutation({
//     mutationFn: (userData) =>
//       Auth_API.resetPassword(userData).then((res) => res.data),
//   });
// };

export {
  useSignIn,
  useRegisterIssuer,
  useRegisterRecipient,
  useVerifyRecipient,
  useVerifyIssuer,
  useResendIssuerOTP,
  useResendRecipientOTP,
  //   useForgotPassword,
  //   useVerifyPassword,
  //   useResendVerificationMail,
  //   useResetPassword,
};
