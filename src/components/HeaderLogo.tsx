import Image from "next/image";

export const HeaderLogo = () => {
  return (
    <div className="flex items-center gap-4 w-full text-primary font-semibold mx-2">
      <Image
        src="/icon.svg"
        alt="Long Island JavaScript"
        height={50}
        width={50}
        aria-hidden={true}
      />
      <div className="font-display font-black text-primary">
        <p className="text-[23px] -mb-2">Long Island</p>
        <p className="text-[26px]">JavaScript</p>
      </div>
    </div>
  );
};
