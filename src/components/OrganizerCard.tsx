import Image from "next/image";

type OrganizerCardProps = {
  organizer: {
    id: string;
    name: string;
    imgSrc: string;
    link: string;
    status: "active" | "retired";
    borderColorClassName: string;
  };
};

export const OrganizerCard = (props: OrganizerCardProps) => {
  const { organizer } = props;
  const isActive = organizer.status === "active";
  return (
    <a
      key={organizer.id}
      href={organizer.link}
      className="p-4 w-full h-64 md:w-64 rounded-xl inline-flex flex-col items-center justify-around group flex-shrink-0 hover:bg-gray-500/10"
    >
      <div
        className={`rounded-full border-4 overflow-hidden w-36 h-36 ${organizer.borderColorClassName}`}
      >
        <Image
          alt={organizer.name}
          src={organizer.imgSrc}
          height={140}
          width={140}
          objectFit="fill"
        />
      </div>

      <div>
        <p className="text-3xl my-2 font-display group-focus:underline group-hover:underline mt-2">
          {organizer.name}
        </p>

        <p
          className={`${
            isActive ? "bg-emerald-600" : "bg-gray-600"
          } text-xs text-center font-medium h-5 grid place-items-center stripes text-white px-2 rounded-full`}
        >
          {isActive ? "ACTIVE" : "RETIRED"}
        </p>
      </div>
    </a>
  );
};
