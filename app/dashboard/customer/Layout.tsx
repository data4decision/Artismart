'use client'

import React, { useRef, useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import Image from 'next/image'
import Link from 'next/link'
import { FaCaretDown, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa'
import { supabase } from '@/lib/supabase'

interface Profile {
  full_name: string | null
  email: string | null
  role: string | null
  phone?: string | null
  residential_address?: string | null
  state?: string | null
  lga?: string | null
}

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Mobile detection
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('first_name, last_name, role, phone, residential_address, state, lga')
        .eq('id', userId)
        .single()

      if (error) throw error

      let profileData = data

      if (profileData) {
        const { data: { user } } = await supabase.auth.getUser()
        if (user?.email) {
          profileData.email = user.email
        }

        const fullName = `${profileData.first_name || ''} ${profileData.last_name || ''}`.trim()

        setProfile({
          full_name: fullName || null,
          email: profileData.email || null,
          role: profileData.role || null,
          phone: profileData.phone,
          residential_address: profileData.residential_address,
          state: profileData.state,
          lga: profileData.lga,
        })
      } else {
        setProfile(null)
      }
    } catch (err) {
      console.error('Failed to load profile:', err)
      setProfile(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setProfile(null)
        setIsLoading(false)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          await fetchProfile(session.user.id)
        } else {
          setProfile(null)
          setIsLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

   // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  const displayName = isLoading ? 'Loading...' : profile?.full_name || 'User'
  const displayEmail = isLoading ? 'Loading...' : profile?.email || 'No email provided'

  return (
    <div className="flex min-h-screen">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onCollapseChange={setIsSidebarCollapsed}
      />

      <div className="flex-1 flex flex-col">
        <header className="h-16 flex items-center justify-between px-6 border-b border-[var(--orange)]/80 bg-[var(--blue)] text-[var(--white)] shadow-sm w-full">
          <h1 className="text-lg font-semibold sm:ml-0 ml-10">
            {/* {displayName} */}
          </h1>

          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center gap-2 hover:bg-[var(--orange)]/90 p-2 rounded-md transition-colors"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-label="User profile"
            >
              <div className="h-8 w-8 rounded-full bg-[var(--white)] overflow-hidden">
                <Image
                  src="/user.png"
                  width={32}
                  height={32}
                  alt="User avatar"
                />
              </div>

              {!isMobile && (
                <span className="text-sm font-medium">{displayName}</span>
              )}

              <FaCaretDown
                className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[var(--white)] text-[var(--blue)] rounded-md shadow-lg z-50">
                <div className="p-3 border-b">
                  <p className="font-semibold">{displayName}</p>
                  <p className="text-sm opacity-80 break-words">{displayEmail}</p>
                </div>

                <ul className="py-1">
                  <li>
                    <Link
                      href="/dashboard/customer/profile"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--blue)]/10 text-[var(--blue)]"
                    >
                      <FaUser />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/customer/settings"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--blue)]/10 text-[var(--blue)]"
                    >
                      <FaCog />
                      Settings
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-[var(--blue)]/10 text-[var(--blue)]"
                    >
                      <FaSignOutAlt/>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>

        <main 
          className={`
            flex-1 p-6 w-full overflow-x-hidden transition-all duration-300
            ${isSidebarCollapsed ? 'ml-10 sm:ml-20' : 'ml-[260px] sm:ml-[260px]'}
          `}
        >
          {children}
        </main>
      </div>
    </div>
  )
}