"use client";
import { Product } from "@/types";
import { Card } from "../ui/card";
import Image from "next/image";
import { Button } from "./button";
import { Expand, ShoppingCart } from "lucide-react";

import Currency from "./currency";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  item: Product;
}
const ProductCard: React.FC<ProductCardProps> = ({ item }) => {

  const router=useRouter()

  const handleClick=()=>{
    router.push(`/products/${item.id}`)


  }
  return (
    <Card onClick={handleClick} className="group cursor-pointer rounded-xl p-3 space-y-2 relative">
      <div className="aspect-square rounded-xl relative overflow-hidden">
        <Image
          className="aspect-square object-cover"
          src={item?.images?.[0]?.url}
          fill
          alt="Image Product"
        />
        <div className="absolute opacity-0 group-hover:opacity-100 transition px-6 bg-opacity-30 bottom-5 w-full">
          <div className="flex justify-center gap-x-2">
            <Button
              variant={"ghost"}
              onClick={() => {}}
              className="rounded-full flex items-center justify-center border shadow-md hover:scale-110 transition p-2"
            >
              <Expand size={20} />
            </Button>
            <Button
              variant={"ghost"}
              onClick={() => {}}
              className="rounded-full flex items-center justify-center border shadow-md hover:scale-110 transition p-2"
            >
              <ShoppingCart size={20} />
            </Button>
          </div>
        </div>
      </div>
      
        <div className="flex flex-col justify-start">
          <p className="font-semibold text-lg">{item.name}</p>
          <p className="text-sm text-gray-500">{item.category.name}</p>
        </div>
      
      <div className=" bottom-3 left-3">
        <Currency value={item?.price} />
      </div>
    </Card>
  );
};

export default ProductCard;
