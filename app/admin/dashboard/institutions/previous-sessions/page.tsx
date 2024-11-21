'use client';

import { useState } from 'react';

type Session = {
  id: number;
  title: string;
  date: string;
  attendees: string[];
};

const mockPreviousSessions: Session[] = [
  {
    id: 1,
    title: 'Dancing Session',
    date: 'June 10th, 5:00 PM',
    attendees: ['Alice', 'Bob', 'Charlie'],
  },
  {
    id: 2,
    title: 'Yoga Class',
    date: 'June 15th, 7:30 AM',
    attendees: ['David', 'Eve', 'Frank'],
  },
  {
    id: 3,
    title: 'Painting Workshop',
    date: 'June 20th, 2:00 PM',
    attendees: ['Grace', 'Heidi', 'Ivan'],
  },
];

const PreviousSessionsPage = () => {
  const [sessions, setSessions] = useState(mockPreviousSessions);

  const handleRepeatSession = (sessionId: number) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (session) {
      alert(`Repeating session: ${session.title}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Previous Sessions</h2>
      {sessions.length > 0 ? (
        <div className="space-y-6">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold mb-2">{session.title}</h3>
              <p className="text-gray-500 text-sm mb-4">{session.date}</p>
              <h4 className="font-medium">Attendees:</h4>
              <ul className="list-disc list-inside text-sm text-gray-700 mb-4">
                {session.attendees.map((attendee, index) => (
                  <li key={index}>{attendee}</li>
                ))}
              </ul>
              <button
                onClick={() => handleRepeatSession(session.id)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Repeat Session
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">
          No previous sessions to display.
        </p>
      )}
    </div>
  );
};

export default PreviousSessionsPage;
