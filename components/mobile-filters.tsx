"use client";

import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { Dialog } from "@headlessui/react";

import IconButton from "@/components/ui/icon-button";
import { Button } from "@/components/ui/button";

import FilterMultiSelect from "@/components/filter-multi-select";
import FilterSingleSelect from "@/components/filter-single-select";
import Filter from "@/components/filter-button";

interface MobileFiltersProps {
  languages?: any[];
  countries?: any[];
  expertise?: any[];
  skills?: any[];
  prices?: any[];
  industries?: any[];
}

const MobileFilters: React.FC<MobileFiltersProps> = ({
  languages = [],
  countries = [],
  expertise = [],
  skills = [],
  prices = [],
  industries = [],
}) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  console.log(prices);

  return (
    <>
      <Button
        onClick={onOpen}
        className="flex items-center gap-x-2 lg:hidden mb-3"
      >
        Filters
        <Plus size={20} />
      </Button>

      <Dialog
        open={open}
        as="div"
        className="relative z-50 lg:hidden"
        onClose={onClose}
      >
        {/* Background color and opacity */}
        <div className="fixed inset-0 bg-black/25" />

        {/* Dialog position */}
        <div className="fixed inset-0 z-40 flex">
          <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
            {/* Close button */}
            <div className="flex items-center justify-end px-4">
              <IconButton icon={<X size={15} />} onClick={onClose} />
            </div>

            <div className="p-4">
              <FilterSingleSelect
                valueKey="countries"
                name="Country"
                data={countries}
              />
              <FilterMultiSelect
                valueKey="languages"
                name="Languages"
                data={languages}
              />
              <FilterMultiSelect
                valueKey="industries"
                name="Industries"
                data={industries}
              />
              <FilterMultiSelect
                valueKey="expertise"
                name="Expertise"
                data={expertise}
              />
              <FilterMultiSelect valueKey="tools" name="Tools" data={skills} />
              <Filter data={prices} name="Price" valueKey="price" />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default MobileFilters;
