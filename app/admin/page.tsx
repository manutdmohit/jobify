'use client';

import { checkSession } from '@/utils/CheckSession';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();
  const session = checkSession();

  useEffect(() => {
    if (!session) {
      return router.push('/sign-in');
    }
  }, [session]);

  return <div>page</div>;
};

export default page;
