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
      className={`text-guilded-link hover:text-guilded-white transition ${
        // eslint-disable-next-line react/prop-types
        props.className ?? ''
      }`.trim()}
    />
  );
};
