import { getServerSession, User } from 'next-auth';
import dbConnect from '@/lib/dbConnect';
import School from '@/model/School';
import { authOptions } from '../auth/[...nextauth]/options';

export const dynamic = 'force-dynamic';

export function createJsonResponse(body: object, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export const POST = async (request: Request) => {
  await dbConnect();

  const session = await getServerSession(authOptions);

  const user: User = session?.user as User;

  if (!session || !user || user.role !== 'admin') {
    return createJsonResponse(
      { success: false, message: 'Not Authenticated' },
      401
    );
  }

  try {
    const data = await request.json();
    console.log(data);

    const getSchoolByEmail = await School.findOne({
      contactEmail: data.contactEmail,
    });

    if (getSchoolByEmail) {
      return createJsonResponse(
        {
          success: false,
          message: 'School with the same email already exists',
        },
        400
      );
    }
    const school = new School({ ...data, createdBy: user._id });
    await school.save();
    return createJsonResponse({ success: true, school }, 201);
  } catch (error) {
    console.error('Error saving school:', error);
    return createJsonResponse(
      { success: false, message: 'Internal server error' },
      500
    );
  }
};

export const GET = async (request: Request) => {
  try {
    await dbConnect();

    const schools = await School.find().sort({ createdAt: -1 });
    return createJsonResponse(schools, 200);
  } catch (error) {
    console.error('Error fetching schools:', error);
    return createJsonResponse(
      { success: false, message: 'Something went wrong' },
      500
    );
  }
};
