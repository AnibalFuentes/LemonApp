import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

export const getCategoryId = async (id: string): Promise<Category> => {
  const response = await fetch(`${URL}/${id}`);

  const data = await response.json();
  return data;
};
