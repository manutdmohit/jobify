'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs'; // Ensure compatibility
import EmployeeStats from './components/employees/employee-stats';
import TeamsStats from './components/teams/team-stats';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoadingPage from './loading';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/sign-in');
    }
  }, [status, router]);

  // Display a loading state while the session is being fetched
  if (status === 'loading') {
    return <LoadingPage />;
  }

  return (
    <Tabs defaultValue="employees">
      <TabsList className="mb-4">
        <TabsTrigger value="employees">Employee Stats</TabsTrigger>
        <TabsTrigger value="teams">Team Stats</TabsTrigger>
      </TabsList>
      <TabsContent value="employees">
        <EmployeeStats />
      </TabsContent>
      <TabsContent value="teams">
        <TeamsStats />
      </TabsContent>
    </Tabs>
  );
}
