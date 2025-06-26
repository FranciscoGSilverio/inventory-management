import { FC, useState } from "react";
import { Button } from "app/components/ui/button";
import { CustomDialog } from "app/components/CustomDialog/CustomDialog";

type DeleteConfirmationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleDelete?: () => void;
};

export const DeleteConfirmationDialog: FC<DeleteConfirmationDialogProps> = ({
  open = false,
  onOpenChange: setOpen = () => {},
  handleDelete = () => {},
}) => {
  return (
    <CustomDialog
      open={open}
      onOpenChange={setOpen}
      title="Confirm Delete"
      description="Are you sure you want to delete this item?"
      trigger={<Button variant="outline">Open Dialog</Button>}
      footer={
        <>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => handleDelete()}>Delete</Button>
        </>
      }
    >
      <p>This action cannot be undone.</p>
    </CustomDialog>
  );
};
