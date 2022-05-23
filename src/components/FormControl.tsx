import { Text } from "components/Text";

type Props = {
  children?: React.ReactNode;
  label: React.ReactNode;
  info?: string;
  error?: string;
  isRequired?: boolean;
  hideLabel?: boolean;
};

export const FormControl = (props: Props) => {
  return (
    <div className="mb-6 w-full h-auto font-medium">
      <label>
        <span
          className={`ease-in-out text-gray-400 text-sm font-semibold ${
            props.hideLabel ? "sr-only" : ""
          } inline-block mb-1`}
        >
          {props.label}{" "}
          {props.isRequired && (
            <span className="text-red-500 font-normal">*</span>
          )}
        </span>

        <div>{props.children}</div>
      </label>
      <div className="text-xs md:text-sm m-1">
        <Text className={`text-slate-400 ${props.error ? "hidden" : "block"}`}>
          {props.info}
        </Text>
        <Text className="text-red-500">{props.error}</Text>
      </div>
    </div>
  );
};
