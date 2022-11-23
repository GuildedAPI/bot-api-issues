import React from 'react';

export const Link: React.FC<
  React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
> = (props) => {
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a
      className='text-guilded-link hover:text-guilded-white transition'
      {...props}
    />
  );
};
