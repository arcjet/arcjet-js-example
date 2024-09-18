"use client";
import * as React from "react";
import { copyContentsToClipboard } from "@/lib/copyToClipboard";

const CopyButton = () => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = (event: React.MouseEvent<HTMLAnchorElement>) => {
        copyContentsToClipboard(event);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <a 
            onClick={handleCopy} 
            className="text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer ml-4"
            title="Copy to clipboard"
        >
            {copied ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1 inline-block"
                >
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1 inline-block"
                >
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
            )}
        </a>
    );
}

export default CopyButton;