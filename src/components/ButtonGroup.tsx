import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const ButtonGroup = ({ children }: IProps) => {
  return (
    <div className="mt-auto flex items-center justify-between gap-4">
      {children}
    </div>
  );
};

export default ButtonGroup;
