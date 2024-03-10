"use client";

import { useEffect, useState } from "react";
import Cart from "@/components/shared/Cart";
import ListItems from "@/components/shared/ListItems";
import SortBy from "@/components/shared/SortBy";
import SearchBar from "@/components/ui/SearchBar";
import { Separator } from "@/components/ui/separator";
import fetchProducts from "@/services/ProductService";
import { ItemType } from "@/types/ItemType";
import PriceRangeFilter from "@/components/shared/PriceRangeFilter";

const Home = () => {
  const [products, setProducts] = useState<ItemType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ItemType[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  // Function to handle sorting based on selected criteria
  const handleSortChange = (criteria: string) => {
    let sortedList = [...filteredProducts];
    if (criteria === "price") {
      sortedList.sort((a, b) => a.price - b.price);
    } else if (criteria === "name") {
      sortedList.sort((a, b) => a.title.localeCompare(b.title));
    }
    setFilteredProducts(sortedList);
  };

  return (
    <main className="min-h-screen md:max-w-screen-2xl sm:max-w-screen-sm max-w-screen-md md:px-24 md:py-16 px-12 py-8 shadow-lg mx-auto ">
      <header className="text-center mb-10">
        <h1 className="text-6xl mb-7">Explore Our Products</h1>
        <h2 className="text-gray-500 max-w-3xl mx-auto">
          Welcome to our Store, where convenience meets quality. Explore our
          wide selection of products, ranging from essentials to luxury items.
          Start browsing now and discover the perfect items tailored to your
          needs.
        </h2>
      </header>
      <section className="flex md:flex-row flex-col gap-4 items-center md:justify-between">
        <div className="flex gap-4 items-center">
          <Cart />
          <SortBy onSortChange={handleSortChange} />
          <PriceRangeFilter
            items={products}
            setFilteredItems={setFilteredProducts}
          />
        </div>
        <SearchBar items={products} setFilteredItems={setFilteredProducts} />
      </section>
      <Separator className="my-7" />
      <section>
        <ListItems items={filteredProducts} />
      </section>
    </main>
  );
};
export default Home;
