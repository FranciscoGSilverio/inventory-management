import { useState, useEffect } from "react";
import { CustomDialog } from "app/components/CustomDialog/CustomDialog";
import { Input } from "app/components/ui/input";
import { Label } from "app/components/ui/label";
import { Button } from "app/components/ui/button";
import { Form } from "@remix-run/react";
import { ProductDto } from "types/Product";

type ProductFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "update";
  onSubmit: (values: ProductDto) => void;
  initialValues?: Partial<ProductDto>;
};

const EMPTY_PRODUCT: ProductDto = {
  name: "",
  description: "",
  price: 0,
  imageUrl: "",
  stock: 0,
  category: "",
  avgRating: 0,
};

export function ProductFormDialog({
  open,
  onOpenChange,
  mode,
  onSubmit,
  initialValues = {},
}: ProductFormDialogProps) {
  const [form, setForm] = useState<ProductDto>(EMPTY_PRODUCT);

  useEffect(() => {
    if (mode === "update" && initialValues) {
      setForm((prev) => ({ ...prev, ...initialValues }));
    }
    else{
      setForm(EMPTY_PRODUCT);
    }
  }, [initialValues, mode]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(form);
    onOpenChange(false);
  };

  return (
    <CustomDialog
      open={open}
      onOpenChange={onOpenChange}
      title={mode === "create" ? "Create Product" : "Update Product"}
      description={
        mode === "create"
          ? "Fill out the form to create a new product."
          : "Update the product details."
      }
      footer={
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {mode === "create" ? "Create" : "Update"}
          </Button>
        </div>
      }
    >
      <Form className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input name="name" value={form.name} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="stock">Stock</Label>
          <Input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Input
            name="category"
            value={form.category}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="category">Rating</Label>
          <Input
            name="avgRating"
            value={form.avgRating}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
          />
        </div>
      </Form>
    </CustomDialog>
  );
}
