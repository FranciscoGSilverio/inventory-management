import { useNavigate } from "@remix-run/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "app/components/ui/table";
import { Pencil, Trash } from "lucide-react";
import { Product } from "types/Product";
import { Button } from "app/components/ui/button";

type ProductTableProps = {
  products: Product[];
  deleteCallback?: (id: string) => void;
  editCallback?: (id: string) => void;
};

export default function CustomTable({
  products,
  deleteCallback,
  editCallback,
}: ProductTableProps) {
  const navigate = useNavigate();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            className="cursor-pointer hover:bg-gray-100"
          >
            <TableCell>{product.name}</TableCell>
            <TableCell>${product.price.toFixed(2)}</TableCell>
            <TableCell>{product.stock}</TableCell>
            <TableCell>{product.avgRating}</TableCell>
            <TableCell>
              <>
                <Button
                  variant="ghost"
                  onClick={(event) => {
                    event.stopPropagation();
                    if (product.id && editCallback) {
                      editCallback(product.id);
                    }
                  }}
                >
                  <Pencil />
                </Button>
                <Button
                  variant="ghost"
                  onClick={(event) => {
                    event.stopPropagation();
                    if (product.id && deleteCallback) {
                      deleteCallback(product.id);
                    }
                  }}
                >
                  <Trash />
                </Button>
              </>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
