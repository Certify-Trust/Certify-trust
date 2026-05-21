import Footer from "@/components/footer/Footer";
import Header from "@/components/header";
import Credential from "@/screens/home/Credential";
import Faq from "@/screens/home/Faq";
import Hero from "@/screens/home/Hero";
import Testimonial from "@/screens/home/Testimonial";
import Tools from "@/screens/home/Tools";
import Trusted from "@/screens/home/Trusted";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Trusted />
      <Credential />
      {/* <Testimonial /> */}
      <Tools />
      <Faq />
      <Footer />
    </>
  );
}
