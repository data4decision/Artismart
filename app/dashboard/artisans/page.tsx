'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
// Do NOT import supabase here

export default function ArtisanDashboard() {
  const router = useRouter()

  useEffect(() => {
    // Import supabase only when running in the browser
    import('@/lib/supabase').then(({ supabase }) => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (!session) {
          router.replace('/login')
        }
      })
    })
  }, [router])

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold text-[var(--blue)]">Welcome to Artisan Dashboard</h1>
      <p className="mt-4 text-gray-600">
        This is your artisan control panel. Here you can manage jobs, availability, earnings, etc.
      </p>

      {/* Add real content later */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example placeholders */}
        <div className="bg-white p-6 rounded-xl shadow">Upcoming Jobs</div>
        <div className="bg-white p-6 rounded-xl shadow">Earnings This Month</div>
        <div className="bg-white p-6 rounded-xl shadow">Profile Completion</div>
      </div>
    </div>
  )
}