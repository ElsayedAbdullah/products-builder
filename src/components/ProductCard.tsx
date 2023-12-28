"use client";

import { IProduct } from "@/interfaces";
import ButtonGroup from "./ButtonGroup";
import Button from "./ui/Button";
import SharedImage from "./ui/SharedImage";
import { textSlicer } from "@/utils";
import CircleColor from "./CircleColor";

interface IProps {
  product: IProduct;
  setProductToEdit: (product: IProduct) => void;
  productToEdit: IProduct;
  setIsOpenEditModal: (value: boolean) => void;
  setIsOpenDeleteModal: (value: boolean) => void;
  closeEditModal: () => void;
  productToEditIndex: number;
  setProductToEditIndex: (value: number) => void;
}

const ProductCard = ({
  product,
  setProductToEdit,
  setIsOpenEditModal,
  productToEditIndex,
  setProductToEditIndex,
  setIsOpenDeleteModal,
}: IProps) => {
  // handlers
  function editHandler() {
    setIsOpenEditModal(true);
    setProductToEdit(product);
    setProductToEditIndex(productToEditIndex);
  }

  function deleteHandler() {
    setIsOpenDeleteModal(true);
    setProductToEdit(product);
  }

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
      <div className="mt-auto flex flex-col gap-4">
        <div className="flex items-center gap-2">
          {product.colors.length ? (
            <>
              {product.colors.map((color) => (
                <CircleColor key={color} color={color} />
              ))}
            </>
          ) : (
            <p className="text-gray-400">No colors...</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-indigo-800">
            ${Number(product.price).toLocaleString()}
          </p>
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
          <Button intent={"primary"} fullWidth onClick={editHandler}>
            <span>Edit</span>
          </Button>
          <Button intent={"destructive"} fullWidth onClick={deleteHandler}>
            <span>Remove</span>
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default ProductCard;
