// schemas.ts
import { z } from 'zod';

export const personalInfoSchema = z.object({
  fullName: z.string().min(2, 'Full Name is required'),
  email: z.string().email(),
  address: z.string().min(1, 'Address is required'),
  phone: z.string().regex(/^\d+$/, 'Invalid Number!'),
});

export const educationSchema = z.object({
  degree: z.string().optional(),
  institution: z.string().optional(),
  yearOfGraduation: z
    .string()
    // .int()
    // .min(1990, 'Invalid year')
    // .max(new Date().getFullYear(), 'Year cannot be in the future')
    .optional(),
});

export const skillsSchema = z.object({
  classroomManagement: z.boolean().optional(),
  curriculumDevelopment: z.boolean().optional(),
  lessonPlanning: z.boolean().optional(),
  assessmentTechniques: z.boolean().optional(),
});

// Combine schemas for final validation
export const combinedSchema = personalInfoSchema
  .merge(educationSchema)
  .merge(skillsSchema);

// Types for each form step
export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Skills = z.infer<typeof skillsSchema>;
export type CombinedFormData = PersonalInfo & Education & Skills;
