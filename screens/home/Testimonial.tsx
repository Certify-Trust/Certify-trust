import Testimonials from "@/components/Testimonials";
import { TestimonialData } from "@/constants/testimonial-data";

const Testimonial = () => {
  return (
    <section id="section2" className="">
      <div className="mx-auto flex max-w-[1280px] flex-col px-6 py-24">
        <div className="flex items-start justify-between">
          <h1 className="max-w-[635px] text-[40px] leading-tight font-[450] text-gray-900">
            Education leaders rely on Certifytrusts to scale recognition
          </h1>
          <p className="max-w-[484px] text-xl font-light text-gray-600">
            Get instant notifications when jobs that match your interest are
            listed, helping you act quickly .
          </p>
        </div>
        <Testimonials feedbackData={TestimonialData} />
      </div>
    </section>
  );
};

export default Testimonial;
