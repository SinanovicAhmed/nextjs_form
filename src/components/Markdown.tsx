import React from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownProps {
  children: string;
}

const Markdown = ({ children }: MarkdownProps) => {
  return (
    <ReactMarkdown
      className="space-y-3 text-sm sm:text-base"
      components={{
        ul: (props) => <ul className="list-inside list-disc" {...props} />,
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export default Markdown;
