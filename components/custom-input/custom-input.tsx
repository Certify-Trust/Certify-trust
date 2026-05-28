"use client";
import { CustomInputProps } from "@/types/input";
import React, { useState } from "react";
import { useFormContext, FieldValues, FieldError } from "react-hook-form";
import { twMerge } from "tailwind-merge";

const CustomInput: React.FC<CustomInputProps> = ({
  id,
  name,
  disabled,
  placeholder,
  label,
  type,
  onChange,
  value,
  labelClass = "text-sm font-normal text-gray-700",
  field = {},
  wrapperClassName,
  inputClass,
  options,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext<FieldValues>();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const registerField = name ? register(name) : {};

  const errorMessage =
    error ??
    (name && errors[name]?.message ? errors[name]?.message : undefined);

  const renderErrorMessage =
    typeof errorMessage === "string" ? errorMessage : undefined;

  return (
    <div className="mb-2">
      {type !== "checkbox" && type !== "radio" && (
        <label
          htmlFor={id}
          className={twMerge(
            "block text-sm font-normal text-gray-700",
            labelClass,
          )}
        >
          {label}
        </label>
      )}
      {type === "select" ? (
        <div>
          <select
            id={id}
            {...registerField}
            className={twMerge(
              "text-grey-500 my-2 rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-indigo-500 focus:outline-none",
              inputClass,
            )}
            onChange={onChange}
            disabled={disabled}
          >
            <option value="">{placeholder}</option>
            {options?.map((option) => (
              <option value={option.value} key={option.id}>
                {option.label}
              </option>
            ))}
          </select>
          {renderErrorMessage && (
            <p className="mt-[-6px] text-xs text-red-500">
              {renderErrorMessage}
            </p>
          )}
        </div>
      ) : type === "textarea" ? (
        <div className={wrapperClassName}>
          <textarea
            id={id}
            {...registerField}
            placeholder={placeholder}
            className={twMerge(
              "my-2 rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-indigo-500 focus:outline-none",
              inputClass,
            )}
            disabled={disabled}
          />
          {renderErrorMessage && (
            <p className="mt-[-12px] text-xs text-red-500">
              {renderErrorMessage}
            </p>
          )}
        </div>
      ) : type === "checkbox" ? (
        <div className="flex flex-col space-y-2">
          {options?.map((option) => (
            <div key={option.id} className="flex items-center">
              <input
                type="checkbox"
                id={option.id}
                {...registerField}
                value={option.value}
                className={twMerge(
                  "accent-blueDark-800 h-5 w-5 rounded border border-gray-300 focus:ring-0",
                  inputClass,
                )}
                disabled={disabled}
                style={option.style}
              />
              <label
                htmlFor={option.id}
                className={twMerge(
                  "block w-full text-left",
                  labelClass,
                  "flex items-center",
                )}
              >
                {option.label}
              </label>
            </div>
          ))}
          {renderErrorMessage && (
            <p className="mt-[-2px] text-xs text-red-500">
              {renderErrorMessage}
            </p>
          )}
        </div>
      ) : type === "radio" ? (
        <div className={wrapperClassName}>
          {options?.map((option) => (
            <div key={option.id} className="flex items-center">
              <input
                type="radio"
                id={option.id}
                {...registerField}
                value={option.value}
                onChange={onChange}
                className={twMerge("accent-blueDark-800 h-5 w-5", inputClass)}
                disabled={disabled}
                style={option.style}
              />
              <label
                htmlFor={option.id}
                className={twMerge("block w-full text-left", labelClass)}
              >
                {option.label}
              </label>
              {renderErrorMessage && (
                <p className="mt-[-2px] text-xs text-red-500">
                  {renderErrorMessage}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div
          className={twMerge(
            "relative my-2 h-10 w-full rounded-[1px] border border-gray-300 focus:ring-1 focus:ring-indigo-500 focus:outline-none",
            wrapperClassName,
          )}
        >
         <input
  type={showPassword ? "text" : type}
  id={id}
  placeholder={placeholder}
  className={twMerge(
    "accent-blueDark-800 h-[38px] w-full rounded-[1px] px-3 text-gray-600 placeholder:text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-none",
    inputClass,
  )}
  disabled={disabled}
  {...registerField}
  {...(value !== undefined && { value })}
  {...(onChange && { onChange })}
/>
          {type === "password" && (
            <button
              type="button"
              className="absolute top-1/2 right-3 -translate-y-1/2 transform"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <svg
                  width="16"
                  height="12"
                  viewBox="0 0 16 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.61342 6.12929C1.52262 5.98553 1.47723 5.91365 1.45182 5.80279C1.43273 5.71951 1.43273 5.58818 1.45182 5.5049C1.47723 5.39403 1.52262 5.32215 1.61341 5.17839C2.36369 3.9904 4.59693 0.987175 8.00027 0.987175C11.4036 0.987175 13.6369 3.9904 14.3871 5.17839C14.4779 5.32215 14.5233 5.39403 14.5487 5.5049C14.5678 5.58818 14.5678 5.71951 14.5487 5.80279C14.5233 5.91365 14.4779 5.98553 14.3871 6.12929C13.6369 7.31728 11.4036 10.3205 8.00027 10.3205C4.59693 10.3205 2.36369 7.31728 1.61342 6.12929Z"
                    stroke="#98A2B3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.00027 7.65384C9.10484 7.65384 10.0003 6.75841 10.0003 5.65384C10.0003 4.54927 9.10484 3.65384 8.00027 3.65384C6.8957 3.65384 6.00027 4.54927 6.00027 5.65384C6.00027 6.75841 6.8957 7.65384 8.00027 7.65384Z"
                    stroke="#98A2B3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="15"
                  viewBox="0 0 16 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.16196 3.04872C7.4329 3.00866 7.7124 2.98717 8.00028 2.98717C11.4036 2.98717 13.6369 5.9904 14.3871 7.17839C14.4779 7.32217 14.5233 7.39407 14.5488 7.50495C14.5678 7.58823 14.5678 7.71961 14.5487 7.80289C14.5233 7.91377 14.4776 7.98614 14.3861 8.13088C14.1862 8.44727 13.8814 8.89191 13.4777 9.37414M4.48288 4.13053C3.0415 5.10831 2.06297 6.46676 1.61407 7.17736C1.52286 7.32175 1.47725 7.39395 1.45183 7.50483C1.43273 7.5881 1.43272 7.71947 1.45181 7.80274C1.47722 7.91363 1.52262 7.98551 1.61342 8.12929C2.36369 9.31728 4.59694 12.3205 8.00028 12.3205C9.37255 12.3205 10.5546 11.8322 11.5259 11.1716M2.00028 1.65384L14.0003 13.6538M6.58606 6.23963C6.22413 6.60155 6.00028 7.10155 6.00028 7.65384C6.00028 8.75841 6.89571 9.65384 8.00028 9.65384C8.55256 9.65384 9.05256 9.42998 9.41449 9.06805"
                    stroke="#98A2B3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          )}
          {renderErrorMessage && (
            <p className="mt-[1px] text-xs text-red-500">
              {renderErrorMessage}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomInput;
