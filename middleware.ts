import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export { default } from 'next-auth/middleware';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // Define public paths
  const publicPaths = ['/sign-in', '/sign-up', '/verify', '/'];

  // Redirect to sign-in if not authenticated and trying to access protected routes
  if (!token && !publicPaths.some((path) => url.pathname.startsWith(path))) {
    const signInUrl = new URL('/sign-in', request.url);
    signInUrl.searchParams.set('callbackUrl', request.url);
    return NextResponse.redirect(signInUrl);
  }

  // Redirect authenticated users away from public paths to '/dashboard'
  if (token && publicPaths.some((path) => url.pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Allow access if no redirection condition is met
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/sign-in',
    '/sign-up',
    '/',
    '/verify',
    '/dashboard/:path*',
    '/verify/:path*',
  ],
};
