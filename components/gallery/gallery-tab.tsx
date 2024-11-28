import { cn } from "@/lib/utils";
import { Image as ImageType } from "@/types";
import { Tab } from "@headlessui/react";
import Image from "next/image";

interface GalleryTabProps {
  image: ImageType;
}
const GalleryTab: React.FC<GalleryTabProps> = ({ image }) => {
  return (
    <Tab
      className={
        "relative flex aspect-square cursor-pointer items-center justify-center rounded-md "
      }
    >
      {({ selected }) => (
        <div>
          <span className="absolute h-full w-full aspect-square inset-0  overflow-hidden rounded-md">
            <Image
              fill
              src={image.url}
              alt="image Product"
              className="object-cover object-center"
            />
          </span>
          <span
            className={cn(
              "absolute inset-0 rounded-md ring-2 ring-offset-2",
              selected ? "rign-black" : "rign-transparent"
            )}
          ></span>
        </div>
      )}
    </Tab>
  );
};

export default GalleryTab;
