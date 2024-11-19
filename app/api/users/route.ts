import dbConnect from '@/lib/dbConnect';
import User from '@/model/User';

export const dynamic = 'force-dynamic';

// @desc Register User
// @route POST /api/users
export const POST = async (request: Request) => {
  await dbConnect();

  try {
    const data = await request.json();
    const { email } = data;

    const checkUserExists = await User.findOne({ email });

    if (checkUserExists) {
      return new Response(
        JSON.stringify({ success: false, message: 'User already exists' }),
        { status: 404 }
      );
    }

    const user = new User(data);
    await user.save();
    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: 'Internal server error' }),
      {
        status: 500,
      }
    );
  }
};

// @desc Get All Users
// @route GET /api/users
export const GET = async (request: Request) => {
  try {
    await dbConnect();

    const users = await User.find().sort({ createdAt: -1 });

    return new Response(JSON.stringify(users), {
      status: 200,
    });
  } catch (error) {
    console.error(error);

    return new Response('Something went wrong', { status: 500 });
  }
};
