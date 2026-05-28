import { AxiosError } from "axios";

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  password: string;
};

export type VerifyPayload = {
  code: string;
};
export type OTPPayload = {
  email: string;
};

export type AuthResponse = {
  data: any;
  message: string;
  token?: string;
};

export type ApiError = {
  message: string;
};

export type HttpError = AxiosError<ApiError>;
