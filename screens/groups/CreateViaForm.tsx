"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCredentials } from "@/context/CredentialsContext";
import { useParams } from "next/navigation";
import { useGroups } from "@/context/GroupsContext";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Column {
    id: string;
    label: string;
    required: boolean;
    type: "text" | "date";
    showAlways: boolean;
}

interface RecordRow {
    id: string;
    values: { [columnId: string]: string };
}

// ─── Constants ────────────────────────────────────────────────────────────────

const DEFAULT_COLUMNS: Column[] = [
    { id: "recipient", label: "Recipient", required: true, type: "text", showAlways: true },
    { id: "email", label: "Email", required: true, type: "text", showAlways: true },
    { id: "issueDate", label: "Issue Date", required: true, type: "date", showAlways: true },
    { id: "expiryDate", label: "Expiry Date", required: false, type: "date", showAlways: false },
    { id: "credentialLicenseId", label: "Credential License ID", required: false, type: "text", showAlways: false },
    { id: "grade", label: "Grade", required: false, type: "text", showAlways: false },
    { id: "recipientId", label: "Recipient ID", required: false, type: "text", showAlways: false },
];

const FORM_STEPS = ["1 - Fill Data", "2 - Summary"];

// ─── Step Indicator ───────────────────────────────────────────────────────────

const FormStepIndicator = ({ currentStep }: { currentStep: number }) => (
    <div className="w-64">
        <div className="flex items-center">
            {FORM_STEPS.map((_, index) => (
                <>
                    <div
                        key={`c-${index}`}
                        className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2",
                            index <= currentStep ? "border-[#5324FB] bg-[#5324FB]" : "border-gray-200 bg-gray-100"
                        )}
                    >
                        {index <= currentStep ? (
                            <svg width="14" height="11" viewBox="0 0 12 10" fill="none">
                                <path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        ) : (
                            <div className="h-3 w-3 rounded-full bg-white" />
                        )}
                    </div>
                    {index < FORM_STEPS.length - 1 && (
                        <div key={`l-${index}`} className={cn("flex-1 h-[2px]", index < currentStep ? "bg-[#5324FB]" : "bg-gray-200")} />
                    )}
                </>
            ))}
        </div>
        <div className="flex justify-between mt-2">
            {FORM_STEPS.map((step, index) => (
                <span key={step} className={cn("text-xs font-medium", index <= currentStep ? "text-[#5324FB]" : "text-[#667085]")}>
                    {step}
                </span>
            ))}
        </div>
    </div>
);

// ─── Editable Label ───────────────────────────────────────────────────────────

const EditableLabel = ({ value, required, onChange }: { value: string; required: boolean; onChange: (v: string) => void }) => {
    const [editing, setEditing] = useState(false);
    return editing ? (
        <input autoFocus value={value} onChange={(e) => onChange(e.target.value)} onBlur={() => setEditing(false)} onKeyDown={(e) => e.key === "Enter" && setEditing(false)} className="text-sm font-medium border-b border-[#5324FB] focus:outline-none bg-transparent w-full" />
    ) : (
        <span className="text-sm font-medium text-[#344054] cursor-pointer hover:text-[#5324FB] whitespace-nowrap" onClick={() => setEditing(true)}>
            {value}{required && <span className="text-red-500"> *</span>}
        </span>
    );
};

// ─── Cell Input ───────────────────────────────────────────────────────────────

const CellInput = ({ type, value, onChange }: { type: "text" | "date"; value: string; onChange: (v: string) => void }) => (
    <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[38px] w-full rounded border border-gray-300 px-3 text-sm text-gray-600 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
    />
);

// ─── Validating Modal ─────────────────────────────────────────────────────────

const ValidatingModal = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="flex flex-col items-center gap-4 rounded-2xl bg-white px-10 py-8 shadow-xl text-center">
      <svg width="66" height="66" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-spin">
        {[...Array(12)].map((_, i) => {
          const angle = i * 30;
          const opacity = (i + 1) / 12;
          const rad = (angle * Math.PI) / 180;
          const x1 = 33 + 18 * Math.sin(rad);
          const y1 = 33 - 18 * Math.cos(rad);
          const x2 = 33 + 26 * Math.sin(rad);
          const y2 = 33 - 26 * Math.cos(rad);
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#0369a1" strokeWidth="5" strokeLinecap="round" strokeOpacity={opacity} />
          );
        })}
      </svg>
      <h2 className="text-lg font-semibold text-[#101828]">Validating your records</h2>
      <p className="text-sm text-[#667085]">
        Please wait while we validate you records. It may take a few moments. Please don't refresh the page.
      </p>
    </div>
  </div>
);

// ─── Summary Step ─────────────────────────────────────────────────────────────

