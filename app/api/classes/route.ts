import dbConnect from '@/lib/dbConnect';
import Class from '@/model/Class';

export const GET = async (req: Request) => {
  await dbConnect();

  try {
    const classes = await Class.find({}).sort('-createdAt');
    return new Response(JSON.stringify(classes), {
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
