import dbConnect from '@/lib/dbConnect';
import School from '@/model/School';
import Student from '@/model/Student';
import User from '@/model/User';

export const GET = async (request: Request) => {
  await dbConnect();

  try {
    const students = await Student.find({}).sort('-createdAt');
    return new Response(JSON.stringify(students), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: 'Internal server error' }),
      {
        status: 500,
      }
    );
  }
};

export const POST = async (request: Request) => {
  await dbConnect();

  const data = await request.json();

  const { email } = data;

  async function checkUserInMultipleModel(identifier: string) {
    const [user, school, student] = await Promise.all([
      User.findOne({ email: identifier }),
      School.findOne({ contactEmail: identifier }),
      Student.findOne({ email: identifier }),
    ]);

    return user || school || student || null;
  }

  try {
    const ifStudentExists = await checkUserInMultipleModel(email);

    if (ifStudentExists) {
      return new Response(
        JSON.stringify({ success: false, message: 'Student already exists' }),
        {
          status: 400,
        }
      );
    }

    const student = await Student.create(data);
    return new Response(JSON.stringify(student), {
      status: 201,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: 'Internal server error' }),
      {
        status: 500,
      }
    );
  }
};
