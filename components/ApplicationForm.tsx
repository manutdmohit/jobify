// 'use client';

// // import { useState } from 'react';
// // import { Button } from '@/components/ui/button';
// // import {
// //   Card,
// //   CardContent,
// //   CardDescription,
// //   CardFooter,
// //   CardHeader,
// //   CardTitle,
// // } from '@/components/ui/card';
// // import { Checkbox } from '@/components/ui/checkbox';
// // import {
// //   Form,
// //   FormControl,
// //   FormDescription,
// //   FormField,
// //   FormItem,
// //   FormLabel,
// //   FormMessage,
// // } from '@/components/ui/form';
// // import { Input } from '@/components/ui/input';
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from '@/components/ui/select';
// // import { Textarea } from '@/components/ui/textarea';

// // import { zodResolver } from '@hookform/resolvers/zod';
// // import { PersonStandingIcon } from 'lucide-react';
// // import Link from 'next/link';
// // import { useRouter } from 'next/navigation';
// // import { useForm } from 'react-hook-form';
// // import * as z from 'zod';

// // // Get the current year
// const currentYear = new Date().getFullYear();

// // // Regex for phone number validation
// const phoneRegex = /^(\+?\d{1,4}[\s-]?)?(\(?\d{1,4}\)?[\s-]?)?[\d\s-]{5,15}$/;

// // const formSchema = z.object({
// //   fullName: z.string().min(2, 'Full Name is required'),
// //   email: z.string().email(),
// //   address: z.string().min(1, 'Address is required'),
// //   phone: z.string().regex(phoneRegex, 'Invalid Number!'),
// //   jobPreference: z.string().min(1, 'Job Preference is required'),
// //   education: z.object({
// //     degree: z.string().optional(),
// //     institution: z.string().optional(),
// //     yearOfGraduation: z
// //       .number()
// //       .int()
// //       .min(1990, 'Invalid year')
// //       .max(currentYear, `Year cannot be greater than ${currentYear}`)
// //       .optional(),
// //   }),
// //   certifications: z.object({
// //     certificationName: z.string().optional(),
// //     certifyingOrganization: z.string().optional(),
// //     certificationYear: z.string().optional(),
// //   }),
// //   statementOfPurpose: z.string().min(50, 'Please provide a brief statement'),
// //   ppPhoto: z
// //     .instanceof(File, { message: 'Profile photo is required' })
// //     .refine((file) => file.size <= 2 * 1024 * 1024, 'Max file size is 2MB'), // Set max file size to 2MB
// //   identityPhoto: z
// //     .instanceof(File, { message: 'Identity photo is required' })
// //     .refine((file) => file.size <= 2 * 1024 * 1024, 'Max file size is 2MB'), // Set max file size to 2MB
// //   achievements: z.string().optional(),
// //   culturalExperiences: z.string().optional(),
// //   teachingSkills: z
// //     .object({
// //       classroomManagement: z.boolean().optional(),
// //       curriculumDevelopment: z.boolean().optional(),
// //       lessonPlanning: z.boolean().optional(),
// //       assessmentTechniques: z.boolean().optional(),
// //     })
// //     .refine(
// //       (skills) =>
// //         skills.classroomManagement ||
// //         skills.curriculumDevelopment ||
// //         skills.lessonPlanning ||
// //         skills.assessmentTechniques,
// //       {
// //         message: 'At least one teaching skill must be selected.',
// //         path: ['teachingSkills'],
// //       }
// //     ),
// //   otherTeachingSkills: z.string().optional(),
// //   culturalKnowledge: z
// //     .object({
// //       specificCultures: z.boolean().optional(),
// //       culturalValues: z.boolean().optional(),
// //       fluencyInLanguages: z.boolean().optional(),
// //       languageDetails: z.string().optional(), // Only shown if 'fluencyInLanguages' is checked
// //     })
// //     .refine(
// //       (skills) =>
// //         skills.specificCultures ||
// //         skills.culturalValues ||
// //         skills.fluencyInLanguages,
// //       {
// //         message: 'At least one cultural knowledge must be selected.',
// //         path: ['culturalKnowledge'],
// //       }
// //     ),

// //   otherCulturalSkills: z.string().optional(),
// //   interpersonalSkills: z
// //     .object({
// //       communicationSkills: z.boolean().optional(),
// //       empathy: z.boolean().optional(),
// //       patience: z.boolean().optional(),
// //       culturalSensitivity: z.boolean().optional(),
// //     })
// //     .refine(
// //       (skills) =>
// //         skills.communicationSkills ||
// //         skills.empathy ||
// //         skills.patience ||
// //         skills.culturalSensitivity,

// //       {
// //         message: 'At least one interpersonal skill must be selected.',
// //         path: ['interpersonalSkills'],
// //       }
// //     ),
// //   otherInterpersonalSkills: z.string().optional(),
// //   references: z
// //     .array(
// //       z.object({
// //         name: z.string().optional(),
// //         title: z.string().optional(),
// //         organization: z.string().optional(),
// //         contactInfo: z.string().optional(),
// //       })
// //     )
// //     .length(2), // Define two references as required fields
// // });

// // export default function ApplicationForm() {
// //   const router = useRouter();

// //   const form = useForm<z.infer<typeof formSchema>>({
// //     resolver: zodResolver(formSchema),
// //     defaultValues: {
// //       fullName: '',
// //       email: '',
// //       address: '',
// //       phone: '',
// //       jobPreference: '',
// //       teachingSkills: {
// //         classroomManagement: false,
// //         curriculumDevelopment: false,
// //         lessonPlanning: false,
// //         assessmentTechniques: false,
// //       },
// //       otherTeachingSkills: '',
// //       culturalKnowledge: {
// //         specificCultures: false,
// //         culturalValues: false,
// //         fluencyInLanguages: false,
// //         languageDetails: '',
// //       },
// //       otherCulturalSkills: '',
// //       references: [
// //         { name: '', title: '', organization: '', contactInfo: '' },
// //         { name: '', title: '', organization: '', contactInfo: '' },
// //       ],
// //     },
// //   });

// //   const [isLanguageChecked, setIsLanguageChecked] = useState<boolean>(false);

