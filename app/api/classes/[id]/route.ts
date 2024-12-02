import dbConnect from '@/lib/dbConnect';
import Class from '@/model/Class';

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  await dbConnect();

  console.log(params.id);

  try {
    const getClass = await Class.findById(params.id);

    if (!getClass) {
      return new Response(
        JSON.stringify({ success: false, message: 'Class not found' }),
        {
          status: 404,
        }
      );
    }

    return new Response(JSON.stringify(getClass), {
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
