
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function ArtisanDashboard() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/login');
      }
    });
  }, [router]);

  return (
    <div>
      <h1>Welcome to Artisan Dashboard</h1>
      {/* Your content */}
    </div>
  );
}

// const handleLogout = async () => {
//   await supabase.auth.signOut();
//   router.push('/login');
// };