'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

type Skill = {
  id: number;
  name: string;
  tutorId: number; // ID to fetch the tutor's profile
};

const mockSkills: Skill[] = [
  { id: 1, name: 'Mathematics', tutorId: 101 },
  { id: 2, name: 'Physics', tutorId: 102 },
  { id: 3, name: 'Dancing', tutorId: 103 },
  { id: 4, name: 'Painting', tutorId: 104 },
  { id: 5, name: 'Yoga', tutorId: 105 },
];

const SkillSetPage = () => {
  const router = useRouter();

  const handleSkillClick = (skill: Skill) => {
    router.push(
      `/dashboard/tutors/profile/${skill.tutorId}?skill=${skill.name}`
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Available Skillset
      </h2>
      <div className="space-y-4">
        {mockSkills.map((skill) => (
          <div
            key={skill.id}
            className="flex justify-between items-center border rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-lg font-medium">{skill.name}</h3>
            <button
              onClick={() => handleSkillClick(skill)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              View Tutor
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillSetPage;
