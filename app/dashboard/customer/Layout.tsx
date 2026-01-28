'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaCaretDown, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import CustomerSidebar from './CustomerSidebar'

interface Profile {
  full_name: string | null
  email: string | null
  role: string | null
  phone?: string | null
  residential_address?: string | null
  state?: string | null
  lga?: string | null
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null)

  // -----------------------------------------------------------------
  // Mobile detection & sidebar collapse 
  // -----------------------------------------------------------------
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024
      setIsSidebarCollapsed(mobile)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const fetchProfile = async () => {
    try {
      setIsLoading(true)

      const { data: { user }, error: authError } = await supabase.auth.getUser()

      if (authError || !user) {
        console.warn('No authenticated user found')
        router.replace('/login')
        return
      }

      const email = user.email ?? 'No email'

      const { data: profileRow, error: profileError } = await supabase
        .from('profiles')
        .select('first_name, last_name, role, phone, residential_address, state, lga')
        .eq('id', user.id)
        .maybeSingle()

      let fullName = 'User'
      let role: string | null = null
      let phone: string | null = null
      let residential_address: string | null = null
      let state: string | null = null
      let lga: string | null = null

      if (profileError) {
        console.error('Profile fetch error:', profileError)
      }

      if (profileRow) {
        fullName = [profileRow.first_name, profileRow.last_name]
          .filter(Boolean)
          .join(' ')
          .trim() || 'User'

        role = profileRow.role ?? null
        phone = profileRow.phone ?? null
        residential_address = profileRow.residential_address ?? null
        state = profileRow.state ?? null
        lga = profileRow.lga ?? null
      }

      setProfile({
        full_name: fullName,
        email,
        role,
        phone,
        residential_address,
        state,
        lga,
      })
    } catch (err) {
      console.error('Unexpected error in fetchProfile:', err)
      setProfile(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchProfile()
      } else {
        setProfile(null)
        setIsLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setIsSidebarCollapsed(mobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const displayName = isLoading ? 'Loading...' : profile?.full_name || 'User'
  const displayEmail = isLoading ? 'Loading...' : profile?.email || 'No email provided'

  return (
    <div className="flex min-h-screen">
      <CustomerSidebar onCollapseChange={setIsSidebarCollapsed} />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 overflow-x-hidden ${
          isSidebarCollapsed ? 'lg:ml-13' : 'lg:ml-44'
        }`}
      >
        {/* Header */}
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
                <Image src="/user.png" width={32} height={32} alt="User avatar" />
              </div>

              {!isMobile && <span className="text-sm font-medium">{displayName}</span>}

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
                      <FaUser /> Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/customer/settings"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--blue)]/10 text-[var(--blue)]"
                    >
                      <FaCog /> Settings
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-[var(--blue)]/10 text-[var(--blue)]"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 ml-10 sm:ml-0 p-6 w-full overflow-x-hidden bg-white text-gray-900">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout