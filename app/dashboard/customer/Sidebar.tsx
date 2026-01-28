'use client'

import React from 'react'
import {
  FaTachometerAlt,
  FaUser,
  FaSearch,
  FaBriefcase,
  FaClipboardList,
  FaComments,
  FaCreditCard,
  FaStar,
  FaBell,
  FaLifeRing,
  FaSignOutAlt,
  FaChevronCircleRight,
  FaChevronCircleLeft,
} from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Logout handler (you can move this logic to Layout if you prefer)
const logout = () => {
  console.log('Logging out...')
  window.location.href = '/login'
}

interface SidebarProps {
  isCollapsed: boolean
  toggleCollapse: () => void         
}

export default function Sidebar({ isCollapsed, toggleCollapse }: SidebarProps) {
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href

  const nav = [
    { label: 'Dashboard', href: '/dashboard/customer', icon: FaTachometerAlt },
    { label: 'Profile', href: '/dashboard/customer/profile', icon: FaUser },
    { label: 'Browse Artisans', href: '/dashboard/customer/artisans', icon: FaSearch },
    { label: 'My Bookings', href: '/dashboard/customer/bookings', icon: FaClipboardList },
    { label: 'Booking Requests', href: '/dashboard/customer/requests', icon: FaBriefcase },
    { label: 'Messages', href: '/dashboard/customer/messages', icon: FaComments },
    { label: 'Payments', href: '/dashboard/customer/payments', icon: FaCreditCard },
    { label: 'Reviews', href: '/dashboard/customer/reviews', icon: FaStar },
    { label: 'Notifications', href: '/dashboard/customer/notifications', icon: FaBell },
    { label: 'Support', href: '/dashboard/customer/support', icon: FaLifeRing },
   
  ]

  return (
    <div className="font-roboto">
      <aside
        className={`fixed top-0 left-0 bg-[var(--blue)] text-[var(--white)] flex flex-col transition-all duration-300 h-screen
          ${isCollapsed ? 'w-13 ' : 'w-44'}`}
        aria-label="Customer sidebar"
      >
        {/* Logo + Brand */}
        <div className="px-4 h-16 flex items-center gap-2 font-semibold border-b border-[var(--orange)]">
          <div className="h-9 w-9 grid place-items-center rounded-full bg-[var(--white)] overflow-hidden">
            <Image src="/log.png" width={70} height={70} alt="Artismart logo" priority />
          </div>
          {!isCollapsed && <span className="text-lg">Artismart</span>}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="py-2">
            {nav.map(({ href, icon: Icon, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 px-4 py-3 transition-colors text-[var(--white)]
                    ${isActive(href)
                      ? 'bg-[var(--orange)] font-semibold shadow'
                      : 'hover:bg-[var(--blue)]/90'}`}
                  aria-current={isActive(href) ? 'page' : undefined}
                >
                  <Icon className="shrink-0 text-xl" />
                  {!isCollapsed && <span className="text-sm sm:text-[15px]">{label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 text-left text-[var(--white)] hover:bg-[var(--orange)]/80 transition-colors border-t border-[var(--orange)]/50"
        >
          <FaSignOutAlt className="text-xl" />
          {!isCollapsed && <span className="text-sm sm:text-base">Logout</span>}
        </button>

        {/* Collapse Toggle Button */}
        <button
          className={`absolute top-[120px] -translate-y-1/2 ${
            isCollapsed ? 'left-10' : 'left-40'
          } z-50 bg-[var(--orange)] text-white p-1.5 rounded-full shadow-lg hover:bg-[var(--orange)]/90 transition-transform`}
          onClick={toggleCollapse}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <FaChevronCircleRight size={18} /> : <FaChevronCircleLeft size={18} />}
        </button>
      </aside>
    </div>
  )
}