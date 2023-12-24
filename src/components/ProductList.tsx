import { productList } from "@/data";
import ProductCard from "./ProductCard";

const ProductList = () => {
  return (
    <div>
      <h2 className="sm:text-5xl text-center mb-20">Products</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {productList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
