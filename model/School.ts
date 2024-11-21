import mongoose, { Schema, Document } from 'mongoose';

import { z } from 'zod';

// Schema for a single School
export const schoolSchema = z.object({
  name: z.string().min(1, 'School name is required').max(100, 'Name too long'), // School name
  address: z.string().optional(), // Optional school address
  establishedYear: z
    .number()
    .int()
    .min(1800, 'Year must be after 1800')
    .max(new Date().getFullYear(), 'Year cannot be in the future')
    .optional(), // Year the school was established
  contactEmail: z.string().email('Invalid email format').optional(), // Optional contact email for the school
  createdBy: z.string().optional(), // Optional creator of the school
});

// Schema for a list of Schools
export const schoolsSchema = z.array(schoolSchema);

// Infer the TypeScript types from the schemas
export type School = z.infer<typeof schoolSchema>;
export type Schools = z.infer<typeof schoolsSchema>;

const SchoolSchema: Schema<School> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'School name is required'],
      minlength: 1,
      maxlength: 100,
    },
    address: {
      type: String,
      required: false,
    },
    establishedYear: {
      type: Number,
      required: false,
    },

    contactEmail: {
      type: String,
      required: false,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const School =
  (mongoose.models.School as mongoose.Model<School>) ||
  mongoose.model('School', SchoolSchema);

export default School;
