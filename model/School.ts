import mongoose, { Schema, Document } from 'mongoose';
import { z } from 'zod';

// Zod schema for a single School
export const schoolSchema = z.object({
  _id: z.string(),
  name: z.string().min(1, 'School name is required').max(100, 'Name too long'),
  password: z.string().min(6, 'Please provide password'),
  address: z.string().optional(),
  establishedYear: z
    .number()
    .int()
    .min(1800, 'Year must be after 1800')
    .max(new Date().getFullYear(), 'Year cannot be in the future')
    .optional(),
  contactEmail: z.string().email('Invalid email format').optional(),
  contactPhone: z.string().optional(),
  principalName: z.string().optional(),
  schoolType: z.enum(['Public', 'Private', 'Charter', 'Other']).optional(),
  studentCapacity: z.number().min(1).optional(),
  logo: z.string().optional(),
  website: z.string().url().optional(),
  createdBy: z.string().optional(),
  country: z.string().min(1).max(50).optional(),
  state: z.string().min(1).max(50).optional(),
  city: z.string().min(1).max(50).optional(),
  postalCode: z.string().min(1).max(20).optional(),
  accreditationStatus: z.boolean().optional(),
  parentSchool: z.string().optional(),
  facilities: z.array(z.string()).optional(),
  isVerified: z.boolean().optional(),
});

// Zod schema for a list of Schools
export const schoolsSchema = z.array(schoolSchema);

// Infer the TypeScript types from the schemas
export type SchoolType = z.infer<typeof schoolSchema>;
export type Schools = z.infer<typeof schoolsSchema>;

// Mongoose Schema for the School model
const SchoolSchema: Schema<SchoolType> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'School name is required'],
      minlength: 1,
      maxlength: 100,
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      minlength: 6,
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
    contactPhone: {
      type: String,
      required: false,
    },
    principalName: {
      type: String,
      required: false,
    },
    schoolType: {
      type: String,
      enum: ['Public', 'Private', 'Charter', 'Other'],
      required: false,
    },
    studentCapacity: {
      type: Number,
      required: false,
    },
    logo: {
      type: String,
      required: false,
    },
    website: {
      type: String,
      required: false,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    country: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    postalCode: {
      type: String,
      required: false,
    },
    accreditationStatus: {
      type: Boolean,
      required: false,
    },
    parentSchool: {
      type: String,
      required: false,
    },
    facilities: {
      type: [String],
      required: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure the model is only created once
const School =
  (mongoose.models.School as mongoose.Model<SchoolType>) ||
  mongoose.model('School', SchoolSchema);

export default School;
