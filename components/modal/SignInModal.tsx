"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

import card from "@/public/dashboard/card.svg";
import card1 from "@/public/dashboard/card1.svg";

import Logo from "@/assets/icons/Logo";

import { setSelectedRole } from "@/redux/reducers/authSlice";
import useAppDispatch from "@/hooks/useAppDispatch";

const SignInModal = () => {
  const dispatch = useAppDispatch();

  const [selectedRole, setLocalSelectedRole] = useState<
    "issuer" | "recipient" | null
  >(null);

  const options = [
    {
      id: "issuer",
      title: "I’m a credential issuer",
      description: "Design and issue branded, verifiable badges & certificates",
      image: card,
    },
    {
      id: "recipient",
      title: "I’m a credential recipient",
      description: "Access, manage and share your earned credentials easily",
      image: card1,
    },
  ];

  return (
    <div className="mx-auto flex max-w-169.5 flex-col items-center justify-center gap-6">
      <Logo />

      <div>
        <h3 className="text-2xl font-semibold text-gray-900">
          Sign in to Certifytrusts
        </h3>

        <p className="mt-1.5 text-base text-gray-600">
          Choose one of the two options below.
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-5 min-[482px]:flex-row">
        {options.map((option) => {
          const isSelected = selectedRole === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() =>
                setLocalSelectedRole(option.id as "issuer" | "recipient")
              }
              className={`flex min-h-43.5 cursor-pointer flex-col items-center rounded-lg border p-4 transition-all duration-300 ${
                isSelected
                  ? "border-[#5324FB] bg-[#F6F3FF]"
                  : "border-gray-200 hover:border-[#5324FB]"
              }`}
            >
              <Image src={option.image} alt={option.title} />

              <h6 className="mt-3 font-medium text-gray-700">{option.title}</h6>

              <p className="text-center text-xs text-gray-600">
                {option.description}
              </p>
            </button>
          );
        })}
      </div>

      <Link
        href="/auth/login"
        className="w-full"
        onClick={() => {
          if (selectedRole) {
            dispatch(setSelectedRole(selectedRole));
          }
        }}
      >
        <Button size="full" className="mt-4" disabled={!selectedRole}>
          Continue
        </Button>
      </Link>

      <div className="flex justify-center text-center text-sm text-gray-600">
        <p>
          Need to create an issuer/company account?
          <Link
            href="/auth/sign-up"
            className="pl-1 font-semibold text-[#5324FB]"
          >
            Get started
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInModal;
