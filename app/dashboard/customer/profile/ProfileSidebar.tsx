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
} from 'react-icons/fa'

const ProfileSidebar = () => {

const nav = [
    { label: 'Profile Information', href: '/profile', icon: FaTachometerAlt },
    { label: 'Account Login Details', href: '/profile/customer/profile', icon: FaUser },
    { label: 'Account Preferences', href: '/profile/customer/artisans', icon: FaSearch },
    { label: 'Security & Privacy', href: '/profile/customer/bookings', icon: FaClipboardList },
    { label: 'Saved Artisans / Favorites', href: '/profile/customer/requests', icon: FaBriefcase },
    { label: 'Payment Information', href: '/profile/customer/messages', icon: FaComments },
    { label: 'Account Status', href: '/profile/customer/payments', icon: FaCreditCard },
    { label: 'Account Actions', href: '/profile/customer/reviews', icon: FaStar },
    
  ]

  return (
    <div className='font-roboto'>
        <div className="fixed top-0 left-0 h-screen bg-[var(--orange)] text-[var(--orange)] flex flex-col z-40 "> 123</div>
    </div>
  )
}

export default ProfileSidebar