const SummaryStep = ({ credentialCount, groupName }: { credentialCount: number; groupName: string }) => {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center gap-6 py-16 px-6 text-center">
            {/* Green checkmark */}
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#12B76A]">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_555_13475)">
                        <rect width="100" height="100" rx="50" fill="#31BB7C" />
                        <path d="M85.2692 33.3223C85.534 33.3521 85.5876 33.3273 85.8075 33.5287C87.2932 34.8903 88.801 36.2918 90.2796 37.6564L99.3286 45.9895C99.7321 46.3625 102.168 48.7129 102.501 48.8729L102.535 49.6667C102.522 51.5129 102.512 53.2552 102.343 55.0983C102.194 56.4105 102.025 57.7202 101.836 59.0272C101.242 61.906 100.743 64.0209 99.8251 66.7909C99.3712 68.1112 98.8115 69.4781 98.2709 70.7698C97.8981 71.5562 97.519 72.3401 97.1359 73.1216L96.2926 74.7537C95.4934 76.0267 94.7887 77.3168 93.9478 78.5715L93.2534 79.5477C93.571 80.2696 93.4914 81.8243 93.4985 82.673C92.7166 82.6297 91.6967 82.8038 90.9724 82.5075C90.4562 83.1104 89.9107 83.7739 89.3827 84.3594C88.7372 85.0481 88.079 85.7242 87.4083 86.3885C86.7951 86.9725 86.1512 87.606 85.5112 88.1545C85.5931 88.9393 85.6002 89.7636 85.6207 90.5548C85.6199 91.844 85.6436 93.2049 85.6184 94.487C85.6097 95.7967 85.6113 97.1071 85.6231 98.4168L85.627 100.787H81.6704H77.7501H73.8021H69.8723H65.9267C65.9157 100.157 65.8928 99.5271 65.8581 98.8975L65.1283 99.0819C64.9573 98.8029 63.786 97.6414 63.4873 97.342L60.1069 93.9692L46.1439 80.0024C44.906 78.7644 43.2816 77.2191 42.1173 75.8845C42.0628 75.8221 42.1001 75.7918 42.1326 75.6737C44.7114 76.6551 46.887 76.3347 48.9193 74.4221C51.0153 72.4497 52.9172 70.354 54.9317 68.318L65.8045 57.479L79.0474 44.2997C79.5889 43.7599 80.1571 43.225 80.6821 42.6698C83.4336 39.7598 86.6643 37.9463 85.2692 33.3223Z" fill="#08A06D" />
                        <path d="M44.6535 52.8378L61.7975 35.7796L67.7939 29.7964C69.0124 28.581 71.2839 26.0565 72.7539 25.411C74.2498 24.7509 75.9483 24.7237 77.464 25.3354C79.0214 25.9623 80.5103 27.7456 81.7083 28.9107C83.1301 30.2932 84.4779 31.4774 85.2692 33.3224C86.6643 37.9464 83.4336 39.7599 80.6821 42.6699C80.1571 43.2251 79.5889 43.76 79.0474 44.2998L65.8046 57.4791L54.9317 68.3181C52.9172 70.354 51.0153 72.4498 48.9193 74.4222C46.8871 76.3348 44.7115 76.6552 42.1326 75.6738C41.3222 75.1791 40.9401 74.9502 40.272 74.2845L26.5887 60.4921L22.6865 56.5619C20.7578 54.6185 18.6496 53.0285 18.7018 50.0447C18.7494 47.3196 20.1497 46.1116 21.9145 44.3693L24.1522 42.1196C25.6935 40.572 26.8372 39.7252 29.1555 39.6958C31.4793 39.6665 32.7575 40.8308 34.2851 42.3785C35.2931 43.3997 36.3112 44.4348 37.3198 45.4574L44.6535 52.8378Z" fill="#FEFEFE" />
                    </g>
                    <defs>
                        <clipPath id="clip0_555_13475">
                            <rect width="100" height="100" rx="50" fill="white" />
                        </clipPath>
                    </defs>
                </svg>

            </div>
            <div className="space-y-3">
                <h2 className="text-[18px] font-semibold text-[#101828]">
                    {credentialCount} Credential{credentialCount !== 1 ? "s" : ""} have been created. But not published yet
                </h2>
                <p className="text-[14px] text-[#667085] w-[609px]">
                    You will need to review and publish them. Recipients will not be emailed until you publish them. Also your plan usage isn't updated until you publish the credentials that were created
                </p>
            </div>
            <Button
                className="bg-[#5324FB] hover:bg-[#6B46FC] text-white px-6"
                onClick={() => router.push("/dashboard/credentials")}
            >
                View Unpublished Credentials
            </Button>
        </div>
    );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────

