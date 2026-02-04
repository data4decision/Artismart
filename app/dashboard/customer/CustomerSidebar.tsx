'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
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
  FaTimes,
  FaBars,
} from 'react-icons/fa'

// Simple logout redirect
const logout = () => {
  console.log('Logging out...')
  window.location.href = '/login'
}

interface CustomerSidebarProps {
  onCollapseChange: (collapsed: boolean) => void
}

const CustomerSidebar = ({ onCollapseChange }: CustomerSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href

  const navItems = [
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

  const toggleCollapse = () => {
    setIsCollapsed((prev) => {
      const newState = !prev
      onCollapseChange(newState)
      return newState
    })
  }

  return (
    <div className="font-roboto">
      {/* Desktop Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen bg-[var(--blue)] text-[var(--white)] flex flex-col transition-all duration-300 ${
          isCollapsed ? 'w-[52px]' : 'w-48'
        }`}
        aria-label="Customer sidebar"
      >
        {/* Logo & Brand */}
        <div className="px-4 h-16 flex items-center gap-2 font-semibold border-b border-[var(--orange)]">
          <div className="h-9 w-9 grid place-items-center rounded-full bg-[var(--white)] overflow-hidden shrink-0">
            <Image src="/log.png" width={70} height={70} alt="Artismart logo" priority />
          </div>
          {!isCollapsed && <span className="text-lg">Artismart</span>}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="py-2">
            {navItems.map(({ href, icon: Icon, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 px-4 py-3 transition-colors text-sm sm:text-[15px] ${
                    isActive(href)
                      ? 'bg-[var(--orange)] text-[var(--white)] font-semibold shadow'
                      : 'hover:bg-[var(--orange)]/90'
                  }`}
                  aria-current={isActive(href) ? 'page' : undefined}
                >
                  <Icon className="shrink-0 text-lg" />
                  {!isCollapsed && <span className="truncate">{label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 text-left text-[var(--white)] hover:text-[var(--orange)] hover:bg-[var(--blue)]/90 transition-colors mt-auto"
          aria-label="Logout"
        >
          <FaSignOutAlt className="text-lg shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </button>

        {/* Toggle Button */}
        <button
          className={`absolute top-28 ${
            isCollapsed ? 'left-[40px]' : 'left-44'
          } -translate-y-1/2 text-[var(--white)] bg-[var(--orange)] p-2 rounded-full shadow-lg hover:scale-110 transition-transform z-50`}
          onClick={toggleCollapse}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <FaChevronCircleRight /> : <FaChevronCircleLeft />}
        </button>
      </aside>

      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden fixed top-4 right-4 z-50 bg-[var(--orange)] text-white p-3 rounded-full shadow-lg"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Mobile Menu Overlay (basic version – expand as needed) */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <aside
            className="w-64 bg-[var(--blue)] h-full text-[var(--white)] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* You can copy-paste most of the desktop aside content here or make it simpler */}
            <div className="p-4 border-b border-[var(--orange)]">
              <h2 className="text-xl font-bold">Artismart</h2>
            </div>
            <nav className="flex-1 p-4">
              {/* Render nav items similarly – or simplify */}
              <ul className="space-y-2">
                {navItems.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="block py-2 px-3 hover:bg-[var(--orange)]/80 rounded"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <button
              onClick={() => {
                logout()
                setIsMobileMenuOpen(false)
              }}
              className="p-4 text-left hover:bg-[var(--orange)]/80 border-t border-[var(--orange)]/50"
            >
              Logout
            </button>
          </aside>
        </div>
      )}
    </div>
  )
}

export default CustomerSidebar