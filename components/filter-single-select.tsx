"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";

import React, { useEffect } from "react";
import Select from "react-select";

interface FilterProps {
  data: any[];
  name: string;
  valueKey: string;
  displayLabel?: boolean;
  placeholder?: string;
}

const FilterSingleSelect: React.FC<FilterProps> = ({
  data,
  name,
  valueKey,
  displayLabel = true,
  placeholder = "Select",
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedValue = searchParams.get(valueKey);

  const onSelect = (id: string) => {
    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      [valueKey]: id,
    };

    if (current[valueKey] === id) {
      query[valueKey] = null;
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  const getDefaultValues = () => {
    const params = searchParams.get(valueKey)?.split(",");
    const defaultValues = data.filter((item) => params?.includes(item.value));
    return defaultValues;
  };

  return (
    <div className="mb-3 p-2">
      <h3 className="font-semibold mb-1" hidden={!displayLabel}>
        {name}
      </h3>
      <div className="flex flex-wrap">
        <Select
          options={data}
          className="w-full"
          onChange={(data) => onSelect(data.label)}
          defaultValue={getDefaultValues()}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default FilterSingleSelect;
