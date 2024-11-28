
import { getProductId } from "@/actions/get-product";
import { getProducts } from "@/actions/get-products";
import Gallery from "@/components/gallery";
import Info from "@/components/info";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";
import React from "react";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProuctPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await getProductId(params.productId);
  const suggestedProducts = await getProducts({
    categoryId: product?.category?.id,
  });
  return (
    <div>
      <Container>
        <div className=" px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <Gallery images={product.images}/>
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <Info data={product}/>
            </div>
          </div>
          <hr />
          <ProductList title="Related Items" items={suggestedProducts} />
        </div>
      </Container>
    </div>
  );
};

export default ProuctPage;
