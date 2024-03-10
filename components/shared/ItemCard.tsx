import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ItemType } from "@/types/ItemType";
import { LoaderIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useCart } from "@/context/CartContext";
import { truncateString } from "@/lib/utils";

type ItemCardProps = {
  item: ItemType;
};

const ItemCard: FC<ItemCardProps> = ({ item }) => {
  const { title, description, image, price } = item;
  const { cartItems, addToCart, isInCart, getQuantityInCart } = useCart();
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [quantityInCart, setQuantityInCart] = useState<number>(0);

  // Update quantity in cart when component mounts and on changes
  useEffect(() => {
    setQuantityInCart(getQuantityInCart(item));
  }, [item, getQuantityInCart]);

  const handleAddToCart = () => {
    if (cartItems.length < 6) {
      setIsAdding(true);
      setTimeout(() => {
        addToCart(item);
        setIsAdding(false);
      }, 500);
    } else {
      alert(
        "You can not add to cart more than 6 product, you need to checkout first!."
      );
    }
  };

  return (
    <Card className="max-w-80 overflow-hidden">
      <div className="w-full h-[250px] relative">
        <Image
          src={image}
          alt=""
          fill
          className="object-contain"
          sizes="(max-width: 100%)"
        />
      </div>
      <Separator />
      <CardHeader>
        <CardTitle className="mb-1">{truncateString(title, 20)}</CardTitle>
        <CardDescription>{truncateString(description, 50)}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <p>${price}</p>
        <Button
          className="rounded-full"
          size="icon"
          onClick={handleAddToCart}
          disabled={isAdding}
        >
          {isAdding ? <LoaderIcon /> : <PlusIcon />}
        </Button>
      </CardContent>
      <CardFooter className="flex justify-center">
        {isInCart(item) ? (
          <div className="rounded-lg bg-primary text-primary-foreground p-2 mb-3">
            {quantityInCart} Units Added
          </div>
        ) : null}
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
