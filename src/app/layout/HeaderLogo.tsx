import Image from "next/image";

export const HeaderLogo = () => {
  return (
    <div className="flex items-center gap-4 text-color-theme font-semibold mx-2">
      <Image
        src="/icon.svg"
        alt="Long Island JavaScript"
        height={50}
        width={50}
        aria-hidden={true}
      />
      <div className="font-display font-black text-color-theme">
        <p className="text-[23px]">Long Island</p>
        <p className="text-[26px] -mt-3">JavaScript</p>
      </div>
    </div>
  );
};
