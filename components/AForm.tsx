'use client';

import { useState } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  personalInfoSchema,
  educationSchema,
  skillsSchema,
  CombinedFormData,
} from '@/schemas/schemas';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

type Step = 0 | 1 | 2; // Define the possible steps

function MultiStepForm() {
  const router = useRouter();
  const { toast } = useToast();

  const [step, setStep] = useState<Step>(0);
  const [formData, setFormData] = useState<Partial<CombinedFormData>>({});

  const formSchemas = [personalInfoSchema, educationSchema, skillsSchema];
  const currentSchema = formSchemas[step];

  const formMethods = useForm<CombinedFormData>({
    resolver: zodResolver(currentSchema),
    defaultValues: formData, // Persist data across steps
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  const onNext: SubmitHandler<CombinedFormData> = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => (prev + 1) as Step);
  };

  const onPrevious = () => {
    setStep((prev) => (prev - 1) as Step);
  };

  const onSubmit: SubmitHandler<CombinedFormData> = (data) => {
    const finalData = { ...formData, ...data };
    console.log('Final Submission Data: ', finalData);

    toast({
      title: 'Success',
      description: 'Your form has been submitted successfully.',
    });

    // Reset the form and then navigate
    formMethods.reset();
    setStep(0);

    router.push('/');
  };

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(
          step < formSchemas.length - 1 ? onNext : onSubmit
        )}
        className="flex flex-col gap-4 min-h-screen items-center justify-center max-w-7xl mx-auto p-6 bg-gray-100"
      >
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Application Form</CardTitle>
            <CardDescription>
              {step === 0
                ? 'Fill out your personal information'
                : step === 1
                ? 'Enter your educational details'
                : 'Add your skills'}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {step === 0 && (
              <div className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold">Personal Information</h2>
                <FormField
                  control={formMethods.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your Full Name"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formMethods.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="john@doe.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formMethods.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your Address"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formMethods.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your Phone Number"
                          type="tel"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === 1 && (
              <div className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold">Education</h2>
                <FormField
                  control={formMethods.control}
                  name="degree"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Degree</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your Degree"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formMethods.control}
                  name="institution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Institution</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your Institution"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formMethods.control}
                  name="yearOfGraduation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year of Graduation</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Year of Graduation"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold">Skills</h2>
                <FormField
                  control={formMethods.control}
                  name="classroomManagement"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          // onCheckedChange={handleCheckboxChange(field.onChange)} // Correctly handle checkbox state change
                        />
                      </FormControl>
                      <FormLabel>Classroom Management</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={formMethods.control}
                  name="lessonPlanning"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          // onCheckedChange={handleCheckboxChange(field.onChange)}
                        />
                      </FormControl>
                      <FormLabel>Lesson Planning</FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={formMethods.control}
                  name="assessmentTechniques"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          // onCheckedChange={handleCheckboxChange(field.onChange)}
                        />
                      </FormControl>
                      <FormLabel>Assessment Techniques</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between">
            {step > 0 && (
              <Button type="button" onClick={onPrevious}>
                Previous
              </Button>
            )}
            {step < formSchemas.length - 1 ? (
              <Button type="button" onClick={handleSubmit(onNext)}>
                Next
              </Button>
            ) : (
              <Button type="submit">Submit</Button>
            )}
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
}

export default MultiStepForm;
