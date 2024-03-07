"use client";
import { ItemType } from "@/types/ItemType";
import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";

type SearchBarProps = {
  items: ItemType[];
  setFilteredItems: React.Dispatch<React.SetStateAction<ItemType[]>>;
};

const SearchBar: React.FC<SearchBarProps> = ({ items, setFilteredItems }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    const filteredProducts = items.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filteredProducts);
    setSearchQuery(query);
  };

  return (
    <div className="flex w-full max-w-sm items-center">
      <Input
        type="search"
        placeholder="Search..."
        className="rounded-r-none"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Button
        type="button"
        className="rounded-l-none"
        onClick={() => handleSearch("")}
      >
        Clear
      </Button>
    </div>
  );
};

export default SearchBar;
