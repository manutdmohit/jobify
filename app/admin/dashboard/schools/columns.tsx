'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CombinedFormData, combinedSchema } from '@/schemas/schemas';
import { ColumnDef } from '@tanstack/react-table';
import { BadgeCheck, BadgeX, EyeIcon } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { schoolsSchema, School } from '@/model/School';
import { use } from 'react';
import { useRouter } from 'next/navigation';

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

export const columns: ColumnDef<School>[] = [
  {
    accessorKey: 'name',
    header: 'School Name',
    cell: ({ row }) => (
      <span className="font-medium text-gray-800">{row.getValue('name')}</span>
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
    accessorKey: 'contactPhone',
    header: 'Phone',
    cell: ({ row }) => (
      <span className="font-medium text-gray-800">
        {row.getValue('contactPhone')}
      </span>
    ),
  },
  {
    accessorKey: 'contactEmail',
    header: 'Email',
    cell: ({ row }) => (
      <span className="font-medium text-gray-800">
        {row.getValue('contactEmail')}
      </span>
    ),
  },
  {
    accessorKey: 'isVerified',
    header: 'Verified',
    cell: ({ row }) => {
      const isVerified = row.getValue('isVerified') as boolean;
      return isVerified ? (
        <Badge variant="outline" className="bg-green-100 text-green-700">
          Featured
        </Badge>
      ) : (
        <Badge variant="outline" className="bg-gray-100 text-gray-700">
          Regular
        </Badge>
      );
    },
    enableSorting: true,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const router = useRouter(); // Access the router instance
      const getRow = row.original as School;
      const schoolId = getRow._id;

      return (
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/admin/dashboard/schools/${schoolId}`)}
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
