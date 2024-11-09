// schemas.ts
import { z } from 'zod';

// export const personalInfoSchema = z.object({
//   fullName: z.string().optional(),
//   email: z.string().optional(),
//   // address: z.string().min(1, 'Address is required'),
//   phone: z.string().optional(),
// });
export const personalInfoSchema = z.object({
  fullName: z.string().min(2, 'Full Name is required'),
  email: z.string().email(),
  phone: z.string().regex(/^\d+$/, 'Invalid Number!'),
  address: z.string().min(1, 'Address is required'),
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

// Convert referencesSchema to an object containing an array
export const completeReferenceSchema = z.object({
  references: z
    .array(
      z.object({
        name: z.string().optional(),
        title: z.string().optional(),
        organization: z.string().optional(),
        contactInfo: z.string().optional(),
      })
    )
    .length(2),
});

// Combine schemas for certifications
export const certificationsSchema = z.object({
  certifications: z
    .array(
      z.object({
        certificationName: z.string().optional(),
        certifyingOrganization: z.string().optional(),
        yearOfCertification: z.string().optional(),
      })
    )
    .length(2),
});

// Combine schemas for final validation
export const combinedSchema = personalInfoSchema
  .merge(educationSchema)
  .merge(skillsSchema)
  .merge(completeReferenceSchema)
  .merge(certificationsSchema);

// Types for each form step
export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Skills = z.infer<typeof skillsSchema>;
export type References = z.infer<typeof completeReferenceSchema>;
export type Certifications = z.infer<typeof certificationsSchema>;

export type CombinedFormData = PersonalInfo &
  Education &
  Skills &
  References &
  Certifications;
