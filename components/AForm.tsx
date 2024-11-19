'use client';

import { useState, useRef } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import {
  personalInfoSchema,
  educationSchema,
  skillsSchema,
  certificationsSchema,
  completeReferenceSchema,
  sopSchema,
  CombinedFormData,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  User,
  Book,
  Award,
  FileText,
  Users,
  FileCheck,
  X,
  Loader2,
} from 'lucide-react';

function MultiStepFormWithTabs() {
  const router = useRouter();
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<CombinedFormData>>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    degree: '',
    jobPreference: '',
    institution: '',
    yearOfGraduation: '',
    teachingSkills: {
      classroomManagement: false,
      lessonPlanning: false,
      curriculumDevelopment: false,
      assessmentTechniques: false,
      otherTeachingSkills: '',
    },
    culturalKnowledge: {
      knowledgeOfSpecifiCulturesOrTraditions: false,
      abilityToTeachCulturalValuesAndPerspectives: false,
      fluencyInLanguages: false,
      languageDetails: '',
      otherCulturalKnowledge: '',
    },
    interPersonalSkills: {
      communicationSkills: false,
      empathy: false,
      patience: false,
      culturalSensitivity: false,
      otherInterpersonalSkills: '',
    },
    references: [
      { name: '', title: '', organization: '', contactInfo: '' },
      { name: '', title: '', organization: '', contactInfo: '' },
    ],
    certifications: [
      {
        certificationName: '',
        certifyingOrganization: '',
        yearOfCertification: '',
      },
      {
        certificationName: '',
        certifyingOrganization: '',
        yearOfCertification: '',
      },
    ],
    statementOfPurpose: '',
  });

  const formSchemas = [
    personalInfoSchema,
    educationSchema,
    skillsSchema,
    sopSchema,
    completeReferenceSchema,
    certificationsSchema,
  ];
  const formMethods = useForm<CombinedFormData>({
    resolver: zodResolver(formSchemas[currentStep]),
    defaultValues: formData, // check here
  });

  // // Sync file data with form state when going to next step or submitting
  // useEffect(() => {
  //   formMethods.setValue('ppPhoto', fileData.ppPhoto);
  //   formMethods.setValue('identityPhoto', fileData.identityPhoto);
  // }, [fileData, formMethods]);

  // Get Form Values
  const formValues = formMethods.getValues();

  // Access the field values directly
  const fullName = formValues.fullName;
  const email = formValues.email;
  const phone = formValues.phone;
  const address = formValues.address;
  const jobPreference = formValues.jobPreference;
  const sop = formValues.statementOfPurpose;

  // Access nested field values
  const classroomManagement = formValues.teachingSkills?.classroomManagement;
  const lessonPlanning = formValues.teachingSkills?.lessonPlanning;
  const curriculumDevelopment =
    formValues.teachingSkills?.curriculumDevelopment;
  const otherTeachingSkills = formValues.teachingSkills?.otherTeachingSkills;

  const knowledgeOfSpecificCultures =
    formValues.culturalKnowledge?.knowledgeOfSpecifiCulturesOrTraditions;
  const fluencyInLanguages = formValues.culturalKnowledge?.fluencyInLanguages;
  const abilityToTeachCulturalValuesAndPerspectives =
    formValues.culturalKnowledge?.abilityToTeachCulturalValuesAndPerspectives;
  const languageDetails = formValues.culturalKnowledge?.languageDetails;

  const otherCulturalKnowledge =
    formValues.culturalKnowledge?.otherCulturalKnowledge;

  const communicationSkills =
    formValues.interPersonalSkills?.communicationSkills;
  const empathy = formValues.interPersonalSkills?.empathy;
  const patience = formValues.interPersonalSkills?.patience;
  const culturalSensitivity =
    formValues.interPersonalSkills?.culturalSensitivity;
  const otherInterpersonalSkills =
    formValues.interPersonalSkills?.otherInterpersonalSkills;

  // Check validity of personal info
  const personalInfoValidity =
    fullName && email && phone && address && jobPreference;

  // Check validity of Teaching Skills
  const teachingSkillsValidity =
    classroomManagement ||
    lessonPlanning ||
    curriculumDevelopment ||
    Boolean(otherTeachingSkills);

  // Check validity of Cultural Knowledge
  const culturalKnowledgeValidity =
    Boolean(knowledgeOfSpecificCultures) ||
    Boolean(abilityToTeachCulturalValuesAndPerspectives) ||
    (fluencyInLanguages && Boolean(languageDetails)) ||
    Boolean(otherCulturalKnowledge);

  // Check validity of Interpersonal Skills
  const interpersonalSkillsValidity =
    communicationSkills ||
    empathy ||
    patience ||
    culturalSensitivity ||
    Boolean(otherInterpersonalSkills);

  // Check validity of all skills
  const isSkillsValid =
    teachingSkillsValidity &&
    culturalKnowledgeValidity &&
    interpersonalSkillsValidity;

  // Check validity of all the required fields
  const validity = personalInfoValidity && sop.length >= 50 && isSkillsValid;

  const onSubmit: SubmitHandler<CombinedFormData> = async (data) => {
    setIsSubmitting(true);
    console.log('data', data);

    try {
      const finalData = { ...formData, ...data };
      console.log('Final Submission Data: ', finalData);

      toast({
        title: 'Success',
        description: 'Your action was successful.',
        variant: 'success',
      });

      formMethods.reset();

      // Reset file data and file name in the state
      setFileData({ ppPhoto: null, identityPhoto: null });
      setFileName({ ppPhoto: null, identityPhoto: null });

      // Reset the native file input value
      if (ppPhotoInputRef.current) ppPhotoInputRef.current.value = '';
      if (identityPhotoInputRef.current)
        identityPhotoInputRef.current.value = '';

      setCurrentStep(0);
      router.push('/');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
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

  const [isLanguageChecked, setIsLanguageChecked] = useState<boolean>(false);

  // Handler to clear teaching skills error on checkbox change
  const handleTeachingSkillsCheckboxChange =
    (fieldOnChange: any) => (value: boolean) => {
      fieldOnChange(value);
      formMethods.clearErrors('teachingSkills'); // Clears the error when any checkbox changes
    };

  // Handler to clear cultural knowledge error on checkbox change
  const handleCulturalKnowledgeCheckboxChange =
    (fieldOnChange: any) => (value: boolean) => {
      fieldOnChange(value);
      formMethods.clearErrors('culturalKnowledge'); // Clears the error when any checkbox changes
    };

  // Handler to clear interpersonal skill error on checkbox change
  const handleInterpersonalSkillCheckboxChange =
    (fieldOnChange: any) => (value: boolean) => {
      fieldOnChange(value);
      formMethods.clearErrors('interPersonalSkills'); // Clears the error when any checkbox changes
    };

  const [fileData, setFileData] = useState<{
    ppPhoto: string | null;
    identityPhoto: string | null;
  }>({
    ppPhoto: null,
    identityPhoto: null,
  });

  const [fileName, setFileName] = useState<{
    ppPhoto: string | null;
    identityPhoto: string | null;
  }>({
    ppPhoto: null,
    identityPhoto: null,
  });

  // Refs to handle file input reset
  const ppPhotoInputRef = useRef<HTMLInputElement>(null);
  const identityPhotoInputRef = useRef<HTMLInputElement>(null);

  // Convert the selected file to base64
  const convertToBase64 = (file: File | null): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      if (!file) return resolve(null);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // Function to handle clearing the file input
  // const resetFileInput = () => {
  //   if (ppPhotoInputRef.current) ppPhotoInputRef.current.value = '';
  //   if (identityPhotoInputRef.current) identityPhotoInputRef.current.value = '';
  // };

  const handleRemovePPImage = () => {
    setFormData((prev) => ({ ...prev, ppPhoto: null })); // Update form data
    setFileData((prev) => ({ ...prev, ppPhoto: null })); // Update file data
    setFileName((prev) => ({ ...prev, ppPhoto: null }));

    formMethods.setValue('ppPhoto', '');

    if (ppPhotoInputRef.current) ppPhotoInputRef.current.value = ''; // Reset the file input
  };
  const handleRemoveIdentityPhoto = () => {
    setFormData((prev) => ({ ...prev, identityPhoto: '' })); // Update form data
    setFileData((prev) => ({ ...prev, identityPhoto: '' })); // Update file data
    setFileName((prev) => ({ ...prev, identityPhoto: '' }));

    // Set the value to empty string
    formMethods.setValue('identityPhoto', '');

    if (identityPhotoInputRef.current) identityPhotoInputRef.current.value = ''; // Reset the file input
  };

  return (
    <FormProvider {...formMethods}>
      <Tabs
        value={`step${currentStep}`}
        onValueChange={(value) => {
          // Save current form data when a tab is clicked
          setFormData((prev) => ({
            ...prev,
            ...formMethods.getValues(), // Merges current form values into formData
          }));
          // Update the current step based on the clicked tab
          setCurrentStep(Number(value.replace('step', '')));
        }}
        className="flex flex-col gap-4 min-h-screen items-center justify-center max-w-full mx-auto p-6 bg-gray-100"
      >
        <Card className="w-full max-w-7xl my-5 min-h-[1056px] md:min-h-screen">
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
            <TabsList className="whitespace-nowrap bg-purple-700 text-white font-bold">
              <TabsTrigger value="step0">
                <User className="inline-block mr-2" size={18} />
                <span className="text-xs">Personal Info</span>
              </TabsTrigger>
              <TabsTrigger value="step1">
                <Book className="inline-block mr-2" size={18} />
                <span className="text-xs">Education</span>
              </TabsTrigger>
              <TabsTrigger value="step2">
                <Award className="inline-block mr-2" size={18} />
                <span className="text-xs">Skills and Abilities</span>
              </TabsTrigger>
              <TabsTrigger value="step3">
                <FileText className="inline-block mr-2" size={18} />
                <span className="text-xs">Statement of Purpose</span>
              </TabsTrigger>
              <TabsTrigger value="step4">
                <Users className="inline-block mr-2" size={18} />
                <span className="text-xs">References</span>
              </TabsTrigger>
              <TabsTrigger value="step5">
                <FileCheck className="inline-block mr-2" size={18} />
                <span className="text-xs">Certifications</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <CardContent>
            {/* Personal Information */}
            <TabsContent value="step0" className="">
              <AnimatePresence mode="wait">
                <motion.div
                  key="step0" // Set a unique key for each step to help with transition
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col gap-4"
                >
                  <h2 className="text-lg font-semibold">
                    Personal Information
                  </h2>

                  <div className="grid md:grid-cols-3">
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
                          <FormDescription>
                            Provide your full name
                          </FormDescription>
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

                    {/* <FormField
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
                    /> */}

                    <FormField
                      control={formMethods.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <PhoneInput
                              country={'in'} // Default country code
                              value={field.value} // Connect to form value
                              onChange={(value) => field.onChange(value)} // Update form value on change
                              inputProps={{
                                name: field.name,
                                required: true,
                                autoFocus: true,
                              }}
                            />
                          </FormControl>
                          <FormDescription>
                            Provide your phone number
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-3">
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
                          <FormDescription>
                            Provide your address
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={formMethods.control}
                      name="jobPreference"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Preference</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="text-xs md:w-2/3">
                                <SelectValue
                                  placeholder="Select a a job preference"
                                  className="md:w-2/3"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="schools">Schools</SelectItem>
                              <SelectItem value="events">Events</SelectItem>
                              <SelectItem value="homeTutor">
                                Home Tutor
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Please provide your job preference
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2">
                    <div>
                      <FormField
                        control={formMethods.control}
                        name="ppPhoto"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Photo</FormLabel>
                            <FormControl>
                              <div className="flex items-center space-x-2">
                                {/* Hidden File Input */}
                                <input
                                  ref={ppPhotoInputRef}
                                  type="file"
                                  accept=".jpg,.jpeg,.png"
                                  className="hidden"
                                  onChange={async (e) => {
                                    const file = e.target.files?.[0] || null;
                                    const base64 = await convertToBase64(file);

                                    setFileData((prev) => ({
                                      ...prev,
                                      ppPhoto: base64,
                                    }));
                                    setFileName((prev) => ({
                                      ...prev,
                                      ppPhoto: file ? file.name : null,
                                    }));

                                    field.onChange(file?.name); // Pass file name to form state
                                  }}
                                />

                                {/* Custom Label to Display File Name */}
                                <span className="text-sm">
                                  {fileName.ppPhoto || 'No file chosen'}
                                </span>

                                {/* Custom Button to Trigger File Input */}
                                <Button
                                  type="button"
                                  className="border rounded text-white"
                                  size="sm"
                                  onClick={() =>
                                    ppPhotoInputRef.current?.click()
                                  }
                                >
                                  Choose File
                                </Button>
                              </div>
                            </FormControl>
                            <FormDescription>
                              Upload Your PP Size Photo
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Display image preview */}
                      {fileData.ppPhoto && (
                        <div className="relative mt-4 inline-block">
                          <Image
                            src={fileData.ppPhoto}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-md"
                            width={128}
                            height={128}
                          />

                          {/* X Icon for Removing Image */}
                          <button
                            onClick={handleRemovePPImage}
                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
                            aria-label="Remove Image"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                      {formMethods.getValues('ppPhoto') === '' && (
                        <span className="text-destructive">
                          Please upload a profile photo
                        </span>
                      )}
                    </div>
                    <div>
                      {/* Identity Photo */}
                      <FormField
                        control={formMethods.control}
                        name="identityPhoto"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Your Identity Photo (E.g. Passport, Citizenship,
                              Driving License)
                            </FormLabel>
                            <FormControl>
                              <div className="flex items-center space-x-2">
                                {/* Hidden File Input */}
                                <input
                                  ref={identityPhotoInputRef}
                                  type="file"
                                  accept=".jpg,.jpeg,.png"
                                  className="hidden"
                                  onChange={async (e) => {
                                    const file = e.target.files?.[0] || null;
                                    const base64 = await convertToBase64(file);

                                    setFileData((prev) => ({
                                      ...prev,
                                      identityPhoto: base64,
                                    }));
                                    setFileName((prev) => ({
                                      ...prev,
                                      identityPhoto: file ? file.name : null,
                                    }));

                                    field.onChange(file?.name); // Pass file name to form state
                                  }}
                                />

                                {/* Custom Label to Display File Name */}
                                <span className="text-sm">
                                  {fileName.identityPhoto || 'No file chosen'}
                                </span>

                                {/* Custom Button to Trigger File Input */}
                                <Button
                                  type="button"
                                  className="border rounded text-white"
                                  size="sm"
                                  onClick={() =>
                                    identityPhotoInputRef.current?.click()
                                  }
                                >
                                  Choose File
                                </Button>
                              </div>
                            </FormControl>
                            <FormDescription>
                              Upload Your Identity Photo
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Display image preview */}
                      {fileData.identityPhoto && (
                        <div className="relative mt-4 inline-block">
                          <Image
                            src={fileData.identityPhoto}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-md"
                            width={128}
                            height={128}
                          />

                          {/* X Icon for Removing Image */}
                          <button
                            onClick={handleRemoveIdentityPhoto}
                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
                            aria-label="Remove Image"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                    {formMethods.getValues('identityPhoto') === '' && (
                      <span className="text-destructive">
                        Please upload your identity photo
                      </span>
                    )}
                  </div>

                  <span className="text-sm text-destructive font-bold">
                    Please fill all the necessary fields*
                  </span>
                </motion.div>
              </AnimatePresence>
            </TabsContent>

            {/* Education */}
            <TabsContent value="step1" className="">
              <AnimatePresence mode="wait">
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
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
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a a degree" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Not Applicable">
                              {' '}
                              Not Applicable{' '}
                            </SelectItem>
                            <SelectItem value="Master's Degree">
                              Master's Degree
                            </SelectItem>
                            <SelectItem value="Bachelor's Degree">
                              Bachelor's Degree
                            </SelectItem>
                            <SelectItem value="10+2">10+2</SelectItem>
                          </SelectContent>
                        </Select>
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
                            placeholder="Your Institution Name"
                            type="text"
                            className="md:w-1/3"
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
                    render={({ field }) => {
                      // Generate an array of years from the current year down to 1980
                      const currentYear = new Date().getFullYear();
                      const years = Array.from(
                        { length: currentYear - 1980 + 1 },
                        (_, i) => currentYear - i
                      );

                      return (
                        <FormItem>
                          <FormLabel>Year of Graduation</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select year" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {years.map((year) => (
                                <SelectItem key={year} value={year.toString()}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            </TabsContent>

            {/* Skills and Abilities */}
            <TabsContent value="step2" className="grid md:grid-cols-3 ">
              {/* Teaching Skills */}
              <AnimatePresence mode="wait">
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col mb-4 gap-4"
                >
                  <h2 className="text-lg font-semibold">Teaching Skills</h2>
                  <FormField
                    control={formMethods.control}
                    name="teachingSkills.classroomManagement"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            className="mt-2"
                            checked={field.value}
                            onCheckedChange={handleTeachingSkillsCheckboxChange(
                              field.onChange
                            )}
                          />
                        </FormControl>
                        <FormLabel>Classroom Management</FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formMethods.control}
                    name="teachingSkills.lessonPlanning"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            className="mt-2"
                            checked={field.value}
                            onCheckedChange={handleTeachingSkillsCheckboxChange(
                              field.onChange
                            )}
                          />
                        </FormControl>
                        <FormLabel>Communication</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formMethods.control}
                    name="teachingSkills.curriculumDevelopment"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            className="mt-2"
                            checked={field.value}
                            onCheckedChange={handleTeachingSkillsCheckboxChange(
                              field.onChange
                            )}
                          />
                        </FormControl>
                        <FormLabel>Curriculum Development</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formMethods.control}
                    name="teachingSkills.assessmentTechniques"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            className="mt-2"
                            checked={field.value}
                            onCheckedChange={handleTeachingSkillsCheckboxChange(
                              field.onChange
                            )}
                          />
                        </FormControl>
                        <FormLabel>Assessment Techniques</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formMethods.control}
                    name="teachingSkills.otherTeachingSkills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>If any other, please mention:</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Other Teaching Skills"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Display error message if there is a validation error */}
                  {formMethods.formState.errors.teachingSkills?.root
                    ?.message && (
                    <span className="text-destructive">
                      {
                        formMethods.formState.errors.teachingSkills.root
                          ?.message
                      }
                    </span>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Cultural Knowledge Section  */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col mb-4 gap-4"
              >
                <h2 className="text-lg font-semibold">Cultural Knowledge</h2>
                <FormField
                  control={formMethods.control}
                  name="culturalKnowledge.knowledgeOfSpecifiCulturesOrTraditions"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          className="mt-2"
                          checked={field.value}
                          onCheckedChange={(checked: boolean) => {
                            handleCulturalKnowledgeCheckboxChange(
                              field.onChange
                            )(checked);
                          }}
                        />
                      </FormControl>
                      <FormLabel>
                        Knowledge of Specific Cultures or Traditions
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={formMethods.control}
                  name="culturalKnowledge.abilityToTeachCulturalValuesAndPerspectives"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          className="mt-2"
                          checked={field.value}
                          onCheckedChange={(checked: boolean) => {
                            handleCulturalKnowledgeCheckboxChange(
                              field.onChange
                            )(checked);
                          }}
                        />
                      </FormControl>
                      <FormLabel>
                        Ability to Teach Cultural Values and Perspectives
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={formMethods.control}
                  name="culturalKnowledge.fluencyInLanguages"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          className="mt-2"
                          checked={field.value}
                          onCheckedChange={(checked: boolean) => {
                            handleCulturalKnowledgeCheckboxChange(
                              field.onChange
                            )(checked);
                            setIsLanguageChecked(checked);
                            // Use setValue to update the languageDetails field when unchecked
                            if (!checked) {
                              formMethods.setValue(
                                'culturalKnowledge.languageDetails',
                                ' '
                              );
                            }
                          }}
                        />
                      </FormControl>
                      <FormLabel>
                        Fluency in Languages (if applicable)
                      </FormLabel>
                    </FormItem>
                  )}
                />

                {/* Conditional Language Details Input */}
                {isLanguageChecked && (
                  <FormField
                    control={formMethods.control}
                    name="culturalKnowledge.languageDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Specify Languages:</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="E.g. English, Spanish, French"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={formMethods.control}
                  name="culturalKnowledge.otherCulturalKnowledge"
                  render={({ field }) => (
                    <FormItem className={isLanguageChecked ? '' : 'md:my-10'}>
                      <FormLabel>If any other, please mention:</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Other Cultural Knowledge"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Display error message if there is a validation error */}
                {formMethods.formState.errors.culturalKnowledge?.root
                  ?.message && (
                  <span className="text-destructive">
                    {
                      formMethods.formState.errors.culturalKnowledge.root
                        ?.message
                    }
                  </span>
                )}
              </motion.div>

              {/* Interpersonal Skills */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col mb-4 gap-4"
              >
                <h2 className="text-lg font-semibold">Interpersonal Skills</h2>

                <FormField
                  control={formMethods.control}
                  name="interPersonalSkills.communicationSkills"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          className="mt-2"
                          checked={field.value}
                          onCheckedChange={handleInterpersonalSkillCheckboxChange(
                            field.onChange
                          )}
                        />
                      </FormControl>
                      <FormLabel>Communication Skills</FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={formMethods.control}
                  name="interPersonalSkills.empathy"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          className="mt-2"
                          checked={field.value}
                          onCheckedChange={handleInterpersonalSkillCheckboxChange(
                            field.onChange
                          )}
                        />
                      </FormControl>
                      <FormLabel>Empathy</FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={formMethods.control}
                  name="interPersonalSkills.patience"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          className="mt-2"
                          checked={field.value}
                          onCheckedChange={handleInterpersonalSkillCheckboxChange(
                            field.onChange
                          )}
                        />
                      </FormControl>
                      <FormLabel>Patience</FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={formMethods.control}
                  name="interPersonalSkills.culturalSensitivity"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          className="mt-2"
                          checked={field.value}
                          onCheckedChange={handleInterpersonalSkillCheckboxChange(
                            field.onChange
                          )}
                        />
                      </FormControl>
                      <FormLabel>Cultural Sensitivity</FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={formMethods.control}
                  name="interPersonalSkills.otherInterpersonalSkills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>If any other, please mention:</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Other Interpersonal Skills"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Display error message if there is a validation error */}
                {formMethods.formState.errors.interPersonalSkills?.root
                  ?.message && (
                  <span className="text-destructive">
                    {
                      formMethods.formState.errors.interPersonalSkills?.root
                        .message
                    }
                  </span>
                )}
              </motion.div>
            </TabsContent>
            <TabsContent value="step3" className="">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-4"
              >
                <h2 className="text-lg font-semibold">Statement of Purpose</h2>
                <FormField
                  control={formMethods.control}
                  name="statementOfPurpose"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Statement of Purpose</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Briefly explain your interest in the position."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        *Highlight your relevant skills and experience. Share
                        your goals for the position and how you plan to
                        contribute to organization.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            </TabsContent>
            <TabsContent value="step4" className="">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-lg font-semibold">References</h2>

                <div className="grid md:grid-cols-2">
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
                </div>
              </motion.div>
            </TabsContent>
            {/* Certifications */}
            <TabsContent value="step5" className="">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-4"
              >
                <h2 className="text-lg font-semibold">Certifications</h2>

                <div className="grid md:grid-cols-2">
                  {formMethods.getValues().certifications.map((_, index) => (
                    <div key={index} className="mb-4">
                      <h4 className="font-semibold">
                        Certification {index + 1}
                      </h4>

                      <FormField
                        control={formMethods.control}
                        name={`certifications.${index}.certificationName`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Certification Name:</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Certification Name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={formMethods.control}
                        name={`certifications.${index}.certifyingOrganization`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Certifying Organization:</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Certifying Organization Name"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={formMethods.control}
                        name={`certifications.${index}.yearOfCertification`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Year of Certification:</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Year of Certification"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                </div>

                {!validity && (
                  <span className="text-destructive">
                    Please fill in all the required fields for every step
                  </span>
                )}
              </motion.div>
            </TabsContent>
          </CardContent>

          <CardFooter className="gap-7">
            {currentStep > 0 && <Button onClick={handlePrev}>Previous</Button>}
            {!isLastStep ? (
              <Button onClick={handleNext}>Next</Button>
            ) : (
              <Button
                onClick={formMethods.handleSubmit(onSubmit)}
                disabled={!validity || isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  'Submit'
                )}
              </Button>
            )}
          </CardFooter>
        </Card>
      </Tabs>
    </FormProvider>
  );
}

export default MultiStepFormWithTabs;
