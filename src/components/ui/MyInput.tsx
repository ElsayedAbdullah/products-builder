import { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const MyInput = ({ className, ...props }: IProps) => {
  return (
    <input
      className={`${className} p-2 text-md focus:outline-none shadow-md focus:ring-1 ring-indigo-600`}
      {...props}
    />
  );
};

export default MyInput;
