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
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Quantity</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
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
