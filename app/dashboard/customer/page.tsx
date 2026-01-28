'use client'

import { useState, useEffect } from 'react'
import Layout from "./Layout"
import { supabase } from '@/lib/supabase'

// Define the shape of the profile you're using
interface Profile {
  full_name: string | null
}

export default function CustomerDashboard() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true)

        // 1. Get current authenticated user
        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
          console.warn('No authenticated user found')
          setProfile(null)
          return
        }

        // 2. Get profile data from 'profiles' table
        const { data: profileRow, error: profileError } = await supabase
          .from('profiles')
          .select('first_name, last_name')
          .eq('id', user.id)
          .maybeSingle()

        let fullName = 'User'

        if (profileError) {
          console.error('Profile fetch error:', profileError.message)
        } else if (profileRow) {
          fullName = [profileRow.first_name, profileRow.last_name]
            .filter(Boolean)
            .join(' ')
            .trim() || 'User'
        }

        setProfile({ full_name: fullName })

      } catch (err) {
        console.error('Unexpected error fetching profile:', err)
        setProfile(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()

    // Optional: re-fetch on auth state change
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchProfile()
      } else {
        setProfile(null)
        setIsLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const displayName = isLoading
    ? 'Loading...'
    : profile?.full_name || 'Guest'

  return (
    <Layout>
      <div className="space-y-8">
        {/* Hero / Welcome section */}
        <div className="bg-[var(--blue)] text-[var(--white)] p-6 sm:p-8 rounded-xl w-full">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Hello, Welcome {displayName}!
          </h1>
          <p className="mt-2 opacity-90 text-sm sm:text-base">
            Find and book trusted artisans near you with Artismart
          </p>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          <QuickActionCard
            title="Browse Artisans"
            description="Find skilled professionals"
            icon="🔍"
            href="/dashboard/customer/artisans"
          />
          <QuickActionCard
            title="My Bookings"
            description="View upcoming & past jobs"
            icon="📅"
            href="/dashboard/customer/bookings"
          />
          <QuickActionCard
            title="Messages"
            description="Chat with artisans"
            icon="💬"
            href="/dashboard/customer/messages"
          />
          <QuickActionCard
            title="Payments"
            description="Manage transactions"
            icon="💳"
            href="/dashboard/customer/payments"
          />
        </div>

        {/* You can add more sections here later */}
      </div>
    </Layout>
  )
}

// Quick action card component
function QuickActionCard({
  title,
  description,
  icon,
  href,
}: {
  title: string
  description: string
  icon: string
  href: string
}) {
  return (
    <a
      href={href}
      className="block bg-white p-5 sm:p-6 rounded-xl shadow hover:shadow-lg transition-all duration-200 border border-gray-100 hover:border-[var(--orange)]/40 group"
    >
      <div className="text-3xl sm:text-4xl mb-3">{icon}</div>
      <h3 className="font-semibold text-base sm:text-lg group-hover:text-[var(--blue)] transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </a>
  )
}