const CreateViaFormScreen = () => {
    const params = useParams();
    const { groups } = useGroups();
    const group = groups.find((g) => g.id === params.groupId);
    const groupName = group?.displayName || "Group";
    const router = useRouter();
    const { addCredentials } = useCredentials();
    const [currentStep, setCurrentStep] = useState(0);
    const [showAllAttributes, setShowAllAttributes] = useState(false);
    const [columns, setColumns] = useState<Column[]>(DEFAULT_COLUMNS);
const [records, setRecords] = useState<RecordRow[]>([{ id: "1", values: {} }]);
    const [isValidating, setIsValidating] = useState(false);

    const visibleColumns = showAllAttributes ? columns : columns.filter((c) => c.showAlways);

    const updateColumnLabel = (id: string, label: string) => setColumns((prev) => prev.map((c) => c.id === id ? { ...c, label } : c));
    const addRecord = () => setRecords((prev) => [...prev, { id: Date.now().toString(), values: {} }]);
    const deleteRecord = (id: string) => setRecords((prev) => prev.filter((r) => r.id !== id));
    const updateRecord = (rId: string, cId: string, val: string) => setRecords((prev) => prev.map((r) => r.id === rId ? { ...r, values: { ...r.values, [cId]: val } } : r));

    const handleCreateCredentials = () => {
  setIsValidating(true);
  const delay = Math.floor(Math.random() * 5000) + 5000;
  setTimeout(() => {
    setIsValidating(false);
    addCredentials(
      records.map((r) => ({
        recipientName: r.values["recipient"] || "Unknown",
        recipientEmail: r.values["email"] || "",
        group: groupName,
        groupId: params.groupId as string,
        issueDate: r.values["issueDate"] || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        expiryDate: r.values["expiryDate"] || "-",
      }))
    );
    setCurrentStep(1);
  }, delay);
};

    return (
        <div className="flex flex-col h-screen">
            {/* Validating Modal */}
            {isValidating && <ValidatingModal />}

            {/* ── Fixed top ── */}
            <div className="shrink-0 space-y-5 px-6 pt-6">
                <h1 className="text-2xl font-semibold text-[#101828]">Create Credentials for {groupName}</h1>
                <FormStepIndicator currentStep={currentStep} />
                <hr className="border-[#EAECF0]" />

                {currentStep === 0 && (
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-[#667085]">Creating {records.length} credential{records.length !== 1 ? "s" : ""}</span>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-[#344054]">Show all Attributes</span>
                            <button
                                onClick={() => setShowAllAttributes((p) => !p)}
                                className={cn("relative h-6 w-11 rounded-full transition-colors", showAllAttributes ? "bg-[#5324FB]" : "bg-[#D0D5DD]")}
                            >
                                <div className={cn("absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all", showAllAttributes ? "left-6" : "left-1")} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* ── Step content ── */}
            {currentStep === 0 ? (
                <>
                    {/* Scrollable table */}
                    <div
                        className="flex-1 mx-6 mt-4 rounded-lg border border-[#EAECF0] overflow-auto [&::-webkit-scrollbar]:hidden"
                        style={{ scrollbarWidth: "none" }}
                    >
                        <table className="border-collapse">
                            <thead>
                                <tr className="border-b border-[#EAECF0]">
                                    <th style={{ width: 48 }} className="px-4 py-3" />
                                    {visibleColumns.map((col) => (
                                        <th key={col.id} style={{ width: 241, minWidth: 241 }} className="px-3 py-3 text-left">
                                            <EditableLabel value={col.label} required={col.required} onChange={(v) => updateColumnLabel(col.id, v)} />
                                        </th>
                                    ))}
                                    <th style={{ width: 48 }} />
                                </tr>
                            </thead>
                            <tbody>
                                {records.map((record, rowIndex) => (
                                    <tr key={record.id}>
                                        <td style={{ width: 48 }} className="px-4 py-2 text-sm text-[#667085]">{rowIndex + 1}</td>
                                        {visibleColumns.map((col) => (
                                            <td key={col.id} style={{ width: 241, minWidth: 241 }} className="px-3 py-2">
                                                <CellInput type={col.type} value={record.values[col.id] || ""} onChange={(v) => updateRecord(record.id, col.id, v)} />
                                            </td>
                                        ))}
                                        <td style={{ width: 48 }} className="px-2 py-2">
                                            {rowIndex > 0 && (
                                                <button onClick={() => deleteRecord(record.id)} className="flex h-8 w-8 items-center justify-center rounded-full border border-[#FECDCA] hover:bg-[#FEF3F2]">
                                                    <Trash2 size={14} className="text-[#F04438]" />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Add Record — fixed */}
                    <div className="shrink-0 px-6 py-3">
                        <button onClick={addRecord} className="flex items-center gap-2 text-sm font-medium text-[#5324FB] hover:opacity-80">
                            <Plus size={16} /> Add Record
                        </button>
                    </div>
                </>
            ) : (
                <div className="flex-1 overflow-y-auto">
                    <SummaryStep credentialCount={records.length} groupName={groupName} />
                </div>
            )}

            {/* ── Fixed footer ── */}
            <div className="shrink-0 flex items-center justify-between border-t border-[#EAECF0] bg-white px-6 py-4">
                <Button variant="outline" className="gap-2 border-[#D0D5DD] text-[#344054]" onClick={() => router.back()}>
                    <ChevronLeft size={16} /> Cancel
                </Button>
                {currentStep === 0 && (
                    <Button className="gap-2 bg-[#5324FB] hover:bg-[#6B46FC] text-white" onClick={handleCreateCredentials}>
                        Create Credentials <ChevronRight size={16} />
                    </Button>
                )}
            </div>
        </div>
    );
};

export default CreateViaFormScreen;