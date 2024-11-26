'use client';

import React, { useEffect, useState } from 'react';
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
import axios, { AxiosError } from 'axios';
import { toast } from '@/components/ui/use-toast';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

// Extended schema for the form
const schoolSchema = z.object({
  name: z.string().min(1, 'School name is required').max(200, 'Name too long'),
  address: z.string().optional(),
  establishedYear: z
    .number()
    .int()
    .min(1800, 'Year must be after 1800')
    .max(new Date().getFullYear(), 'Year cannot be in the future')
    .optional(),
  contactEmail: z.string().email('Invalid email format').optional(),
  contactPhone: z.string().regex(/^\d+$/, 'Invalid Number!'), // Validating phone number
  website: z.string().optional(), // Validating URL format
  principalName: z.string().optional(),
  schoolType: z
    .enum(['Primary', 'Secondary', 'High School', 'College'])
    .optional(),
  isVerified: z.boolean(),
  createdBy: z.string().optional(), // Optional user who created the school
});

type SchoolFormValues = z.infer<typeof schoolSchema>;

const SchoolForm: React.FC = () => {
  const params = useParams();
  const schoolId = params.id;

  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  const form = useForm<SchoolFormValues>({
    resolver: zodResolver(schoolSchema),
    defaultValues: {
      name: '',
      address: '',
      establishedYear: undefined,
      contactEmail: '',
      contactPhone: '',
      website: '',
      principalName: '',
      schoolType: undefined,
      isVerified: false,
    },
  });

  // Fetch school data for editing
  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        const response = await axios.get(`/api/schools/${schoolId}`);
        const schoolData = response.data;

        form.reset({
          name: schoolData.name,
          address: schoolData.address,
          establishedYear: schoolData.establishedYear,
          contactEmail: schoolData.contactEmail,
          contactPhone: schoolData.contactPhone,
          website: schoolData.website,
          principalName: schoolData.principalName,
          schoolType: schoolData.schoolType,
          isVerified: schoolData.isVerified,
        });
      } catch (error) {
        console.error('Error fetching school data:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch school data.',
          variant: 'destructive',
        });
      }
    };

    fetchSchoolData();
  }, [form]);

  const onSubmit = async (data: SchoolFormValues) => {
    try {
      setLoading(true);

      // Update school data via API
      if (schoolId) {
        const response = await axios.put(`/api/schools/${schoolId}`, data);

        console.log('API Response:', response.data);

        form.reset();

        toast({
          title: 'Success',
          description: 'School data updated successfully!',
          variant: 'success',
        });

        router.push('/admin/dashboard/schools');
      } else {
        throw new Error('School ID is missing.');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data || error.message);
        toast({
          title: 'Error',
          description:
            error.response?.data?.message || 'Failed to update school data.',
          variant: 'destructive',
        });
      } else {
        console.error('Unexpected error:', error);
        toast({
          title: 'Error',
          description: 'Something went wrong while updating the school data.',
          variant: 'destructive',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 my-10">
      <Card className="w-full max-w-6xl mx-auto flex flex-col justify-center items-center p-6 sm:p-8 lg:p-12">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Edit School
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 lg:gap-10"
            >
              {/* All fields remain the same */}

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
                    <FormDescription>Must be a valid email.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Number */}
              <FormField
                control={form.control}
                name="contactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="e.g., 1234567890"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Optional. 10-digit phone number.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Website */}
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="e.g., https://schoolwebsite.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Optional. Must be a valid URL.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Principal Name */}
              <FormField
                control={form.control}
                name="principalName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Principal Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter principal name" {...field} />
                    </FormControl>
                    <FormDescription>Optional.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* School Type */}
              <FormField
                control={form.control}
                name="schoolType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School Type</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter school type" {...field} />
                    </FormControl>
                    <FormDescription>
                      Optional. Choose from Primary, Secondary, High School, or
                      College.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="col-span-1 sm:col-span-2">
                <Button
                  type="submit"
                  className="w-full max-w-xs"
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchoolForm;
