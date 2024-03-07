"use client";

import { useEffect, useState } from "react";
import Cart from "@/components/shared/Cart";
import ListItems from "@/components/shared/ListItems";
import SortBy from "@/components/shared/SortBy";
import SearchBar from "@/components/ui/SearchBar";
import { Separator } from "@/components/ui/separator";
import fetchProducts from "@/services/ProductService";
import { ItemType } from "@/types/ItemType";

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

  return (
    <main className="min-h-screen max-w-screen-2xl mx-auto px-24 py-16 shadow-lg">
      <header className="text-center mb-10">
        <h1 className="text-6xl mb-7">Explore Our Products</h1>
        <h2 className="text-gray-500 max-w-3xl mx-auto">
          Welcome to our Store, where convenience meets quality. Explore our
          wide selection of products, ranging from essentials to luxury items.
          Start browsing now and discover the perfect items tailored to your
          needs.
        </h2>
      </header>
      <section className="flex justify-between">
        <div className="flex gap-4 items-center">
          <SortBy />
          <Cart />
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
