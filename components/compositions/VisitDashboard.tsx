import LogoMarkSpark from "@/components/brand/LogoMarkSpark";
import useSiteKey from "@/components/effects/useSiteKey";
import Block from "@/components/elements/Block";
import IconArrowExternal from "@/components/icons/ArrowExternal";
import { buttonVariants } from "@/components/ui/button";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import * as React from "react";
import { memo } from "react";

import styles from "./VisitDashboard.module.scss";

export const variants = cva(styles.VisitDashboard, {
  variants: {
    variant: {},
  },
  defaultVariants: {},
});

export interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof variants> {}

const VisitDashboard = React.forwardRef<HTMLDivElement, Props>(
  ({ className, variant, ...props }, ref) => {
    const { siteKey } = useSiteKey();

    return (
      <Block
        className={variants({ variant, className })}
        ref={ref}
        pad={3}
        {...props}
      >
        <p className="mb-2 max-w-[700px] text-lg text-secondary-foreground">
          The requests will show in the Arcjet&apos;s dashboard once issued.
        </p>
        <Link
          href={`https://app.arcjet.com/sites/${siteKey}`}
          target="arcjet-app"
          className={
            styles.Link +
            " " +
            buttonVariants({
              variant: "link",
              size: "defaultTight",
            })
          }
        >
          <LogoMarkSpark className="mr-2 w-4" />{" "}
          <span className="mr-2">Visit your site dashboard</span>{" "}
          <IconArrowExternal classes={["w-4"]} />
        </Link>
      </Block>
    );
  },
);
VisitDashboard.displayName = "VisitDashboard";

export default memo(VisitDashboard);
