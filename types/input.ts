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
