'use client';

import { Card, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const skills = [
  { id: 1, name: 'Mathematics', tutorId: 'tutor123' },
  { id: 2, name: 'Physics', tutorId: 'tutor456' },
  { id: 3, name: 'Chemistry', tutorId: 'tutor789' },
  { id: 4, name: 'Programming', tutorId: 'tutor101' },
];

const NewSessionPage = () => {
  const router = useRouter();

  const handleRequest = (tutorId: string) => {
    router.push(`/schools/dashboard/sessions/tutors/${tutorId}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Available Skillset
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill) => (
          <Card
            key={skill.id}
            className="p-4 border border-gray-200 shadow-md rounded-lg"
          >
            <CardContent>
              <CardTitle className="text-lg font-semibold text-gray-800">
                {skill.name}
              </CardTitle>
            </CardContent>
            <CardFooter className="pt-4">
              <Button
                onClick={() => handleRequest(skill.tutorId)}
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
              >
                Request
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NewSessionPage;
