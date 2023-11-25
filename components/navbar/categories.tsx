import React, { useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Container from '../container';
import { categories } from '@/sitedata/data';
import CategoryBox from '../categorybox';

export default function Categories() {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const isMainPage = pathname === '/';
  if (!isMainPage) {
    return null;
  }

  const scrollAmount = 100; // Adjust the scroll amount as needed

  // Function to scroll the container to the left
  const scrollLeft = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      container.scrollLeft -= scrollAmount;
    }
  };

  // Function to scroll the container to the right
  const scrollRight = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      container.scrollLeft += scrollAmount;
    }
  };

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between">
        <div onClick={scrollLeft} className="px-2 py-3 rounded-md hover:dark:border-gray-400 hover:border-2 cursor-pointer lg:hidden">
          <ChevronLeftIcon className="h-[1.5rem] w-[1.5rem]" />
        </div>
        <div className="flex flex-row flex-1 justify-between overflow-x-auto no-scrollbar scroll-smooth" ref={containerRef}>
          {categories.map((item, index) => (
            <CategoryBox
              key={index}
              label={item.label}
              icon={item.icon}
              description={item.description}
              selected={category === item.label}
            />
          ))}
        </div>
        <div onClick={scrollRight} className="px-2 py-3 rounded-md hover:dark:border-gray-400 hover:border-2 cursor-pointer lg:hidden">
          <ChevronRightIcon className="h-[1.5rem] w-[1.5rem]" />
        </div>
      </div>
    </Container>
  );
}
