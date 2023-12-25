"use client";

import CircleColor from "@/components/CircleColor";
import ErrorMsg from "@/components/ErrorMsg";
import MySelect from "@/components/MySelect";
import ProductList from "@/components/ProductList";
import Button from "@/components/ui/Button";
import MyInput from "@/components/ui/MyInput";
import MyModal from "@/components/ui/MyModal";
import { categories, colors, formInputsList, productList } from "@/data";
import { IProduct } from "@/interfaces";
import { productValidation } from "@/validation";
import { ChangeEvent, FormEvent, useState } from "react";
import { v4 as uuid } from "uuid";

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
const emptyErrorObject = {
  title: "",
  description: "",
  imageURL: "",
  price: "",
};

export default function Home() {
  /* ========= State ========== */
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(emptyProductObject);

  const [errors, setErrors] = useState(emptyErrorObject);
  const [tempColors, setTempColors] = useState<string[]>([]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  console.log(tempColors);

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
    setErrors(emptyErrorObject);
    closeModal();
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = productValidation({
      title: product.title,
      description: product.description,
      imageURL: product.imageURL,
      price: product.price,
    });

    const hasError =
      Object.values(validationErrors).every((value) => value === "") &&
      Object.values(validationErrors).some((value) => value === "");

    // console.log(validationErrors);

    if (!hasError) {
      setErrors(validationErrors);
      return;
    }

    setProducts([
      {
        ...product,
        id: uuid(),
        colors: tempColors,
        category: selectedCategory,
      },
      ...products,
    ]);
    setTempColors([]);
    setSelectedCategory(categories[0]);
    cancelHandler();
  };

  return (
    <main className="container mx-auto px-4 py-10">
      <Button intent={"primary"} onClick={openModal}>
        Add New Product
      </Button>
      <MyModal isOpen={isOpen} closeModal={closeModal} title="Modal Title">
        <form onSubmit={submitHandler}>
          {/* Form Inputs */}
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

          <MySelect
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />

          {/* Colors */}
          <div className="flex items-center gap-1 mt-4">
            {colors.map((color) => (
              <CircleColor
                key={color}
                color={color}
                onClick={() => {
                  if (tempColors.includes(color)) {
                    setTempColors(tempColors.filter((c) => c !== color));
                    return;
                  }
                  setTempColors([...tempColors, color]);
                  setProduct({ ...product, colors: [...tempColors, color] });
                }}
              />
            ))}
          </div>

          {/* Selected Colors */}
          {tempColors.length ? (
            <div className="flex items-center gap-1 mt-4">
              {tempColors.map((color) => (
                <span
                  className="p-1 rounded-md text-white"
                  style={{ backgroundColor: color }}
                  key={color}
                >
                  {color}
                </span>
              ))}
            </div>
          ) : null}

          {/* Buttons */}
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
      <ProductList products={products} />
    </main>
  );
}
