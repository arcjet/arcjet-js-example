"use client";

import { Icons } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types/nav";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./SiteHeader.module.scss";

export function SiteHeader() {
  const nav: NavItem[] = [...siteConfig.mainNav];
  nav.shift();

  const pathname = usePathname();

  return (
    <header
      className={styles.SiteHeader + " sticky top-0 z-40 w-full bg-background"}
    >
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Link href="/" className={styles.Logo}>
          <Image
            className={styles.Image + " dark"}
            src="/static/brand/LogoLockupExploreDark+Title.svg"
            alt="Arcjet Example app"
            height={30}
            width={310}
          />
          <Image
            className={styles.Image + " light"}
            src="/static/brand/LogoLockupExploreLight+Title.svg"
            alt="Arcjet Example app"
            height={30}
            width={310}
          />
        </Link>

        <div className="flex flex-1 items-center justify-end space-x-4">
          {nav?.length ? (
            <nav className="mt-[5px] flex gap-5">
              {nav?.map((item, index) => {
                const selected = pathname.indexOf(item.key) >= 0;

                return item.href && selected ? (
                  <span
                    key={index}
                    className={cn(
                      "text-md flex items-center px-1 font-bold text-primary ",
                    )}
                  >
                    {item.title}
                  </span>
                ) : (
                  <Link
                    key={index}
                    href={item.href || ""}
                    className={buttonVariants({
                      size: "smTight",
                      variant: "linkMuted",
                    })}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          ) : null}

          <nav className="mt-[5px] flex items-center space-x-1">
            <Link
              href="https://github.com/arcjet/arcjet-js-example"
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0",
                )}
              >
                <Icons.gitHub className="size-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
