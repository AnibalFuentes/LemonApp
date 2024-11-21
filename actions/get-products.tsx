import { Product } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  categoryId?: string;
  sizeId?: string;
  isFeatured?: boolean;
}

export const getProducts = async (query:Query): Promise<Product[]> => {
  const url = qs.stringifyUrl({
    url:URL,
    query:{
      categoryId:query.categoryId,
      sizeId: query.sizeId,
      isFeatured: query.isFeatured,
    }
  });

  const response = await fetch(url);

  const data = await response.json();
  return data;
};
