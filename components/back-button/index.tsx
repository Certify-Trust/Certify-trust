import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const GoBackButton = () => {
  const navigate = useRouter();
  return (
    <div
      onClick={() => navigate.back()}
      className="flex w-fit cursor-pointer gap-2 text-gray-600 hover:text-gray-500"
    >
      <ArrowLeft />
      <span>Back</span>
    </div>
  );
};

export default GoBackButton;
