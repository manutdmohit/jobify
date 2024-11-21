'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

type Student = {
  id: string;
  name: string;
};

// Mock Data for Students
const mockStudents: Student[] = [
  { id: '101', name: 'Alice Johnson' },
  { id: '102', name: 'Bob Smith' },
  { id: '103', name: 'Charlie Brown' },
  { id: '104', name: 'Daisy Williams' },
];

export default function TutorProfilePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
  const [foundStudent, setFoundStudent] = useState<Student | null>(null);

  // Open the dialog
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  // Close the dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSearchTerm('');
    setFoundStudent(null);
  };

  // Handle search for student
  const handleSearch = () => {
    const student = mockStudents.find((s) => s.id === searchTerm.trim());
    setFoundStudent(student || null);
    if (!student) {
      toast({
        title: 'Student not found',
        description: 'Please check the ID and try again.',
        variant: 'destructive',
      });
    }
  };

  // Add student to the selected list
  const handleAddStudent = () => {
    if (
      foundStudent &&
      !selectedStudents.some((s) => s.id === foundStudent.id)
    ) {
      setSelectedStudents([...selectedStudents, foundStudent]);
      setFoundStudent(null);
      setSearchTerm('');
    }
  };

  // Handle Confirm Booking
  const handleConfirmBooking = () => {
    if (selectedStudents.length > 0) {
      const studentNames = selectedStudents.map((s) => s.name).join(', ');
      toast({
        title: 'Booking Confirmed',
        description: `Students: ${studentNames}`,
        variant: 'success',
      });
      setSelectedStudents([]);
      handleCloseDialog();
    } else {
      toast({
        title: 'No students selected',
        description: 'Please add students before confirming.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="p-4">
      {/* Tutor Profile Information */}
      <h1 className="text-2xl font-bold mb-4">Tutor Profile</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">John Doe</h2>
        <p>Skills: Mathematics, Physics, Chemistry</p>
        <p>Class Timings:</p>
        <ul className="list-disc pl-6">
          <li>Monday: 7:00 AM, 11:00 AM</li>
          <li>Wednesday: 8:00 AM, 2:00 PM</li>
          <li>Friday: 10:00 AM, 4:00 PM</li>
        </ul>
      </div>

      {/* Select Interested Students Button */}
      <Button
        onClick={handleOpenDialog}
        className="bg-blue-600 text-white hover:bg-blue-700"
      >
        Select Interested Students
      </Button>

      {/* Dialog (Modal) for Selecting Students */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Interested Students</DialogTitle>
          </DialogHeader>

          {/* Search Input for Students */}
          <div className="my-4">
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700"
            >
              Search Student by ID
            </label>
            <div className="flex items-center space-x-2 mt-1">
              <Input
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter Student ID"
                className="w-full"
              />
              <Button
                onClick={handleSearch}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                Search
              </Button>
            </div>
          </div>

          {/* Found Student */}
          {foundStudent && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <p>
                <strong>ID:</strong> {foundStudent.id}
              </p>
              <p>
                <strong>Name:</strong> {foundStudent.name}
              </p>
              <Button
                onClick={handleAddStudent}
                className="mt-2 bg-green-500 text-white hover:bg-green-600"
              >
                Add
              </Button>
            </div>
          )}

          {/* Selected Students */}
          {selectedStudents.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Selected Students:</h3>
              <ul className="list-disc pl-6">
                {selectedStudents.map((student) => (
                  <li key={student.id}>
                    {student.name} ({student.id})
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Dialog Footer with Confirm Button */}
          <DialogFooter>
            <Button onClick={handleCloseDialog} className="mr-2">
              Cancel
            </Button>
            <Button
              onClick={handleConfirmBooking}
              className="bg-green-600 text-white hover:bg-green-700"
            >
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
