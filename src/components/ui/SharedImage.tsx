import { ImgHTMLAttributes } from "react";
import Image from "next/image";

interface IProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

const SharedImage = ({ src, alt, className, width, height }: IProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
    />
  );
};

export default SharedImage;