// //   const onSubmitForm = (data: z.infer<typeof formSchema>) => {
// //     console.log('Form data:', data);

// //     // Handle file upload here
// //     const file = data.ppPhoto;
// //     if (file) {
// //       // For example, upload the file to a server
// //       console.log('Uploaded file:', file);
// //     }

// //     // Simulate successful login
// //     // router.push('/dashboard');
// //   };

// //   const teachingSkillsError = (form.formState.errors as any)?.teachingSkills
// //     ?.teachingSkills?.message;

// //   const culturalKnowledgeError = (form.formState.errors as any)
// //     ?.culturalKnowledge?.culturalKnowledge?.message;

// //   const interPersonalSkillsError = (form.formState.errors as any)
// //     ?.interpersonalSkills?.interpersonalSkills?.message;

// //   // Handler to clear teaching skills error on checkbox change
// //   const handleCheckboxChange = (fieldOnChange: any) => (value: boolean) => {
// //     fieldOnChange(value);
// //     form.clearErrors('teachingSkills'); // Clears the error when any checkbox changes
// //   };

// //   // Handler to clear cultural knowledge error on checkbox change
// //   const handleCulturalKnowledgeCheckboxChange =
// //     (fieldOnChange: any) => (value: boolean) => {
// //       fieldOnChange(value);
// //       form.clearErrors('culturalKnowledge'); // Clears the error when any checkbox changes
// //     };

// //   // Handler to clear interpersonal skills error on checkbox change
// //   const handleInterpersonalSkillsCheckboxChange =
// //     (fieldOnChange: any) => (value: boolean) => {
// //       fieldOnChange(value);
// //       form.clearErrors('interpersonalSkills'); // Clears the error when any checkbox changes
// //     };

// //   return (
// //     <div className="flex flex-col my-5 gap-4 min-h-screen items-center justify-center">
// //       <PersonStandingIcon size={50} />
// //       <Card className=" w-full sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-7/12 max-w-7xl mx-auto">
// //         <CardHeader>
// //           <CardTitle>Application Form</CardTitle>
// //           <CardDescription>
// //             Fill out the form to apply for a job
// //           </CardDescription>
// //         </CardHeader>
// //         <CardContent>
// //           <Form {...form}>
// //             <form
// //               className="flex flex-col gap-4"
// //               onSubmit={form.handleSubmit(onSubmitForm)}
// //             >
// //               <div className="grid grid-cols-2 gap-4">
// //                 <div>
// //                   <h2 className="text-lg font-semibold">
// //                     Personal Information
// //                   </h2>
// //                   <FormField
// //                     control={form.control}
// //                     name="fullName"
// //                     render={({ field }) => (
// //                       <FormItem>
// //                         <FormLabel>Full Name</FormLabel>
// //                         <FormControl>
// //                           <Input
// //                             placeholder="Your Full Name"
// //                             type="text"
// //                             {...field}
// //                           />
// //                         </FormControl>
// //                         <FormDescription>
// //                           Provide your full name
// //                         </FormDescription>
// //                         <FormMessage />
// //                       </FormItem>
// //                     )}
// //                   />
// //                   <FormField
// //                     control={form.control}
// //                     name="email"
// //                     render={({ field }) => (
// //                       <FormItem>
// //                         <FormLabel>Email</FormLabel>
// //                         <FormControl>
// //                           <Input
// //                             placeholder="john@doe.com"
// //                             type="email"
// //                             {...field}
// //                           />
// //                         </FormControl>
// //                         <FormDescription>
// //                           Provide your email address
// //                         </FormDescription>
// //                         <FormMessage />
// //                       </FormItem>
// //                     )}
// //                   />
// //                   <FormField
// //                     control={form.control}
// //                     name="address"
// //                     render={({ field }) => (
// //                       <FormItem>
// //                         <FormLabel>Address</FormLabel>
// //                         <FormControl>
// //                           <Input
// //                             placeholder="Your Address"
// //                             type="text"
// //                             {...field}
// //                           />
// //                         </FormControl>
// //                         <FormDescription>Provide your address</FormDescription>
// //                         <FormMessage />
// //                       </FormItem>
// //                     )}
// //                   />
// //                   <FormField
// //                     control={form.control}
// //                     name="phone"
// //                     render={({ field }) => (
// //                       <FormItem>
// //                         <FormLabel>Phone</FormLabel>
// //                         <FormControl>
// //                           <Input
// //                             placeholder="Your Phone Number"
// //                             type="tel"
// //                             {...field}
// //                           />
// //                         </FormControl>
// //                         <FormDescription>
// //                           Provide your phone number
// //                         </FormDescription>
// //                         <FormMessage />
// //                       </FormItem>
// //                     )}
// //                   />
// //                 </div>

// //                 <div>
// //                   <h2 className="text-lg font-semibold">Education</h2>
// //                   <FormField
// //                     control={form.control}
// //                     name="education.degree"
// //                     render={({ field }) => (
// //                       <FormItem>
// //                         <FormLabel>Degree</FormLabel>
// //                         <FormControl>
// //                           <Input
// //                             placeholder="Your Last Education Degree"
// //                             type="text"
// //                             {...field}
// //                           />
// //                         </FormControl>
// //                         <FormDescription>
// //                           Provide your last education degree
// //                         </FormDescription>
// //                         <FormMessage />
// //                       </FormItem>
// //                     )}
// //                   />

// //                   <FormField
// //                     control={form.control}
// //                     name="education.yearOfGraduation"
// //                     render={({ field }) => (
// //                       <FormItem>
// //                         <FormLabel>Year of Graduation</FormLabel>
// //                         <FormControl>
// //                           <Input
// //                             placeholder="Your Last Year of Graduation"
// //                             type="text"
// //                             value={field.value ?? ''} // Default to empty string if value is null or undefined
// //                             onChange={(e) => {
// //                               const inputValue = e.target.value;
// //                               const currentYear = new Date().getFullYear();

// //                               // Allow only numeric input and check if it's less than or equal to the current year
// //                               if (/^\d*$/.test(inputValue)) {
// //                                 const numericValue = parseInt(inputValue, 10);

