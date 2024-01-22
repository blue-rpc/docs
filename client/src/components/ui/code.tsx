import React, { useState } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
// You can choose the style you prefer
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Clipboard } from "lucide-react";

type CodeBlockProps = {
  language: string;
  code: string;
};

const Code: React.FC<CodeBlockProps> = ({ language, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    });
  };
  return (
    <div className="relative w-auto h-auto group">
      <SyntaxHighlighter
        language={language.toLowerCase()}
        style={dark}
        className={"!bg-cyan-950 !border-none   !shadow-md !z-0 !shadow-black !whitespace-pre-wrap !mt-0"}
      >
        {code}
      </SyntaxHighlighter>
      <button onClick={handleCopy} className="absolute w-[25px] h-[25px] z-20 top-2 right-2  hover:text-cyan-300 transition-all duration-200 flex items-center justify-center align-middle text-cyan-500">
        {copied ? <Check className="" size={15} /> : <Clipboard className="" size={15} />}
      </button>
    </div>
  );
};

export default Code;
