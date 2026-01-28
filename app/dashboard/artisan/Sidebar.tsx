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
} from 'react-icons/fa';

const Sidebar = () => {


    const nav = [
  { label: 'dashboard', href: `/dashboard/customer`, icon: FaTachometerAlt },
  { label: 'profile', href: `/dashboard/customer/profile`, icon: FaUser },
  { label: 'browseArtisans', href: `/dashboard/customer/artisans`, icon: FaSearch },
  { label: 'myBookings', href: `/dashboard/customer/bookings`, icon: FaClipboardList },
  { label: 'bookingRequests', href: `/dashboard/customer/requests`, icon: FaBriefcase },
  { label: 'messages', href: `/dashboard/customer/messages`, icon: FaComments },
  { label: 'payments', href: `/dashboard/customer/payments`, icon: FaCreditCard },
  { label: 'reviews', href: `/dashboard/customer/reviews`, icon: FaStar },
  { label: 'notifications', href: `/dashboard/customer/notifications`, icon: FaBell },
  { label: 'support', href: `/dashboard/customer/support`, icon: FaLifeRing },
  { label: 'logout', href: `/logout`, icon: FaSignOutAlt },
];

  return (
    <aside className={`fixed top-0 left-0 bg-[var(--blue)]`}>Sidebar</aside>
  )
}

export default Sidebar