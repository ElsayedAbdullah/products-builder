"use client";

import { IProduct } from "@/interfaces";
import ButtonGroup from "./ButtonGroup";
import Button from "./ui/Button";
import SharedImage from "./ui/SharedImage";
import { textSlicer } from "@/utils";

interface IProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProps) => {
  return (
    <div className="max-w-sm md:max-w-md m-auto md:m-0 border flex flex-col gap-4 p-3 rounded-md text-slate-800 bg-gray-100">
      <SharedImage
        width={400}
        height={400}
        src={product.imageURL}
        alt={product.title}
        className="rounded-md h-56 object-cover"
      />
      <div>
        <h2 className="text-lg font-bold">{product.title}</h2>
        <p className="text-md text-gray-500">
          {textSlicer(product.description)}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <span className="bg-purple-600 w-5 h-5 rounded-full"></span>
        <span className="bg-green-600 w-5 h-5 rounded-full"></span>
        <span className="bg-blue-600 w-5 h-5 rounded-full"></span>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-semibold text-indigo-800">${product.price}</p>
        <div className="flex items-center gap-4">
          <SharedImage
            src={product.category.imageURL}
            alt={product.category.name}
            width={40}
            height={40}
            className="rounded-full object-cover w-10 h-10"
          />
          <p>{product.category.name}</p>
        </div>
      </div>
      <ButtonGroup>
        <Button intent={"primary"} fullWidth>
          <span>Edit</span>
        </Button>
        <Button intent={"destructive"} fullWidth>
          <span>Remove</span>
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default ProductCard;
