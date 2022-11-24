import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from './Link';

export const Markdown: React.FC<{children: string}> = ({children}) => {
  return <ReactMarkdown components={{
    a(props) {
      return <Link {...props}/>;
    }
  }} remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>;
};
