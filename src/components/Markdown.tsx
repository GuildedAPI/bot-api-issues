import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from './Link';

export const Markdown: React.FC<{ children: string }> = ({ children }) => {
  return (
    <ReactMarkdown
      components={{
        a(props) {
          return <Link {...props} />;
        },
        code(props) {
          return (
            <code
              {...props}
              className='rounded px-1 bg-guilded-black/10 dark:bg-guilded-black/40'
            />
          );
        },
      }}
      remarkPlugins={[remarkGfm]}
    >
      {children}
    </ReactMarkdown>
  );
};
