'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { columns, School } from './columns';
import { Button } from '@/components/ui/button';

export default function SchoolsPage() {
  const [schools, setSchools] = useState<School[]>([
    { name: 'Greenwood International School' },
    { name: 'Sunrise Academy' },
    { name: 'Maple Leaf School' },
    { name: 'Oceanview High School' },
    { name: 'Riverside Learning Center' },
  ]);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch('/api/schools');
        const data = await response.json();
        console.log('Schools:', data);

        setSchools(data);
      } catch (error) {
        console.error('Error fetching schools:', error);
      }
    };

    fetchSchools();
  }, []);

  const router = useRouter();

  return (
    <div className="p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Schools</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => router.push('/admin/dashboard/schools/add')}
            className="mb-4"
          >
            Add School
          </Button>
          <DataTable columns={columns} data={schools} />
        </CardContent>
      </Card>
    </div>
  );
}
