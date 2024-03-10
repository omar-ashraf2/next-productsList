import { ItemType } from "@/types/ItemType";
import React, { useState } from "react";
import { Button } from "../ui/button";

type PriceRangeProps = {
  items: ItemType[];
  setFilteredItems: React.Dispatch<React.SetStateAction<ItemType[]>>;
};
const PriceRangeFilter: React.FC<PriceRangeProps> = ({
  items,
  setFilteredItems,
}) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleFilterByPrice = () => {
    const filteredItems = items.filter((item) => {
      const price = item.price;
      if (minPrice && maxPrice) {
        return price >= parseFloat(minPrice) && price <= parseFloat(maxPrice);
      } else if (minPrice) {
        return price >= parseFloat(minPrice);
      } else if (maxPrice) {
        return price <= parseFloat(maxPrice);
      }
      return true;
    });
    setFilteredItems(filteredItems);
  };

  const handleReset = () => {
    setMinPrice("");
    setMaxPrice("");
    setFilteredItems(items);
  };

  return (
    <div className="price-range-filter flex md:flex-row flex-col md:gap-4 gap-2">
      <div className="flex gap-4">
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border focus:outline-none outline-none bg-gray-100 w-28 h-10 rounded-lg pl-2"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border focus:outline-none outline-none bg-gray-100 w-28 h-10 rounded-lg pl-2"
        />
      </div>
      <Button onClick={handleFilterByPrice}>Apply</Button>
      <Button variant={"destructive"} onClick={handleReset}>
        Reset
      </Button>
    </div>
  );
};

export default PriceRangeFilter;
