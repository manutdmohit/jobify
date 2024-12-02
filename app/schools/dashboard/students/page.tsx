'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { Button } from '@/components/ui/button';
import { StudentType } from '@/model/Student';

export default function SchoolsPage() {
  const [students, setStudents] = useState<StudentType[]>([
    // { name: 'Greenwood International School' },
    // { name: 'Sunrise Academy' },
    // { name: 'Maple Leaf School' },
    // { name: 'Oceanview High School' },
    // { name: 'Riverside Learning Center' },
  ]);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch('/api/students');
        const data = await response.json();

        setStudents(data);
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
          <CardTitle>Students</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => router.push('/schools/dashboard/students/add')}
            className="mb-4"
          >
            Add Student
          </Button>
          <DataTable columns={columns} data={students} />
        </CardContent>
      </Card>
    </div>
  );
}
