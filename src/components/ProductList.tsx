import ProductCard from "./ProductCard";
import { IProduct } from "@/interfaces";

interface IProps {
  products: IProduct[];
  productToEdit: IProduct;
  setProductToEdit: (product: IProduct) => void;
  setIsOpenEditModal: (value: boolean) => void;
  setIsOpenDeleteModal: (value: boolean) => void;
  closeEditModal: () => void;
  productToEditIndex: number;
  setProductToEditIndex: (value: number) => void;
}
const ProductList = ({
  products,
  productToEdit,
  setProductToEdit,
  setIsOpenEditModal,
  closeEditModal,
  setProductToEditIndex,
  setIsOpenDeleteModal,
}: IProps) => {
  return (
    <div>
      <h2 className="sm:text-5xl text-center mb-20">Products</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            setProductToEdit={setProductToEdit}
            productToEdit={productToEdit}
            setIsOpenEditModal={setIsOpenEditModal}
            closeEditModal={closeEditModal}
            productToEditIndex={index}
            setProductToEditIndex={setProductToEditIndex}
            setIsOpenDeleteModal={setIsOpenDeleteModal}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
