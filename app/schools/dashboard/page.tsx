import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';
import EmployeeStats from './components/employees/employee-stats';
import TeamsStats from './components/teams/team-stats';

export default function DashboardPage() {
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
