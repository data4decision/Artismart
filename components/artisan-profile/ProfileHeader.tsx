import Image from 'next/image'
import { FaUserEdit } from 'react-icons/fa'

type Props = {
  profile: unknown 
  isEditing: boolean
  onEditToggle: () => void
}

export default function ProfileHeader({ profile, isEditing, onEditToggle }: Props) {
  const displayName = [profile?.first_name, profile?.last_name].filter(Boolean).join(' ') || 'Artisan'
  const business = profile?.business_name || ''
  const primary = profile?.primary_skill || (profile?.skills?.split(',')[0]?.trim() || '—')
  const location = [profile?.residential_address, profile?.state, profile?.lga]
    .filter(Boolean)
    .join(' • ') || 'Location not set'

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
      <div className="bg-gradient-to-r from-[var(--blue)]/10 to-[var(--blue)]/5 px-6 py-10 md:px-10 md:py-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl flex-shrink-0">
            <Image
              src={profile?.profile_image || '/default-avatar.png'}
              alt={displayName}
              fill
              className="object-cover"
            />
          </div>

          <div className="text-center md:text-left space-y-3 flex-1">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[var(--blue)]">{displayName}</h1>
              {business && (
                <p className="text-xl text-[var(--blue)]/90 mt-1 font-medium">{business}</p>
              )}
            </div>

            <p className="text-lg font-medium text-gray-700">{primary}</p>
            <p className="text-sm text-gray-600">{location}</p>

            <div className="pt-2">
              <button
                onClick={onEditToggle}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--blue)] text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-sm"
                disabled={isEditing}
              >
                <FaUserEdit /> {isEditing ? 'Editing...' : 'Edit Profile'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}