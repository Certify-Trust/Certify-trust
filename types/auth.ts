import { AxiosError } from "axios";

export type LoginPayload = {
  email: string;
  password?: string;
  role?: string | null;
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

export type IssuerVerificationPayload = {
  corporate_legal_name: string;
  corporate_address: string;
  country: string;
  year_founded: number;
  number_of_employees: number;
  registration_id: string;
  organisation_description: string;
  corporate_website_url: string;
  linkedin_page_url: string;
  logo_url: string;
  business_contact_email: string;
  signatory_full_name: string;
  signatory_email: string;
  signatory_title: string;
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
