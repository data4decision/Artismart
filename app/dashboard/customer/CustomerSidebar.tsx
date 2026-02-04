// // 'use client'

// // import React, { useState, useEffect } from 'react'
// // import Link from 'next/link'
// // import Image from 'next/image'
// // import { usePathname } from 'next/navigation'
// // import {
// //   FaTachometerAlt,
// //   FaUser,
// //   FaSearch,
// //   FaBriefcase,
// //   FaClipboardList,
// //   FaComments,
// //   FaCreditCard,
// //   FaStar,
// //   FaBell,
// //   FaLifeRing,
// //   FaSignOutAlt,
// //   FaChevronCircleRight,
// //   FaChevronCircleLeft,
// //   FaTimes,
// //   FaBars,
// // } from 'react-icons/fa'

// // // Logout handler
// // const logout = () => {
// //   console.log('Logging out...')
// //   window.location.href = '/login'
// // }

// // interface CustomerSidebarProps {
// //   onCollapseChange: (collapsed: boolean) => void
// // }

// // const CustomerSidebar = ({ onCollapseChange }: CustomerSidebarProps) => {
// //   const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
// //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
// //   const pathname = usePathname()

// //   const isActive = (href: string) => pathname === href
  

// //   const nav = [
// //     { label: 'Dashboard', href: '/dashboard/customer', icon: FaTachometerAlt },
// //     { label: 'Profile', href: '/dashboard/customer/profile', icon: FaUser },
// //     { label: 'Browse Artisans', href: '/dashboard/customer/artisans', icon: FaSearch },
// //     { label: 'My Bookings', href: '/dashboard/customer/bookings', icon: FaClipboardList },
// //     { label: 'Booking Requests', href: '/dashboard/customer/requests', icon: FaBriefcase },
// //     { label: 'Messages', href: '/dashboard/customer/messages', icon: FaComments },
// //     { label: 'Payments', href: '/dashboard/customer/payments', icon: FaCreditCard },
// //     { label: 'Reviews', href: '/dashboard/customer/reviews', icon: FaStar },
// //     { label: 'Notifications', href: '/dashboard/customer/notifications', icon: FaBell },
// //     { label: 'Support', href: '/dashboard/customer/support', icon: FaLifeRing },
// //   ]

  
// //   useEffect(() => {
// //     const handleResize = () => {
// //       const mobile = window.innerWidth < 1024
// //       setIsCollapsed(mobile)           // auto-collapse on mobile
// //       onCollapseChange(mobile)         // sync with parent Layout
// //     }

// //     handleResize()
// //     window.addEventListener('resize', handleResize)
// //     return () => window.removeEventListener('resize', handleResize)
// //   }, [onCollapseChange])

// //   const toggleCollapse = () => {
// //     setIsCollapsed(prev => {
// //       const newState = !prev
// //       onCollapseChange(newState)
// //       return newState
// //     })
// //   }

// //   return (
// //     <div className="">
// //     <aside
// //       className={`fixed top-0 left-0 h-screen bg-[var(--blue)] text-[var(--white)] flex flex-col z-40 transition-all duration-300 ${isCollapsed ? 'w-13' : 'w-48'}`}
// //       aria-label="Customer sidebar"
// //     >
// //       {/* Logo & Brand */}
// //       <div className="px-4 h-16 flex items-center gap-2 font-semibold border-b border-[var(--orange)]">
// //         <div className="h-9 w-9 grid place-items-center rounded-full bg-[var(--white)] overflow-hidden">
// //           <Image src="/log.png" width={70} height={70} alt="Artismart logo" priority />
// //         </div>
// //         {!isCollapsed && <span className="text-lg">Artismart</span>}
// //       </div>

// //       {/* Navigation */}
// //       <nav className="flex-1">
// //         <ul className="py-2">
// //           {nav.map(({ href, icon: Icon, label }) => (
// //             <li key={href}>
// //               <Link
// //                 href={href}
// //                 className={`flex items-center gap-3 px-4 py-3 transition-colors text-sm sm:text-[15px] ${
// //                   isActive(href)
// //                     ? 'bg-[var(--orange)] text-[var(--white)] font-semibold shadow'
// //                     : 'hover:bg-[var(--orange)]/90'
// //                 }`}
// //                 aria-current={isActive(href) ? 'page' : undefined}
// //               >
// //                 <Icon className="shrink-0 text-lg" />
// //                 {!isCollapsed && <span className="text-sm sm:text-[12px]">{label}</span>}
// //               </Link>
// //             </li>
// //           ))}
// //         </ul>
// //       </nav>

