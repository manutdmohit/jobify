'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { checkSession } from '@/utils/CheckSession';
import { useEffect } from 'react';

type ClassStatus =
  | 'confirmed'
  | 'confirmation_pending'
  | 'payment_pending'
  | 'both_pending';

const classData = [
  {
    _id: '64b23a5f9c09e2ab12345678',
    title: 'Mathematics Class',
    dates: [
      { day: 'Monday', time: '10:00 AM' },
      { day: 'Wednesday', time: '2:00 PM' },
    ],
    school: '64b23a5f9c09e2ab12345678',
    confirmation: 'confirmed',
    payment: 'completed',
    students: ['John Doe', 'Jane Smith', 'Alice Johnson'],
    timestamps: {
      createdAt: '2024-11-28T08:30:00.000Z',
      updatedAt: '2024-11-28T09:00:00.000Z',
    },
  },
  {
    _id: '64b23a5f9c09e2ab87654321',
    title: 'Science Class',
    dates: [
      { day: 'Tuesday', time: '11:00 AM' },
      { day: 'Thursday', time: '1:00 PM' },
    ],
    school: '64b23a5f9c09e2ab87654321',
    confirmation: 'pending',
    payment: 'pending',
    students: ['Emily Davis', 'Michael Brown'],
    timestamps: {
      createdAt: '2024-11-27T10:00:00.000Z',
      updatedAt: '2024-11-27T11:15:00.000Z',
    },
  },
  {
    _id: '64b23a5f9c09e2ab65478901',
    title: 'History Class',
    dates: [{ day: 'Friday', time: '3:00 PM' }],
    school: '64b23a5f9c09e2ab65478901',
    confirmation: 'confirmed',
    payment: 'pending',
    students: ['Sarah Wilson', 'Robert Lee'],
    timestamps: {
      createdAt: '2024-11-25T09:45:00.000Z',
      updatedAt: '2024-11-26T08:30:00.000Z',
    },
  },
  {
    _id: '64b23a5f9c09e2ab56789012',
    title: 'English Class',
    dates: [
      { day: 'Monday', time: '1:30 PM' },
      { day: 'Thursday', time: '11:30 AM' },
    ],
    school: '64b23a5f9c09e2ab56789012',
    confirmation: 'confirmed',
    payment: 'completed',
    students: ['Chris Evans', 'Diana Prince'],
    timestamps: {
      createdAt: '2024-11-20T07:15:00.000Z',
      updatedAt: '2024-11-20T09:45:00.000Z',
    },
  },
  {
    _id: '64b23a5f9c09e2ab67890123',
    title: 'Art Class',
    dates: [{ day: 'Saturday', time: '4:00 PM' }],
    school: '64b23a5f9c09e2ab67890123',
    confirmation: 'pending',
    payment: 'pending',
    students: ['Tony Stark', 'Steve Rogers', 'Natasha Romanoff'],
    timestamps: {
      createdAt: '2024-11-22T06:30:00.000Z',
      updatedAt: '2024-11-23T10:00:00.000Z',
    },
  },
];
export default function DashboardPage() {
  const session = checkSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/sign-in');
    }
  }, [session, router]);

  const getClassStatus = (
    confirmation: string,
    payment: string
  ): ClassStatus => {
    if (confirmation === 'confirmed' && payment === 'completed')
      return 'confirmed';
    if (confirmation === 'pending' && payment === 'pending')
      return 'both_pending';
    if (confirmation === 'pending') return 'confirmation_pending';
    return 'payment_pending';
  };

  return (
    <Card className="w-full max-w-4xl mx-auto my-5 p-4 sm:p-6 md:p-8">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl md:text-2xl font-semibold">
          Dashboard
        </CardTitle>
      </CardHeader>
      <h2 className="text-lg md:text-xl font-bold mt-4">Hi School</h2>
      <p className="text-gray-500 text-sm md:text-base">495498584</p>
      <h2 className="text-lg md:text-xl font-bold mt-6">
        Institution Upcoming Classes
      </h2>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
          {classData.map((classItem, index) => {
            const { title, dates, confirmation, payment } = classItem;
            const status = getClassStatus(confirmation, payment);
            const dateStr = dates.map((d) => `${d.day}, ${d.time}`).join(' | ');

            let cardClass =
              'p-4 rounded-md shadow-md transition-transform duration-200 cursor-pointer';
            if (status === 'confirmed') {
              cardClass += ' bg-green-100 hover:bg-green-200';
            } else if (status === 'confirmation_pending') {
              cardClass += ' bg-yellow-100 hover:bg-yellow-200';
            } else if (status === 'payment_pending') {
              cardClass += ' bg-red-100 hover:bg-red-200';
            } else if (status === 'both_pending') {
              cardClass += ' bg-orange-100 hover:bg-orange-200';
            }

            return (
              <Card
                key={index}
                className={`${cardClass} hover:scale-105`}
                onClick={() => router.push('/')}
              >
                <div className="flex flex-col h-full">
                  {/* Content Section */}
                  <div>
                    <h4 className="text-base md:text-lg font-semibold">
                      {title}
                    </h4>
                    <p className="text-sm md:text-base text-gray-600">
                      {dateStr}
                    </p>
                  </div>

                  {/* Status Section */}
                  <div className="mt-4">
                    {status === 'confirmed' && (
                      <p className="text-green-700 font-medium">
                        Class Confirmed
                      </p>
                    )}
                    {status === 'confirmation_pending' && (
                      <p className="text-yellow-700 font-medium">
                        Confirmation Pending
                      </p>
                    )}
                  </div>

                  {/* Push Button to Bottom */}
                  {(status === 'payment_pending' ||
                    status === 'both_pending') && (
                    <div className="mt-auto flex flex-col items-center">
                      {status === 'payment_pending' && (
                        <p className="text-red-700 font-medium">
                          Payment Pending
                        </p>
                      )}
                      {status === 'both_pending' && (
                        <p className="text-orange-700 font-medium">
                          Both Confirmation and Payment Pending
                        </p>
                      )}
                      <Button
                        className="mt-2"
                        onClick={() => router.push('/payment')}
                      >
                        Make Payment
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        <Button
          className="w-full sm:w-auto px-6 py-2 mt-4"
          onClick={() => router.push('/sessions/new')}
        >
          Request a new session
        </Button>
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
          <Button onClick={() => router.push('/sessions/previous')}>
            Previous Sessions
          </Button>
          <Button onClick={() => router.push('/school/profile')}>
            School Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
