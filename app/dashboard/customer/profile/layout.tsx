import ProfileSidebar from './ProfileSidebar'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] min-h-screen">
        <ProfileSidebar />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {/* Spacer for mobile header area */}
          <div className="md:hidden h-16" />
          {children}
        </main>
      </div>
    </div>
  )
}