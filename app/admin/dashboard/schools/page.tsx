'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { Button } from '@/components/ui/button';
import axios, { AxiosError } from 'axios';
import { toast } from '@/components/ui/use-toast';
import { useSession } from 'next-auth/react';
import { SchoolType } from '@/model/School';

export default function SchoolsPage() {
  // const [schools, setSchools] = useState<School[]>([
  //   { name: 'Greenwood International School' },
  //   { name: 'Sunrise Academy' },
  //   { name: 'Maple Leaf School' },
  //   { name: 'Oceanview High School' },
  //   { name: 'Riverside Learning Center' },
  // ]);

  const { data: session } = useSession();

  const router = useRouter();

  const [schools, setSchools] = useState<SchoolType[]>([]);

  useEffect(() => {
    if (!session) {
      router.push('/sign-in');
    }

    const fetchSchools = async () => {
      try {
        const response = await axios.get('/api/schools');

        if (response.status === 200) {
          setSchools(response.data);
        } else {
          console.log(response.statusText);
          toast({
            title: 'Error',
            description: 'Something went wrong',
            variant: 'destructive',
          });
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          // Axios-specific error handling
          console.error('Axios error:', error.response?.data || error.message);

          toast({
            title: 'Error',
            description:
              error.response?.data?.message || 'Failed to fetch schools.',
            variant: 'destructive',
          });
        } else {
          // Generic error handling
          console.error('Unexpected error:', error);

          toast({
            title: 'Error',
            description: 'Something went wrong while fetching schools.',
            variant: 'destructive',
          });
        }
      }
    };

    fetchSchools();
  }, [session]);

  return (
    <div className="p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Schools</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            className="mb-4"
            onClick={() => router.push('/admin/dashboard/schools/add')}
          >
            Add School
          </Button>
          <DataTable columns={columns} data={schools} />
        </CardContent>
      </Card>
    </div>
  );
}
