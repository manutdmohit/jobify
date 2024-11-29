import mongoose, { Schema } from 'mongoose';
import { z } from 'zod';

// Zod schema for a single Class
export const classSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  dates: z.array(
    z.object({
      day: z.string().min(1).max(10).optional(),
      time: z.string().optional(),
    })
  ),
  school: z.string().min(1).max(10).optional(),
  confirmation: z.string().min(1).max(10).optional(),
  payment: z.string().min(1).max(10).optional(),
  students: z.array(z.string().min(1).max(100)).optional(),
});

// Infer the TypeScript type from the Zod schema
export type ClassType = z.infer<typeof classSchema>;

// Sample class data
// const schools: ClassType[] = [
//   {
//     title: 'Mathematics Class',
//     dates: [
//       { day: 'Monday', time: '10:00 AM' },
//       { day: 'Wednesday', time: '2:00 PM' },
//     ],
//     school: '64b23a5f9c09e2ab12345678',
//     confirmation: 'confirmed',
//     payment: 'completed',
//     students: ['John Doe', 'Jane Smith', 'Alice Johnson'],
//   },
//   {
//     title: 'Science Class',
//     dates: [
//       { day: 'Tuesday', time: '11:00 AM' },
//       { day: 'Thursday', time: '1:00 PM' },
//     ],
//     school: '64b23a5f9c09e2ab87654321',
//     confirmation: 'pending',
//     payment: 'pending',
//     students: ['Emily Davis', 'Michael Brown'],
//   },
//   {
//     title: 'History Class',
//     dates: [{ day: 'Friday', time: '3:00 PM' }],
//     school: '64b23a5f9c09e2ab65478901',
//     confirmation: 'confirmed',
//     payment: 'pending',
//     students: ['Sarah Wilson', 'Robert Lee'],
//   },
//   {
//     title: 'English Class',
//     dates: [
//       { day: 'Monday', time: '1:30 PM' },
//       { day: 'Thursday', time: '11:30 AM' },
//     ],
//     school: '64b23a5f9c09e2ab56789012',
//     confirmation: 'confirmed',
//     payment: 'completed',
//     students: ['Chris Evans', 'Diana Prince'],
//   },
//   {
//     title: 'Art Class',
//     dates: [{ day: 'Saturday', time: '4:00 PM' }],
//     school: '64b23a5f9c09e2ab67890123',
//     confirmation: 'pending',
//     payment: 'pending',
//     students: ['Tony Stark', 'Steve Rogers', 'Natasha Romanoff'],
//   },
// ];

// Mongoose schema definition
const ClassSchema: Schema<ClassType> = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Class title is required'],
      minlength: 1,
      maxlength: 100,
    },
    dates: [
      {
        day: {
          type: String,
          required: [true, 'Day is required'],
        },
        time: {
          type: String,
          required: false,
        },
      },
    ],
    school: {
      type: mongoose.Types.ObjectId,
      ref: 'School', // Reference to the School model
    },
    confirmation: {
      type: String,
      default: 'pending',
    },
    payment: {
      type: String,
      default: 'pending',
    },
    students: {
      type: [String],
      required: false,
    },
  },
  { timestamps: true }
);

const Class =
  (mongoose.models.Class as mongoose.Model<any>) ||
  mongoose.model('Class', ClassSchema);

export default Class;
