
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

export default function SearchAndFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    return params.toString();
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get('search') as string;

    startTransition(() => {
      router.push(`/browse-artisans?${createQueryString('search', search)}`);
    });
  };

  return (
    <div className="sticky top-0 z-10 bg-[var(--white)] border-b border-gray-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSearch} className="flex flex-col gap-4 md:flex-row md:items-end">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">
              Search artisans
            </label>
            <input
              type="text"
              id="search"
              name="search"
              defaultValue={searchParams.get('search') ?? ''}
              placeholder="Skill, name, or service..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--blue)] focus:ring-[var(--blue)] sm:text-sm"
            />
          </div>

          {/* More filters can be added here: category, state, lga, verified, rating, availability */}
          {/* For brevity, showing only search + one example filter */}

          <div>
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700">
              Sort by
            </label>
            <select
              id="sort"
              name="sort"
              defaultValue={searchParams.get('sort') ?? 'rating'}
              onChange={(e) =>
                startTransition(() =>
                  router.push(`/browse-artisans?${createQueryString('sort', e.target.value)}`)
                )
              }
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-[var(--blue)] focus:outline-none focus:ring-[var(--blue)] sm:text-sm"
            >
              <option value="rating">Highest rating</option>
              <option value="jobs">Most jobs completed</option>
              <option value="recent">Recently active</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[var(--blue)] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--blue)] disabled:opacity-50"
          >
            {isPending ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>
    </div>
  );
}