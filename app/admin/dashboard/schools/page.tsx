'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { columns, School } from './columns';
import { Button } from '@/components/ui/button';
import axios, { AxiosError } from 'axios';
import { toast } from '@/components/ui/use-toast';

export default function SchoolsPage() {
  // const [schools, setSchools] = useState<School[]>([
  //   { name: 'Greenwood International School' },
  //   { name: 'Sunrise Academy' },
  //   { name: 'Maple Leaf School' },
  //   { name: 'Oceanview High School' },
  //   { name: 'Riverside Learning Center' },
  // ]);

  const [schools, setSchools] = useState<School[]>([]);

  useEffect(() => {
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
  }, []);

  // const addSchool = () => {
  //   const newSchoolName = prompt('Enter the new school name:');
  //   if (newSchoolName) {
  //     const isFeatured = confirm('Is this a featured school?');
  //     setSchools((prev) => [...prev, { name: newSchoolName, isFeatured }]);
  //   }
  // };

  return (
    <div className="p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Schools</CardTitle>
        </CardHeader>
        <CardContent>
          <Button className="mb-4">Add School</Button>
          <DataTable columns={columns} data={schools} />
        </CardContent>
      </Card>
    </div>
  );
}
