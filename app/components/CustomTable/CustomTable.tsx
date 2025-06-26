import { useNavigate } from "@remix-run/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "app/components/ui/table";
import { Product } from "types/Product";

type ProductTableProps = {
  products: Product[];
};

export default function CustomTable({ products }: ProductTableProps) {
  const navigate = useNavigate();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Quantity</TableHead>
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
