'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

type ClassTiming = {
  day: string;
  timings: string[];
};

type TutorProfile = {
  id: number;
  name: string;
  skills: string[];
  classTimings: ClassTiming[];
};

const mockTutorProfiles: TutorProfile[] = [
  {
    id: 101,
    name: 'John Doe',
    skills: ['Mathematics', 'Statistics'],
    classTimings: [
      { day: 'Monday', timings: ['7:00 AM', '11:00 AM'] },
      { day: 'Wednesday', timings: ['9:00 AM', '1:00 PM'] },
      { day: 'Friday', timings: ['8:00 AM', '2:00 PM'] },
    ],
  },
  {
    id: 102,
    name: 'Jane Smith',
    skills: ['Physics', 'Astronomy'],
    classTimings: [
      { day: 'Tuesday', timings: ['8:00 AM', '12:00 PM'] },
      { day: 'Thursday', timings: ['10:00 AM', '3:00 PM'] },
    ],
  },
  {
    id: 103,
    name: 'Alice Johnson',
    skills: ['Dancing', 'Choreography'],
    classTimings: [
      { day: 'Monday', timings: ['6:00 PM', '8:00 PM'] },
      { day: 'Saturday', timings: ['10:00 AM', '12:00 PM'] },
    ],
  },
  {
    id: 104,
    name: 'Robert Brown',
    skills: ['Painting', 'Art'],
    classTimings: [
      { day: 'Wednesday', timings: ['7:00 AM', '2:00 PM'] },
      { day: 'Sunday', timings: ['10:00 AM', '4:00 PM'] },
    ],
  },
  {
    id: 105,
    name: 'Emma Davis',
    skills: ['Yoga', 'Mindfulness'],
    classTimings: [
      { day: 'Tuesday', timings: ['6:30 AM', '8:30 AM'] },
      { day: 'Thursday', timings: ['7:00 AM', '9:00 AM'] },
    ],
  },
];

const TutorProfilePage = () => {
  const searchParams = useSearchParams();
  const tutorId = parseInt(searchParams.get('id') || '', 10);
  const skill = searchParams.get('skill');
  const [tutorProfile, setTutorProfile] = useState<TutorProfile | null>(null);

  useEffect(() => {
    // Simulate fetching tutor data based on ID
    const profile = mockTutorProfiles.find((tutor) => tutor.id === tutorId);
    setTutorProfile(profile || null);
  }, [tutorId]);

  if (!tutorProfile) {
    return <div className="text-center">Loading tutor profile...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{tutorProfile.name}'s Profile</h2>
      <h3 className="text-lg font-semibold mb-4">Skill: {skill}</h3>
      <h4 className="text-lg font-semibold">Skills:</h4>
      <ul className="list-disc ml-6 mb-6">
        {tutorProfile.skills.map((skill, index) => (
          <li key={index} className="text-base">
            {skill}
          </li>
        ))}
      </ul>
      <h4 className="text-lg font-semibold">Class Timings:</h4>
      <div className="space-y-4">
        {tutorProfile.classTimings.map((timing, index) => (
          <div
            key={index}
            className="border p-4 rounded shadow-sm hover:shadow-md transition"
          >
            <h5 className="font-medium">{timing.day}</h5>
            <p>{timing.timings.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorProfilePage;
