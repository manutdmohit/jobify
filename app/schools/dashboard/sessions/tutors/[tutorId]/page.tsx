'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';

const TutorProfilePage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [students, setStudents] = useState<string[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');

  // Get today's date in the format YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  // Toggle time slot selection
  const toggleSlotSelection = (slot: string) => {
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  // Add student to the list
  const addStudent = () => {
    if (studentId.trim()) {
      setStudents((prev) => [...prev, studentId.trim()]);
      setStudentId('');
    }
  };

  // Submit data to the backend
  const handleSubmit = async () => {
    if (!date) {
      alert('Please select a date.');
      return;
    }
    if (selectedSlots.length === 0) {
      alert('Please select at least one time slot.');
      return;
    }

    const requestData = {
      date,
      duration: duration || 'Not specified',
      timeSlots: selectedSlots,
      students,
    };

    console.log(requestData);

    try {
      //   const response = await axios.post('/api/book-tutor', requestData);
      //   console.log('Booking confirmed:', response.data);

      alert('Booking confirmed successfully!');
      setStudents([]);
      setSelectedSlots([]);
      setDate('');
      setDuration('');
    } catch (error) {
      console.error('Error confirming booking:', error);
      alert('Failed to confirm booking.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Tutor Profile Card */}
      <Card className="p-4">
        <CardContent>
          <CardTitle className="text-2xl font-bold">Tutor Profile</CardTitle>
          <div className="mt-4 space-y-2">
            <div>
              <Label>Name:</Label>
              <p>John Doe</p>
            </div>
            <div>
              <Label>Address:</Label>
              <p>123 Main Street, Cityville</p>
            </div>
            <div>
              <Label>Qualifications:</Label>
              <p>PhD in Mathematics</p>
            </div>
            <div>
              <Label>Photo:</Label>
              <img
                src="https://via.placeholder.com/150"
                alt="Tutor"
                className="w-32 h-32 rounded-full object-cover"
              />
            </div>
            <div>
              <Label>Hourly Charges:</Label>
              <p>$50/hour</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Date Selection */}
      <Card className="p-4">
        <CardContent>
          <CardTitle className="text-lg font-bold">Select Date</CardTitle>
          <Input
            type="date"
            className="mt-2"
            min={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Duration Selection */}
      <Card className="p-4">
        <CardContent>
          <CardTitle className="text-lg font-bold">Select Duration</CardTitle>
          <Input
            type="text"
            placeholder="Enter duration (optional)"
            className="mt-2"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Available Time Slots */}
      <Card className="p-4">
        <CardContent>
          <CardTitle className="text-lg font-bold">
            Available Time Slots
          </CardTitle>
          <div className="mt-4 flex flex-wrap gap-2">
            {['4-4:30', '5-5:30', '5:30-6'].map((slot) => (
              <Button
                key={slot}
                variant={selectedSlots.includes(slot) ? 'default' : 'outline'}
                onClick={() => toggleSlotSelection(slot)}
                className={`${
                  selectedSlots.includes(slot) ? 'bg-blue-600 text-white' : ''
                }`}
              >
                {slot}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Select Students */}
      <Button
        onClick={() => setIsDialogOpen(true)}
        className=" bg-green-600 text-white hover:bg-green-700"
      >
        Select Interested Students
      </Button>

      {/* Dialog for Adding Students */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Students</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Enter Student ID"
              />
              <Button onClick={addStudent}>Add</Button>
            </div>
            <div className="mt-4">
              {students.length > 0 ? (
                <ul className="list-disc pl-4 space-y-2">
                  {students.map((student, index) => (
                    <li key={index}>{`Student ${index + 1}: ${student}`}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No students added yet.</p>
              )}
            </div>
            <Button
              onClick={() => {
                console.log('Confirmed Students:', students);
                setIsDialogOpen(false);
              }}
              className=" bg-blue-600 text-white hover:bg-blue-700"
            >
              Confirm Students
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <br />
      {/* Confirm Booking */}
      <Button
        onClick={handleSubmit}
        className=" bg-blue-600 text-white hover:bg-blue-700"
      >
        Confirm Booking
      </Button>
    </div>
  );
};

export default TutorProfilePage;
