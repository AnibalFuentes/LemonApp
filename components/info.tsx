"use client";
import { Product } from "@/types";
import Currency from "./ui/currency";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import useCart from "@/hooks/use-cart";
import { MouseEventHandler } from "react";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();
const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data)
  };
  return (
    <div>
      <h1 className="text-3xl font-bold">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl ">
          <Currency value={data.price} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex items-center gap-x-4">
        <h3 className="font-semibold">Size:</h3>
        <div>{data.size.value}</div>
      </div>
      <div className="flex items-center gap-x-4">
        <h3 className="font-semibold">Category:</h3>
        <div>{data.category.name}</div>
      </div>
      <div className="mt-10 flex items-center gap-x-3 mb-6">
        <Button onClick={onAddToCart} className="flex items-center  gap-x-2 rounded-full">
            Add To Cart
            <ShoppingCart />
        </Button>
      </div>
    </div>
  );
};

export default Info;
