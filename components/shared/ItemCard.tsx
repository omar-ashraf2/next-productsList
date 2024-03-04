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

const ItemCard = () => {
  return (
    <div>
      <Card className="max-w-80">
        <Image src="/placeholder-image.png" alt="" width={400} height={100} />
        <Separator />
        <CardHeader>
          <CardTitle>Product Title</CardTitle>
          <CardDescription>Product Description</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-between">
          <p>$Price</p>
          <Button className="rounded-full" size="icon">
            <PlusIcon />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ItemCard;
