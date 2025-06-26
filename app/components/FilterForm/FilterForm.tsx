import { useLocation } from "@remix-run/react";
import { CustomInputField } from "../CustomInputField/CustomInputField";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

export const FilterForm = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const product = params.get("product") || "";

  return (
    <section className="shadow-lg rounded-full mt-3 border flex flex-col items-center justify-center p-5 max-w-[800px] mx-auto">
      <h1 className="text-2xl font-bold text-center">
        Welcome to the Inventory Management App
      </h1>
      <p className="text-center mt-4">
        This app helps you manage your product inventory efficiently.
      </p>

      <div className="w-[500px] max-auto mt-3">
        <form method="GET" action="/" className="w-full flex items-end gap-2">
          <CustomInputField
            label=""
            name="product"
            placeholder="Try searching for a product name..."
            type="text"
            defaultValue={product}
          />
          <Button type="submit" variant="outline">
            <Search />
          </Button>
        </form>
      </div>
    </section>
  );
};
