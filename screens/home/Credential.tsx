const cards = [
  {
    title: "Issue Blockchain verifiable certificates",
    description:
      "With secure logins, team access control, and intuitive interfaces, companies can now manage applicants through a streamlined hiring process.",
    bg: "bg-[#FBF7F4]",
  },
  {
    title: "Customise Credentials Portal",
    description:
      "With secure logins, team access control, and intuitive interfaces, companies can now manage applicants through a streamlined hiring process.",
    bg: "bg-[#EEF3FB]",
  },
  {
    title: "Issue Credentials at any Scale",
    description:
      "With secure logins, team access control, and intuitive interfaces, companies can now manage applicants through a streamlined hiring process.",
    bg: "bg-[#EEF6EA]",
  },
  {
    title: "Instant verification with dynamic QR",
    description:
      "With secure logins, team access control, and intuitive interfaces, companies can now manage applicants through a streamlined hiring process.",
    bg: "bg-[#E8F3F1]",
  },
  {
    title: "Exportable PDF certificates",
    description:
      "With secure logins, team access control, and intuitive interfaces, companies can now manage applicants through a streamlined hiring process.",
    bg: "bg-[#F2E9F5]",
  },
  {
    title: "REST API and webhooks",
    description:
      "With secure logins, team access control, and intuitive interfaces, companies can now manage applicants through a streamlined hiring process.",
    bg: "bg-[#F6F0E5]",
  },
];

const Credential = () => {
  return (
    <section className="bg-[#F9F8FC] px-6 py-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col items-center gap-6">
          <h3 className="text-[40px] font-semibold text-gray-900">
            Everything you need to credential at scale
          </h3>
          <p className="max-w-[958px] text-center text-xl leading-[30px] text-gray-600">
            Apply to jobs from reputable startups and companies in Africa and
            worldwide and stay protected from fake postings, pyramid schemes and
            non-paying gigs.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {cards.map((card, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-[20px] border border-[#EAEDF5] bg-white"
            >
              {/* Top Section */}
              <div className={`${card.bg} px-8 py-9`}>
                <h4 className="text-[30px] leading-[36px] font-semibold text-gray-900 md:max-w-[415px]">
                  {card.title}
                </h4>

                <p className="pt-5 text-xl text-gray-600">{card.description}</p>
              </div>

              {/* Image */}
              <div className="p-6">
                <div className="h-[200px] w-full rounded-lg bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Credential;
