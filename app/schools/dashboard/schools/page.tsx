'use client';

import { useState } from 'react';
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

  const addSchool = () => {
    const newSchoolName = prompt('Enter the new school name:');
    if (newSchoolName) {
      const isFeatured = confirm('Is this a featured school?');
      setSchools((prev) => [...prev, { name: newSchoolName, isFeatured }]);
    }
  };

  return (
    <div className="p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Schools</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={addSchool} className="mb-4">
            Add School
          </Button>
          <DataTable columns={columns} data={schools} />
        </CardContent>
      </Card>
    </div>
  );
}
