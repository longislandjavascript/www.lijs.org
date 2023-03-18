import Image from "next/image";

export const HeaderLogo = () => {
  return (
    <div className="flex items-center gap-4 w-full text-primary font-semibold mx-2">
      <Image
        src="/icon.svg"
        alt="Long Island JavaScript"
        height={60}
        width={60}
        aria-hidden={true}
      />
      <div>
        <p className="text-[26px] font-bold text-primary">Long Island</p>
        <p className="text-3xl font-bold">JavaScript</p>
      </div>
    </div>
  );
};
