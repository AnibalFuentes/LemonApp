"use client";

import { Button } from "@/components/ui/button";

import { Size } from "@/types";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import Filter from "./filter";

interface MobileFiltersProps {
  sizes: Size[];
}
export const MobileFilters: React.FC<MobileFiltersProps> = ({ sizes }) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return (
    <>
      <Button onClick={onOpen} className="flex items-center gap-x-2 lg:hidden rounded-full">
        Filters
        <Plus size={20} />
      </Button>
      <Dialog open={open} as="div" onClose={onClose}>
        <div className="fixed inset-0 bg-black bg-opacity-25" />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel className=" relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
            <div className=" flex items-center justify-end px-4">
              <X size={15} onClick={onClose} />
            </div>
            <div className="p-4">
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};
