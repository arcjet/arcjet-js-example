import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { memo } from "react";

import styles from "./Divider.module.scss";

export const variants = cva(styles.Divider, {
  variants: {
    variant: {
      primary: styles.Primary,
      secondary: styles.Secondary,
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof variants> {}

const Divider = React.forwardRef<HTMLDivElement, Props>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div className={variants({ variant, className })} ref={ref} {...props} />
    );
  },
);
Divider.displayName = "Divider";

export default memo(Divider);
