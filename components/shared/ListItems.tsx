import ItemCard from "./ItemCard";

export type ItemsType = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
};

const ListItems = async () => {
  async function getData() {
    const res = await fetch("https://fakestoreapi.com/products/");

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();

    return data;
  }
  const items = await getData();
  return (
    <div className="grid md:grid-cols-4 grid-cols-2 gap-5">
      {items.map((item: ItemsType) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ListItems;
