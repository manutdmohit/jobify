'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Pagination from './components/pagination';

const classData = [
  {
    _id: '64b23a5f9c09e2ab12345678',
    title: 'Mathematics Class',
    tutorId: 'tutor123',
    students: ['John Doe', 'Jane Smith', 'Alice Johnson'],
  },
  {
    _id: '64b23a5f9c09e2ab87654321',
    title: 'Science Class',
    tutorId: 'tutor456',
    students: ['Emily Davis', 'Michael Brown'],
  },
  {
    _id: '64b23a5f9c09e2ab12345678',
    title: 'Mathematics Class',
    tutorId: 'tutor123',
    students: ['John Doe', 'Jane Smith', 'Alice Johnson'],
  },
  {
    _id: '64b23a5f9c09e2ab87654321',
    title: 'Science Class',
    tutorId: 'tutor456',
    students: ['Emily Davis', 'Michael Brown'],
  },
  {
    _id: '64b23a5f9c09e2ab12345678',
    title: 'Mathematics Class',
    tutorId: 'tutor123',
    students: ['John Doe', 'Jane Smith', 'Alice Johnson'],
  },
  {
    _id: '64b23a5f9c09e2ab87654321',
    title: 'Science Class',
    tutorId: 'tutor456',
    students: ['Emily Davis', 'Michael Brown'],
  },
  {
    _id: '64b23a5f9c09e2ab12345678',
    title: 'Mathematics Class',
    tutorId: 'tutor123',
    students: ['John Doe', 'Jane Smith', 'Alice Johnson'],
  },
  {
    _id: '64b23a5f9c09e2ab87654321',
    title: 'Science Class',
    tutorId: 'tutor456',
    students: ['Emily Davis', 'Michael Brown'],
  },
  {
    _id: '64b23a5f9c09e2ab12345678',
    title: 'Mathematics Class',
    tutorId: 'tutor123',
    students: ['John Doe', 'Jane Smith', 'Alice Johnson'],
  },
  {
    _id: '64b23a5f9c09e2ab87654321',
    title: 'Science Class',
    tutorId: 'tutor456',
    students: ['Emily Davis', 'Michael Brown'],
  },
  // Additional sessions...
];

const ITEMS_PER_PAGE = 6; // Items per page

const PreviousSessionsPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(classData.length / ITEMS_PER_PAGE);

  const handleRepeatSession = (tutorId: string) => {
    router.push(`/schools/dashboard/sessions/tutors/${tutorId}`); // Redirect to the tutor page with session ID
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Determine sessions to display on the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentSessions = classData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Completed Sessions
      </h1>

      {/* Grid Layout for Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentSessions.map((session) => (
          <Card key={session._id} className="p-4">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {session.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>{session.students.length} students</p>
            </CardContent>
            <CardFooter>
              <Button
                variant="default"
                onClick={() => handleRepeatSession(session.tutorId)}
              >
                Repeat Session
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        total={totalPages}
        page={currentPage}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default PreviousSessionsPage;
