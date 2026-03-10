import Image from "next/image";

const cards = [
  {
    title: "Issue Blockchain verifiable certificates",
    description:
      "With secure logins, team access control, and intuitive interfaces, companies can now manage applicants through a streamlined hiring process.",
    bg: "bg-[#FBF7F4]",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Customise Credentials Portal",
    description:
      "With secure logins, team access control, and intuitive interfaces, companies can now manage applicants through a streamlined hiring process.",
    bg: "bg-[#EEF3FB]",
    image: "/unsplash.jpg",
  },
  {
    title: "Issue Credentials at any Scale",
    description:
      "With secure logins, team access control, and intuitive interfaces, companies can now manage applicants through a streamlined hiring process.",
    bg: "bg-[#EEF6EA]",
    image: "/unsplash.jpg",
  },
  {
    title: "Instant verification with dynamic QR",
    description:
      "With secure logins, team access control, and intuitive interfaces, companies can now manage applicants through a streamlined hiring process.",
    bg: "bg-[#E8F3F1]",
    image:
      "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Exportable PDF certificates",
    description:
      "With secure logins, team access control, and intuitive interfaces, companies can now manage applicants through a streamlined hiring process.",
    bg: "bg-[#F2E9F5]",
    image: "/cert.jpg",
  },
  {
    title: "REST API and webhooks",
    description:
      "With secure logins, team access control, and intuitive interfaces, companies can now manage applicants through a streamlined hiring process.",
    bg: "bg-[#F6F0E5]",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
  },
];

const Credential = () => {
  return (
    <section className="bg-[#F9F8FC] px-6 py-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col items-center gap-6">
          <h3 className="text-center text-[40px] leading-tight font-semibold text-gray-900">
            Everything you need to credential at scale
          </h3>
          <p className="max-w-[958px] text-center text-xl leading-[30px] text-gray-600">
            Apply to jobs from reputable startups and companies in Africa and
            worldwide and stay protected from fake postings.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {cards.map((card, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-[20px] border border-[#EAEDF5] bg-white transition-all hover:shadow-lg"
            >
              <div className={`${card.bg} px-8 py-9`}>
                <h4 className="text-[30px] leading-[36px] font-semibold text-gray-900 md:max-w-[415px]">
                  {card.title}
                </h4>
                <p className="pt-5 text-xl text-gray-600">{card.description}</p>
              </div>

              {/* Professional Image Container */}
              <div className="">
                <div className="relative h-[240px] w-full overflow-hidden bg-gray-50">
                  <Image
                    fill
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover opacity-90 mix-blend-multiply grayscale transition-all duration-500 hover:grayscale-0"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Credential;
