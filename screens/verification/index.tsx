"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { ChevronLeft, Loader } from "lucide-react";
import CustomInput from "@/components/custom-input/custom-input";
import { FormProvider, useForm } from "react-hook-form";
import { ContactInfo, OrgDetails, OrgProfile, Screen } from "@/types/input";

// ─── Step Progress Bar

const StepProgress = ({ current }: { current: number }) => {
  const steps = [1, 2, 3];
  return (
    <div className="mb-8 flex items-center justify-center">
      {steps.map((step, i) => (
        <React.Fragment key={step}>
          <div
            className={`flex h-7 w-7 items-center justify-center rounded-full border-2 transition-all duration-300 ${
              current > step
                ? "border-[#5324FB] bg-[#5324FB] text-white"
                : current === step
                  ? "border-[#5324FB] bg-[#5324FB] text-white"
                  : "border-gray-300 bg-white text-gray-400"
            }`}
          >
            {current >= step ? (
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <span className="text-xs font-semibold">{step}</span>
            )}
          </div>
          {i < steps.length - 1 && (
            <div
              className={`mx-1 h-0.5 transition-all duration-300 ${
                current > step ? "bg-[#5324FB]" : "bg-gray-200"
              }`}
              style={{ width: 120 }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// ─── Shared Input Components

const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="mb-1 block text-sm font-medium text-[#344054]">
    {children}
  </label>
);

const SelectInput = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <div className="relative">
    <select
      {...props}
      className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 pr-8 text-sm text-gray-800 transition focus:border-[#5324FB] focus:ring-1 focus:ring-[#5324FB]/30 focus:outline-none"
    />
    <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs text-gray-400">
      ▾
    </span>
  </div>
);

const NavButtons = ({
  onBack,
  onNext,
  nextLabel = "Next",
  loading = false,
}: {
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
  loading?: boolean;
}) => (
  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
    {onBack ? (
      <Button
        onClick={onBack}
        variant="pricing"
        className="flex items-center gap-2.5"
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </Button>
    ) : (
      <span />
    )}
    <Button
      onClick={onNext}
      disabled={loading}
      className="flex items-center gap-2"
    >
      {loading && <Loader className="h-4 w-4 animate-spin" />}
      {nextLabel}
    </Button>
  </div>
);

// ─── Intro Screen

const IntroScreen = ({ onStart }: { onStart: () => void }) => (
  <div className="min-h-screen space-y-5">
    <div className="flex flex-col justify-between gap-4 border-b border-gray-200 pb-6 lg:flex-row lg:items-center">
      <h1 className="flex items-center text-[22px] font-semibold text-[#101828]">
        Issuer Verification
      </h1>
    </div>

    <div className="rounded-xl border border-gray-200">
      <div className="flex flex-col justify-center gap-6 p-6 leading-tight text-gray-500">
        <h6 className="text-lg font-semibold text-gray-800">
          Verify Your Institution and Embrace Blockchain Security with Velocity.
        </h6>

        <p>
          CertifyTrusts integration with{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.velocitynetwork.foundation/"
            className="text-[#5324FB] underline hover:text-[#5324FB]/80"
          >
            Velocity Network Foundation™
          </a>{" "}
          provides customers a smooth route to become verified issuers on a
          leading blockchain-secured credentialing platform.
        </p>

        <p className="font-bold">Simplified Process:</p>

        <div>
          <span className="font-bold">Institution Verification:</span>
          {"    "}
          <span>
            Complete the Know-Your-Business (KYB) process to confirm your
            institution&apos;s legitimacy.
          </span>
        </div>

        <div>
          <span className="font-bold">Blockchain Registration:</span>
          {"    "}
          <span>
            Once approved, issue globally-recognized, blockchain-secured digital
            credentials via Velocity Network™.
          </span>
        </div>

        <p className="font-bold">Key Benefits:</p>

        <div className="flex flex-col">
          <span className="font-bold">Global Recognition:</span>
          <span>
            Your digital credentials will gain worldwide acceptance, enhancing
            your institution&apos;s credibility.
          </span>
        </div>

        <div className="flex flex-col">
          <span className="font-bold">Join a Strong Ecosystem:</span>
          <span>
            Connect with a leading network that boosts the visibility and
            interoperability of digital credentials, secured by blockchain
            technology.
          </span>
        </div>

        <div className="flex flex-col">
          <span className="font-bold">Next Steps:</span>
          <span>
            Fill out the form for KYB and blockchain registration. Clicking
            &quot;Start Verification&quot; means you agree to proceed with
            verification and network integration.
          </span>
        </div>

        <div className="flex flex-col">
          <span className="font-bold">Privacy &amp; Security:</span>
          <span>
            We prioritize your information, adhering to top data protection
            standards.
          </span>
        </div>

        <div>
          <span>
            Step into the future of secure digital credentialing with
            CertifyTrusts and Velocity Network.
          </span>
        </div>

        <Button
          onClick={onStart}
          className="w-fit bg-[#5324FB] text-white hover:bg-[#4318d6]"
        >
          Start Verification
        </Button>
      </div>
    </div>
  </div>
);

// ─── Step 1: Organisation Details

const Step1 = ({
  data,
  onChange,
  onBack,
  onNext,
}: {
  data: OrgDetails;
  onChange: (d: OrgDetails) => void;
  onBack: () => void;
  onNext: () => void;
}) => {
  const set =
    (k: keyof OrgDetails) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      onChange({ ...data, [k]: e.target.value });

  return (
    <div>
      {/* <StepProgress current={1} /> */}
      <h2 className="text-lg font-semibold text-[#101828]">
        Verify Your Organisation
      </h2>
      <p className="mb-5 text-gray-500">Fill in your Organisation details</p>

      <div className="space-y-4">
        <CustomInput
          name="corporateLegalName"
          id="corporateLegalName"
          label="Corporate Legal Name *"
          type="text"
          labelClass="text-gray-700 font-medium"
          onChange={set("corporateLegalName")}
          // error={errors.corporateLegalName?.message ? String(errors.corporateLegalName.message) : undefined}
        />

        <CustomInput
          name="corporateAddress"
          id="corporateAddress"
          label="Corporate Address *"
          type="textarea"
          labelClass="text-gray-700 font-medium"
          onChange={set("corporateAddress")}
          // error={errors.corporateAddress?.message ? String(errors.corporateAddress.message) : undefined}
        />

        <CustomInput
          name="country"
          id="country"
          label="Country *"
          type="select"
          options={[
            { id: "1", value: "United States", label: "United States" },
            { id: "2", value: "United Kingdom", label: "United Kingdom" },
            { id: "3", value: "Canada", label: "Canada" },
            { id: "4", value: "Australia", label: "Australia" },
            { id: "5", value: "Germany", label: "Germany" },
            { id: "6", value: "France", label: "France" },
            { id: "7", value: "Nigeria", label: "Nigeria" },
            { id: "8", value: "South Africa", label: "South Africa" },
            { id: "9", value: "India", label: "India" },
            { id: "10", value: "Other", label: "Other" },
          ]}
          labelClass="text-gray-700 font-medium"
          onChange={set("country")}
          // error={errors.country?.message ? String(errors.country.message) : undefined}
        />

        <CustomInput
          name="yearFounded"
          id="yearFounded"
          label="Corporate Address *"
          type="number"
          labelClass="text-gray-700 font-medium"
          onChange={set("yearFounded")}
          // error={errors.yearFounded?.message ? String(errors.yearFounded.message) : undefined}
        />

        <CustomInput
          name="numberOfEmployees"
          id="numberOfEmployees"
          label="Number of Employees *"
          type="number"
          labelClass="text-gray-700 font-medium"
          onChange={set("numberOfEmployees")}
          // error={errors.numberOfEmployees?.message ? String(errors.numberOfEmployees.message) : undefined}
        />

        <div>
          <Label>DUNS Number / LEI / Corporate Registration ID *</Label>
          <div className="flex w-full flex-1 flex-col gap-2 sm:flex-row sm:items-center">
            <div className="shrink-0 sm:w-48">
              <SelectInput value={data.idType} onChange={set("idType")}>
                <option className="font-medium" value="duns">
                  D-U-N-S Number
                </option>
                <option value="lei">LEI</option>
                <option value="corp">
                  Corporate Local Country Registration ID
                </option>
              </SelectInput>
            </div>

            <div className="flex-1">
              <CustomInput
                name="registrationId"
                id="registrationId"
                // label="Number of Employees *"
                type="number"
                labelClass="text-gray-700 font-medium"
                onChange={set("registrationId")}
                // error={errors.registrationId?.message ? String(errors.registrationId.message) : undefined}
              />
            </div>
          </div>
        </div>
      </div>

      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
  );
};

// ─── Step 2: Organisation Profile

const Step2 = ({
  data,
  onChange,
  onBack,
  onNext,
}: {
  data: OrgProfile;
  onChange: (d: OrgProfile) => void;
  onBack: () => void;
  onNext: () => void;
}) => {
  const set =
    (k: keyof OrgProfile) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      onChange({ ...data, [k]: e.target.value });

  return (
    <div>
      <div className="space-y-4">
        <CustomInput
          name="organisationDescription"
          id="organisationDescription"
          label="Organisation Description *"
          type="textarea"
          placeholder="Describe your organisation"
          labelClass="text-gray-700 font-medium"
          onChange={set("organisationDescription")}
        />

        <CustomInput
          name="corporateWebsiteUrl"
          id="corporateWebsiteUrl"
          label="Corporate Website URL *"
          type="url"
          placeholder="https://certifytrusts.com"
          labelClass="text-gray-700 font-medium"
          onChange={set("corporateWebsiteUrl")}
        />

        <CustomInput
          name="organisationLinkedinUrl"
          id="organisationLinkedinUrl"
          label="Organisation LinkedIn Page URL *"
          type="url"
          placeholder="https://linkedin.com/company/example"
          labelClass="text-gray-700 font-medium"
          onChange={set("organisationLinkedinUrl")}
        />

        <CustomInput
          name="logoUrl"
          id="logoUrl"
          label="Logo URL *"
          type="url"
          placeholder="https://example.com/logo.png"
          labelClass="text-gray-700 font-medium"
          onChange={set("logoUrl")}
        />
      </div>

      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
  );
};
// ─── Step 3: Contact & Signatory

const Step3 = ({
  data,
  onChange,
  onBack,
  onSubmit,
  loading,
}: {
  data: ContactInfo;
  onChange: (d: ContactInfo) => void;
  onBack: () => void;
  onSubmit: () => void;
  loading: boolean;
}) => {
  const set =
    (k: keyof ContactInfo) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      onChange({ ...data, [k]: e.target.value });

  return (
    <div>
      <div className="space-y-4">
        <CustomInput
          name="businessContactEmail"
          id="businessContactEmail"
          label="Business Contact Email *"
          type="email"
          placeholder="business@email.com"
          labelClass="text-gray-700 font-medium"
          onChange={set("businessContactEmail")}
        />

        <CustomInput
          name="corporateSignatoryFullName"
          id="corporateSignatoryFullName"
          label="Corporate Signatory Full Name *"
          type="text"
          placeholder="Brenda Hoves"
          labelClass="text-gray-700 font-medium"
          onChange={set("corporateSignatoryFullName")}
        />

        <CustomInput
          name="corporateSignatoryEmail"
          id="corporateSignatoryEmail"
          label="Corporate Signatory Email *"
          type="email"
          placeholder="brenda@business.com"
          labelClass="text-gray-700 font-medium"
          onChange={set("corporateSignatoryEmail")}
        />

        <CustomInput
          name="corporateSignatoryTitle"
          id="corporateSignatoryTitle"
          label="Corporate Signatory Title *"
          type="text"
          placeholder="Chief Executive Officer"
          labelClass="text-gray-700 font-medium"
          onChange={set("corporateSignatoryTitle")}
        />
      </div>

      <NavButtons
        onBack={onBack}
        onNext={onSubmit}
        nextLabel="Submit Form"
        loading={loading}
      />
    </div>
  );
};

// ─── Success Screen

const SuccessScreen = () => (
  <div className="space-y-4 leading-relaxed text-gray-500">
    <div className="mb-6 flex items-start gap-2">
      <h2 className="text-lg font-semibold text-gray-800">
        Submission Successful! Thanks for your information.
      </h2>
    </div>

    <p>
      You have successfully submitted your organization verification request.
      You&apos;ll be notified once the verification is completed. Please feel
      free to contact{" "}
      <a
        href="mailto:support@certifytrusts.com"
        className="text-[#5324FB] underline"
      >
        support@certifytrusts.com
      </a>{" "}
      for further information.
    </p>

    <p>
      Thank you for taking the initial steps to secure and elevate your
      institution&apos;s digital credentials with blockchain technology through
      the Velocity Network. Here&apos;s what happens next:
    </p>

    <ol className="list-inside list-decimal space-y-3 pl-2 font-semibold">
      <li>
        <span className="font-bold">KYB Verification:</span>{" "}
        <span className="font-normal">
          Our team will review the information provided and initiate the
          Know-Your-Business process. You&apos;ll receive an update on your
          verification status shortly.
        </span>
      </li>
      <li>
        <span className="font-semibold"> Velocity Network Registration:</span>{" "}
        <span className="font-normal">
          Upon successful verification, your designated administrator will
          receive an email invitation to complete the Velocity Network
          registration.
        </span>
      </li>
    </ol>

    <p>
      Please ensure that your signatory authority looks for this email and
      approves it promptly to avoid delays in becoming a verified issuer on the
      Velocity Network.
    </p>

    <div>
      <p className="font-bold">What&apos;s Next?</p>
      <p className="mt-1">
        After your institution is successfully registered and approved on the
        Velocity Network, you will be equipped to issue verifiable digital
        credentials globally, secured by blockchain technology. This not only
        enhances your credibility but also places you at the forefront of
        digital credential innovation.
      </p>
    </div>

    <div>
      <p className="font-bold">Need Help?</p>
      <p className="mt-1">
        For any questions or support during this process, please reach out to
        our customer support team.
      </p>
    </div>

    <p>
      We&apos;re excited to have you on board and look forward to empowering
      your digital credentialing journey with CertifyTrusts and Velocity
      Network!
    </p>

    <div className="pt-2">
      <Button
        disabled
        className="flex cursor-not-allowed items-center gap-2 bg-[#5324FB]/20 px-4 py-2.5 text-sm font-semibold text-[#5324FB]"
      >
        <Loader className="h-4 w-4 animate-spin" />
        Verification in Progress
      </Button>
    </div>
  </div>
);

// ─── Multi-step wrapper

const MultiStepFlow = ({ onBack }: { onBack: () => void }) => {
  const [step, setStep] = useState<1 | 2 | 3 | "success">(1);
  const [submitting, setSubmitting] = useState(false);

  const [orgDetails, setOrgDetails] = useState<OrgDetails>({
    corporateLegalName: "",
    corporateAddress: "",
    country: "",
    yearFounded: "",
    numberOfEmployees: "",
    idType: "duns",
    registrationId: "",
  });

  const [orgProfile, setOrgProfile] = useState<OrgProfile>({
    organisationDescription: "",
    corporateWebsiteUrl: "",
    organisationLinkedinUrl: "",
    logoUrl: "",
  });

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    businessContactEmail: "",
    corporateSignatoryFullName: "",
    corporateSignatoryEmail: "",
    corporateSignatoryTitle: "",
  });

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setStep("success");
  };

  const isSuccess = step === "success";

  return (
    <div className="min-h-screen space-y-5">
      <div className="flex items-center justify-between border-b border-gray-200 pb-6">
        {!isSuccess ? (
          <Button
            variant="pricing"
            onClick={
              step === 1
                ? onBack
                : () =>
                    setStep((s) =>
                      typeof s === "number" ? ((s - 1) as 1 | 2 | 3) : s,
                    )
            }
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-500 transition hover:bg-gray-50"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
        ) : (
          <span />
        )}
        <h1 className="text-[22px] font-semibold text-[#101828]">
          Issuer Verification
        </h1>
        <span className="w-16" />
      </div>

      {!isSuccess && <StepProgress current={step} />}

      <div className="rounded-xl border border-gray-200 p-6">
        {step === 1 && (
          <Step1
            data={orgDetails}
            onChange={setOrgDetails}
            onBack={onBack}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <Step2
            data={orgProfile}
            onChange={setOrgProfile}
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        )}
        {step === 3 && (
          <Step3
            data={contactInfo}
            onChange={setContactInfo}
            onBack={() => setStep(2)}
            onSubmit={handleSubmit}
            loading={submitting}
          />
        )}
        {isSuccess && <SuccessScreen />}
      </div>
    </div>
  );
};

// ─── Root Component

const VerificationScreen = () => {
  const [screen, setScreen] = useState<Screen>("intro");
  const methods = useForm();

  if (screen !== "intro") {
    return (
      <FormProvider {...methods}>
        <MultiStepFlow onBack={() => setScreen("intro")} />
      </FormProvider>
    );
  }

  return <IntroScreen onStart={() => setScreen(1)} />;
};

export default VerificationScreen;
