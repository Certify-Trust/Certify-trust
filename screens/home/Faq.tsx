import React from "react";
// import CustomAccordion from '../utils/customAccordion';
import CustomAccordion from "@/components/CustomAccordion";
// import { email } from '@/lib/constant';

function Faq() {
  const accordionData = [
    {
      itemValue: "item-1",
      question: "What is Edusproute?",
      answer:
        "Edusproute is an innovative ed-tech platform dedicated to empowering individuals through tech education. We offer comprehensive, interactive courses across various tech domains, including coding, Product management, UX/UI design, and more, tailored for beginners and seasoned professionals. We aim to make tech education accessible, engaging, and practical for everyone.",
    },
    {
      itemValue: "item-2",
      question: "What courses or programs does Edusproute offer?",
      answer: `Currently, Edusproute offers seven program tracks; Product Management, Frontend Development, Backend Development, Product Design, Data Analysis, Cybersecurity, and Artificial Intelligence. More program tracks are usually added with the completion of each cohort.`,
    },
    {
      itemValue: "item-3",
      question: "Are there any specific prerequisites?",
      answer:
        "No specific prerequisites are required for most of our courses. Our programs are designed to accommodate individuals from diverse backgrounds, whether you’re completely new to tech or looking to advance your skills. Some advanced courses suggest foundational knowledge, which will be clearly stated in the course description.",
    },
    {
      itemValue: "item-4",
      question: "What do I get with the Edusproute Pro plan?",
      answer:
        "The Edusproute Pro plan offers exclusive access to advanced courses, one-on-one mentoring sessions with industry experts, career counselling, and priority support. Additionally, Pro members get unlimited access to all our resources, including project templates,1 on 1 sessions with the lecturers, industry case studies, and a vast library of tools and materials to enhance learning.",
    },
    {
      itemValue: "item-5",
      question: "Why should I upgrade to Edusproute Pro?",
      answer:
        "Upgrading to Edusproute Pro is the perfect step for anyone serious about accelerating their tech career. With personalised mentoring, advanced project-based learning, and comprehensive career support, the Pro plan is designed to equip you with industry-relevant skills, practical experience, and the confidence to stand out.",
    },
    {
      itemValue: "item-6",
      question: "Are the courses self-paced or do they have fixed schedules?",
      answer:
        "Classes run for the duration of 4 months but are flexible and fit your schedule. This involves live classes, 1-1 mentorship and team projects within this time period.",
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
        <div className="mx-auto max-w-[768px] py-16 text-[18px]">
          {accordionData.map((data, index) => (
            <CustomAccordion key={index} {...data} />
          ))}
        </div>
        <p className="text-center text-gray-600">
          Still have questions?{" "}
          <a
            // href={`mailto:${email}`}
            href={`#`}
            className="text-[18px] text-[#155EEF] underline"
          >
            Let’s talk
          </a>
        </p>
      </div>
    </div>
  );
}

export default Faq;
