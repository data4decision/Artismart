
import ArtisanCard from './ArtisanCard';
import { Artisan } from '@/types/artisan';

type Props = {
  artisans: Artisan[];
};

export default function ArtisanGrid({ artisans }: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {artisans.map((artisan) => (
        <ArtisanCard key={artisan.id} artisan={artisan} />
      ))}
    </div>
  );
}