// //                                 if (
// //                                   numericValue <= currentYear ||
// //                                   isNaN(numericValue)
// //                                 ) {
// //                                   field.onChange(
// //                                     numericValue ? numericValue : undefined
// //                                   );
// //                                 }
// //                               }
// //                             }}
// //                           />
// //                         </FormControl>
// //                         <FormDescription>
// //                           Provide your last education year of graduation
// //                         </FormDescription>
// //                         <FormMessage />
// //                       </FormItem>
// //                     )}
// //                   />

// //                   <FormField
// //                     control={form.control}
// //                     name="education.institution"
// //                     render={({ field }) => (
// //                       <FormItem>
// //                         <FormLabel>Institution</FormLabel>
// //                         <FormControl>
// //                           <Input
// //                             placeholder="Your Last Education Institution Name"
// //                             type="text"
// //                             {...field}
// //                           />
// //                         </FormControl>
// //                         <FormDescription>
// //                           Provide your last education institution name
// //                         </FormDescription>
// //                         <FormMessage />
// //                       </FormItem>
// //                     )}
// //                   />
// //                 </div>

// //                 <div>
// //                   <h2 className="text-lg font-semibold">Certifications</h2>
// //                   <FormField
// //                     control={form.control}
// //                     name="certifications.certificationName"
// //                     render={({ field }) => (
// //                       <FormItem>
// //                         <FormLabel>Certification Year</FormLabel>
// //                         <FormControl>
// //                           <Input
// //                             placeholder="Your Last Certification Name"
// //                             type="text"
// //                             {...field}
// //                           />
// //                         </FormControl>
// //                         <FormDescription>
// //                           Provide your last certification name
// //                         </FormDescription>
// //                         <FormMessage />
// //                       </FormItem>
// //                     )}
// //                   />

// //                   <FormField
// //                     control={form.control}
// //                     name="certifications.certifyingOrganization"
// //                     render={({ field }) => (
// //                       <FormItem>
// //                         <FormLabel>Certifying Organization</FormLabel>
// //                         <FormControl>
// //                           <Input
// //                             placeholder="Your Last Certifying Organization"
// //                             type="text"
// //                             {...field}
// //                           />
// //                         </FormControl>
// //                         <FormDescription>
// //                           Provide your last certification organization
// //                         </FormDescription>
// //                         <FormMessage />
// //                       </FormItem>
// //                     )}
// //                   />

// //                   <FormField
// //                     control={form.control}
// //                     name="certifications.certificationYear"
// //                     render={({ field }) => (
// //                       <FormItem>
// //                         <FormLabel>Certifying Year</FormLabel>
// //                         <FormControl>
// //                           <Input
// //                             placeholder="Your Last Certification Date"
// //                             type="text"
// //                             {...field}
// //                           />
// //                         </FormControl>
// //                         <FormDescription>
// //                           Provide your last certification Date
// //                         </FormDescription>
// //                         <FormMessage />
// //                       </FormItem>
// //                     )}
// //                   />
// //                 </div>

// //                 <div className="">
// //                   <h2 className="text-lg font-semibold">Responsibilities</h2>

// //                   <FormField
// //                     control={form.control}
// //                     name="achievements"
// //                     render={({ field }) => (
// //                       <FormItem>
// //                         <FormLabel>Achievements</FormLabel>
// //                         <FormControl>
// //                           <Textarea
// //                             placeholder="Briefly explain your interest in the position."
// //                             className="resize-none"
// //                             {...field}
// //                           />
// //                         </FormControl>
// //                         <FormDescription>
// //                           Write about your achievements in short.
// //                         </FormDescription>
// //                         <FormMessage />
// //                       </FormItem>
// //                     )}
// //                   />
// //                   <FormField
// //                     control={form.control}
// //                     name="culturalExperiences"
// //                     render={({ field }) => (
// //                       <FormItem>
// //                         <FormLabel>Cultural Experiences</FormLabel>
// //                         <FormControl>
// //                           <Textarea
// //                             placeholder="Briefly explain your interest in the position."
// //                             className="resize-none"
// //                             {...field}
// //                           />
// //                         </FormControl>
// //                         <FormDescription>
// //                           * Relevant experiences, such as dance, music, arts &
// //                           culture * Specific cultural skills or knowledge.
// //                         </FormDescription>
// //                         <FormMessage />
// //                       </FormItem>
// //                     )}
// //                   />
// //                 </div>

// //                 {/* Teaching Skills Section */}
// //                 <div>
// //                   <h3 className="text-lg font-semibold">Teaching Skills:</h3>

// //                   {/* Individual Checkboxes */}
// //                   <FormField
// //                     control={form.control}
// //                     name="teachingSkills.classroomManagement"
// //                     render={({ field }) => (
// //                       <FormItem className="flex items-center space-x-2">
// //                         <FormControl>
// //                           <Checkbox
// //                             checked={field.value}
// //                             onCheckedChange={handleCheckboxChange(
// //                               field.onChange
// //                             )} // Correctly handle checkbox state change
// //                           />
// //                         </FormControl>
// //                         <FormLabel>Classroom Management</FormLabel>
// //                       </FormItem>
// //                     )}
// //                   />

// //                   <FormField
// //                     control={form.control}
// //                     name="teachingSkills.curriculumDevelopment"
// //                     render={({ field }) => (
// //                       <FormItem className="flex items-center space-x-2">
// //                         <FormControl>
// //                           <Checkbox
// //                             checked={field.value}
// //                             onCheckedChange={handleCheckboxChange(
// //                               field.onChange
// //                             )}
// //                           />
// //                         </FormControl>
// //                         <FormLabel>Curriculum Development</FormLabel>
// //                       </FormItem>
// //                     )}
// //                   />

// //                   <FormField
// //                     control={form.control}
// //                     name="teachingSkills.lessonPlanning"
// //                     render={({ field }) => (
// //                       <FormItem className="flex items-center space-x-2">
// //                         <FormControl>
// //                           <Checkbox
// //                             checked={field.value}
// //                             onCheckedChange={handleCheckboxChange(
// //                               field.onChange
// //                             )}
// //                           />
// //                         </FormControl>
// //                         <FormLabel>Lesson Planning</FormLabel>
// //                       </FormItem>
// //                     )}
// //                   />

