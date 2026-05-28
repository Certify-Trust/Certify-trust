export interface InputOption {
  id: string;
  value: string;
  label: React.ReactNode;
  style?: React.CSSProperties;
}

type InputElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export interface CustomInputProps {
  id: string;
  name?: string;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  labelClass?: string;
  type:
    | React.HTMLInputTypeAttribute
    | "text"
    | "number"
    | "select"
    | "password"
    | "email"
    | "tel"
    | "date"
    | "textarea"
    | "color"
    | "checkbox"
    | "radio";

  field?: {
    value?: string | number | Date | boolean;
    onChange?: React.ChangeEventHandler<InputElement>;
  };

  options?: InputOption[];
  wrapperClassName?: string;
  inputClass?: string;
  error?: string;

  onChange?: (e: React.ChangeEvent<InputElement>) => void;
}

export type Screen = "intro" | 1 | 2 | 3 | "success";

export interface OrgDetails {
  corporateLegalName: string;
  corporateAddress: string;
  country: string;
  yearFounded: string;
  numberOfEmployees: string;
  idType: string;
  registrationId: string;
}

export interface OrgProfile {
  organisationDescription: string;
  corporateWebsiteUrl: string;
  organisationLinkedinUrl: string;
  logoUrl: string;
}

export interface ContactInfo {
  businessContactEmail: string;
  corporateSignatoryFullName: string;
  corporateSignatoryEmail: string;
  corporateSignatoryTitle: string;
}
