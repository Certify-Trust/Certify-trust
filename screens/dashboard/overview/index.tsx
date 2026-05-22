import InfoIcon from "@/assets/icons/InfoIcon";
import LinkednIcon from "@/assets/icons/LinkednIcon";
import PlusIcon from "@/assets/icons/PlusIcon";
import XIcon from "@/assets/icons/XIcon";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const reportData = [
  {
    label: "Issued all time",
    value: 0,
  },
  {
    label: "Recipients all time",
    value: 0,
  },
  {
    label: "Opened all time",
    value: 0,
  },
  {
    label: "Shared all time",
    value: 0,
  },
];

const recipientData = [
  {
    label: (
      <div className="flex gap-1">
        <LinkednIcon /> <span>LinkedIn Shares</span>
      </div>
    ),
    value: 0,
    percentage: "0%",
  },
  {
    label: (
      <div className="flex gap-1">
        <XIcon /> <span>X Shares</span>
      </div>
    ),
    value: 0,
    percentage: "0%",
  },
];

const OverviewScreen = () => {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="flex items-center text-2xl font-bold text-[#101828]">
            Welcome, Sandra! <span className="ml-2">👋</span>
          </h1>

          <p className="mt-1 text-base text-[#667085]">
            Check out what’s new in your Dashboard
          </p>
        </div>

        <Button className="flex h-11 items-center gap-2 rounded-md px-5 font-semibold">
          <PlusIcon />
          Quick Create
        </Button>
      </div>

      {/* Cards */}
      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        {/* Issuance Report */}
        <div className="rounded-lg border border-[#E4E7EC] bg-white p-6">
          <div className="flex items-center justify-between border-b border-[#EAECF0] pb-4">
            <h2 className="text-lg font-medium text-[#101828]">
              Issuance Report
            </h2>

            <button className="flex h-8 w-8 items-center justify-center rounded-full text-[#667085] transition hover:bg-gray-50">
              <InfoIcon />
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-y-8 lg:grid-cols-4">
            {reportData.map(({ label, value }) => (
              <div key={label}>
                <p className="text-sm text-[#475467]">{label}</p>

                <h3 className="mt-2 text-[36px] font-semibold tracking-[-1px] text-[#101828]">
                  {value}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Recipient Engagement */}
        <div className="rounded-lg border border-[#E4E7EC] bg-white p-6">
          <div className="flex items-center justify-between border-b border-[#EAECF0] pb-4">
            <h2 className="text-lg font-medium text-[#101828]">
              Recipient Engagement
            </h2>

            <button className="flex h-8 w-8 items-center justify-center rounded-full text-[#667085] transition hover:bg-gray-50">
              <InfoIcon />
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-6">
            {recipientData.map(({ label, value, percentage }, index) => (
              <div key={index}>
                <p className="text-sm text-[#475467]">{label}</p>

                <div className="mt-2 flex items-center gap-2">
                  <h3 className="text-[36px] leading-none font-semibold tracking-[-1px] text-[#101828]">
                    {value}
                  </h3>

                  <span className="text-sm text-[#667085]">{percentage}</span>
                </div>
              </div>
            ))}
          </div>

          {/* LinkedIn Notice */}
          <div className="mt-8 flex items-start gap-3 rounded-sm border border-[#B2DDFF] bg-[#EFF8FF] p-4">
            <div className="mt-0.5 text-[#1570EF]">
              <InfoIcon />
            </div>
            <p className="text-sm text-[#344054]">
              Add your LinkedIn URL to improve your results
            </p>
            <div className="">
              <Link
                href="#"
                className="mt-1 inline-flex items-center text-sm font-medium whitespace-nowrap text-[#5324FB]"
              >
                Add URL
                <ArrowRight width={20} height={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl leading-tight font-semibold">
          Set up your organization profile to get started
        </h2>

        <div className="mt-[24px]">
          <div className="min-h-[216.2px] rounded-[7px] border border-gray-200"></div>
        </div>
      </div>
    </div>
  );
};

export default OverviewScreen;
