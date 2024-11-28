// /app/routes/category/[categoryId]/page.tsx

import { GetStaticProps, GetStaticPaths } from "next";
import { getCategoryId } from "@/actions/get-category";
import { getProducts } from "@/actions/get-products";
import { getSizes } from "@/actions/get-sizes";
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";
import Filter from "./components/filter";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import { MobileFilters } from "./components/mobile-filters";
import { Category, Size, Product } from "@/types";
import { getCategories } from "@/actions/get-categories";

export const revalidate = 0;

interface CategoryPageProps {
  products: Product[];
  sizes: Size[];
  category: Category;
  params: {
    categoryId: string;
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Aquí deberías obtener todas las categorías posibles
  const categories = await getCategories(); // Implementa esta función para obtener todas las categorías
  const paths = categories.map((category: { id: string }) => ({
    params: { categoryId: category.id },
  }));

  return {
    paths,
    fallback: "blocking", // Puedes usar 'true', 'false', o 'blocking' dependiendo de tu estrategia de generación de páginas estáticas
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categoryId = params?.categoryId as string;

  const products = await getProducts({ categoryId });
  const sizes = await getSizes();
  const category = await getCategoryId(categoryId);

  return {
    props: {
      products,
      sizes,
      category,
      params: { categoryId },
    },
    revalidate: 10, // Opcional, si necesitas revalidar la página después de X segundos
  };
};

const CategoryPage: React.FC<CategoryPageProps> = ({
  products,
  sizes,
  category,
}) => {
  return (
    <div>
      <Container>
        <Billboard data={category.billboard} />
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <MobileFilters sizes={sizes} />
            <div className="hidden lg:block sm:hidden">
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
            </div>
          </div>
          <div className="mt-6 lg:col-span-4 lg:mt-0">
            {products.length === 0 && <NoResults />}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {products.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
