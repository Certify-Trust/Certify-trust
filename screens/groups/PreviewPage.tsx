"use client";

import { useRouter } from "next/navigation";
import { useGroupForm } from "@/context/GroupFormContext";
import { Download, Mail, Code, HelpCircle, ChevronDown, Link, ExternalLink, RotateCcw, RotateCw, ChevronLeft, User } from "lucide-react";
import { IoPerson} from "react-icons/io5";
import Logo from "@/assets/icons/Logo";
import SocialIcons from "@/public/socials";

const ProfileIcon = ({ size = 40 }: { size?: number }) => (
  <div
    style={{ width: size, height: size }}
    className="flex items-center justify-center rounded-full bg-[#D0D5DD] "
  >
    <IoPerson
      size={size * 0.65}
      className="text-white "
    />
  </div>
);

const PreviewPage = () => {
  const router = useRouter();
  const { formData } = useGroupForm();

  return (
    <div className="min-h-screen">
      {/* ── Top Bar ── */}
      <div className="flex items-center justify-between border-b border-[#EAECF0] bg-white px-6 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 text-sm text-[#344054] hover:text-[#5324FB]"
          >
            <ChevronLeft size={16} />
            Back to Edit
          </button>
          <span className="text-sm text-[#667085]">Default Preview</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#D0D5DD] hover:bg-[#F2F4F7]">
            <RotateCcw size={14} className="text-[#344054]" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#D0D5DD] hover:bg-[#F2F4F7]">
            <RotateCw size={14} className="text-[#344054]" />
          </button>
        </div>
      </div>

      {/* ── Nav ── */}
      <div className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Logo />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-[#667085]">Suggested Credentials</span>
          <a href="#" className="text-sm font-medium text-[#5324FB]">Login</a>
        </div>
      </div>

     {/* ── Certificate Image ── */}
<div className="flex justify-center bg-gray-200 py-8 px-6 gap-6 flex-wrap">
  {formData.certificateImage && (
    <img src={formData.certificateImage} alt="certificate" className="max-w-2xl w-full rounded-lg shadow-sm object-contain max-h-[400px]" />
  )}
  {formData.badgeImage && (
    <img src={formData.badgeImage} alt="badge" className="max-w-2xl w-full rounded-lg shadow-sm object-contain max-h-[400px]" />
  )}
  {!formData.certificateImage && !formData.badgeImage && (
    <div className="flex items-center justify-center h-40 text-[#667085] text-sm">
      No certificate or badge uploaded yet.
    </div>
  )}
</div>

      {/* ── Main Content ── */}
      <div className="mx-auto max-w-4xl mt-12 px-6 pb-12">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* ── Left ── */}
          <div className="flex-1 space-y-6">
            {/* Issuer */}
            <div className="flex items-center gap-2">
  {formData.orgLogo ? (
    <img src={formData.orgLogo} alt="org logo" className="h-8 w-8 rounded-full object-cover" />
  ) : (
    <ProfileIcon size={32} />
  )}
  <span className="text-sm text-[#344054]">{formData.issuerName || "Issuer Name"}</span>
<ExternalLink size={20}  />
</div>

            <h1 className="text-[24px] text-[#101828]">{formData.issuerName || "Issuer Name"}</h1>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 border-[#EAECF0]">
              <button className="flex items-center gap-1 text-sm text-[#344054] hover:text-[#5324FB]">
                <Download size={14} /> Download
              </button>
              <a
                href={formData.contactEmail ? `mailto:${formData.contactEmail}` : "#"}
                className="flex items-center gap-1 text-sm text-[#344054] hover:text-[#5324FB]"
              >
                <Mail size={14} /> Email
              </a>
              <button className="flex items-center gap-1 text-sm text-[#344054] hover:text-[#5324FB]">
                <Code size={14} /> Embed
              </button>
              <button className="flex items-center gap-1 text-sm text-[#344054] hover:text-[#5324FB]">
                <HelpCircle size={14} /> Help
              </button>
              <button className="flex items-center gap-1 text-sm text-[#344054] hover:text-[#5324FB]">
                <ChevronDown size={14} /> More
              </button>
            </div>
            <a href="#" className="text-[14px] underline text-[#5324FB] hover:underline">Sign in to access more options</a>

            {/* Recipient */}
            <div className="flex mt-4 items-center gap-3">
              <ProfileIcon size={40} />
              <span className="text-[20px] text-[#101828]">{formData.displayName}</span>
            </div>
            <a href="#" className="text-[14px] text-[#5324FB] underline block">View all credentials</a>

            {/* Description */}
            {formData.description && (
              <div
                className="text-[14px] text-[#344054]"
                dangerouslySetInnerHTML={{ __html: formData.description }}
              />
            )}

            {/* Skills */}
            {formData.skills.length > 0 && (
              <div className="space-y-2">
                <p className="text-[16px] text-[#344054]">Skills / Knowledge</p>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((s, i) => (
                    <span key={`${s}-${i}`} className="rounded bg-[#E8E8E8] px-3 py-1 text-xs text-[#344054]">{s}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Dates */}
            <div className="flex gap-12">
              <div>
                <p className="text-xs font-medium text-[#667085] uppercase tracking-wide">Issued On</p>
                <p className="text-sm text-[#344054]">—</p>
              </div>
              <div>
                <p className="text-xs font-medium text-[#667085] uppercase tracking-wide">Expires On</p>
                <p className="text-sm text-[#344054]">Does not expire</p>
              </div>
            </div>

            {/* Earning Criteria */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-[#101828]">Earning Criteria</p>
              <p className="text-xs font-medium text-[#667085] uppercase tracking-wide">Required</p>
              <div className="flex items-center gap-3 rounded-lg border border-[#D0D5DD] px-4 py-2 w-fit">
                <span className="text-xs text-[#344054]">Skill</span>
                <span className="text-xs text-[#667085]">24 hours of learning</span>
              </div>
            </div>
          </div>

          {/* ── Right ── */}
          <div className="w-full lg:w-[362px] space-y-4">
            {/* Share */}
           <div className="rounded-lg bg-[#1E1B4B] p-5 space-y-3">
  <div className="flex items-start justify-between">
    <div>
      <p className="text-[18px] font-semibold text-white">Share Credential</p>
      <p className="text-[14px] text-white">Show this credential on your social network</p>
    </div>
    <svg width="52" height="74" viewBox="0 0 52 74" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.2473 45.9231C11.8655 45.6691 9.61899 45.2968 8.43397 44.5134C5.57426 42.1759 6.31702 37.626 4.61909 34.3087C3.55958 32.2388 0.459239 28.7494 0.0706791 26.9345C-0.617954 23.7182 3.92896 19.9283 4.88165 16.7068C5.48951 14.6513 5.94863 9.96608 6.9453 8.41757C7.299 7.86573 7.78758 7.41309 8.36474 7.10248C10.3899 6.00727 14.5956 5.64909 16.9673 4.88476C20.0777 3.88227 24.1717 -0.857142 27.4515 0.135963C30.0905 0.934997 33.2705 3.99002 36.1002 4.77311C37.9341 5.22949 39.9043 5.56044 41.7604 5.91239C45.1999 6.56442 45.9549 7.71391 46.6771 10.9818C46.9768 12.3347 47.2684 13.6894 47.5518 15.0458C47.7691 16.0789 47.9779 17.4051 48.3945 18.3474C49.1539 20.0652 51.5259 23.2246 51.8326 24.9878C52.3766 28.115 47.7715 31.9495 47.0046 35.0507C46.4357 37.0728 47.0042 39.8686 45.8305 41.6556C44.8547 43.141 41.6353 43.8144 39.949 44.0729C38.4672 44.3853 36.3124 44.7182 35.0259 45.4386C33.0838 46.5666 31.472 48.4562 29.5567 49.6008C27.4922 50.8346 24.7389 49.3634 22.7131 48.6524C19.606 47.562 16.5457 46.3293 13.2473 45.9231Z" fill="#E8BA53"/>
      <path d="M25.4816 18.8171C29.3836 18.1989 33.0403 20.8829 33.6203 24.7907C34.2003 28.6985 31.4807 32.3288 27.5674 32.8706C23.7078 33.4048 20.1382 30.7307 19.5662 26.8766C18.9942 23.0224 21.6333 19.4268 25.4816 18.8171Z" fill="#BA9643"/>
      <path d="M13.2484 45.9234C16.5468 46.3296 19.607 47.5623 22.7141 48.6527C24.74 49.3637 27.4933 50.835 29.5578 49.6012C31.4731 48.4566 33.0849 46.567 35.027 45.439C36.3134 44.7185 38.4682 44.3856 39.95 44.0732C40.062 50.5352 39.9077 57.0354 39.9676 63.5012C39.9782 64.6358 39.9898 65.8209 39.9591 66.9541C39.9688 68.7526 40.0792 72.2004 39.8925 73.8987C39.2431 73.7734 38.8722 73.5733 38.3446 73.1857C34.8449 70.6191 31.4009 67.9898 27.9879 65.3121C27.6475 65.045 27.1 64.7424 26.7174 64.5318C24.012 65.7462 15.0138 73.7294 13.4582 73.941C13.0107 73.6995 13.1712 68.6958 13.1796 67.8991L13.1774 53.5851C13.1768 51.7051 13.0685 47.6922 13.2484 45.9234Z" fill="#BA9643"/>
      <path d="M27.218 57.9463C27.7159 58.6822 28.642 59.1318 29.3738 59.6473L33.9719 62.8996C34.6796 63.4008 39.4218 66.8329 39.9589 66.954C39.9685 68.7525 40.0789 72.2002 39.8922 73.8986C39.2428 73.7732 38.8719 73.5732 38.3444 73.1855C34.8446 70.6189 31.4006 67.9897 27.9876 65.312C27.6472 65.0449 27.0997 64.7422 26.7171 64.5316C24.0117 65.746 15.0135 73.7292 13.4579 73.9409C13.0105 73.6993 13.1709 68.6957 13.1793 67.899C13.2372 67.6634 13.2532 67.3359 13.2734 67.0865C14.0047 66.6039 14.7452 66.0243 15.4749 65.5191L20.8652 61.7748C23.1023 60.2003 24.5983 58.6831 27.218 57.9463Z" fill="#E8BA53"/>
    </svg>
  </div>
  <div className="flex gap-4">
    <button className="flex h-8 w-8 items-center justify-center rounded-sm bg-white hover:bg-white/20">
      <SocialIcons.Share size={20} />
    </button>
    <button className="flex h-8 w-8 items-center justify-center rounded-sm bg-white hover:opacity-80">
      <SocialIcons.WhatsApp size={22} />
    </button>
    <button className="flex h-8 w-8 items-center justify-center rounded-sm bg-white hover:opacity-80">
      <SocialIcons.Messenger size={32} />
    </button>
    <button className="flex h-8 w-8 items-center justify-center rounded-sm bg-white hover:opacity-80">
      <SocialIcons.LinkedIn size={32} />
    </button>
    <button className="flex h-8 w-8 items-center justify-center rounded-sm bg-white hover:opacity-80">
      <SocialIcons.Facebook size={32} />
    </button>
  </div>
</div>

            {/* More about Issuer */}
            <div className="rounded-lg border border-[#EAECF0] bg-white p-5 space-y-3">
              <p className="text-sm font-semibold text-[#101828]">More about the Issuer</p>
              <div className="flex items-center gap-2">
  {formData.orgLogo ? (
    <img src={formData.orgLogo} alt="org logo" className="h-8 w-8 rounded-full object-cover" />
  ) : (
    <ProfileIcon size={32} />
  )}
  <span className="text-sm text-[#344054]">{formData.issuerName || "Issuer Name"}</span>
</div>
              {formData.website && (
                <a
                  href={formData.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#D0D5DD] px-4 py-2 text-sm text-[#344054] hover:bg-[#F2F4F7]"
                >
                  Visit Issuer Website <ExternalLink size={12} />
                </a>
              )}
            </div>

            {/* More credentials */}
            <div className="rounded-lg border border-[#EAECF0] bg-white p-5 space-y-3">
              <p className="text-sm font-semibold text-[#101828]">More credentials from the Issuer</p>
              <a href="#" className="text-sm text-[#5324FB] underline">View All Credentials</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;