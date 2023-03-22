"use client";

import Image from "next/image";
import { FaCheck, FaCopy } from "react-icons/fa";
import useClipboard from "react-use-clipboard";

type Props = {
  wallet: {
    address: string;
    coin: string;
    qr: string;
  };
};

export const CryptoWallet = (props: Props) => {
  const { wallet } = props;
  const [isCopied, setCopied] = useClipboard(wallet.address, {
    successDuration: 1000,
  });

  return (
    <div
      key={wallet.address}
      className="flex flex-col items-center mb-12 snap-center flex-1"
    >
      <p className="text-2xl font-medium mb-2">{wallet.coin}</p>
      <Image
        src={wallet.qr}
        height={260}
        width={260}
        className="rounded-lg"
        alt={wallet.coin + " address"}
      />
      <div className="flex items-center">
        <input
          readOnly={true}
          value={wallet.address}
          className="text-gray-800 p-2 text-xs w-[260px] truncate pr-8 rounded-md"
        />
        <button
          className="px-2 text-gray-600 text-sm h-12 -ml-8"
          onClick={() => setCopied()}
          title="Copy Wallet Address"
        >
          {isCopied ? <FaCheck className="text-green-500" /> : <FaCopy />}
        </button>
      </div>
    </div>
  );
};
