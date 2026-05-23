import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface GoBackButtonProps {
  onClick?: () => void;
}

const GoBackButton = ({ onClick }: GoBackButtonProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (onClick) {
      onClick();
    } else {
      router.back();
    }
  };

  return (
    <div
      onClick={handleBack}
      className="flex w-fit cursor-pointer gap-2 text-gray-600 hover:text-gray-500"
    >
      <ArrowLeft />
      <span>Back</span>
    </div>
  );
};

export default GoBackButton;
