interface IProps {
  msg: string;
}

const ErrorMsg = ({ msg }: IProps) => {
  return msg ? <p className="text-red-600 block font-medium">{msg}</p> : null;
};

export default ErrorMsg;
