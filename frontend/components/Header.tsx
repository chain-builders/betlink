import { useState } from "react";
import { User } from "lucide-react";
import Image from "next/image";
import Button from "@/components/Button";

const Header = () => {
  const [coins, setCoins] = useState<number>(1250);

  return (
    <header className="z-50 px-6 py-2 backdrop-blur-sm relative">
      <div className="flex items-center justify-between">
        <div>
          <Image
            src="/assets/logo.png"
            alt="BetLinkLogo"
            className="w-20 ml-5"
            width={80}
            height={80}
          />
        </div>

        <div className="flex items-center text-center space-x-4 justify-center">
          <Button className="py-[9px] px-[27px] inline-flex gap-2 item-center mt-3">
            owner
          </Button>
          <div className="bg-purple-950/50 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-600">
            <div className="flex items-center space-x-2">
              <Image
                src="/assets/wallet.png"
                alt="BetLinkLogo"
                className="w-5"
                width={80}
                height={80}
              />
              <span className="text-yellow-400 font-bold">
                {coins.toLocaleString()}
              </span>
              <span className="text-purple-300 text-sm">points</span>
            </div>
          </div>
          <Button className="py-[9px] px-[27px] inline-flex gap-2 item-center mt-3">
            <User />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
