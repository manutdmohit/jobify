'use client';

import { useState } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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

import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

function MultiStepFormWithTabs() {
  const router = useRouter();
  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<CombinedFormData>>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    degree: '',
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

  // Get Form Values
  const formValues = formMethods.getValues();

  // Access the field values directly
  const fullName = formValues.fullName;
  const email = formValues.email;
  const phone = formValues.phone;
  const address = formValues.address;
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
  const personalInfoValidity = fullName && email && phone && address;

  // Check validity of specific fields or sections
  const teachingSkillsValidity =
    classroomManagement ||
    lessonPlanning ||
    curriculumDevelopment ||
    otherTeachingSkills;

  const culturalKnowledgeValidity =
    knowledgeOfSpecificCultures ||
    fluencyInLanguages ||
    languageDetails ||
    otherCulturalKnowledge;

  const interpersonalSkillsValidity =
    communicationSkills ||
    empathy ||
    patience ||
    culturalSensitivity ||
    otherInterpersonalSkills;

  const isSkillsValid =
    teachingSkillsValidity &&
    culturalKnowledgeValidity &&
    interpersonalSkillsValidity;

  const validity = personalInfoValidity && sop && isSkillsValid;

  const onSubmit: SubmitHandler<CombinedFormData> = async (data) => {
    console.log('data', data);

    const finalData = { ...formData, ...data };
    console.log('Final Submission Data: ', finalData);

    toast({
      title: 'Success',
      description: 'Your action was successful.',
      variant: 'success',
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
              <TabsTrigger value="step2">Skills and Abilities</TabsTrigger>
              <TabsTrigger value="step3">Statement of Purpose</TabsTrigger>
              <TabsTrigger value="step4">References</TabsTrigger>
              <TabsTrigger value="step5">Certifications</TabsTrigger>
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
            </TabsContent>

            <TabsContent value="step2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
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
                {formMethods.formState.errors.teachingSkills?.root?.message && (
                  <span className="text-destructive">
                    {formMethods.formState.errors.teachingSkills.root?.message}
                  </span>
                )}
              </motion.div>

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
                          onCheckedChange={handleCulturalKnowledgeCheckboxChange(
                            field.onChange
                          )}
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
                            setIsLanguageChecked(checked);
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
                            placeholder="E.g., Spanish, Mandarin, French"
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
                    <FormItem>
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

            <TabsContent value="step3">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-4"
              >
                <h2 className="text-lg font-semibold">Statement of Purpose</h2>
                {/* <FormField
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
                        Highlight your relevant skills and experience. Share
                        your goals for the position and how you plan to
                        contribute to organization.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

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

            <TabsContent value="step4">
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
              </motion.div>
            </TabsContent>

            {/* Certifications */}
            <TabsContent value="step5">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-4"
              >
                <h2 className="text-lg font-semibold">Certifications</h2>

                {formMethods.getValues().certifications.map((_, index) => (
                  <div key={index} className="mb-4">
                    <h4 className="font-semibold">Certification {index + 1}</h4>

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
