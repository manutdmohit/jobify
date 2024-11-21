'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

type Class = {
  id: number;
  title: string;
  date: string;
  paymentVerified: boolean;
  adminVerified: boolean;
  students: string[];
};

const mockClasses: Class[] = [
  {
    id: 1,
    title: 'Dancing',
    date: 'July 1st, 6:30 PM',
    paymentVerified: true,
    adminVerified: true,
    students: ['Alice', 'Bob', 'Charlie'],
  },
  {
    id: 2,
    title: 'Yoga',
    date: 'July 5th, 8:00 AM',
    paymentVerified: true,
    adminVerified: false,
    students: ['David', 'Eve', 'Frank'],
  },
  {
    id: 3,
    title: 'Painting',
    date: 'July 10th, 3:00 PM',
    paymentVerified: false,
    adminVerified: false,
    students: ['Grace', 'Heidi', 'Ivan'],
  },
];

export default function InstitutionsPage() {
  const router = useRouter();

  const [classes, setClasses] = useState(mockClasses);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

  const handlePayment = (id: number) => {
    setClasses((prev) =>
      prev.map((classItem) =>
        classItem.id === id
          ? { ...classItem, paymentVerified: true }
          : classItem
      )
    );
    toast({
      title: 'Payment Completed',
      description: 'Your payment has been successfully completed.',
      variant: 'success',
    });
  };

  const handleClassClick = (classItem: Class) => {
    setSelectedClass(classItem);
  };

  const handleCloseModal = () => {
    setSelectedClass(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4 text-center">
        Hello, Saint Xaviers
      </h2>
      <span className="text-sm text-blue-500 mb-6 block text-center">
        Institution ID: 232233
      </span>

      {/* Request New Session Button */}
      <div className="flex justify-center mb-6">
        <Button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => router.push('/dashboard/institutions/skills-set')}
        >
          Request a New Session
        </Button>
      </div>

      {/* Upcoming Classes Card */}
      <Card>
        <CardHeader>
          <CardTitle>Institution's Upcoming Classes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            {classes.map((classItem) => (
              <div
                key={classItem.id}
                onClick={() => handleClassClick(classItem)}
                className="flex flex-row justify-between items-center border rounded-lg p-4 shadow-sm cursor-pointer hover:bg-gray-100 transition"
              >
                <div>
                  <h3 className="text-lg font-semibold">{classItem.title}</h3>
                  <p className="text-sm text-gray-500">{classItem.date}</p>
                </div>
                <div>
                  {classItem.paymentVerified && classItem.adminVerified ? (
                    <span className="text-green-500 font-medium">Verified</span>
                  ) : classItem.paymentVerified ? (
                    <span className="text-yellow-500 font-medium">
                      Confirmation Pending
                    </span>
                  ) : (
                    <div className="flex flex-row items-center space-x-2">
                      <span className="text-red-500 font-medium">
                        Payment Pending
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePayment(classItem.id);
                        }}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                      >
                        Complete Payment
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Buttons: Previous Sessions & School Profile */}
      <div className="flex justify-around mt-6">
        <Button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            router.push('/dashboard/institutions/previous-sessions');
          }}
        >
          Previous Sessions
        </Button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          School Profile
        </button>
      </div>

      {/* Modal for Selected Class */}
      {selectedClass && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
          >
            <h3 className="text-lg font-bold mb-2">{selectedClass.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{selectedClass.date}</p>
            <h4 className="font-semibold mb-2">Students:</h4>
            <ul className="list-disc list-inside">
              {selectedClass.students.map((student, index) => (
                <li key={index}>{student}</li>
              ))}
            </ul>
            <Button
              onClick={handleCloseModal}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