// //                   <FormField
// //                     control={form.control}
// //                     name="teachingSkills.assessmentTechniques"
// //                     render={({ field }) => (
// //                       <FormItem className="flex items-center space-x-2">
// //                         <FormControl>
// //                           <Checkbox
// //                             checked={field.value}
// //                             onCheckedChange={handleCheckboxChange(
// //                               field.onChange
// //                             )}
// //                           />
// //                         </FormControl>
// //                         <FormLabel>Assessment Techniques</FormLabel>
// //                       </FormItem>
// //                     )}
// //                   />

// //                   {/* Other Skills Text Box */}
// //                   <FormField
// //                     control={form.control}
// //                     name="otherTeachingSkills"
// //                     render={({ field }) => (
// //                       <FormItem>
// //                         <FormLabel>If any other, please mention:</FormLabel>
// //                         <FormControl>
// //                           <Input
// //                             placeholder="Other Teaching Skills"
// //                             type="text"
// //                             {...field} // Spread field props to input
// //                           />
// //                         </FormControl>
// //                         <FormMessage />
// //                       </FormItem>
// //                     )}
// //                   />

// //                   {/* Display error message if there is a validation error */}
// //                   {form.formState.errors.teachingSkills && (
// //                     <span className="text-destructive">
// //                       {teachingSkillsError}{' '}
// //                       {/* Correctly access error message */}
// //                     </span>
// //                   )}
// //                 </div>

// //                 {/* Cultural Knowledge Section */}
// //                 <div>
// //                   <h3 className="text-lg font-semibold">Cultural Knowledge:</h3>

// //                   {/* Individual Checkboxes */}
// //                   <FormField
// //                     control={form.control}
// //                     name="culturalKnowledge.specificCultures"
// //                     render={({ field }) => (
// //                       <FormItem className="flex items-center space-x-2">
// //                         <FormControl>
// //                           <Checkbox
// //                             checked={field.value}
// //                             onCheckedChange={handleCulturalKnowledgeCheckboxChange(
// //                               field.onChange
// //                             )}
// //                           />
// //                         </FormControl>
// //                         <FormLabel>
// //                           Knowledge of Specific Cultures or Traditions
// //                         </FormLabel>
// //                       </FormItem>
// //                     )}
// //                   />
// //                   <FormField
// //                     control={form.control}
// //                     name="culturalKnowledge.culturalValues"
// //                     render={({ field }) => (
// //                       <FormItem className="flex items-center space-x-2">
// //                         <FormControl>
// //                           <Checkbox
// //                             checked={field.value}
// //                             onCheckedChange={handleCulturalKnowledgeCheckboxChange(
// //                               field.onChange
// //                             )}
// //                           />
// //                         </FormControl>
// //                         <FormLabel>
// //                           Ability to Teach Cultural Values and Perspectives
// //                         </FormLabel>
// //                       </FormItem>
// //                     )}
// //                   />
// //                   <FormField
// //                     control={form.control}
// //                     name="culturalKnowledge.fluencyInLanguages"
// //                     render={({ field }) => (
// //                       <FormItem className="flex items-center space-x-2">
// //                         <FormControl>
// //                           <Checkbox
// //                             checked={field.value}
// //                             onCheckedChange={(checked: boolean) => {
// //                               handleCulturalKnowledgeCheckboxChange(
// //                                 field.onChange
// //                               )(checked);
// //                               setIsLanguageChecked(checked);
// //                             }}
// //                           />
// //                         </FormControl>
// //                         <FormLabel>
// //                           Fluency in Languages (if applicable)
// //                         </FormLabel>
// //                       </FormItem>
// //                     )}
// //                   />

// //                   {/* Conditional Language Details Input */}
// //                   {isLanguageChecked && (
// //                     <FormField
// //                       control={form.control}
// //                       name="culturalKnowledge.languageDetails"
// //                       render={({ field }) => (
// //                         <FormItem>
// //                           <FormLabel>Specify Languages:</FormLabel>
// //                           <FormControl>
// //                             <Input
// //                               placeholder="E.g., Spanish, Mandarin, French"
// //                               type="text"
// //                               {...field}
// //                             />
// //                           </FormControl>
// //                           <FormMessage />
// //                         </FormItem>
// //                       )}
// //                     />
// //                   )}
// //                   {/* Other Cultural Skills Text Box */}
// //                   <FormField
// //                     control={form.control}
// //                     name="otherCulturalSkills"
// //                     render={({ field }) => (
// //                       <FormItem>
// //                         <FormLabel>If any other, please mention:</FormLabel>
// //                         <FormControl>
// //                           <Input
// //                             placeholder="Other Cultural Skills"
// //                             type="text"
// //                             {...field}
// //                           />
// //                         </FormControl>
// //                         <FormMessage />
// //                       </FormItem>
// //                     )}
// //                   />

// //                   {/* Display error message if there is a validation error */}
// //                   {form.formState.errors.culturalKnowledge && (
// //                     <span className="text-destructive">
// //                       {culturalKnowledgeError}{' '}
// //                       {/* Correctly access error message */}
// //                     </span>
// //                   )}
// //                 </div>

// //                 {/* Interpersonal Skills Section */}
// //                 <div>
// //                   <h3 className="text-lg font-semibold">
// //                     Interpersonal Skills:
// //                   </h3>

// //                   {/* Individual Checkboxes */}
// //                   <FormField
// //                     control={form.control}
// //                     name="interpersonalSkills.communicationSkills"
// //                     render={({ field }) => (
// //                       <FormItem className="flex items-center space-x-2">
// //                         <FormControl>
// //                           <Checkbox
// //                             checked={field.value}
// //                             onCheckedChange={handleInterpersonalSkillsCheckboxChange(
// //                               field.onChange
// //                             )} // Correctly handle checkbox state change
// //                           />
// //                         </FormControl>
// //                         <FormLabel>Communication Skills</FormLabel>
// //                       </FormItem>
// //                     )}
// //                   />

