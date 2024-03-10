import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SortByProps = {
  onSortChange: (criteria: string) => void;
};

const SortBy: React.FC<SortByProps> = ({ onSortChange }) => {
  const [criteria, setCriteria] = React.useState("price");

  const handleCriteriaChange = (newCriteria: string) => {
    setCriteria(newCriteria);
    onSortChange(newCriteria);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">SORT BY: </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Sort By</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={criteria}
          onValueChange={handleCriteriaChange}
        >
          <DropdownMenuRadioItem value="price">Price</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortBy;
