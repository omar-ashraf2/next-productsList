import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useCart } from "@/context/CartContext";
import { MinusIcon, PlusIcon, ShoppingBasketIcon } from "lucide-react";

const Cart = () => {
  const { cartItems, total } = useCart();
  // console.log(cartItems);

  return (
    <div className="relative">
      <Drawer>
        <div className="absolute w-5 h-5 -top-2 -right-2 z-10 bg-red-400 rounded-full text-xs flex justify-center items-center">
          <span className="text-white">{total}</span>
        </div>
        <DrawerTrigger asChild>
          <Button variant="outline">
            <ShoppingBasketIcon />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Move Goal</DrawerTitle>
              <DrawerDescription>
                Set your daily activity goal.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <div className="flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                >
                  <span className="sr-only">Decrease</span>
                  <MinusIcon />
                </Button>
                <div className="flex-1 text-center">
                  <div className="text-7xl font-bold tracking-tighter">
                    test
                  </div>
                  <div className="text-[0.70rem] uppercase text-muted-foreground">
                    Calories/day
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                >
                  <span className="sr-only">Increase</span>
                  <PlusIcon />
                </Button>
              </div>
              <div className="mt-3 h-[120px]">test</div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Cart;
