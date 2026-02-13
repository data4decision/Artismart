import { createClient } from '@/lib/supabase/server';
import SearchAndFilter from '@/components/browse/SearchAndFilter';
import ArtisanGrid from '@/components/browse/ArtisanGrid';
import EmptyState from '@/components/browse/EmptyState';
import LoadMore from '@/components/browse/LoadMore';
import { Artisan } from '@/types/artisan';

export const revalidate = 60; // ISR - revalidate every 60 seconds

async function getArtisans(searchParams: Record<string, string | string[] | undefined>) {
  const supabase = createClient();

  let query = supabase
    .from('profiles')
    .select(`
      id,
      full_name,
      business_name,
      avatar_url          as profile_photo_url,    -- adjust if column name is different (photo_url, image_url, etc.)
      primary_skill,
      primary_skill       as service_category,      -- fallback mapping (no real service_category column yet)
      -- state,                                     -- column missing → add later
      -- lga,
      verification_status,
      average_rating,
      completed_jobs_count,
      bio                 as short_bio,
      -- availability_status,                       -- not present yet
      -- next_available_date
    `)
    .eq('is_active', true)                          
    .order('average_rating', { ascending: false });  // ← FIXED: removed invalid nullsLast

  // Search – searching across name, business, primary skill
  if (searchParams.search && typeof searchParams.search === 'string') {
    const term = `%${searchParams.search}%`;
    query = query.or(`full_name.ilike.${term},business_name.ilike.${term},primary_skill.ilike.${term}`);
  }

  // Filters
  if (searchParams.category) {
    // No service_category → using primary_skill for now
    query = query.eq('primary_skill', searchParams.category as string);
  }
  // if (searchParams.state) { query = query.eq('state', searchParams.state as string); }
  // if (searchParams.lga)   { query = query.eq('lga', searchParams.lga as string); }

  if (searchParams.verified === 'true') {
    query = query.eq('verification_status', 'verified');
  }

  if (searchParams.rating) {
    query = query.gte('average_rating', Number(searchParams.rating));
  }

  // if (searchParams.availability) {
  //   query = query.eq('availability_status', searchParams.availability as string);
  // }

  // Sorting overrides
  if (searchParams.sort === 'jobs') {
    query = query.order('completed_jobs_count', { ascending: false });  // also removed nullsLast — default works
  } else if (searchParams.sort === 'recent') {
    // Assuming you add last_active_at later
    // query = query.order('last_active_at', { ascending: false });
    // For now fallback to rating or created_at
  }

  const page = Number(searchParams.page) || 1;
  const perPage = 12;
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  const { data, error, count } = await query.range(from, to);

  if (error) {
    console.error('Supabase fetch error:', error);
    return { artisans: [], totalCount: 0 };
  }

  return {
    artisans: (data as Artisan[]) || [],
    totalCount: count || 0,
  };
}

export default async function BrowseArtisansPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { artisans, totalCount } = await getArtisans(searchParams);
  const page = Number(searchParams.page) || 1;
  const hasMore = totalCount > page * 12;

  return (
    <div className="min-h-screen bg-[var(--white)]">
      {/* 1. Search & Filter */}
      <SearchAndFilter />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {artisans.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* 2. Artisan Cards */}
            <ArtisanGrid artisans={artisans} />

            {/* 5. Pagination / Load More */}
            {hasMore && <LoadMore currentPage={page} />}
          </>
        )}
      </main>
    </div>
  );
}