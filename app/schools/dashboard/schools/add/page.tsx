'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import axios from 'axios';

// Define the school schema using zod for validation
const schoolSchema = z.object({
  name: z.string().min(1, 'School name is required').max(100, 'Name too long'),
  address: z.string().optional(),
  establishedYear: z
    .number()
    .int()
    .min(1800, 'Year must be after 1800')
    .max(new Date().getFullYear(), 'Year cannot be in the future')
    .optional(),
  contactEmail: z.string().email('Invalid email format').optional(),
  createdBy: z.string().optional(),
});

// Infer types from the schema
type SchoolFormValues = z.infer<typeof schoolSchema>;

const SchoolForm: React.FC = () => {
  const [submittedData, setSubmittedData] = useState<SchoolFormValues | null>(
    null
  );

  // Initialize the form using react-hook-form and zod resolver
  const form = useForm<SchoolFormValues>({
    resolver: zodResolver(schoolSchema),
    defaultValues: {
      name: '',
      address: '',
      establishedYear: undefined,
      contactEmail: '',
      createdBy: '',
    },
  });

  // Handle form submission
  const onSubmit = async (data: SchoolFormValues) => {
    setSubmittedData(data); // Optionally store submitted data

    try {
      // Send data to API using axios
      const response = await axios.post('/api/schools', data);
      console.log('API Response:', response.data);
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit form');
    }
  };

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Add School</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* School Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter school name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Required. Max length: 100 characters.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter address" {...field} />
                  </FormControl>
                  <FormDescription>Optional.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Established Year */}
            <FormField
              control={form.control}
              name="establishedYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Established Year</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="e.g., 2000"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10))
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Optional. Year must be between 1800 and the current year.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Contact Email */}
            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., school@email.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Optional. Must be a valid email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Created By */}
            <FormField
              control={form.control}
              name="createdBy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Created By</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter creator's name" {...field} />
                  </FormControl>
                  <FormDescription>Optional.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>

      {/* Display Submitted Data */}
      {submittedData && (
        <CardFooter>
          <div className="bg-green-50 p-4 rounded-md w-full">
            <h3 className="font-bold">Submitted Data:</h3>
            <pre className="text-sm">
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default SchoolForm;
