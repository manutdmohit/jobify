// 'use client';

// import { useState } from 'react';
// import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import {
//   personalInfoSchema,
//   educationSchema,
//   skillsSchema,
//   CombinedFormData,
// } from '@/schemas/schemas';

// import { Button } from '@/components/ui/button';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import { Checkbox } from '@/components/ui/checkbox';
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { Textarea } from '@/components/ui/textarea';

// type Step = 0 | 1 | 2; // Define the possible steps

// function MultiStepForm() {
//   const [step, setStep] = useState<Step>(0);
//   const [formData, setFormData] = useState<Partial<CombinedFormData>>({});

//   const formSchemas = [personalInfoSchema, educationSchema, skillsSchema];
//   const currentSchema = formSchemas[step];

//   const formMethods = useForm<CombinedFormData>({
//     resolver: zodResolver(currentSchema),
//     defaultValues: formData, // Persist data across steps
//   });

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = formMethods;

//   const onNext: SubmitHandler<CombinedFormData> = (data) => {
//     setFormData((prev) => ({ ...prev, ...data }));
//     setStep((prev) => (prev + 1) as Step);
//   };

//   const onPrevious = () => {
//     setStep((prev) => (prev - 1) as Step);
//   };

//   const onSubmit: SubmitHandler<CombinedFormData> = (data) => {
//     const finalData = { ...formData, ...data };
//     console.log('Final Submission Data: ', finalData);
//   };

//   return (
//     <FormProvider {...formMethods}>
//       <form
//         onSubmit={handleSubmit(
//           step < formSchemas.length - 1 ? onNext : onSubmit
//         )}
//         className="flex flex-col gap-4 min-h-screen items-center justify-center  max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg"
//       >
//         {step === 0 && (
//           // <div>
//           //   <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
//           //   <label className="block mb-3">
//           //     Full Name:
//           //     <input
//           //       {...register('fullName')}
//           //       className="w-full p-2 mt-1 border rounded"
//           //     />
//           //     {errors.fullName && (
//           //       <p className="text-destructive text-sm">
//           //         {errors.fullName.message}
//           //       </p>
//           //     )}
//           //   </label>
//           //   <label className="block mb-3">
//           //     Email:
//           //     <input
//           //       {...register('email')}
//           //       type="email"
//           //       className="w-full p-2 mt-1 border rounded"
//           //     />
//           //     {errors.email && (
//           //       <p className="text-red-500 text-sm">{errors.email.message}</p>
//           //     )}
//           //   </label>
//           //   <label className="block mb-3">
//           //     Address:
//           //     <input
//           //       {...register('address')}
//           //       className="w-full p-2 mt-1 border rounded"
//           //     />
//           //     {errors.address && (
//           //       <p className="text-red-500 text-sm">{errors.address.message}</p>
//           //     )}
//           //   </label>
//           //   <label className="block mb-3">
//           //     Phone:
//           //     <input
//           //       {...register('phone')}
//           //       className="w-full p-2 mt-1 border rounded"
//           //     />
//           //     {errors.phone && (
//           //       <p className="text-red-500 text-sm">{errors.phone.message}</p>
//           //     )}
//           //   </label>
//           // </div>
//           <Card>
//             <CardHeader>
//               <CardTitle>Application Form</CardTitle>
//               <CardDescription>
//                 Fill out the form to apply for a job
//               </CardDescription>
//             </CardHeader>

//             <CardContent>
//               <Form {...formMethods}>
//                 <form
//                   className="flex flex-col gap-4"
//                   onSubmit={formMethods.handleSubmit(onSubmit)}
//                 >
//                   <div>
//                     <h2 className="text-lg font-semibold">
//                       Personal Information
//                     </h2>
//                     <FormField
//                       control={formMethods.control}
//                       name="fullName"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Full Name</FormLabel>
//                           <FormControl>
//                             <Input
//                               placeholder="Your Full Name"
//                               type="text"
//                               {...field}
//                             />
//                           </FormControl>
//                           <FormDescription>
//                             Provide your full name
//                           </FormDescription>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={formMethods.control}
//                       name="email"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Email</FormLabel>
//                           <FormControl>
//                             <Input
//                               placeholder="john@doe.com"
//                               type="email"
//                               {...field}
//                             />
//                           </FormControl>
//                           <FormDescription>
//                             Provide your email address
//                           </FormDescription>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={formMethods.control}
//                       name="address"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Address</FormLabel>
//                           <FormControl>
//                             <Input
//                               placeholder="Your Address"
//                               type="text"
//                               {...field}
//                             />
//                           </FormControl>
//                           <FormDescription>
//                             Provide your address
//                           </FormDescription>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={formMethods.control}
//                       name="phone"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Phone</FormLabel>
//                           <FormControl>
//                             <Input
//                               placeholder="Your Phone Number"
//                               type="tel"
//                               {...field}
//                             />
//                           </FormControl>
//                           <FormDescription>
//                             Provide your phone number
//                           </FormDescription>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                 </form>
//               </Form>
//             </CardContent>
//           </Card>
//         )}

//         {step === 1 && (
//           <div>
//             <h2 className="text-xl font-semibold mb-4">Education</h2>
//             <label className="block mb-3">
//               Degree:
//               <input
//                 {...register('degree')}
//                 className="w-full p-2 mt-1 border rounded"
//               />
//             </label>
//             <label className="block mb-3">
//               Institution:
//               <input
//                 {...register('institution')}
//                 className="w-full p-2 mt-1 border rounded"
//               />
//             </label>
//             <label className="block mb-3">
//               Year of Graduation:
//               <input
//                 {...register('yearOfGraduation')}
//                 type="number"
//                 className="w-full p-2 mt-1 border rounded"
//               />
//               {errors.yearOfGraduation && (
//                 <p className="text-red-500 text-sm">
//                   {errors.yearOfGraduation.message}
//                 </p>
//               )}
//             </label>
//           </div>
//         )}

//         {step === 2 && (
//           <div>
//             <h2 className="text-xl font-semibold mb-4">Skills</h2>
//             <label className="block mb-2">
//               <input
//                 type="checkbox"
//                 {...register('classroomManagement')}
//                 className="mr-2"
//               />
//               Classroom Management
//             </label>
//             <label className="block mb-2">
//               <input
//                 type="checkbox"
//                 {...register('curriculumDevelopment')}
//                 className="mr-2"
//               />
//               Curriculum Development
//             </label>
//             <label className="block mb-2">
//               <input
//                 type="checkbox"
//                 {...register('lessonPlanning')}
//                 className="mr-2"
//               />
//               Lesson Planning
//             </label>
//             <label className="block mb-2">
//               <input
//                 type="checkbox"
//                 {...register('assessmentTechniques')}
//                 className="mr-2"
//               />
//               Assessment Techniques
//             </label>
//           </div>
//         )}

//         <div className="mt-6 flex justify-between">
//           {step > 0 && (
//             <button
//               type="button"
//               onClick={onPrevious}
//               className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
//             >
//               Previous
//             </button>
//           )}
//           {step < formSchemas.length - 1 ? (
//             <button
//               type="button"
//               onClick={handleSubmit(onNext)}
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               Next
//             </button>
//           ) : (
//             <button
//               type="submit"
//               className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//             >
//               Submit
//             </button>
//           )}
//         </div>
//       </form>
//     </FormProvider>
//   );
// }

// export default MultiStepForm;
