'use client';

import { ClassType } from '@/model/Class';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardTitle } from '@/components/ui/card';

const SingleClassPage = () => {
  const [getClass, setGetClass] = useState<ClassType>();
  const params = useParams();

  // Fetch the class data using the provided `params.id`
  useEffect(() => {
    const fetchClass = async () => {
      try {
        const response = await axios.get(`/api/classes/${params.id}`);
        setGetClass(response.data);
      } catch (error) {
        console.error('Error fetching class:', error);
      }
    };

    fetchClass();
  }, [params.id]);

  // {
  //   "_id": {
  //     "$oid": "67494451c4be650830d573ed"
  //   },
  //   "title": "Mathematics Class",
  //   "dates": [
  //     {
  //       "day": "Monday",
  //       "time": "10:00 AM"
  //     },
  //     {
  //       "day": "Wednesday",
  //       "time": "2:00 PM"
  //     }
  //   ],
  //   "school": "64b23a5f9c09e2ab12345678",
  //   "confirmation": "confirmed",
  //   "payment": "completed",
  //   "students": [
  //     "John Doe",
  //     "Jane Smith",
  //     "Alice Johnson"
  //   ],
  //   "timestamps": {
  //     "createdAt": "2024-11-28T08:30:00.000Z",
  //     "updatedAt": "2024-11-28T09:00:00.000Z"
  //   }
  // }

  return (
    <Card className="p-6 bg-white shadow-lg rounded-lg border border-gray-200 max-w-3xl mx-auto mt-8">
      {/* Display the class title */}
      <CardTitle className="text-2xl font-bold text-gray-800 border-b pb-4 mb-6">
        {getClass?.title || 'Class Title'}
      </CardTitle>
      <CardContent>
        {/* Display the dates */}
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Dates:</h2>
        {getClass?.dates && getClass.dates.length > 0 ? (
          <ul className="list-disc list-inside space-y-2">
            {getClass.dates.map((date, index) => (
              <li
                key={index}
                className="text-gray-600 hover:text-gray-800 transition-colors duration-300"
              >
                {date.day}, {date.time}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">
            No dates available for this class.
          </p>
        )}

        {/* Divider */}
        <div className="my-6 h-px bg-gray-300"></div>

        {/* Display the students list */}
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Students:</h2>
        {getClass?.students && getClass.students.length > 0 ? (
          <ul className="list-disc list-inside space-y-2">
            {getClass.students.map((student, index) => (
              <li
                key={index}
                className="text-gray-600 hover:text-gray-800 transition-colors duration-300"
              >
                {student}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">
            No students enrolled in this class.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default SingleClassPage;
