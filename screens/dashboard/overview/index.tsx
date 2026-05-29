"use client";

import BulbIcon from "@/assets/icons/BulbIcon";
import File from "@/assets/icons/File";
import InfoIcon from "@/assets/icons/InfoIcon";
import PlusIcon from "@/assets/icons/PlusIcon";
import Shield from "@/assets/icons/Shield";
import Trophy from "@/assets/icons/Trophy";
import { ActionsDropdown } from "@/components/dropdown/ActionsDropDown";
import { Button } from "@/components/ui/button";
import { recipientData, reportData, setupCards } from "@/constants/mockdata";
import useAppSelector from "@/hooks/useAppSelector";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const OverviewScreen = () => {
  const { push } = useRouter();
  const user = useAppSelector((state) => state.user.user);

  return (
    <div className="min-h-screen space-y-5">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="flex items-center text-2xl font-semibold text-[#101828]">
            Welcome, {user?.firstName}! <span className="ml-2">👋</span>
          </h1>

          <p className="mt-1 text-base text-[#667085]">
            Check out what’s new in your Dashboard
          </p>
        </div>

        <ActionsDropdown
          trigger={
            <Button className="flex h-10.75 items-center gap-2 rounded-md px-5 font-semibold">
              <PlusIcon />
              Quick Create
            </Button>
          }
          items={[
            {
              icon: <File />,
              label: "Create a Certificate Design",
              onClick: () => push("/dashboard/designs"),
            },
            {
              icon: <Shield />,
              label: "Create a Badge Design",
              onClick: () => push("/dashboard/designs"),
            },
            {
              icon: <Trophy />,
              label: "Create a Group",
              onClick: () => push("/dashboard/groups"),
            },
          ]}
        />
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
                <p className="text-sm text-gray-700">{label}</p>

                <h3 className="mt-2 text-[28px] font-semibold tracking-[-1px] text-gray-800">
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
                <div className="text-sm text-[#475467]">{label}</div>

                <div className="mt-2 flex items-center gap-2">
                  <h3 className="text-[28px] leading-none font-semibold tracking-[-1px] text-gray-800">
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
              <InfoIcon stroke="#0A66C2" />
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

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {setupCards.map(
            ({ icon, title, description, linkText, href }, index) => (
              <div
                key={index}
                className="flex min-h-[216px] flex-col rounded-lg border border-[#E4E7EC] bg-white p-5"
              >
                <div className="flex-1">
                  <div className="mb-4">{icon}</div>

                  <h5 className="font-semibold text-gray-900">{title}</h5>

                  <p className="mt-4 text-[13px] leading-6 text-gray-500">
                    {description}
                  </p>
                </div>

                <Link
                  href={href}
                  className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[#5324FB]"
                >
                  {linkText}

                  <ArrowRight width={18} height={18} />
                </Link>
              </div>
            ),
          )}
        </div>
      </div>

      <BulbIcon className="fixed right-4 bottom-5 transition hover:scale-104" />
    </div>
  );
};

export default OverviewScreen;
