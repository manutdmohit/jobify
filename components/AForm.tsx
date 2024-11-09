'use client';

import { useState } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  personalInfoSchema,
  educationSchema,
  skillsSchema,
  CombinedFormData,
  completeReferenceSchema,
} from '@/schemas/schemas';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

function MultiStepFormWithTabs() {
  const router = useRouter();
  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<CombinedFormData>>({
    references: [
      { name: '', title: '', organization: '', contactInfo: '' },
      { name: '', title: '', organization: '', contactInfo: '' },
    ],
  });

  const formSchemas = [
    personalInfoSchema,
    educationSchema,
    skillsSchema,
    completeReferenceSchema,
  ];
  const formMethods = useForm<CombinedFormData>({
    resolver: zodResolver(formSchemas[currentStep]),
    defaultValues: formData, // check here
  });
  0;

  // Get Form Values
  const formValues = formMethods.getValues();

  // Access the field values directly
  const fullName = formValues.fullName;
  const email = formValues.email;
  const phone = formValues.phone;

  const validity = !fullName || !email || !phone ? false : true;

  const onSubmit: SubmitHandler<CombinedFormData> = async (data) => {
    const finalData = { ...formData, ...data };
    console.log('Final Submission Data: ', finalData);

    toast({
      title: 'Success',
      description: 'Your action was successful.',
    });

    formMethods.reset();
    router.push('/');
    setCurrentStep(0);
  };

  const handleNext = async () => {
    const isValid = await formMethods.trigger(); // Manually trigger validation

    if (isValid && currentStep < formSchemas.length - 1) {
      setFormData((prev) => ({ ...prev, ...formMethods.getValues() })); // Update formData with valid values
      setCurrentStep((prev) => prev + 1); // Move to next step
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setFormData((prev) => ({ ...prev, ...formMethods.getValues() }));
      setCurrentStep((prev) => prev - 1);
    }
  };

  const isLastStep = currentStep === formSchemas.length - 1;

  return (
    <FormProvider {...formMethods}>
      <Tabs
        value={`step${currentStep}`}
        onValueChange={(value) =>
          setCurrentStep(Number(value.replace('step', '')))
        }
        className="flex flex-col gap-4 min-h-screen items-center justify-center max-w-full mx-auto p-6 bg-gray-100"
      >
        <Card className="w-full max-w-7xl my-5">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardHeader>
              <CardTitle>Application Form</CardTitle>
            </CardHeader>
          </motion.div>

          <div className="overflow-x-auto">
            <TabsList className="gap-1 md:gap-4 whitespace-nowrap">
              <TabsTrigger value="step0">Personal Info</TabsTrigger>
              <TabsTrigger value="step1">Education</TabsTrigger>
              <TabsTrigger value="step2">Skills</TabsTrigger>
              <TabsTrigger value="step3">References</TabsTrigger>
              <TabsTrigger value="step4">Test</TabsTrigger>
            </TabsList>
          </div>

          <CardContent>
            <TabsContent value="step0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-4"
              >
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
                      <FormDescription>Provide your full name</FormDescription>
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
                      <FormDescription>
                        Provide your email address
                      </FormDescription>
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
                      <FormDescription>Provide your address</FormDescription>
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
                      <FormDescription>
                        Provide your phone number
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <h2>Please fill all the necessary fields</h2>
              </motion.div>
            </TabsContent>

            <TabsContent value="step1">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-4"
              >
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
                      <FormLabel>Graduation Year</FormLabel>
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
              </motion.div>
            </TabsContent>

            <TabsContent value="step2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-4"
              >
                <h2 className="text-lg font-semibold">Skills</h2>
                <FormField
                  control={formMethods.control}
                  name="classroomManagement"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
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
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Communication</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={formMethods.control}
                  name="curriculumDevelopment"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Curriculum Development</FormLabel>
                    </FormItem>
                  )}
                />
              </motion.div>
            </TabsContent>

            <TabsContent value="step3">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-4"
              >
                <h2 className="text-lg font-semibold">References</h2>

                {formMethods.getValues().references.map((_, index) => (
                  <div key={index} className="mb-4">
                    <h4 className="font-semibold">Reference {index + 1}</h4>

                    <FormField
                      control={formMethods.control}
                      name={`references.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name:</FormLabel>
                          <FormControl>
                            <Input placeholder="Reference Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={formMethods.control}
                      name={`references.${index}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title/Position:</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Reference Title/Position"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={formMethods.control}
                      name={`references.${index}.organization`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Organization:</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Reference Organization"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={formMethods.control}
                      name={`references.${index}.contactInfo`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Information:</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Reference Contact Information"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}

                {/* <FormField
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
                      <FormLabel>Graduation Year</FormLabel>
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
                /> */}
              </motion.div>
            </TabsContent>
          </CardContent>

          <CardFooter className="flex justify-between">
            {currentStep > 0 && <Button onClick={handlePrev}>Previous</Button>}
            {!isLastStep ? (
              <Button onClick={handleNext}>Next</Button>
            ) : (
              <Button
                onClick={formMethods.handleSubmit(onSubmit)}
                disabled={!validity}
              >
                Submit
              </Button>
            )}
          </CardFooter>
        </Card>
      </Tabs>
    </FormProvider>
  );
}

export default MultiStepFormWithTabs;
