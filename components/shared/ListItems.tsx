import ItemCard from "./ItemCard";

const ListItems = () => {
  return (
    <div className="grid grid-cols-4 gap-5">
      <ItemCard />
      <ItemCard />
    </div>
  );
};

export default ListItems;
