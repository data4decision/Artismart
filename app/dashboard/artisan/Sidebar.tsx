

'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import {
  FaTachometerAlt,
  FaUser,
  FaIdCard,
  FaBriefcase,
  FaTasks,
  FaComments,
  FaWallet,
  FaStar,
  FaCalendarAlt,
  FaBell,
  FaLifeRing,
  FaTimes,
  FaBars,
  FaChevronCircleLeft,
  FaChevronCircleRight,
  FaSignOutAlt,
} from 'react-icons/fa';

// Logout handler
const logout = () => {
  console.log('Logging out...')
  window.location.href = '/login'
}

interface SidebarProps {
  onCollapseChange: (collapsed: boolean) => void
}

const Sidebar = ({ onCollapseChange }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href
  

  const nav = [
  { label: 'Dashboard', href: '/dashboard/artisan', icon: FaTachometerAlt },
  { label: 'Profile', href: '/dashboard/artisan/profile', icon: FaUser },
  { label: 'Verification', href: '/dashboard/artisan/verification', icon: FaIdCard },
  { label: 'Job Requests', href: '/dashboard/artisan/requests', icon: FaBriefcase },
  { label: 'Active Jobs', href: '/dashboard/artisan/jobs', icon: FaTasks },
  { label: 'Messages', href: '/dashboard/artisan/messages', icon: FaComments },
  { label: 'Earnings', href: '/dashboard/artisan/earnings', icon: FaWallet },
  { label: 'Reviews', href: '/dashboard/artisan/reviews', icon: FaStar },
  { label: 'Availability', href: '/dashboard/artisan/availability', icon: FaCalendarAlt },
  { label: 'Notifications', href: '/dashboard/artisan/notifications', icon: FaBell },
  { label: 'Support', href: '/dashboard/artisan/support', icon: FaLifeRing },
];

  
  
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024
      setIsCollapsed(mobile)           
      onCollapseChange(mobile)        
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [onCollapseChange])

  const toggleCollapse = () => {
    setIsCollapsed(prev => {
      const newState = !prev
      onCollapseChange(newState)
      return newState
    })
  }

  return (
    <div className="">
    <aside
      className={`fixed top-0 left-0 h-screen bg-[var(--blue)] text-[var(--white)] flex flex-col z-40 transition-all duration-300 ${isCollapsed ? 'w-13' : 'w-48'}`}
      aria-label="Customer sidebar"
    >
      {/* Logo & Brand */}
      <div className="px-4 h-16 flex items-center gap-2 font-semibold border-b border-[var(--orange)]">
        <div className="h-9 w-9 grid place-items-center rounded-full bg-[var(--white)] overflow-hidden">
          <Image src="/log.png" width={70} height={70} alt="Artismart logo" priority />
        </div>
        {!isCollapsed && <span className="text-lg">Artismart</span>}
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="py-2">
          {nav.map(({ href, icon: Icon, label }) => (
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
                {!isCollapsed && <span className="text-sm sm:text-[12px]">{label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <button
        onClick={logout}
        className="flex items-center gap-3 px-4 py-3 text-left text-[var(--white)] hover:text-[var(--orange)] hover:bg-[var(--blue)]/90 transition-colors"
        aria-label="Logout"
      >
        <FaSignOutAlt className="text-lg" />
        {!isCollapsed && <span>Logout</span>}
      </button>

     
      <button
        className={`absolute top-28 ${isCollapsed ? 'left-10' : 'left-44'} transform -translate-y-1/2 text-[var(--white)] bg-[var(--orange)] p-2 rounded-full shadow-lg hover:scale-110 transition-transform`}
        onClick={toggleCollapse}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? <FaChevronCircleRight /> : <FaChevronCircleLeft />}
      </button>
    </aside>

    <div className="min-h-screen">
      <button className="md:hidden top-8 right-8"
      onClick={()=> setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? <FaTimes size={18}/> : <FaBars size={18}/> }
      </button>
    </div>
    </div>
  )
}

export default Sidebar