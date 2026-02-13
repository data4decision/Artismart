// types/artisan.ts

/**
 * Core Artisan profile type shown in browse/search/listing views
 */
export interface Artisan {
  id: string;                           // UUID from Supabase/auth.users or profiles table
  user_id: string;                      // Foreign key → auth.users (for linking)

  // Identity / Display names
  full_name: string | null;             // Personal name (e.g. "Chinedu Okeke")
  business_name: string | null;         // Shop / Brand name (e.g. "Chinedu's Tailoring Hub")

  // Visuals
  profile_photo_url: string | null;
  cover_photo_url?: string | null;      // Optional banner image

  // Core service info
  primary_skill: string | null;         // e.g. "Tailoring", "Plumbing", "Makeup Artist"
  service_category: string | null;      // e.g. "Fashion", "Home Services", "Beauty"
  skills: string[];                     // Array e.g. [" Ankara sewing", "Suit tailoring", "Embroidery"]

  // Location (Nigeria-specific)
  state: string | null;                 // "Lagos", "Abuja", "Rivers", etc.
  lga: string | null;                   // Local Government Area e.g. "Ikeja", "Surulere"
  address?: string | null;              // Optional – street name (NOT displayed publicly)
  coordinates?: {                       // Optional – for future map feature
    lat: number;
    lng: number;
  } | null;

  // Trust & reputation
  is_verified: boolean;
  verified_at?: string | null;          // ISO timestamp
  verification_level?: 'basic' | 'premium' | 'enterprise' | null;
  average_rating: number | null;        // 0–5
  rating_count: number;                 // How many reviews this rating is based on
  completed_jobs_count: number;
  ongoing_jobs_count?: number;

  // Bio & marketing
  short_bio: string | null;             // 1–2 lines (shown on card)
  full_bio?: string | null;             // Longer version (shown on profile)
  tagline?: string | null;              // e.g. "Making your dream outfit in 48 hours"

  // Availability & scheduling
  availability_status: 'available' | 'busy' | 'unavailable' | 'on leave' | null;
  next_available_date?: string | null;  // ISO date
  response_time_hours?: number | null;  // e.g. usually replies within 2 hours

  // Stats & activity
  member_since: string;                 // ISO date – when profile was created
  last_active_at?: string | null;

  // Flags / visibility
  is_active: boolean;                   // soft delete / ban flag
  is_featured?: boolean;                // for homepage / promoted section (future)

  // Pricing transparency (optional – shown on profile, not always on card)
  starting_price?: number | null;
  currency?: 'NGN' | 'USD' | string;

  // Relations (usually joined in queries, not always stored here)
  // reviews?: Review[];
  // portfolio_images?: PortfolioImage[];
  // services?: ServiceOffering[];
}

/**
 * Minimal version used in list / grid views (smaller payload)
 */
export type ArtisanListItem = Pick<
  Artisan,
  | 'id'
  | 'full_name'
  | 'business_name'
  | 'profile_photo_url'
  | 'primary_skill'
  | 'service_category'
  | 'state'
  | 'lga'
  | 'is_verified'
  | 'average_rating'
  | 'rating_count'
  | 'completed_jobs_count'
  | 'short_bio'
  | 'availability_status'
  | 'next_available_date'
>;

/**
 * Full profile view (when customer clicks into artisan detail page)
 */
export type ArtisanProfile = Artisan & {
  portfolio_images?: Array<{
    url: string;
    caption?: string;
    is_main?: boolean;
  }>;
  services?: Array<{
    id: string;
    title: string;
    description: string;
    price_range_min?: number;
    price_range_max?: number;
    delivery_days?: number;
  }>;
  recent_reviews?: Array<{
    id: string;
    rating: number;
    comment: string;
    customer_name: string;
    created_at: string;
  }>;
};