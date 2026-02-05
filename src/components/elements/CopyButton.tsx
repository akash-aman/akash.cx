"use client";
import { FC, useState } from "react";
import { Copy, Tick } from "assets/icons/icon";

interface CopyButtonProps {
    text: string;
}

const CopyButton: FC<CopyButtonProps> = ({ text }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);

        const timeOut = setTimeout(() => {
            setCopied(false);
            clearTimeout(timeOut);
        }, 3000);
    };

    return (
        <button
            title="Copy to clipboard"
            onClick={copyToClipboard}
            className="p-2 m-4 group-hover:block hidden rounded-lg ctc absolute right-0 top-0 bg-[white] dark:bg-(--code-bg-dark-base)"
        >
            {copied ? <Tick className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
    );
};

export default CopyButton;
