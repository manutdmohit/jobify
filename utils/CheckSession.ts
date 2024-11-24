'use client';

import { useSession } from 'next-auth/react';

export const checkSession = () => {
  const { data: session } = useSession();

  return session;
};
