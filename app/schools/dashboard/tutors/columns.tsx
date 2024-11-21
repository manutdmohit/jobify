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

export const columns: ColumnDef<CombinedFormData>[] = [
  {
    accessorKey: 'avatar',
    header: 'Photo',
    cell: ({ row }) => {
      const avatar: string = row.getValue('ppPhoto');
      const fullName: string = row.getValue('fullName');

      return (
        <Avatar>
          {!!avatar && (
            <Image
              height={40}
              width={40}
              src={avatar}
              alt={`${fullName} avatar`}
            />
          )}

          <AvatarFallback className="uppercase">
            {fullName.split(' ')[0][0] + fullName.split(' ')[1][0]}
          </AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: 'fullName',
    header: 'Full Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'jobPreference',
    header: 'Job Preference',
  },
  {
    accessorKey: 'is_verified',
    header: 'Verified',
    cell: ({ row }) => {
      const isVerified: boolean = row.getValue('is_verified');
      return isVerified ? (
        <BadgeCheck className="text-green-500" />
      ) : (
        <BadgeX className="text-destructive" />
      );
    },
  },
  {
    accessorKey: 'user.id',
    header: 'Edit/View',
    cell: ({ row }) => {
      return (
        <EyeIcon type="button" className="text-green-700 cursor-pointer" />
      );
    },
  },

  // {
  //   accessorKey: 'teamName',
  //   header: 'Team',
  // },
  // {
  //   accessorKey: 'isTeamLeader',
  //   header: '',
  //   cell: ({ row }) => {
  //     const isTeamLeader: boolean = row.getValue('isTeamLeader');

  //     return isTeamLeader ? <Badge variant="default">Team Leader</Badge> : null;
  //   },
  // },
];

// export const columns: ColumnDef<Employee>[] = [
//   {
//     accessorKey: 'avatar',
//     header: '',
//     cell: ({ row }) => {
//       const avatar: string = row.getValue('avatar');
//       const firstName: string = row.getValue('firstName');
//       const lastName: string = row.getValue('lastName');

//       return (
//         <Avatar>
//           {!!avatar && (
//             <Image
//               height={40}
//               width={40}
//               src={avatar}
//               alt={`${firstName} ${lastName} avatar`}
//             />
//           )}

//           <AvatarFallback className="uppercase">
//             {firstName[0]}
//             {lastName[0]}
//           </AvatarFallback>
//         </Avatar>
//       );
//     },
//   },
//   {
//     accessorKey: 'firstName',
//     header: 'First Name',
//   },
//   {
//     accessorKey: 'lastName',
//     header: 'Last Name',
//   },
//   {
//     accessorKey: 'teamName',
//     header: 'Team',
//   },
//   {
//     accessorKey: 'isTeamLeader',
//     header: '',
//     cell: ({ row }) => {
//       const isTeamLeader: boolean = row.getValue('isTeamLeader');

//       return isTeamLeader ? <Badge variant="default">Team Leader</Badge> : null;
//     },
//   },
// ];
