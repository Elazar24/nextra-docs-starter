'use client';

import { Cards } from 'nextra/components';
import { useConfig } from 'nextra-theme-docs';

export function ModuleCards({ year }: { year: string }) {
  const { normalizePagesResult } = useConfig();
  const { directories } = normalizePagesResult;

  const modules = directories
    .find((item) => item.name === 'notes')
    ?.children?.find((item) => item.name === year)
    ?.children?.filter((child) => child.name !== 'index');

  return (
    <Cards className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 my-8'>
      {modules?.map((child) => (
        <Cards.Card
          key={child.route}
          icon={<img src='/images/general/icon.svg' alt='Logo' width={64} height={64} />}
          title={
            child.frontMatter?.title ||
            child.name.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
          }
          href={child.children ? `${child.route}/introduction` : child.route}
        />
      ))}
    </Cards>
  );
}
