import axiosService from "@/services/axios.service.helper";
import type {
  LoginPayload,
  RegisterPayload,
  AuthResponse,
  VerifyPayload,
  OTPPayload,
} from "@/types/auth";

class Auth_API {
  static async loginUser(userData: RegisterPayload): Promise<AuthResponse> {
    return await axiosService({
      method: "POST",
      data: userData,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
    });
  }

  static async registerIssuer(
    userData: RegisterPayload,
  ): Promise<AuthResponse> {
    return axiosService<AuthResponse>({
      method: "POST",
      data: userData,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/issuer/register`,
    });
  }

  static async registerReceipient(
    userData: RegisterPayload,
  ): Promise<AuthResponse> {
    return axiosService<AuthResponse>({
      method: "POST",
      data: userData,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/recipient/register`,
    });
  }

  static async verifyIssuer(userData: VerifyPayload): Promise<AuthResponse> {
    return axiosService<AuthResponse>({
      method: "POST",
      data: userData,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/issuer/verify-account`,
    });
  }

  static async verifyRecipient(userData: VerifyPayload): Promise<AuthResponse> {
    return axiosService<AuthResponse>({
      method: "POST",
      data: userData,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/recipient/verify-account`,
    });
  }

  static async resendIssuerOTP(userData: OTPPayload): Promise<AuthResponse> {
    return axiosService<AuthResponse>({
      method: "POST",
      data: userData,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/issuer/resend-otp`,
    });
  }
  static async resendRecipientOTP(userData: OTPPayload): Promise<AuthResponse> {
    return axiosService<AuthResponse>({
      method: "POST",
      data: userData,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/recipient/resend-otp`,
    });
  }

  // static async forgotPassword(userData: any): Promise<any> {
  //   return await axiosService({
  //     method: "POST",
  //     data: userData,
  //     url: `${process.env.NEXT_PUBLIC_BASE_URL}/forgot-password`,
  //   });
  // }

  // static async verifyPassword(verificationToken: string) {
  //   const response = await axiosService({
  //     method: "GET",
  //     url: `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email/?verificationToken=${verificationToken}`,
  //   });
  //   return response.data;
  // }

  // static async resendVerificationMail(userData: any): Promise<any> {
  //   return await axiosService({
  //     method: "POST",
  //     data: userData,
  //     url: `${process.env.NEXT_PUBLIC_BASE_URL}/resend-email`,
  //   });
  // }

  // static async resetPassword(userData: any): Promise<any> {
  //   return await axiosService({
  //     method: "POST",
  //     data: userData,
  //     url: `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password`,
  //   });
  // }
}

export default Auth_API;
