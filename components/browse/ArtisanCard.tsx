import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';
import { Artisan } from '@/types/artisan';

type Props = {
  artisan: Artisan;
};

export default function ArtisanCard({ artisan }: Props) {
  return (
    <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="relative h-48 bg-gray-100">
        {artisan.profile_photo_url ? (
          <Image
            src={artisan.profile_photo_url}
            alt={artisan.full_name || artisan.business_name || 'Artisan'}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gray-200 text-gray-400 text-sm">
            No photo
          </div>
        )}

        {/* Verification badge */}
        {artisan.verification_status === 'verified' && (
          <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
            Verified
          </div>
        )}
        {artisan.verification_status === 'pending' && (
          <div className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
            Pending
          </div>
        )}
        {/* You can add 'not_verified' case later if desired */}
      </div>

      <div className="p-5">
        <Link href={`/artisans/${artisan.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[var(--blue)] transition-colors line-clamp-1">
            {artisan.business_name || artisan.full_name || 'Artisan'}
          </h3>
        </Link>

        <p className="mt-1 text-sm font-medium text-[var(--blue)]">
          {artisan.primary_skill || 'Service Provider'}
        </p>

        {/* Location – optional / commented until columns are added */}
        {(artisan.state || artisan.lga) && (
          <p className="mt-1 text-sm text-gray-600">
            {artisan.state}
            {artisan.lga && ` • ${artisan.lga}`}
          </p>
        )}

        <div className="mt-3 flex items-center gap-1.5">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`h-4 w-4 ${
                  i < Math.round(artisan.average_rating ?? 0)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 font-medium">
            {artisan.average_rating?.toFixed(1) || '–'}
            <span className="text-gray-400 mx-1">•</span>
            {artisan.completed_jobs_count || 0} jobs
          </span>
        </div>

        <p className="mt-3 text-sm text-gray-600 line-clamp-2">
          {artisan.short_bio ||
            artisan.bio?.slice(0, 120) ||
            'Professional artisan delivering quality work with attention to detail.'}
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href={`/artisans/${artisan.id}`}
            className="flex-1 text-center py-2.5 px-4 border border-[var(--blue)] text-[var(--blue)] rounded-lg hover:bg-[var(--blue)] hover:text-white transition-colors text-sm font-medium"
          >
            View Profile
          </Link>

          <button className="flex-1 py-2.5 px-4 bg-[var(--orange)] text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium">
            Request Service
          </button>
        </div>

        {/* Availability – only show when column exists later */}
        {/* {artisan.availability_status && (
          <div className="mt-4">
            {artisan.availability_status === 'available' ? (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                Available Now
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                Not Available
              </span>
            )}
          </div>
        )} */}
      </div>
    </div>
  );
}