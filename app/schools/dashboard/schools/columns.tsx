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

export type School = {
  name: string;
};

import { Button } from '@/components/ui/button';

export const columns: ColumnDef<School>[] = [
  {
    accessorKey: 'name',
    header: 'School Name',
    cell: ({ row }) => (
      <span className="font-medium text-gray-800">{row.getValue('name')}</span>
    ),
  },
  {
    accessorKey: 'isFeatured',
    header: 'Featured',
    cell: ({ row }) => {
      const isFeatured = row.getValue('isFeatured') as boolean;
      return isFeatured ? (
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
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Button variant="ghost" size="sm">
          <EyeIcon className="h-4 w-4" />
          View
        </Button>
        {/* Additional action buttons can be added here */}
      </div>
    ),
  },
];
