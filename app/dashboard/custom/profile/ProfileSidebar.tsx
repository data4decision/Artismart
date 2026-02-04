'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


const navItems = [
  { label: 'Profile Information', href: '/dashboard/custom/profile' },
  { label: 'Account Login Details', href: '/dashboard/custom/profile/account-login' },
  { label: 'Account Preferences', href: '/profile/custom/artisans' },
  { label: 'Security & Privacy', href: '/profile/custom/bookings' },
  { label: 'Saved Artisans / Favorites', href: '/profile/custom/requests' },
  { label: 'Payment Information', href: '/profile/custom/messages' },
  { label: 'Account Status', href: '/profile/custom/payments' },
  { label: 'Account Actions', href: '/profile/custom/reviews'},
]

export default function ProfileSidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        className="md:hidden fixed top-4 right-4 z-50 bg-white p-3 rounded-full shadow-lg border border-gray-200"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
      </button>

      {/* Sidebar – fixed on desktop, drawer on mobile */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-40 w-64 md:w-72 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        <nav className="mt-16 md:mt-6 px-3">
          <ul className="space-y-1.5">
            {navItems.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center gap-3 px-5 py-3.5 rounded-xl transition-all duration-200 text-[15px]
                    ${
                      isActive(href)
                        ? 'bg-orange-50 text-orange-700 font-medium shadow-sm border border-orange-200'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 border border-transparent'
                    }
                  `}
                >
                  {Icon && <Icon className="text-lg shrink-0 opacity-80" />}
                  <span className="truncate">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Overlay when mobile menu is open */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}