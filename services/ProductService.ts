import { ItemType } from "@/types/ItemType";

const API_URL = "https://fakestoreapi.com/products/";

async function fetchProducts(): Promise<ItemType[]> {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data: ItemType[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default fetchProducts;
