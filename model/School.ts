import mongoose, { Schema, Document } from 'mongoose';
import { z } from 'zod';

// Schema for a single School
export const schoolSchema = z.object({
  _id: z.string(),
  name: z.string().min(1, 'School name is required').max(100, 'Name too long'), // School name
  address: z.string().optional(), // Optional school address
  establishedYear: z
    .number()
    .int()
    .min(1800, 'Year must be after 1800')
    .max(new Date().getFullYear(), 'Year cannot be in the future')
    .optional(), // Year the school was established
  contactEmail: z.string().email('Invalid email format').optional(), // Optional contact email for the school
  contactPhone: z.string().optional(), // Optional contact phone number
  principalName: z.string().optional(), // Optional name of the principal
  schoolType: z.enum(['Public', 'Private', 'Charter', 'Other']).optional(), // Type of school
  studentCapacity: z.number().min(1).optional(), // Total capacity of students the school can accommodate
  logo: z.string().optional(), // URL or path to the school's logo image
  website: z.string().url().optional(), // School's website URL
  createdBy: z.string().optional(), // Optional creator of the school
  country: z.string().min(1).max(50).optional(), // Country where the school is located
  state: z.string().min(1).max(50).optional(), // State/Province where the school is located
  city: z.string().min(1).max(50).optional(), // City where the school is located
  postalCode: z.string().min(1).max(20).optional(), // Postal code of the school's location
  accreditationStatus: z.boolean().optional(), // Whether the school is accredited or not
  parentSchool: z.string().optional(), // Optional field for schools that are part of a larger system (e.g., school district)
  facilities: z.array(z.string()).optional(), // Array of facilities (e.g., library, gym, playground)
  isVerified: z.boolean().optional(), // Whether the school has been verified by the admin
});

// Schema for a list of Schools
export const schoolsSchema = z.array(schoolSchema);

// Infer the TypeScript types from the schemas
export type School = z.infer<typeof schoolSchema>;
export type Schools = z.infer<typeof schoolsSchema>;

// School Mongoose Schema Definition
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

const School =
  (mongoose.models.School as mongoose.Model<School>) ||
  mongoose.model('School', SchoolSchema);

export default School;
