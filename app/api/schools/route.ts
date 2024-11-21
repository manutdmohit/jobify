import dbConnect from '@/lib/dbConnect';
import School from '@/model/School';

export const dynamic = 'force-dynamic';

// @desc Register School
// @route POST /api/schools
export const POST = async (request: Request) => {
  await dbConnect();

  try {
    const data = await request.json();

    const school = new School(data);
    await school.save();
    return new Response(JSON.stringify(school), { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: 'Internal server error' }),
      {
        status: 500,
      }
    );
  }
};

// @desc Get All Schools
// @route GET /api/schools
export const GET = async (request: Request) => {
  try {
    await dbConnect();

    const schools = await School.find().sort({ createdAt: -1 });

    return new Response(JSON.stringify(schools), {
      status: 200,
    });
  } catch (error) {
    console.error(error);

    return new Response('Something went wrong', { status: 500 });
  }
};