// //                   <FormField
// //                     control={form.control}
// //                     name="interpersonalSkills.empathy"
// //                     render={({ field }) => (
// //                       <FormItem className="flex items-center space-x-2">
// //                         <FormControl>
// //                           <Checkbox
// //                             checked={field.value}
// //                             onCheckedChange={handleInterpersonalSkillsCheckboxChange(
// //                               field.onChange
// //                             )}
// //                           />
// //                         </FormControl>
// //                         <FormLabel>Empathy</FormLabel>
// //                       </FormItem>
// //                     )}
// //                   />

// //                   <FormField
// //                     control={form.control}
// //                     name="interpersonalSkills.patience"
// //                     render={({ field }) => (
// //                       <FormItem className="flex items-center space-x-2">
// //                         <FormControl>
// //                           <Checkbox
// //                             checked={field.value}
// //                             onCheckedChange={handleInterpersonalSkillsCheckboxChange(
// //                               field.onChange
// //                             )}
// //                           />
// //                         </FormControl>
// //                         <FormLabel>Patience</FormLabel>
// //                       </FormItem>
// //                     )}
// //                   />

// //                   <FormField
// //                     control={form.control}
// //                     name="interpersonalSkills.culturalSensitivity"
// //                     render={({ field }) => (
// //                       <FormItem className="flex items-center space-x-2">
// //                         <FormControl>
// //                           <Checkbox
// //                             checked={field.value}
// //                             onCheckedChange={handleInterpersonalSkillsCheckboxChange(
// //                               field.onChange
// //                             )}
// //                           />
// //                         </FormControl>
// //                         <FormLabel>Cultural Sensitivity</FormLabel>
// //                       </FormItem>
// //                     )}
// //                   />

// //                   {/* Other Skills Text Box */}
// //                   <FormField
// //                     control={form.control}
// //                     name="otherInterpersonalSkills"
// //                     render={({ field }) => (
// //                       <FormItem>
// //                         <FormLabel>If any other, please mention:</FormLabel>
// //                         <FormControl>
// //                           <Input
// //                             placeholder="Other Interpersonal Skills"
// //                             type="text"
// //                             {...field} // Spread field props to input
// //                           />
// //                         </FormControl>
// //                         <FormMessage />
// //                       </FormItem>
// //                     )}
// //                   />

// //                   {/* Display error message if there is a validation error */}
// //                   {form.formState.errors.interpersonalSkills && (
// //                     <span className="text-destructive">
// //                       {interPersonalSkillsError}{' '}
// //                       {/* Correctly access error message */}
// //                     </span>
// //                   )}
// //                 </div>

// //                 <div>
// //                   <h2 className="text-lg font-semibold">Photos</h2>
// //                   <FormField
// //                     control={form.control}
// //                     name="ppPhoto"
// //                     render={({ field }) => (
// //                       <FormItem>
// //                         <FormLabel>Your Photo</FormLabel>
// //                         <FormControl>
// //                           <Input
// //                             className="cursor-pointer"
// //                             type="file"
// //                             accept=".jpg,.jpeg,.png"
// //                             onChange={(e) =>
// //                               field.onChange(e.target.files?.[0])
// //                             }
// //                           />
// //                         </FormControl>
// //                         <FormDescription>
// //                           Upload Your PP Size Photo
// //                         </FormDescription>
// //                         <FormMessage />
// //                       </FormItem>
// //                     )}
// //                   />
// //                   <FormField
// //                     control={form.control}
// //                     name="identityPhoto"
// //                     render={({ field }) => (
// //                       <FormItem>
// //                         <FormLabel>
// //                           Your Identity Photo(E.g. Passport, Citizenship,
// //                           Driving License)
// //                         </FormLabel>
// //                         <FormControl>
// //                           <Input
// //                             className="cursor-pointer"
// //                             type="file"
// //                             accept=".jpg,.jpeg,.png"
// //                             onChange={(e) =>
// //                               field.onChange(e.target.files?.[0])
// //                             }
// //                           />
// //                         </FormControl>
// //                         <FormDescription>
// //                           Upload Your Identity Photo
// //                         </FormDescription>
// //                         <FormMessage />
// //                       </FormItem>
// //                     )}
// //                   />
// //                 </div>

// //                 <div>
// //                   <h3 className="text-lg font-semibold">References:</h3>

// // {form.getValues().references.map((_, index) => (
// //   <div key={index} className="mb-4">
// //     <h4 className="font-semibold">Reference {index + 1}</h4>

// //     <FormField
// //       control={form.control}
// //       name={`references.${index}.name`}
// //       render={({ field }) => (
// //         <FormItem>
// //           <FormLabel>Name:</FormLabel>
// //           <FormControl>
// //             <Input placeholder="Reference Name" {...field} />
// //           </FormControl>
// //           <FormMessage />
// //         </FormItem>
// //       )}
// //     />

// //     <FormField
// //       control={form.control}
// //       name={`references.${index}.title`}
// //       render={({ field }) => (
// //         <FormItem>
// //           <FormLabel>Title/Position:</FormLabel>
// //           <FormControl>
// //             <Input
// //               placeholder="Reference Title/Position"
// //               {...field}
// //             />
// //           </FormControl>
// //         </FormItem>
// //       )}
// //     />

// //     <FormField
// //       control={form.control}
// //       name={`references.${index}.organization`}
// //       render={({ field }) => (
// //         <FormItem>
// //           <FormLabel>Organization:</FormLabel>
// //           <FormControl>
// //             <Input
// //               placeholder="Reference Organization"
// //               {...field}
// //             />
// //           </FormControl>
// //         </FormItem>
// //       )}
// //     />

// //     <FormField
// //       control={form.control}
// //       name={`references.${index}.contactInfo`}
// //       render={({ field }) => (
// //         <FormItem>
// //           <FormLabel>Contact Information:</FormLabel>
// //           <FormControl>
// //             <Input
// //               placeholder="Reference Contact Information"
// //               {...field}
// //             />
// //           </FormControl>
// //           <FormMessage />
// //         </FormItem>
// //       )}
// //     />
// //   </div>
// // ))}
// //                 </div>

