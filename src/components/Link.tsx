import React from 'react';

export const Link: React.FC<
  React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement> & { className?: string },
    HTMLAnchorElement
  >
> = (props) => {
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a
      {...props}
      className={`text-blue-400 dark:text-guilded-link hover:text-blue-600 dark:hover:text-guilded-white transition ${
        // eslint-disable-next-line react/prop-types
        props.className ?? ''
      }`.trim()}
    />
  );
};
