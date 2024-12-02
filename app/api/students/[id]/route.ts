import dbConnect from '@/lib/dbConnect';
import School from '@/model/School';
import Student from '@/model/Student';
import User from '@/model/User';

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  await dbConnect();

  try {
    const student = await Student.findById(params.id);

    if (!student) {
      return new Response(
        JSON.stringify({ success: false, message: 'Student not found' }),
        {
          status: 404,
        }
      );
    }

    return new Response(JSON.stringify(student), {
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

export const PUT = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  await dbConnect();

  const { id } = params;
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
    const student = await Student.findById(id);

    if (!student) {
      return new Response(
        JSON.stringify({ success: false, message: 'Student not found' }),
        {
          status: 404,
        }
      );
    }

    const ifStudentExists = await checkUserInMultipleModel(email);

    if (ifStudentExists && email !== student.email) {
      return new Response(
        JSON.stringify({ success: false, message: 'Student already exists' }),
        {
          status: 400,
        }
      );
    }

    const updatedStudent = await Student.findByIdAndUpdate(id, data, {
      new: true,
    });

    return new Response(JSON.stringify(updatedStudent), {
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
