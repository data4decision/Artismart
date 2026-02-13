// components/browse/LoadMore.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

type Props = {
  currentPage: number;
};

export default function LoadMore({ currentPage }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const loadMore = () => {
    startTransition(() => {
      router.push(`/browse-artisans?page=${currentPage + 1}`, { scroll: false });
    });
  };

  return (
    <div className="mt-12 text-center">
      <button
        onClick={loadMore}
        disabled={isPending}
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[var(--blue)] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--blue)] disabled:opacity-50 transition"
      >
        {isPending ? 'Loading...' : 'Load More Artisans'}
      </button>
    </div>
  );
}