import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Separator } from "../ui/separator";
import type { ItemsType } from "./ListItems";
import { FC } from "react";

type ItemCardProps = {
  item: ItemsType;
};

const ItemCard: FC<ItemCardProps> = ({ item }) => {
  const { title, description, image, price } = item;

  const truncateString = (str: string, maxLength: number) => {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + "...";
    }
    return str;
  };

  return (
    <Card className="max-w-80">
      <div className="w-full h-[300px] relative">
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
        <CardTitle className="mb-3">{truncateString(title, 25)}</CardTitle>
        <CardDescription>{truncateString(description, 50)}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between">
        <p>${price}</p>
        <Button className="rounded-full" size="icon">
          <PlusIcon />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
