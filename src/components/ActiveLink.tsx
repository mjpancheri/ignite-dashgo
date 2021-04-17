import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { cloneElement, ReactElement } from 'react';

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  shouldExactMatch?: boolean;
}

export function ActiveLink({ children, shouldExactMatch = false, ...rest }: ActiveLinkProps) {
  const { asPath } = useRouter();
  const isActive = (shouldExactMatch && (asPath === rest.href || asPath === rest.as)
    || (!shouldExactMatch && (asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as)))));

  return (
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? 'pink.500' : 'gray.50'
      })}
    </Link>
  )
}