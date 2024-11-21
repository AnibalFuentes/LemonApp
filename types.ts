export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
}
export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
}
export interface Product {
  id: string;
  name: string;
  category: Category;
  price: string;
  isFeatured: boolean;
  size: Size;
  images: Image[];
}
export interface Image {
  id: string;
  url: string;
}
export interface Size {
  id: string;
  name: string;
  vaue: string;
}