// //                 <div>
// //                   <FormField
// //                     control={form.control}
// //                     name="jobPreference"
// //                     render={({ field }) => (
// //                       <FormItem>
// //                         <FormLabel>Job Preference</FormLabel>
// //                         <Select
// //                           onValueChange={field.onChange}
// //                           defaultValue={field.value}
// //                         >
// //                           <FormControl>
// //                             <SelectTrigger>
// //                               <SelectValue placeholder="Select a a job preference" />
// //                             </SelectTrigger>
// //                           </FormControl>
// //                           <SelectContent>
// //                             <SelectItem value="schools">Schools</SelectItem>
// //                             <SelectItem value="events">Events</SelectItem>
// //                             <SelectItem value="homeTutor">
// //                               Home Tutor
// //                             </SelectItem>
// //                           </SelectContent>
// //                         </Select>
// //                         <FormDescription>
// //                           Please provide your job preference
// //                         </FormDescription>
// //                         <FormMessage />
// //                       </FormItem>
// //                     )}
// //                   />
// //                 </div>

// //                 <div>
// //                   <h2 className="text-lg font-semibold">
// //                     Statement of Purpose
// //                   </h2>
// //                   <FormField
// //                     control={form.control}
// //                     name="statementOfPurpose"
// //                     render={({ field }) => (
// //                       <FormItem>
// //                         <FormLabel>Statement of Purpose</FormLabel>
// //                         <FormControl>
// //                           <Textarea
// //                             placeholder="Briefly explain your interest in the position."
// //                             className="resize-none"
// //                             {...field}
// //                           />
// //                         </FormControl>
// //                         <FormDescription>
// //                           Highlight your relevant skills and experience. Share
// //                           your goals for the position and how you plan to
// //                           contribute to organization.
// //                         </FormDescription>
// //                         <FormMessage />
// //                       </FormItem>
// //                     )}
// //                   />
// //                 </div>
// //               </div>
// //               <Button type="submit" className="mt-4 max-w-sm">
// //                 Save and Submit
// //               </Button>
// //             </form>
// //           </Form>
// //         </CardContent>
// //         <CardFooter>
// //           <small>*Please fill up the field with your actual information</small>
// //         </CardFooter>
// //       </Card>
// //     </div>
// //   );
// // }

// // 'use client';

// // import { Button } from '@/components/ui/button';
// // import {
// //   Card,
// //   CardContent,
// //   CardDescription,
// //   CardFooter,
// //   CardHeader,
// //   CardTitle,
// // } from '@/components/ui/card';
// // import { Input } from '@/components/ui/input';
// // import { Label } from '@/components/ui/label';
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// // export default function ApplicationForm() {
// //   return (
// //     <Tabs defaultValue="account" className="w-[400px]">
// //       <TabsList className="grid w-full grid-cols-5 gap-2">
// //         <TabsTrigger value="account">Account</TabsTrigger>
// //         <TabsTrigger value="password">Password</TabsTrigger>
// //         <TabsTrigger value="account">Account</TabsTrigger>
// //         <TabsTrigger value="password">Password</TabsTrigger>
// //       </TabsList>
// //       <TabsContent value="account">
// //         <Card>
// //           <CardHeader>
// //             <CardTitle>Account</CardTitle>
// //             <CardDescription>
// //               Make changes to your account here. Click save when you're done.
// //             </CardDescription>
// //           </CardHeader>
// //           <CardContent className="space-y-2">
// //             <div className="space-y-1">
// //               <Label htmlFor="name">Name</Label>
// //               <Input id="name" defaultValue="Pedro Duarte" />
// //             </div>
// //             <div className="space-y-1">
// //               <Label htmlFor="username">Username</Label>
// //               <Input id="username" defaultValue="@peduarte" />
// //             </div>
// //           </CardContent>
// //           <CardFooter>
// //             <Button>Save changes</Button>
// //           </CardFooter>
// //         </Card>
// //       </TabsContent>
// //       <TabsContent value="password">
// //         <Card>
// //           <CardHeader>
// //             <CardTitle>Password</CardTitle>
// //             <CardDescription>
// //               Change your password here. After saving, you'll be logged out.
// //             </CardDescription>
// //           </CardHeader>
// //           <CardContent className="space-y-2">
// //             <div className="space-y-1">
// //               <Label htmlFor="current">Current password</Label>
// //               <Input id="current" type="password" />
// //             </div>
// //             <div className="space-y-1">
// //               <Label htmlFor="new">New password</Label>
// //               <Input id="new" type="password" />
// //             </div>
// //           </CardContent>
// //           <CardFooter>
// //             <Button>Save password</Button>
// //           </CardFooter>
// //         </Card>
// //       </TabsContent>
// //     </Tabs>
// //   );
// // }

// // 'use client';

// // import { Button } from '@/components/ui/button';
// // import {
// //   Card,
// //   CardContent,
// //   CardDescription,
// //   CardFooter,
// //   CardHeader,
// //   CardTitle,
// // } from '@/components/ui/card';
// // import { Input } from '@/components/ui/input';
// // import { Label } from '@/components/ui/label';
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// // export default function ApplicationForm() {
// //   const handleAccountSubmit = (event: any) => {
// //     event.preventDefault();
// //     // Add account form submission logic here
// //     console.log('Account changes saved.');
// //   };

// //   const handlePasswordSubmit = (event: any) => {
// //     event.preventDefault();
// //     // Add password form submission logic here
// //     console.log('Password changes saved.');
// //   };

// //   return (
// //     <Tabs defaultValue="account" className="w-[400px]">
// //       <TabsList className="grid w-full grid-cols-4 gap-4">
// //         <TabsTrigger value="account">Account</TabsTrigger>
// //         <TabsTrigger value="user">User</TabsTrigger>
// //         <TabsTrigger value="password">Password</TabsTrigger>
// //         <TabsTrigger value="name">Name</TabsTrigger>
// //       </TabsList>

