import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import Image from "next/image";
import certificateIMG from "@/public/dashboard/certificate.png";
import Link from "next/link";

const DesignCard = ({ href }: { href: string }) => {
  return (
    <div className="flex min-h-92.25 w-full flex-col gap-6 border border-[#D0D5DD] p-4.5">
      <div>
        <Image src={certificateIMG} alt="" className="w-full object-cover" />
      </div>

      <div className="mt-auto">
        <h6 className="text-sm font-semibold text-gray-900">
          Achievement Certificate
        </h6>

        <div className="mt-1 flex items-center justify-between text-sm text-gray-900">
          <p className="italic">Not in Use</p>
          <p>ID 487338</p>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <Button asChild variant="pricing" size="full">
            <Link href={href}>Edit</Link>
          </Button>

          <Button className="w-12.25" variant="pricing" size="icon">
            <Ellipsis />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DesignCard;
