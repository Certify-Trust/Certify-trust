import Credential from "@/screens/home/Credential";
import Faq from "@/screens/home/Faq";
import Hero from "@/screens/home/Hero";
import Testimonial from "@/screens/home/Testimonial";
import Trusted from "@/screens/home/Trusted";

export default function Home() {
  return (
    <>
      <Hero />
      <Trusted />
      <Credential />
      <Testimonial />
      <Faq />
    </>
  );
}
