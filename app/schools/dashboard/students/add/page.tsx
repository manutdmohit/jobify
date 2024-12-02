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
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const studentSchema = z.object({
  name: z.string().min(1, 'Student name is required').max(100, 'Name too long'),
  email: z.string().email('Invalid email format').optional(),
  password: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  isVerified: z.boolean().optional(),
});

type StudentType = z.infer<typeof studentSchema>;

const StudentForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const form = useForm<StudentType>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      isVerified: false,
    },
  });

  const onSubmit = async (data: StudentType) => {
    try {
      setLoading(true);

      const response = await axios.post('/api/students', data);

      console.log({ response });

      form.reset();
      toast({
        title: 'Success',
        description: 'Student added successfully!',
        variant: 'success',
      });

      router.push('/schools/dashboard/students');
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Error',
        // description: 'Failed to create student. Please try again. Error: ' + error.data.message,
        description:
          error.response.data.message ||
          'Failed to create student. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 my-10">
      <Card className="w-full max-w-6xl mx-auto flex flex-col justify-center items-center p-6 sm:p-8 lg:p-12">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Add Student
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter student name" {...field} />
                    </FormControl>
                    <FormDescription>
                      Required. Max length: 100 characters.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email" {...field} />
                    </FormControl>
                    <FormDescription>
                      Must be a valid email address.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <PhoneInput
                        country={'in'}
                        value={field.value || ''}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription>Enter your phone number.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter address" {...field} />
                    </FormControl>
                    <FormDescription>Optional field.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-1 sm:col-span-2">
                <Button type="submit" disabled={loading} className="w-auto">
                  {loading ? 'Submitting...' : 'Submit'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentForm;
