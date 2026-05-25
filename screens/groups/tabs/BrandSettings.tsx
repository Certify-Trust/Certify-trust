"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";
import CustomInput from "@/components/custom-input/custom-input";
import { useForm, FormProvider } from "react-hook-form";

// ─── Branding ─────────────────────────────────────────────────────────────────

const Branding = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <section className="space-y-5 border p-4 border-gray-300 rounded-lg">
        <div>
          <h2 className="text-[18px] font-semibold text-[#101828]">Branding</h2>
          <p className="text-sm mt-2 text-[#667085]">Customize the user experience of your credentials with your logo and URL</p>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#344054]">
            Organization Logo <span className="text-red-500">*</span>
          </label>
          <div className="flex h-[77px] w-[77px] cursor-pointer items-center justify-center rounded-full bg-gray-100 hover:bg-[#F2F4F7]">
            <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.0205 4.08491H10.6208C8.33301 4.08491 7.18912 4.08491 6.31531 4.53014C5.54668 4.92177 4.92177 5.54669 4.53013 6.31532C4.0849 7.18913 4.0849 8.33302 4.0849 10.6208V22.0586C4.0849 24.3464 4.0849 25.4902 4.53013 26.3641C4.92177 27.1327 5.54668 27.7576 6.31531 28.1492C7.18912 28.5945 8.33301 28.5945 10.6208 28.5945H23.1479C24.4142 28.5945 25.0473 28.5945 25.5668 28.4553C26.9765 28.0776 28.0775 26.9765 28.4553 25.5668C28.5945 25.0473 28.5945 24.4142 28.5945 23.1479M25.8712 10.8931V2.72327M21.7862 6.80819H29.9561M14.2972 11.5739C14.2972 13.078 13.078 14.2972 11.5739 14.2972C10.0699 14.2972 8.85065 13.078 8.85065 11.5739C8.85065 10.0699 10.0699 8.85066 11.5739 8.85066C13.078 8.85066 14.2972 10.0699 14.2972 11.5739ZM20.411 16.2282L8.89306 26.6991C8.24521 27.2881 7.92129 27.5826 7.89263 27.8377C7.8678 28.0588 7.95258 28.2781 8.1197 28.425C8.3125 28.5945 8.75027 28.5945 9.62581 28.5945H22.4071C24.3668 28.5945 25.3466 28.5945 26.1162 28.2653C27.0823 27.852 27.852 27.0823 28.2652 26.1162C28.5945 25.3466 28.5945 24.3668 28.5945 22.4071C28.5945 21.7478 28.5945 21.4181 28.5224 21.1111C28.4318 20.7252 28.2581 20.3638 28.0134 20.0521C27.8187 19.804 27.5612 19.598 27.0464 19.1861L23.2375 16.1391C22.7222 15.7268 22.4646 15.5207 22.1808 15.448C21.9308 15.3838 21.6676 15.3921 21.4221 15.4719C21.1435 15.5624 20.8993 15.7843 20.411 16.2282Z" stroke="#667085" strokeWidth="2.72328" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="text-xs text-[#667085]">Make sure you're uploading an SVG, PNG, JPG, or JPEG file.</p>
          <p className="text-xs text-[#667085]">Upload a logo with recommended square dimension of 256×256px.</p>
        </div>

        <div>
          <CustomInput id="contact-email" type="text" label="Contact Email" inputClass="w-full" />
          <p className="text-xs text-[#667085]">This email will be used for the "Contact Issuer" button on your credential pages.</p>
        </div>

        <Button className="py-2 px-12">Save</Button>
      </section>
    </FormProvider>
  );
};

// ─── Issuer Page Branding ─────────────────────────────────────────────────────

const IssuerPageBranding = () => {
  return (
    <section className="space-y-5 border p-4 border-gray-300 rounded-lg">
      <div>
        <h2 className="text-base font-semibold text-[#101828]">Issuer Page Branding</h2>
        <p className="text-sm text-[#667085]">Manage you issuer page branding settings</p>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-[#344054]">Banner Image</label>
        <p className="text-xs text-[#667085]">Recommended size: At least 1920px wide by 300px tall. File type: JPG, JPEG, or PNG</p>
        <div className="flex h-32 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-[#D0D5DD] bg-[#F9FAFB] hover:bg-[#F2F4F7]">
          <Upload size={20} className="text-[#667085]" />
          <span className="text-sm text-[#667085]">Upload Image</span>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-[#344054]">Credential list default order</label>
        <select className="h-11 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-sm text-[#344054] focus:outline-none">
          <option value=""></option>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="az">A-Z</option>
        </select>
        <p className="text-xs text-[#667085]">Select the order for your credential list on your issuer page</p>
      </div>

      <Button className="py-2 px-12">Save</Button>
    </section>
  );
};

// ─── Social Media Branding ────────────────────────────────────────────────────

const SocialMediaBranding = () => {
  const [tweetMessage, setTweetMessage] = useState("");

  return (
    <section className="space-y-5 border p-4 border-gray-300 rounded-lg">
      <div>
        <h2 className="text-base font-semibold text-[#101828]">Social Media Branding</h2>
        <p className="text-sm text-[#667085]">Customize your social media messages</p>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-[#344054]">Custom Tweet Message</label>
        <p className="text-xs text-[#667085]">This message will be the default text when an user share any of your credentials on Twitter.com</p>
        <RichTextEditor value={tweetMessage} onChange={setTweetMessage} rows={5} />
      </div>

      <Button className="py-2 px-12">Save</Button>
    </section>
  );
};

// ─── SEO Settings ─────────────────────────────────────────────────────────────

const SeoSettings = () => {
  const methods = useForm();
  const [pageDescription, setPageDescription] = useState("");

  return (
    <FormProvider {...methods}>
      <section className="space-y-5 border p-4 border-gray-300 rounded-lg">
        <div>
          <h2 className="text-base font-semibold text-[#101828]">SEO Settings</h2>
          <p className="text-sm text-[#667085]">Customize the SEO data on the recipients' Credential View page</p>
        </div>

        <div>
          <CustomInput id="page-title" type="text" label="Page Title" placeholder="Custom SEO title" inputClass="w-full" />
          <p className="text-xs text-[#667085]">The page title as it will show in web searches or in posts to social networks</p>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#344054]">Page Description</label>
          <p className="text-xs text-[#667085]">The page description as it will show in web searches</p>
          <RichTextEditor value={pageDescription} onChange={setPageDescription} rows={5} />
        </div>

        <Button className="py-2 px-12">Save</Button>
      </section>
    </FormProvider>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────

const BrandSettings = () => (
  <div className="space-y-10 pb-10">
    <Branding />
    <IssuerPageBranding />
    <SocialMediaBranding />
    <SeoSettings />
  </div>
);

export default BrandSettings;