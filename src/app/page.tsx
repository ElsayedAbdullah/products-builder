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
import toast, { Toast, Toaster } from "react-hot-toast";
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
  const [productToEdit, setProductToEdit] =
    useState<IProduct>(emptyProductObject);
  const [productToEditIndex, setProductToEditIndex] = useState<number>(0);

  const [errors, setErrors] = useState(emptyErrorObject);
  const [tempColors, setTempColors] = useState<string[]>([]);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const renderProductColors = colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => {
        if (tempColors.includes(color)) {
          setTempColors(tempColors.filter((c) => c !== color));
          return;
        }
        if (productToEdit.colors.includes(color)) {
          setProductToEdit({
            ...productToEdit,
            colors: productToEdit.colors.filter((c) => c !== color),
          });
          return;
        }
        setTempColors((prev) => [...prev, color]);
      }}
    />
  ));

  const toastOptions: Partial<
    Pick<
      Toast,
      | "className"
      | "id"
      | "style"
      | "icon"
      | "duration"
      | "ariaProps"
      | "position"
      | "iconTheme"
    >
  > = {
    position: "top-center",
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  };

  /* ========= Handlers ========== */
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const closeEditModal = () => setIsOpenEditModal(false);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const onChangeEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductToEdit({ ...productToEdit, [name]: value });
    setErrors({ ...errors, [name]: "" });
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
    setProduct(emptyProductObject);
    setErrors(emptyErrorObject);
    closeModal();

    toast.success("Product added successfully!", toastOptions);
  };

  const submitEditHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = productValidation({
      title: productToEdit.title,
      description: productToEdit.description,
      imageURL: productToEdit.imageURL,
      price: productToEdit.price,
    });

    const hasError =
      Object.values(validationErrors).every((value) => value === "") &&
      Object.values(validationErrors).some((value) => value === "");

    // console.log(validationErrors);

    if (!hasError) {
      setErrors(validationErrors);
      return;
    }

    const updatedProducts = [...products];
    updatedProducts[productToEditIndex] = {
      ...productToEdit,
      colors: tempColors.concat(productToEdit.colors),
    };
    setProducts(updatedProducts);

    setTempColors([]);
    setErrors(emptyErrorObject);
    closeEditModal();

    toast.success("Product updated successfully!", toastOptions);
  };

  const removeProductHandler = () => {
    const updatedProducts = products.filter(
      (product) => product.id !== productToEdit.id
    );
    setProducts(updatedProducts);
    setIsOpenDeleteModal(false);
    toast.success("Product deleted successfully!", toastOptions);
  };

  // render inputs in edit modal
  const renderInputsInEditModal = (
    id: string,
    name: "title" | "description" | "imageURL" | "price",
    title: string
  ) => {
    return (
      <div className="flex flex-col mb-2">
        <label className="mb-2 text-sm font-semibold" htmlFor={id}>
          {title}
        </label>
        <MyInput
          id={id}
          type={"text"}
          name={name}
          className="border rounded-lg"
          value={productToEdit[name]}
          onChange={onChangeEditHandler}
        />
        <ErrorMsg msg={errors[name]} />
      </div>
    );
  };

  return (
    <main className="container mx-auto px-4 py-10">
      <Button intent={"primary"} onClick={openModal}>
        Add New Product
      </Button>
      {/* Add product modal */}
      <MyModal isOpen={isOpen} closeModal={closeModal} title="Add new Product">
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
            {renderProductColors}
          </div>

          {/* Selected Colors */}
          {tempColors.length ? (
            <div className="flex items-center gap-1 mt-4 flex-wrap">
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
              onClick={closeModal}
            >
              Cancel
            </Button>
          </div>
        </form>
      </MyModal>

      {/* Edit Product Modal */}
      <MyModal
        isOpen={isOpenEditModal}
        closeModal={closeEditModal}
        title="Edit Product"
      >
        <form onSubmit={submitEditHandler}>
          {/* Form Inputs */}
          {renderInputsInEditModal("title", "title", "Title")}
          {renderInputsInEditModal("description", "description", "Description")}
          {renderInputsInEditModal("imageURL", "imageURL", "Image URL")}
          {renderInputsInEditModal("price", "price", "Price")}

          <MySelect
            selected={productToEdit.category}
            setSelected={(value) => {
              setProductToEdit({ ...productToEdit, category: value });
            }}
          />

          {/* Colors */}
          <div className="flex items-center gap-1 mt-4">
            {renderProductColors}
          </div>
          {/* Selected Colors */}
          {tempColors.concat(productToEdit.colors).length ? (
            <div className="flex items-center gap-1 mt-4 flex-wrap">
              {tempColors.concat(productToEdit.colors).map((color) => (
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
          <div className="flex mt-4 items-center space-x-2">
            <Button intent={"primary"} fullWidth>
              Submit
            </Button>
            <Button
              type="button"
              intent={"secondary"}
              fullWidth
              onClick={closeEditModal}
            >
              Cancel
            </Button>
          </div>
        </form>
      </MyModal>

      {/* Delete Product Modal */}
      <MyModal
        isOpen={isOpenDeleteModal}
        closeModal={() => setIsOpenDeleteModal(false)}
        title="Delete Product"
        description="Are you sure you want to delete this product?"
      >
        <div className="flex mt-4 items-center space-x-2">
          <Button
            intent={"destructive"}
            fullWidth
            onClick={removeProductHandler}
          >
            Yes, Remove
          </Button>
          <Button
            type="button"
            intent={"secondary"}
            fullWidth
            onClick={() => setIsOpenDeleteModal(false)}
          >
            Cancel
          </Button>
        </div>
      </MyModal>

      {/* Product List */}
      <ProductList
        products={products}
        productToEdit={productToEdit}
        setProductToEdit={setProductToEdit}
        setIsOpenEditModal={setIsOpenEditModal}
        closeEditModal={closeEditModal}
        productToEditIndex={productToEditIndex}
        setProductToEditIndex={setProductToEditIndex}
        setIsOpenDeleteModal={setIsOpenDeleteModal}
      />

      <Toaster />
    </main>
  );
}
