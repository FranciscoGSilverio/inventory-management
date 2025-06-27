import { useNavigate } from "@remix-run/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "app/components/ui/table";
import { Pencil, PlusCircle, Trash } from "lucide-react";
import { Product } from "types/Product";
import { Button } from "app/components/ui/button";

type ProductTableProps = {
  products: Product[];
  deleteCallback?: (id: string) => void;
  editCallback?: (id: string) => void;
  createCallback?: () => void;
};

export default function CustomTable({
  products,
  deleteCallback,
  editCallback,
  createCallback,
}: ProductTableProps) {
  const navigate = useNavigate();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="flex items-center">
            <Button variant="ghost" onClick={() => createCallback?.()}>
              <PlusCircle />
            </Button>
            Name
          </TableHead>
          <TableHead className="text-center">Price</TableHead>
          <TableHead className="text-center">Quantity</TableHead>
          <TableHead className="text-center">Average Rating</TableHead>
          <TableHead className="text-center">Actions</TableHead>
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
            <TableCell className="text-center">${product.price.toFixed(2)}</TableCell>
            <TableCell className="text-center">{product.stock}</TableCell>
            <TableCell className="text-center">{product.avgRating}</TableCell>
            <TableCell className="text-center">
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
