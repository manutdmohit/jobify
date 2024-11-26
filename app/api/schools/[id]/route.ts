import dbConnect from '@/lib/dbConnect';
import School from '@/model/School';
import { createJsonResponse } from '../route';

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await dbConnect();

    const school = await School.findById(params.id);

    if (!school) {
      return new Response(
        JSON.stringify({ success: false, message: 'School not found' }),
        {
          status: 404,
        }
      );
    }

    return new Response(JSON.stringify(school), {
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching school:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Something went wrong' }),
      {
        status: 500,
      }
    );
  }
};

// Check here body.contactEmail is not present in the request body
// Check here body.contactEmail is equal to the school.contactEmail
// If not check the DB for the body email
export const PUT = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await dbConnect();

    const data = await request.json();
    console.log(data);

    const school = await School.findById(params.id);

    if (!school) {
      return createJsonResponse(
        { success: false, message: 'School not found' },
        404
      );
    }

    const isContactEmailSame = school.contactEmail === data.contactEmail;
    if (!isContactEmailSame) {
      const checkIfEmailExists = await School.findOne({
        contactEmail: data.contactEmail,
      });

      if (checkIfEmailExists) {
        return createJsonResponse(
          {
            success: false,
            message: 'SChool with same email already present',
          },
          400
        );
      }
    }

    const updatedSchool = await School.findByIdAndUpdate(params.id, data, {
      new: true,
    });

    if (!updatedSchool) {
      return createJsonResponse(
        { success: false, message: 'Something went wrong' },
        500
      );
    }

    return createJsonResponse({ success: true, school: updatedSchool }, 200);
  } catch (error) {
    console.error('Error updating school:', error);
    return createJsonResponse(
      { success: false, message: 'Internal server error' },
      500
    );
  }
};
