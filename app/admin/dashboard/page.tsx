'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs'; // Ensure compatibility
import EmployeeStats from './components/employees/employee-stats';
import TeamsStats from './components/teams/team-stats';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoadingPage from './loading';

import { checkSession } from '@/utils/CheckSession';

export default function DashboardPage() {
  const session = checkSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      return router.push('/sign-in');
    }
  }, [session]);

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
