"use client";

import ErrorMsg from "@/components/ErrorMsg";
import ProductList from "@/components/ProductList";
import Button from "@/components/ui/Button";
import MyInput from "@/components/ui/MyInput";
import MyModal from "@/components/ui/MyModal";
import { formInputsList } from "@/data";
import { IProduct } from "@/interfaces";
import { productValidation } from "@/validation";
import { ChangeEvent, FormEvent, useState } from "react";

const emptyProductObject = {
  title: "",
  description: "",
  imageURL: "",
  price: "",
  category: {
    name: "",
    imageURL: "",
  },
  colors: [],
};

export default function Home() {
  /* ========= State ========== */
  const [product, setProduct] = useState<IProduct>(emptyProductObject);

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });

  const [isOpen, setIsOpen] = useState(false);

  /* ========= Handlers ========== */
  const closeModal = () => setIsOpen(false);

  const openModal = () => setIsOpen(true);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const cancelHandler = () => {
    setProduct(emptyProductObject);
    closeModal();
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = productValidation(product);

    const hasError =
      Object.values(validationErrors).every((value) => value === "") &&
      Object.values(validationErrors).some((value) => value === "");

    setErrors(validationErrors);

    if (!hasError) {
      return;
    }

    cancelHandler();
    console.log(product);
  };

  return (
    <main className="container mx-auto px-4 py-10">
      <Button intent={"primary"} onClick={openModal}>
        Add New Product
      </Button>
      <MyModal isOpen={isOpen} closeModal={closeModal} title="Modal Title">
        <form onSubmit={submitHandler}>
          {formInputsList.map((input) => (
            <div className="flex flex-col mb-2" key={input.id}>
              <label className="mb-2 text-sm font-semibold" htmlFor={input.id}>
                {input.label}
              </label>
              <MyInput
                id={input.id}
                type={input.type}
                name={input.name}
                className="border rounded-lg"
                value={product[input.name]}
                onChange={onChangeHandler}
              />
              <ErrorMsg msg={errors[input.name]} />
            </div>
          ))}
          <div className="mt-4 flex items-center space-x-2">
            <Button intent={"primary"} fullWidth>
              Submit
            </Button>
            <Button
              type="button"
              intent={"secondary"}
              fullWidth
              onClick={cancelHandler}
            >
              Cancel
            </Button>
          </div>
        </form>
      </MyModal>
      <ProductList />
    </main>
  );
}