// //       {/* Account Tab Content */}
// //       <TabsContent value="account">
// //         <Card>
// //           <CardHeader>
// //             <CardTitle>Account</CardTitle>
// //             <CardDescription>
// //               Make changes to your account here. Click save when you're done.
// //             </CardDescription>
// //           </CardHeader>
// //           <form onSubmit={handleAccountSubmit}>
// //             <CardContent className="space-y-2">
// //               <div className="space-y-1">
// //                 <Label htmlFor="name">Name</Label>
// //                 <Input id="name" name="name" required />
// //               </div>
// //               <div className="space-y-1">
// //                 <Label htmlFor="username">Username</Label>
// //                 <Input id="username" name="username" required />
// //               </div>
// //             </CardContent>
// //             <CardFooter>
// //               <Button type="submit">Save changes</Button>
// //             </CardFooter>
// //           </form>
// //         </Card>
// //       </TabsContent>

// //       {/* Account Tab Content */}
// //       <TabsContent value="user">
// //         <Card>
// //           <CardHeader>
// //             <CardTitle>Account</CardTitle>
// //             <CardDescription>
// //               Make changes to your account here. Click save when you're done.
// //             </CardDescription>
// //           </CardHeader>
// //           <form onSubmit={handleAccountSubmit}>
// //             <CardContent className="space-y-2">
// //               <div className="space-y-1">
// //                 <Label htmlFor="name">Name</Label>
// //                 <Input id="name" name="name" required />
// //               </div>
// //               <div className="space-y-1">
// //                 <Label htmlFor="username">Username</Label>
// //                 <Input id="username" name="username" required />
// //               </div>
// //             </CardContent>
// //             <CardFooter>
// //               <Button type="submit">Save changes</Button>
// //             </CardFooter>
// //           </form>
// //         </Card>
// //       </TabsContent>

// //       {/* Password Tab Content */}
// //       <TabsContent value="password">
// //         <Card>
// //           <CardHeader>
// //             <CardTitle>Password</CardTitle>
// //             <CardDescription>
// //               Change your password here. After saving, you'll be logged out.
// //             </CardDescription>
// //           </CardHeader>
// //           <form onSubmit={handlePasswordSubmit}>
// //             <CardContent className="space-y-2">
// //               <div className="space-y-1">
// //                 <Label htmlFor="current">Current password</Label>
// //                 <Input id="current" name="current" type="password" required />
// //               </div>
// //               <div className="space-y-1">
// //                 <Label htmlFor="new">New password</Label>
// //                 <Input id="new" name="new" type="password" required />
// //               </div>
// //             </CardContent>
// //             <CardFooter>
// //               <Button type="submit">Save password</Button>
// //             </CardFooter>
// //           </form>
// //         </Card>
// //       </TabsContent>

// //       {/* Password Tab Content */}
// //       <TabsContent value="name">
// //         <Card>
// //           <CardHeader>
// //             <CardTitle>Password</CardTitle>
// //             <CardDescription>
// //               Change your password here. After saving, you'll be logged out.
// //             </CardDescription>
// //           </CardHeader>
// //           <form onSubmit={handlePasswordSubmit}>
// //             <CardContent className="space-y-2">
// //               <div className="space-y-1">
// //                 <Label htmlFor="current">Current password</Label>
// //                 <Input id="current" name="current" type="password" required />
// //               </div>
// //               <div className="space-y-1">
// //                 <Label htmlFor="new">New password</Label>
// //                 <Input id="new" name="new" type="password" required />
// //               </div>
// //             </CardContent>
// //             <CardFooter>
// //               <Button type="submit">Save password</Button>
// //             </CardFooter>
// //           </form>
// //         </Card>
// //       </TabsContent>
// //     </Tabs>
// //   );
// // }

// ('use client');

// import { useForm, Controller } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Textarea } from '@/components/ui/textarea';

// const formSchema = z.object({
//   fullName: z.string().min(2, 'Full Name is required'),
//   email: z.string().email(),
//   address: z.string().min(1, 'Address is required'),
//   phone: z.string().regex(phoneRegex, 'Invalid Number!'),
//   jobPreference: z.string().min(1, 'Job Preference is required'),
//   education: z.object({
//     degree: z.string().optional(),
//     institution: z.string().optional(),
//     yearOfGraduation: z
//       .number()
//       .int()
//       .min(1990, 'Invalid year')
//       .max(currentYear, `Year cannot be greater than ${currentYear}`)
//       .optional(),
//   }),
//   certifications: z.object({
//     certificationName: z.string().optional(),
//     certifyingOrganization: z.string().optional(),
//     certificationYear: z.string().optional(),
//   }),
//   statementOfPurpose: z.string().min(50, 'Please provide a brief statement'),
//   ppPhoto: z
//     .instanceof(File, { message: 'Profile photo is required' })
//     .refine((file) => file.size <= 2 * 1024 * 1024, 'Max file size is 2MB'), // Set max file size to 2MB
//   identityPhoto: z
//     .instanceof(File, { message: 'Identity photo is required' })
//     .refine((file) => file.size <= 2 * 1024 * 1024, 'Max file size is 2MB'), // Set max file size to 2MB
//   achievements: z.string().optional(),
//   culturalExperiences: z.string().optional(),
//   teachingSkills: z
//     .object({
//       classroomManagement: z.boolean().optional(),
//       curriculumDevelopment: z.boolean().optional(),
//       lessonPlanning: z.boolean().optional(),
//       assessmentTechniques: z.boolean().optional(),
//     })
//     .refine(
//       (skills) =>
//         skills.classroomManagement ||
//         skills.curriculumDevelopment ||
//         skills.lessonPlanning ||
//         skills.assessmentTechniques,
//       {
//         message: 'At least one teaching skill must be selected.',
//         path: ['teachingSkills'],
//       }
//     ),
//   otherTeachingSkills: z.string().optional(),
//   culturalKnowledge: z
//     .object({
//       specificCultures: z.boolean().optional(),
//       culturalValues: z.boolean().optional(),
//       fluencyInLanguages: z.boolean().optional(),
//       languageDetails: z.string().optional(), // Only shown if 'fluencyInLanguages' is checked
//     })
//     .refine(
//       (skills) =>
//         skills.specificCultures ||
//         skills.culturalValues ||
//         skills.fluencyInLanguages,
//       {
//         message: 'At least one cultural knowledge must be selected.',
//         path: ['culturalKnowledge'],
//       }
//     ),

