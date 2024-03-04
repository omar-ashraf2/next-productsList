import { Button } from "./button";
import { Input } from "./input";

const SearchBar = () => {
  return (
    <div className="flex w-full max-w-sm items-center">
      <Input type="search" placeholder="Search..." className="rounded-r-none" />
      <Button type="submit" className="rounded-l-none">
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
