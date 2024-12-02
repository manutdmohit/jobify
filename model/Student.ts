import mongoose, { Schema } from 'mongoose';
import { z } from 'zod';

// zod schema for a single Student
export const studentSchema = z.object({
  _id: z.string(),
  name: z.string().min(1, 'Student name is required').max(100, 'Name too long'),
  password: z.string().optional(),
  email: z.string().email('Invalid email format').optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  school: z.string().optional(),
  isVerified: z.boolean().optional(),
  createdBy: z.string().optional(),
});

// zod schema for a list of Students
export const studentsSchema = z.array(studentSchema);

// Infer the TypeScript types from the schemas
export type StudentType = z.infer<typeof studentSchema>;
export type Students = z.infer<typeof studentsSchema>;

// Mongoose Schema for the Student model
const StudentSchema: Schema<StudentType> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Student name is required'],
      minlength: 1,
      maxlength: 100,
    },
    email: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    school: {
      type: mongoose.Types.ObjectId,
      ref: 'School',
    },
    isVerified: {
      type: Boolean,
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

// Ensure the model is only created once
const Student =
  (mongoose.models.Student as mongoose.Model<StudentType>) ||
  mongoose.model('Student', StudentSchema);

export default Student;
