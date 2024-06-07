"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";

import React, { useEffect } from "react";
import Select, { Props } from "react-select";

interface FilterProps {
  data: any[];
  name: string;
  valueKey: string;
  displayLabel?: boolean;
  placeholder?: string;
}

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const FilterMultiSelect: React.FC<FilterProps> = ({
  data,
  name,
  valueKey,
  displayLabel = true,
  placeholder = "Select",
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const onSelect = (id: string) => {
    const data = JSON.parse(id);
    const modifiedLabels = data.map((item: any) => item.value);
    const pathUrl = modifiedLabels.join(",");

    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      [valueKey]: pathUrl,
    };

    if (current[valueKey] === pathUrl) {
      query[valueKey] = null;
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      {
        skipNull: true,
        arrayFormat: "comma",
        skipEmptyString: true,
        arrayFormatSeparator: ",",
        encode: false,
      }
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
          classNames={{
            control: () => "border border-gray-300 rounded-md",
          }}
          options={data}
          onChange={(data) => onSelect(JSON.stringify(data))}
          isMulti
          className="w-full"
          placeholder={placeholder}
          defaultValue={getDefaultValues()}
        />
      </div>
    </div>
  );
};

export default FilterMultiSelect;