//   otherCulturalSkills: z.string().optional(),
//   interpersonalSkills: z
//     .object({
//       communicationSkills: z.boolean().optional(),
//       empathy: z.boolean().optional(),
//       patience: z.boolean().optional(),
//       culturalSensitivity: z.boolean().optional(),
//     })
//     .refine(
//       (skills) =>
//         skills.communicationSkills ||
//         skills.empathy ||
//         skills.patience ||
//         skills.culturalSensitivity,

//       {
//         message: 'At least one interpersonal skill must be selected.',
//         path: ['interpersonalSkills'],
//       }
//     ),
//   otherInterpersonalSkills: z.string().optional(),
//   references: z
//     .array(
//       z.object({
//         name: z.string().optional(),
//         title: z.string().optional(),
//         organization: z.string().optional(),
//         contactInfo: z.string().optional(),
//       })
//     )
//     .length(2), // Define two references as required fields
// });

// // export default function ApplicationForm() {
// //   const {
// //     control,
// //     register,
// //     handleSubmit,
// //     formState: { errors },
// //   } = useForm({
// //     resolver: zodResolver(formSchema),
// //   });

// //   const onSubmit = (data: any) => {
// //     console.log('Form data:', data);
// //     // handle form submission
// //   };

// //   return (
// //     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
// //       {/* Personal Information Section */}
// //       <div>
// //         <h2 className="text-lg font-bold">Personal Information</h2>
// //         <div className="space-y-2">
// //           <Label htmlFor="fullName">Full Name</Label>
// //           <Input id="fullName" {...register('fullName')} />
// //           {errors.fullName && <p>{errors.fullName.message}</p>}

// //           <Label htmlFor="email">Email</Label>
// //           <Input id="email" type="email" {...register('email')} />
// //           {errors.email && <p>{errors.email.message}</p>}

// //           <Label htmlFor="address">Address</Label>
// //           <Input id="address" {...register('address')} />
// //           {errors.address && <p>{errors.address.message}</p>}

// //           <Label htmlFor="phone">Phone</Label>
// //           <Input id="phone" {...register('phone')} />
// //           {errors.phone && <p>{errors.phone.message}</p>}
// //         </div>
// //       </div>

// //       {/* Education Section */}
// //       <div>
// //         <h2 className="text-lg font-bold">Education</h2>
// //         <div className="space-y-2">
// //           <Label htmlFor="degree">Degree</Label>
// //           <Input id="degree" {...register('education.degree')} />

// //           <Label htmlFor="institution">Institution</Label>
// //           <Input id="institution" {...register('education.institution')} />

// //           <Label htmlFor="yearOfGraduation">Year of Graduation</Label>
// //           <Input
// //             id="yearOfGraduation"
// //             type="number"
// //             {...register('education.yearOfGraduation')}
// //           />
// //           {errors.education?.yearOfGraduation && (
// //             <p>{errors.education.yearOfGraduation.message}</p>
// //           )}
// //         </div>
// //       </div>

// //       {/* File Uploads */}
// //       <div>
// //         <h2 className="text-lg font-bold">File Uploads</h2>
// //         <div className="space-y-2">
// //           <Label htmlFor="ppPhoto">Profile Photo</Label>
// //           <Input id="ppPhoto" type="file" {...register('ppPhoto')} />
// //           {errors.ppPhoto && <p>{errors.ppPhoto.message}</p>}

// //           <Label htmlFor="identityPhoto">Identity Photo</Label>
// //           <Input
// //             id="identityPhoto"
// //             type="file"
// //             {...register('identityPhoto')}
// //           />
// //           {errors.identityPhoto && <p>{errors.identityPhoto.message}</p>}
// //         </div>
// //       </div>

// //       {/* Skills Section */}
// //       <div>
// //         <h2 className="text-lg font-bold">Skills</h2>
// //         <div className="space-y-2">
// //           <Label>Teaching Skills</Label>
// //           <div className="flex flex-wrap gap-2">
// //             <Label>
// //               <Checkbox {...register('teachingSkills.classroomManagement')} />
// //               Classroom Management
// //             </Label>
// //             <Label>
// //               <Checkbox {...register('teachingSkills.curriculumDevelopment')} />
// //               Curriculum Development
// //             </Label>
// //             <Label>
// //               <Checkbox {...register('teachingSkills.lessonPlanning')} />
// //               Lesson Planning
// //             </Label>
// //             <Label>
// //               <Checkbox {...register('teachingSkills.assessmentTechniques')} />
// //               Assessment Techniques
// //             </Label>
// //           </div>
// //           {errors.teachingSkills && <p>{errors.teachingSkills.message}</p>}
// //         </div>
// //       </div>

// //       {/* Statement of Purpose */}
// //       <div>
// //         <h2 className="text-lg font-bold">Statement of Purpose</h2>
// //         <Textarea {...register('statementOfPurpose')} rows="4" />
// //         {errors.statementOfPurpose && (
// //           <p>{errors.statementOfPurpose.message}</p>
// //         )}
// //       </div>

// //       {/* References */}
// //       <div>
// //         <h2 className="text-lg font-bold">References</h2>
// //         {Array.from({ length: 2 }).map((_, index) => (
// //           <div key={index} className="space-y-2">
// //             <Label htmlFor={`references.${index}.name`}>
// //               Reference {index + 1} - Name
// //             </Label>
// //             <Input
// //               id={`references.${index}.name`}
// //               {...register(`references.${index}.name`)}
// //             />

// //             <Label htmlFor={`references.${index}.title`}>Title</Label>
// //             <Input
// //               id={`references.${index}.title`}
// //               {...register(`references.${index}.title`)}
// //             />

// //             <Label htmlFor={`references.${index}.organization`}>
// //               Organization
// //             </Label>
// //             <Input
// //               id={`references.${index}.organization`}
// //               {...register(`references.${index}.organization`)}
// //             />

// //             <Label htmlFor={`references.${index}.contactInfo`}>
// //               Contact Info
// //             </Label>
// //             <Input
// //               id={`references.${index}.contactInfo`}
// //               {...register(`references.${index}.contactInfo`)}
// //             />
// //           </div>
// //         ))}
// //       </div>

// //       {/* Submit Button */}
// //       <Button type="submit">Submit Application</Button>
// //     </form>
// //   );
// // }
