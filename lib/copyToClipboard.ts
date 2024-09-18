"use client";

export const copyContentsToClipboard = (event: React.MouseEvent<HTMLAnchorElement>) => {
  navigator.clipboard
  .writeText(
      event.currentTarget.parentElement?.textContent || ""
    )
    .then(() => {
      console.log("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
};