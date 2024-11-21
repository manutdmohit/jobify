'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { type Employee, columns } from './columns';
import axios, { AxiosError } from 'axios';
import { toast } from '@/components/ui/use-toast';

export default function EmployeesPage() {
  setTimeout(() => {}, 5000);

  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axios.get('/api/users');

        if (response.status === 200) {
          setTutors(response.data);
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
              error.response?.data?.message || 'Failed to fetch tutors.',
            variant: 'destructive',
          });
        } else {
          // Generic error handling
          console.error('Unexpected error:', error);

          toast({
            title: 'Error',
            description: 'Something went wrong while fetching tutors.',
            variant: 'destructive',
          });
        }
      }
    };

    fetchTutors();
  }, []);

  console.log(tutors);

  const employees: Employee[] = [
    {
      id: 1,
      firstName: 'Colin',
      lastName: 'Murray',
      teamName: 'alpha',
      isTeamLeader: true,
      avatar: '/cm.jpg',
    },
    {
      id: 2,
      firstName: 'Tom',
      lastName: 'Phillips',
      teamName: 'alpha',
      isTeamLeader: false,
    },
    {
      id: 3,
      firstName: 'Liam',
      lastName: 'Fuentes',
      teamName: 'alpha',
      isTeamLeader: false,
    },
    {
      id: 4,
      firstName: 'Tina',
      lastName: 'Fey',
      teamName: 'canary',
      isTeamLeader: true,
      avatar: '/tf.jpg',
    },
    {
      id: 5,
      firstName: 'Katie',
      lastName: 'Johnson',
      teamName: 'canary',
      isTeamLeader: false,
    },
    {
      id: 6,
      firstName: 'Tina',
      lastName: 'Jones',
      teamName: 'canary',
      isTeamLeader: false,
    },
    {
      id: 7,
      firstName: 'Amy',
      lastName: 'Adams',
      teamName: 'delta',
      isTeamLeader: true,
    },
    {
      id: 8,
      firstName: 'Ryan',
      lastName: 'Lopez',
      teamName: 'delta',
      isTeamLeader: false,
      avatar: '/rl.jpg',
    },
    {
      id: 9,
      firstName: 'Jenny',
      lastName: 'Jones',
      teamName: 'delta',
      isTeamLeader: false,
    },
  ];

  setTimeout(() => {}, 2000);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Tutors</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={tutors} />
        </CardContent>
      </Card>
    </div>
  );
}
