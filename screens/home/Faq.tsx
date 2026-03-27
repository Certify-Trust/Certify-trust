import React from "react";
// import CustomAccordion from '../utils/customAccordion';
import CustomAccordion from "@/components/CustomAccordion";
// import { email } from '@/lib/constant';

function Faq() {
  const accordionData = [
    {
      itemValue: "item-1",
      question: "What is CertifyTrusts and how does it work?",
      answer:
        "CertifyTrusts is an open‑source digital credentialing platform that uses blockchain technology to issue secure, verifiable certificates and badges at scale. Connect it to your LMS, CRM, or enrollment system to automate credential issuance based on course completion or custom rules. Each recipient gets a shareable credential anchored on blockchain, complete with a public verification URL and QR code for instant trust. Your team can track views, shares, and program impact from a single, transparent dashboard while benefiting from the auditability and integrity guarantees of decentralized technology.",
    },
    {
      itemValue: "item-2",
      question: "Who is CertifyTrusts for?",
      answer: (
        <>
          Two groups across Africa and beyond:
          <br />
          <br />
          1. Modern organizations running learning and customer education
          programs, and academic institutions that need scalable, compliant
          credentialing.
          <br />
          <br />
          2. Typical users include L&D leaders, program managers, registrars,
          continuing education teams, and professional associations responsible
          for issuing trusted certificates on the continent
        </>
      ),
    },
    {
      itemValue: "item-3",
      question: "What is a digital credential?",
      answer:
        "A digital credential is a verified record of an achievement, such as course completion, skills mastery, or certification. With CertifyTrusts, each credential includes structured data, a verification URL, and optional QR code and blockchain‑backed proofs for trust and authenticity.",
    },
    {
      itemValue: "item-4",
      question:
        "What problems does CertifyTrusts solve compared to manual certificates?",
      answer:
        "No more manual templates and spreadsheets, and no more static PDFs that are easy to fake. CertifyTrusts automates credential issuing, adds instant on‑chain verification, enables seamless LinkedIn sharing, and provides analytics to prove engagement and ROI.",
    },
    {
      itemValue: "item-5",
      question: "Does CertifyTrusts support Open Badges?",
      answer:
        "Yes. CertifyTrusts supports Open Badges standards so your badges carry portable, verifiable metadata and can be recognized and shared across platforms.",
    },
    {
      itemValue: "item-6",
      question: "Can recipients add credentials to LinkedIn profiles?",
      answer:
        "Yes. With one click, recipients can add their CertifyTrusts credentials directly to LinkedIn. You control the title, issuer, dates, and optional credential ID or verification URL.",
    },
    {
      itemValue: "item-7",
      question: "What LMS and tools does CertifyTrusts integrate with? ",
      answer:
        "CertifyTrusts integrates seamlessly with popular LMS, CRM, webinar, and automation tools. If you’re using a custom system, you can connect via our API or webhooks. Share details of your tech stack and we’ll map the ideal workflow for your setup.",
    },
  ];
  return (
    <div className="min-h-[882px] bg-[#F9F8FC] px-6 py-[96px]">
      <div className="mx-auto">
        <div className="flex flex-col items-center justify-center gap-5 text-center">
          <h2 className="text-4xl font-semibold text-gray-900">
            Frequently asked questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about the product and billing.
          </p>
        </div>
        <div className="mx-auto max-w-[768px] pt-16 text-[18px]">
          {accordionData.map((data, index) => (
            <CustomAccordion key={index} {...data} />
          ))}
        </div>
        {/* <p className="text-center text-gray-600">
          Still have questions?{" "}
          <a
            // href={`mailto:${email}`}
            href={`#`}
            className="text-[18px] text-[#155EEF] underline"
          >
            Let’s talk
          </a>
        </p> */}
      </div>
    </div>
  );
}

export default Faq;
