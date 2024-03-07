import { ItemType } from "@/types/ItemType";
import ItemCard from "./ItemCard";

type ListItemsProps = {
  items: ItemType[];
};

const ListItems: React.FC<ListItemsProps> = ({ items }) => {
  return (
    <div className="grid md:grid-cols-4 grid-cols-2 gap-5">
      {items.map((item: ItemType) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ListItems;