// //       {/* Logout */}
// //       <button
// //         onClick={logout}
// //         className="flex items-center gap-3 px-4 py-3 text-left text-[var(--white)] hover:text-[var(--orange)] hover:bg-[var(--blue)]/90 transition-colors"
// //         aria-label="Logout"
// //       >
// //         <FaSignOutAlt className="text-lg" />
// //         {!isCollapsed && <span>Logout</span>}
// //       </button>

// //       {/* Collapse Toggle – exact same positioning & style as Nutrition */}
// //       <button
// //         className={`absolute top-28 ${isCollapsed ? 'left-10' : 'left-44'} transform -translate-y-1/2 text-[var(--white)] bg-[var(--orange)] p-2 rounded-full shadow-lg hover:scale-110 transition-transform`}
// //         onClick={toggleCollapse}
// //         aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
// //       >
// //         {isCollapsed ? <FaChevronCircleRight /> : <FaChevronCircleLeft />}
// //       </button>
// //     </aside>

// //     <div className="min-h-screen">
// //       <button className="md:hidden top-8 right-8"
// //       onClick={()=> setIsMobileMenuOpen(!isMobileMenuOpen)}>
// //         {isMobileMenuOpen ? <FaTimes size={18}/> : <FaBars size={18}/> }
// //       </button>
// //     </div>
// //     </div>
// //   )
// // }

// // export default CustomerSidebar

// 'use client'

// import React, { useState } from 'react'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import {
//   FaTachometerAlt,
//   FaUser,
//   FaSearch,
//   FaBriefcase,
//   FaClipboardList,
//   FaComments,
//   FaCreditCard,
//   FaStar,
//   FaBars,
//   FaTimes,
// } from 'react-icons/fa'

// const navItems = [
//   { label: 'Profile Information', href: '/dashboard/customer/profile' },
//   { label: 'Account Login Details', href: '/dashboard/customer/profile/account-login' },
//   { label: 'Account Preferences', href: '/profile/customer/artisans' },
//   { label: 'Security & Privacy', href: '/profile/customer/bookings' },
//   { label: 'Saved Artisans / Favorites', href: '/profile/customer/requests' },
//   { label: 'Payment Information', href: '/profile/customer/messages' },
//   { label: 'Account Status', href: '/profile/customer/payments', icon: FaCreditCard },
//   { label: 'Account Actions', href: '/profile/customer/reviews', icon: FaStar },
// ]

// export default function ProfileSidebar() {
//   const pathname = usePathname()
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

//   const isActive = (href: string) => pathname === href

//   return (
//     <>
//       {/* Mobile hamburger button */}
//       <button
//         className="md:hidden fixed top-4 right-4 z-50 bg-white p-3 rounded-full shadow-lg border border-gray-200"
//         onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//         aria-label="Toggle menu"
//       >
//         {isMobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
//       </button>

//       {/* Sidebar – fixed on desktop, drawer on mobile */}
//       <aside
//         className={`
//           fixed md:static inset-y-0 left-0 z-40 w-64 md:w-72 bg-white border-r border-gray-200
//           transform transition-transform duration-300 ease-in-out
//           ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
//           md:translate-x-0
//         `}
//       >
//         <nav className="mt-16 md:mt-6 px-3">
//           <ul className="space-y-1.5">
//             {navItems.map(({ href, label, icon: Icon }) => (
//               <li key={href}>
//                 <Link
//                   href={href}
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   className={`
//                     flex items-center gap-3 px-5 py-3.5 rounded-xl transition-all duration-200 text-[15px]
//                     ${
//                       isActive(href)
//                         ? 'bg-orange-50 text-orange-700 font-medium shadow-sm border border-orange-200'
//                         : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 border border-transparent'
//                     }
//                   `}
//                 >
//                   {Icon && <Icon className="text-lg shrink-0 opacity-80" />}
//                   <span className="truncate">{label}</span>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </aside>

//       {/* Overlay when mobile menu is open */}
//       {isMobileMenuOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300"
//           onClick={() => setIsMobileMenuOpen(false)}
//         />
//       )}
//     </>
//   )
// }

import React from 'react'

const CustomerSidebar = () => {
  return (
    <div>CustomerSidebar</div>
  )
}

export default CustomerSidebar