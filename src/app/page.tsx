'use client';

import { QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider } from '@/lib/auth';
import { queryClient } from '@/lib/query';

import UserPage from '@/components/UserPage';

import Loading from './loading';

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider fallback={<Loading />}>
        <div className="mx-auto max-w-sm">
          <UserPage fallback={<Loading />} />
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
}
