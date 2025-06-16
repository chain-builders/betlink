"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useActiveWallet, darkTheme, ConnectButton } from "thirdweb/react";
import { inAppWallet, createWallet } from "thirdweb/wallets";
import { client } from "./client";
import { baseSepolia } from "thirdweb/chains";
import { FaWallet } from "react-icons/fa";
import Button from "../Button";

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("com.binance.wallet"),
  createWallet("org.uniswap"),
  createWallet("app.phantom"),
];

export default function SignIn() {
  const router = useRouter();
  const wallet = useActiveWallet();

  useEffect(() => {
    if (wallet) {
      router.push("/home");
    }
  }, [wallet, router]);

  const handleSocial = async (strategy: "google" | "x") => {
    const wallet = inAppWallet({
      executionMode: {
        mode: "EIP7702",
        sponsorGas: true,
      },
    });

    const account = await wallet.connect({
      client,
      chain: baseSepolia,
      strategy,
    });

    console.log("Social Connected:", account.address);
    router.push("/home");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <img src="/assets/logo.png" alt="BetLinkLogo" className="w-70 ml-5" />
      <h1 className="text-5xl font-bold text-white">Select</h1>
      <p className="text-lg text-white mb-4">a login method</p>
      <Button className="w-[285px] h-[51px] mb-3 overflow-hidden rounded-full flex items-center justify-center gap-2">
        <ConnectButton
          client={client}
          wallets={wallets}
          connectButton={{
            label: (
              <span className="flex items-center gap-[14px] font-semibold text-white mr-[50px] text-[15px]">
                <FaWallet size={23} color="white" />
                Connect wallet
              </span>
            ),
            style: {
              padding: "30px 34px",
              backgroundColor: "transparent",
            },
          }}
          connectModal={{
            size: "compact",
            titleIcon: "/assets/logo.png",
            showThirdwebBranding: false,
          }}
          accountAbstraction={{
            chain: baseSepolia,
            sponsorGas: true,
          }}
          theme={darkTheme({
            colors: {
              primaryButtonBg: "#6d28d9",
              modalBg: "#1e1b4b",
              borderColor: "#7e22ce",
              tertiaryBg: "#5b21b6",
              connectedButtonBg: "hsl(269, 84%, 52%)",
            },
          })}
          detailsButton={{
            render: () => (
              <button
                style={{
                  backgroundColor: "transparent",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <span className="flex items-center gap-[14px] font-semibold text-white mr-[50px] text-[15px] mt-[5px]">
                  <FaWallet size={23} color="white" />
                  Connected
                </span>
              </button>
            ),
          }}
        />
      </Button>
      <Button onClick={() => handleSocial("google")} className="px-[27px]">
        <img
          src="assets/googleLogo.png"
          alt="Google"
          className="w-9 h-9 mr-2"
        />
        Continue with Google
      </Button>

      <Button onClick={() => handleSocial("x")} className="px-[72px] py-[13px]">
        <img
          src="assets/xLogo.png"
          alt="X"
          className="w-9 h-9 mr-2 absolute left-[28px]"
        />
        <div className="pr-[5px]">Continue with X</div>
      </Button>
    </div>
  );
}
