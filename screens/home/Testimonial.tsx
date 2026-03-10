import Testimonials from "@/components/Testimonials";
import { TestimonialData } from "@/constants/testimonial-data";

const Testimonial = () => {
  return (
    <section id="section2" className="">
      <div className="mx-auto flex max-w-[1280px] flex-col px-6 py-24">
        <div className="flex flex-col items-start gap-4 min-[812px]:flex-row min-[812px]:justify-between">
          <h1 className="text-center text-[40px] leading-tight font-[450] text-gray-900 min-[812px]:max-w-[635px] min-[812px]:text-left">
            Education leaders rely on Certifytrusts to scale recognition
          </h1>
          <p className="text-center text-xl font-light text-gray-600 min-[812px]:max-w-[484px] min-[812px]:text-left">
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
