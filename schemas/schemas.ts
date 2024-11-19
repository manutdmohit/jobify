import { z } from 'zod';

export const personalInfoSchema = z.object({
  fullName: z.string().min(2, 'Full Name is required'),
  email: z.string().email(),
  phone: z.string().regex(/^\d+$/, 'Invalid Number!'),
  address: z.string().min(1, 'Address is required'),
  jobPreference: z.string().min(1, 'Job Preference is required'),
  ppPhoto: z
    .string()
    .nullable()
    .refine(
      (base64) => !base64 || base64.length <= 3 * 1024 * 1024, // Approx. size for 2MB in base64
      'Max file size is 2MB'
    ),
  identityPhoto: z
    .string()
    .nullable()
    .refine(
      (base64) => !base64 || base64.length <= 3 * 1024 * 1024, // Approx. size for 2MB in base64
      'Max file size is 2MB'
    ),
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
  teachingSkills: z
    .object({
      classroomManagement: z.boolean().optional(),
      curriculumDevelopment: z.boolean().optional(),
      lessonPlanning: z.boolean().optional(),
      assessmentTechniques: z.boolean().optional(),
      otherTeachingSkills: z.string().optional(),
    })
    .refine(
      (data) =>
        data.classroomManagement ||
        data.curriculumDevelopment ||
        data.lessonPlanning ||
        data.assessmentTechniques ||
        data.otherTeachingSkills, // Check if any teaching skill is selected or filled
      'Please select or fill in at least one teaching skill'
    ),
  culturalKnowledge: z
    .object({
      knowledgeOfSpecifiCulturesOrTraditions: z.boolean().optional(),
      abilityToTeachCulturalValuesAndPerspectives: z.boolean().optional(),
      fluencyInLanguages: z.boolean().optional(),
      languageDetails: z.string().optional(),
      otherCulturalKnowledge: z.string().optional(),
    })
    .refine(
      (data) =>
        data.knowledgeOfSpecifiCulturesOrTraditions ||
        data.abilityToTeachCulturalValuesAndPerspectives ||
        data.languageDetails ||
        data.otherCulturalKnowledge, // Check if any cultural knowledge is selected or filled

      'Please select or fill in at least one cultural knowledge'
    ),
  interPersonalSkills: z
    .object({
      communicationSkills: z.boolean().optional(),
      empathy: z.boolean().optional(),
      patience: z.boolean().optional(),
      culturalSensitivity: z.boolean().optional(),
      otherInterpersonalSkills: z.string().optional(),
    })
    .refine(
      (data) =>
        data.communicationSkills ||
        data.empathy ||
        data.patience ||
        data.culturalSensitivity ||
        data.otherInterpersonalSkills, // Check if any interpersonal skill is selected or filled
      'Please select or fill in at least one interpersonal skill'
    ),
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

export const sopSchema = z.object({
  statementOfPurpose: z.string().min(50, 'Please provide a brief statement'),
});

// Combine schemas for final validation
export const combinedSchema = personalInfoSchema
  .merge(educationSchema)
  .merge(skillsSchema)
  .merge(sopSchema)
  .merge(completeReferenceSchema)
  .merge(certificationsSchema);

// Types for each form step
export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type Education = z.infer<typeof educationSchema>;
export type TeachingSkills = z.infer<typeof skillsSchema>;
export type References = z.infer<typeof completeReferenceSchema>;
export type Certifications = z.infer<typeof certificationsSchema>;
export type StatementOfPurpose = z.infer<typeof sopSchema>;

export type CombinedFormData = PersonalInfo &
  Education &
  TeachingSkills &
  StatementOfPurpose &
  References &
  Certifications;
