'use client'
import React, {useState} from 'react'
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
} from 'react-icons/fa';
import Image from 'next/image'
import Link from 'next/link'
import { usePathname} from 'next/navigation';

// Logout
const logout = () => {
  console.log('Logging out...');
  window.location.href = '/login'
}

interface SidebarProps {
  onCollapseChange: (collapsed: boolean) => void;
}

const Sidebar = ({onCollapseChange}: SidebarProps) => {
const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
const pathname = usePathname();

const isActive = (href: string) => pathname === href;

    const nav = [
  { label: 'Dashboard', href: `/dashboard/customer`, icon: FaTachometerAlt },
  { label: 'Profile', href: `/dashboard/customer/profile`, icon: FaUser },
  { label: 'Browse Artisans', href: `/dashboard/customer/artisans`, icon: FaSearch },
  { label: 'My Bookings', href: `/dashboard/customer/bookings`, icon: FaClipboardList },
  { label: 'Booking Requests', href: `/dashboard/customer/requests`, icon: FaBriefcase },
  { label: 'Messages', href: `/dashboard/customer/messages`, icon: FaComments },
  { label: 'Payments', href: `/dashboard/customer/payments`, icon: FaCreditCard },
  { label: 'Reviews', href: `/dashboard/customer/reviews`, icon: FaStar },
  { label: 'Notifications', href: `/dashboard/customer/notifications`, icon: FaBell },
  { label: 'Support', href: `/dashboard/customer/support`, icon: FaLifeRing },
  { label: 'Logout', href: `/logout`, icon: FaSignOutAlt },
];


const toggleCollapse = () => {
  setIsCollapsed(prev => {
    const newState = !prev;
    onCollapseChange(newState);
    return newState;
  });
};

  return (
    <div className="font-roboto">
      <aside className={`fixed top-0 left-0 bg-[var(--blue)]  text-[var(--white)] flex flex-col 2-40 transition-all duration-300 ${isCollapsed ? 'w-13' : 'w-44'} `}
    aria-label='Customer sidebar'>
      <div className="px-4 h-16 flex items-center gap-2 font-semibold border-b border-[var(--orange)]">
        <div className="h-9 w-9 grid place-items-center rounded-full font-bold bg-[var(--white)]">
          <Image src="/log.png" width={70} height={70} alt="Sidebar logo" priority/>
        </div>
        {!isCollapsed && <span>Artismart</span>}
      </div>
      <nav className='flex-1'>
        <ul className="py-2">
        {nav.map(({href, icon: Icon, label}) => (
          <li key={href}>
            <Link
            href={href}
            className={`flex items-center gap-3 px-4 py-3 transition-colors ${isActive(href) ? 'text-sm sm:text-[15px] bg-[var(--orange)] text-[var(--white)] font-semibold shadow' : 'hover:bg-[var(--blue)]/90'}`}
            aria-current={isActive(href) ? 'page' : undefined}>
              <Icon className='shrink-0 text-[var(--white)]'/>
              {!isCollapsed && <span className="text-sm sm:text-[12px]">{label}</span>}
            </Link>
          </li>
        ))}
      </ul>
      </nav>

      {/* Logout Button */}
      <button onClick={logout}
      className='flex items-center gap-3 px-4 py-3 text-left text-[var(--white)] hover:text-[var(--orange)]/90 transition-colors'>
        <FaSignOutAlt/>
        {!isCollapsed && <span>logout</span>}
      </button>

      {/* Toggle Collapse Button */}
      <button className={`absolute top-21 ${isCollapsed ? 'left-17' : 'left-47'} transform -translate-x-full text-[var(--white)] bg-[var(--orange)] p-2 rounded-full`}
        onClick={toggleCollapse}>
          {isCollapsed ? <FaChevronCircleRight/> : <FaChevronCircleLeft/>}
          </button>
        
      
    </aside>
    </div> 
   )
}

export default Sidebar