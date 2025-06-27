import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogPortal,
} from "app/components/ui/dialog";
import type { ReactNode } from "react";

type CustomDialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function CustomDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
}: CustomDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
          {footer && <>{footer}</>}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
