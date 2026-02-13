'use client'

import { FaTools } from 'react-icons/fa'

interface Props {
  primaryCategories?: string[] | null
  skills?: string[] | null
}

export default function SkillsSection({ primaryCategories = [], skills = [] }: Props) {
  // Force arrays at runtime (extra safety)
  const safeCategories = Array.isArray(primaryCategories) ? primaryCategories : []
  const safeSkills = Array.isArray(skills) ? skills : []

  const hasCategories = safeCategories.length > 0
  const hasSkills = safeSkills.length > 0

  if (!hasCategories && !hasSkills) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-[var(--blue)] mb-6 flex items-center gap-3">
          <FaTools className="text-[var(--orange)]" /> Skills & Specialties
        </h2>
        <p className="text-gray-500 italic">
          No categories or skills added yet. Edit your profile to showcase your expertise!
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
      <h2 className="text-2xl font-bold text-[var(--blue)] mb-6 flex items-center gap-3">
        <FaTools className="text-[var(--orange)]" /> Skills & Specialties
      </h2>

      {hasCategories && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Main Categories</h3>
          <div className="flex flex-wrap gap-3">
            {safeCategories.map((cat, i) => (
              <span
                key={i}
                className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium border border-orange-200"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      )}

      {hasSkills && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Specific Skills / Services</h3>
          <div className="flex flex-wrap gap-3">
            {safeSkills.map((skill, i) => (
              <span
                key={i}
                className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}