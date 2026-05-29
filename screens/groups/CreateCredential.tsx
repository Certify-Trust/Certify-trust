"use client";

import { useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FileText, Upload, ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import * as XLSX from "xlsx";
import { useCredentials } from "@/context/CredentialsContext";
import { useGroups } from "@/context/GroupsContext";

// ─── Types ────────────────────────────────────────────────────────────────────

type Step = "Upload" | "Validate" | "Create" | "Summary";
const STEPS: Step[] = ["Upload", "Validate", "Create", "Summary"];

// ─── Step Indicator ───────────────────────────────────────────────────────────

const StepIndicator = ({ currentStep }: { currentStep: Step }) => {
  const currentIndex = STEPS.indexOf(currentStep);

  return (
    <div className="w-full max-w-lg">
      <div className="flex items-center">
        {STEPS.map((step, index) => (
          <>
            <div
              key={`circle-${step}`}
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                index < currentIndex
                  ? "border-[#5324FB] bg-[#5324FB]"
                  : index === currentIndex
                    ? "border-[#5324FB] bg-white"
                    : "border-gray-100 bg-gray-100",
              )}
            >
              {index < currentIndex ? (
                <svg width="14" height="11" viewBox="0 0 12 10" fill="none">
                  <path
                    d="M1 5L4.5 8.5L11 1"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <div
                  className={cn(
                    "h-3 w-3 rounded-full",
                    index === currentIndex ? "bg-[#5324FB]" : "bg-white",
                  )}
                />
              )}
            </div>
            {index < STEPS.length - 1 && (
              <div
                key={`line-${index}`}
                className={cn(
                  "h-[2px] flex-1",
                  index < currentIndex ? "bg-[#5324FB]" : "bg-[#E4E7EC]",
                )}
              />
            )}
          </>
        ))}
      </div>
      <div className="mt-2 flex">
        {STEPS.map((step, index) => (
          <div
            key={`label-${step}`}
            className={cn(
              "text-sm font-medium",
              index === 0
                ? "text-left"
                : index === STEPS.length - 1
                  ? "flex-1 text-right"
                  : "flex-1 text-center",
              index <= currentIndex ? "text-[#5324FB]" : "text-[#667085]",
            )}
          >
            {step}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Upload Modal ─────────────────────────────────────────────────────────────

const UploadModal = ({ onCancel }: { onCancel: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="relative mx-4 flex w-full max-w-sm flex-col items-center gap-5 rounded-2xl bg-white px-10 py-8 text-center shadow-xl">
      <button
        onClick={onCancel}
        className="absolute top-4 right-4 text-[#667085] hover:text-[#344054]"
      >
        <X size={18} />
      </button>
      <div className="absolute top-12 left-0 h-px w-full bg-[#EAECF0]" />
      <div className="mt-4">
        <svg
          width="66"
          height="66"
          viewBox="0 0 66 66"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-spin"
        >
          {[...Array(12)].map((_, i) => {
            const angle = i * 30;
            const opacity = (i + 1) / 12;
            const rad = (angle * Math.PI) / 180;
            const x1 = 33 + 18 * Math.sin(rad);
            const y1 = 33 - 18 * Math.cos(rad);
            const x2 = 33 + 26 * Math.sin(rad);
            const y2 = 33 - 26 * Math.cos(rad);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#0369a1"
                strokeWidth="5"
                strokeLinecap="round"
                strokeOpacity={opacity}
              />
            );
          })}
        </svg>
      </div>
      <h2 className="text-lg font-semibold text-[#101828]">
        Upload Spreadsheet
      </h2>
      <p className="text-sm text-[#667085]">
        Please wait while we analyse your spreadsheet records. It may take a few
        moments. Please don&apos;t refresh the page.
      </p>
      <Button
        variant="outline"
        className="w-full border-[#D0D5DD] text-red-500"
        onClick={onCancel}
      >
        Cancel
      </Button>
    </div>
  </div>
);

// ─── Upload Step ──────────────────────────────────────────────────────────────

const UploadStep = ({
  onFileUpload,
}: {
  onFileUpload: (file: File) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileUpload(file);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 py-16">
      <svg
        width="85"
        height="63"
        viewBox="0 0 85 63"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.28718 17.8504C2.01351 17.7552 4.71901 17.8432 6.49104 17.8438L18.8798 17.845L56.9981 17.8448L75.2672 17.8446C77.1476 17.8446 79.5875 17.8023 81.5001 17.8931C81.5897 17.8974 81.6767 18.0153 81.7102 18.1056C81.7905 18.3194 81.7584 18.9169 81.7283 19.1253C81.4265 21.1854 81.0798 24.4484 80.8235 26.3516C80.6683 27.5064 79.7628 36.0195 79.5862 36.4149C79.3138 36.6324 78.846 36.2329 78.4458 36.0367C76.362 35.0296 74.076 34.5108 71.7612 34.5195C67.4168 34.5069 63.949 36.1739 60.9115 39.2072C59.1013 40.993 57.6164 43.6817 57.0409 46.1494C56.3061 49.4132 56.6474 52.8272 58.0139 55.881C58.5024 56.9471 59.0799 57.8393 59.6956 58.833C55.6797 58.9141 51.4049 58.8369 47.3616 58.8367L22.9457 58.8355L12.1585 58.8367C10.824 58.8391 8.31039 58.9864 7.08991 58.7803C6.30501 58.6478 5.5893 58.2653 5.13351 57.6001C4.74062 57.0265 4.62191 56.3727 4.5147 55.7004C4.11432 53.1902 -0.10236 18.5217 0.00190134 18.1069C0.0376365 17.965 0.170472 17.9212 0.28718 17.8504Z"
          fill="#5324FB"
        />
        <path
          d="M10.4765 0.0545271C12.7186 -0.0592596 15.9273 0.0404081 18.2315 0.0400735L22.8595 0.0399398C23.9279 0.0399398 25.7012 -0.0595342 26.6875 0.297491C29.3056 1.24519 28.4268 6.51284 31.1908 6.98377C31.9731 7.11707 33.359 7.06768 34.1956 7.06655L38.7676 7.06568L59.6326 7.06287L66.4919 7.06052C68.2981 7.06019 72.4143 6.52608 72.8212 8.83989C72.9657 9.66239 73.1678 14.4828 72.8593 15.0844C72.4913 15.3026 71.1301 15.2216 70.6349 15.2148L23.6816 15.2162L13.9752 15.2161C12.9593 15.2161 8.72532 15.2885 8.08504 15.0807C8.0406 14.9492 8.00808 14.8139 7.988 14.6766C7.89016 14.0264 7.92202 13.0563 7.92142 12.3705L7.91881 8.64511L7.91887 4.62667C7.92014 2.36573 7.63406 0.45447 10.4765 0.0545271Z"
          fill="#5324FB"
        />
        <path
          d="M71.2044 37.3091C78.0289 36.9743 83.8348 42.2311 84.1768 49.0548C84.5187 55.8786 79.2676 61.6896 72.4438 62.0382C65.6092 62.3882 59.7879 57.1278 59.4453 50.294C59.1026 43.4601 64.3692 37.6444 71.2044 37.3091Z"
          fill="#0E8F4A"
        />
        <path
          d="M71.6468 43.1123C71.8502 43.1152 72.065 43.1335 72.2357 43.2832C73.9568 44.7874 75.5174 46.5446 77.1041 48.1842C78.3274 49.4487 76.7313 50.4036 76.1505 49.9172C75.0188 48.9691 73.92 47.7577 72.7958 46.7622C72.8152 48.2583 72.9758 55.307 72.6713 56.2084C72.5522 56.5606 72.3073 56.6967 71.9887 56.8529C71.357 56.8409 70.9321 56.4911 70.8879 55.852C70.8156 54.8175 70.8464 53.7479 70.8477 52.7109L70.8564 46.7221C69.8185 47.6202 68.9184 48.6846 67.8758 49.5766C67.6162 49.7991 67.2956 50.0992 66.9276 50.0522C66.6639 50.0185 66.3969 49.7896 66.2423 49.5833C66.1045 49.3986 66.0121 49.1644 66.063 48.9319C66.2082 48.2662 70.8136 43.6373 71.6468 43.1123Z"
          fill="#F8F8F7"
        />
      </svg>

      <div className="space-y-2 text-center">
        <p className="text-base font-semibold text-[#101828]">
          Upload a spreadsheet of your recipients&apos; info from your computer
        </p>
        <p className="text-sm text-[#667085]">
          We accept most spreadsheets formats, ie: CSV, XLS, XLSX. Max file
          size: 20 MB
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,.xls,.xlsx"
        className="hidden"
        onChange={handleFileChange}
      />

      <Button
        className="gap-2 bg-[#5324FB] px-6 text-white hover:bg-[#6B46FC]"
        onClick={() => fileInputRef.current?.click()}
      >
        Upload Spreadsheet <Upload size={16} />
      </Button>

      <span className="text-sm text-[#667085]">Or</span>

      <Button
        variant="outline"
        className="gap-2 border-[#D0D5DD] px-6 text-[#344054]"
        onClick={() => {
          const link = document.createElement("a");
          link.href = "/credentials_template.xlsx";
          link.download = "credentials_template.xlsx";
          link.click();
        }}
      >
        Download Spreadsheet Template <Upload size={16} />
      </Button>
    </div>
  );
};

// ─── Validate Step ────────────────────────────────────────────────────────────

const ValidateStep = ({ fileName }: { fileName: string }) => (
  <div className="p-6">
    <div className="flex items-start gap-4 rounded-lg border border-[#EAECF0] p-5">
      <svg
        width="85"
        height="63"
        viewBox="0 0 85 63"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-16 shrink-0"
      >
        <path
          d="M0.28718 17.8504C2.01351 17.7552 4.71901 17.8432 6.49104 17.8438L18.8798 17.845L56.9981 17.8448L75.2672 17.8446C77.1476 17.8446 79.5875 17.8023 81.5001 17.8931C81.5897 17.8974 81.6767 18.0153 81.7102 18.1056C81.7905 18.3194 81.7584 18.9169 81.7283 19.1253C81.4265 21.1854 81.0798 24.4484 80.8235 26.3516C80.6683 27.5064 79.7628 36.0195 79.5862 36.4149C79.3138 36.6324 78.846 36.2329 78.4458 36.0367C76.362 35.0296 74.076 34.5108 71.7612 34.5195C67.4168 34.5069 63.949 36.1739 60.9115 39.2072C59.1013 40.993 57.6164 43.6817 57.0409 46.1494C56.3061 49.4132 56.6474 52.8272 58.0139 55.881C58.5024 56.9471 59.0799 57.8393 59.6956 58.833C55.6797 58.9141 51.4049 58.8369 47.3616 58.8367L22.9457 58.8355L12.1585 58.8367C10.824 58.8391 8.31039 58.9864 7.08991 58.7803C6.30501 58.6478 5.5893 58.2653 5.13351 57.6001C4.74062 57.0265 4.62191 56.3727 4.5147 55.7004C4.11432 53.1902 -0.10236 18.5217 0.00190134 18.1069C0.0376365 17.965 0.170472 17.9212 0.28718 17.8504Z"
          fill="#5324FB"
        />
        <path
          d="M10.4765 0.0545271C12.7186 -0.0592596 15.9273 0.0404081 18.2315 0.0400735L22.8595 0.0399398C23.9279 0.0399398 25.7012 -0.0595342 26.6875 0.297491C29.3056 1.24519 28.4268 6.51284 31.1908 6.98377C31.9731 7.11707 33.359 7.06768 34.1956 7.06655L38.7676 7.06568L59.6326 7.06287L66.4919 7.06052C68.2981 7.06019 72.4143 6.52608 72.8212 8.83989C72.9657 9.66239 73.1678 14.4828 72.8593 15.0844C72.4913 15.3026 71.1301 15.2216 70.6349 15.2148L23.6816 15.2162L13.9752 15.2161C12.9593 15.2161 8.72532 15.2885 8.08504 15.0807C8.0406 14.9492 8.00808 14.8139 7.988 14.6766C7.89016 14.0264 7.92202 13.0563 7.92142 12.3705L7.91881 8.64511L7.91887 4.62667C7.92014 2.36573 7.63406 0.45447 10.4765 0.0545271Z"
          fill="#5324FB"
        />
        <path
          d="M71.2044 37.3091C78.0289 36.9743 83.8348 42.2311 84.1768 49.0548C84.5187 55.8786 79.2676 61.6896 72.4438 62.0382C65.6092 62.3882 59.7879 57.1278 59.4453 50.294C59.1026 43.4601 64.3692 37.6444 71.2044 37.3091Z"
          fill="#0E8F4A"
        />
        <path
          d="M71.6468 43.1123C71.8502 43.1152 72.065 43.1335 72.2357 43.2832C73.9568 44.7874 75.5174 46.5446 77.1041 48.1842C78.3274 49.4487 76.7313 50.4036 76.1505 49.9172C75.0188 48.9691 73.92 47.7577 72.7958 46.7622C72.8152 48.2583 72.9758 55.307 72.6713 56.2084C72.5522 56.5606 72.3073 56.6967 71.9887 56.8529C71.357 56.8409 70.9321 56.4911 70.8879 55.852C70.8156 54.8175 70.8464 53.7479 70.8477 52.7109L70.8564 46.7221C69.8185 47.6202 68.9184 48.6846 67.8758 49.5766C67.6162 49.7991 67.2956 50.0992 66.9276 50.0522C66.6639 50.0185 66.3969 49.7896 66.2423 49.5833C66.1045 49.3986 66.0121 49.1644 66.063 48.9319C66.2082 48.2662 70.8136 43.6373 71.6468 43.1123Z"
          fill="#F8F8F7"
        />
      </svg>
      <div className="space-y-1">
        <p className="text-sm font-medium text-[#344054]">
          Validating records from spreadsheet:{" "}
          <span className="cursor-pointer text-[#5324FB] hover:underline">
            {fileName}
          </span>
        </p>
        <p className="w-[749px] text-[14px] text-black">
          This could take some time. You can leave the page and we will keep
          analysing your spreadsheet. You can visit this page through
          credentials page
        </p>
      </div>
    </div>
  </div>
);

// ─── Summary Step ─────────────────────────────────────────────────────────────

const SummaryStep = ({ credentialCount }: { credentialCount: number }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center gap-6 px-6 py-16 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#12B76A]">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path
            d="M8 20L16 28L32 12"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-[#101828]">
          {credentialCount} Credential{credentialCount !== 1 ? "s" : ""} have
          been created. But not published yet
        </h2>
        <p className="max-w-md text-sm text-[#667085]">
          You will need to review and publish them. Recipients will not be
          emailed until you publish them. Also your plan usage isn&apos;t
          updated until you publish the credentials that were created
        </p>
      </div>
      <Button
        className="bg-[#5324FB] px-6 text-white hover:bg-[#6B46FC]"
        onClick={() => router.push("/dashboard/credentials")}
      >
        View Unpublished Credentials
      </Button>
    </div>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────

const CreateCredentialsScreen = () => {
  const router = useRouter();
  const params = useParams();
  const { groups } = useGroups();
  const { addCredentials } = useCredentials();
  const group = groups.find((g) => g.id === params.groupId);
  const groupName = group?.displayName || "Group";

  const [currentStep, setCurrentStep] = useState<Step>("Upload");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setShowUploadModal(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(firstSheet);
      setCredentialCount(rows.length);

      addCredentials(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (rows as any[]).map((row) => ({
          recipientName: row["Recipient"] || row["recipient"] || "Unknown",
          recipientEmail: row["Email"] || row["email"] || "",
          group: groupName,
          groupId: params.groupId as string,
          issueDate:
            row["Issue Date"] ||
            row["issueDate"] ||
            new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
          expiryDate: row["Expiry Date"] || row["expiryDate"] || "-",
        })),
      );
    };
    reader.readAsBinaryString(file);

    // eslint-disable-next-line react-hooks/purity
    const delay = Math.floor(Math.random() * 5000) + 5000;
    setTimeout(() => {
      setShowUploadModal(false);
      setCurrentStep("Validate");
    }, delay);
  };

  const handleNext = () => {
    if (currentStep === "Validate") {
      setCurrentStep("Create");
      setTimeout(() => setCurrentStep("Summary"), 100);
    }
  };
  const [credentialCount, setCredentialCount] = useState(0);

  return (
    <div className="min-h-screen space-y-6">
      {showUploadModal && (
        <UploadModal
          onCancel={() => {
            setShowUploadModal(false);
            setUploadedFile(null);
          }}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#101828]">
          Create Credentials for {groupName}
        </h1>
        <Button
          variant="outline"
          className="gap-2 border-[#D0D5DD] text-[#344054]"
          onClick={() =>
            router.push(
              `/dashboard/groups/${params.groupId}/credentials/create/form`,
            )
          }
        >
          Create Credentials via Form <FileText size={16} />
        </Button>
      </div>

      {/* Steps */}
      <StepIndicator currentStep={currentStep} />
      <hr className="border-[#EAECF0]" />

      {/* Step Content */}
      <div className="rounded-lg border border-[#EAECF0] bg-white">
        {currentStep === "Upload" && (
          <UploadStep onFileUpload={handleFileUpload} />
        )}
        {currentStep === "Validate" && (
          <ValidateStep fileName={uploadedFile?.name || "file"} />
        )}
        {currentStep === "Create" && (
          <div className="flex min-h-[300px] items-center justify-center text-[#667085]">
            Create step coming soon.
          </div>
        )}
        {currentStep === "Summary" && (
          <SummaryStep credentialCount={credentialCount} />
        )}
      </div>

      {/* Footer — shown on Validate, Create, Summary */}
      {currentStep !== "Upload" && currentStep !== "Summary" && (
        <div className="fixed right-0 bottom-0 left-[280px] flex items-center justify-between border-t border-[#EAECF0] bg-white px-8 py-4 max-[1280px]:left-64">
          <Button
            variant="outline"
            className="gap-2 border-[#D0D5DD] text-[#344054]"
            onClick={() => router.back()}
          >
            <ChevronLeft size={16} /> Cancel
          </Button>
          <Button
            className="gap-2 bg-[#5324FB] text-white hover:bg-[#6B46FC]"
            onClick={handleNext}
          >
            Next <ChevronRight size={16} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default CreateCredentialsScreen;
