'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CombinedFormData, combinedSchema } from '@/schemas/schemas';
import { ColumnDef } from '@tanstack/react-table';
import { BadgeCheck, BadgeX, EyeIcon } from 'lucide-react';
import Image from 'next/image';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  teamName: string;
  isTeamLeader: boolean;
  avatar?: string;
};

// export type School = {
//   name: string;
// };

import { Button } from '@/components/ui/button';
import { StudentType } from '@/model/Student';
import { useRouter } from 'next/navigation';

export const columns: ColumnDef<StudentType>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <span className="font-medium text-gray-800">{row.getValue('name')}</span>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => (
      <span className="font-medium text-gray-800">{row.getValue('email')}</span>
    ),
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({ row }) => (
      <span className="font-medium text-gray-800">{row.getValue('phone')}</span>
    ),
  },
  {
    accessorKey: 'address',
    header: 'Address',
    cell: ({ row }) => (
      <span className="font-medium text-gray-800">
        {row.getValue('address')}
      </span>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const router = useRouter(); // Access the router instance
      const getRow = row.original as StudentType;
      const studentId = getRow._id;

      return (
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              router.push(`/schools/dashboard/students/${studentId}`)
            }
          >
            <EyeIcon className="h-4 w-4" />
            View
          </Button>
          {/* Additional action buttons can be added here */}
        </div>
      );
    },
  },
];
