'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDebounceCallback } from 'usehooks-ts';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';

import { signInSchema } from '@/schemas/signInSchema';
import { ApiResponse } from '@/types/ApiResponse';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { signIn, getSession } from 'next-auth/react';

import { useSession } from 'next-auth/react';
import { User } from 'next-auth';

const SigninPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (session) {
    const role = session.user.role;
    let destination = '/dashboard';
    if (role === 'admin') {
      destination = '/admin/dashboard';
    } else if (role === 'school') {
      destination = '/schools/dashboard';
    } else if (role === 'tutor') {
      destination = '/tutors/dashboard';
    }
    router.replace(destination);
  }
  // zod implementation
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    // Trigger signIn with credentials and prevent redirection
    const result = await signIn('credentials', {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });
    console.log({ result });

    if (result?.error) {
      // Handle errors
      if (result.error === 'CredentialsSignin') {
        toast({
          title: 'Login Failed',
          description: 'Incorrect username or password',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
      }
    } else {
      // Retry fetching the session
      let retries = 5;
      let sessionData = session;
      while (!sessionData && retries > 0) {
        await new Promise((res) => setTimeout(res, 500)); // Wait 500ms
        sessionData = await getSession();
        retries--;
      }

      console.log('Session after login:', sessionData);
      if (sessionData) {
        const role = sessionData.user.role;
        let destination = '/dashboard';
        if (role === 'admin') {
          destination = '/admin/dashboard';
        } else if (role === 'school') {
          destination = '/schools/dashboard';
        } else if (role === 'tutor') {
          destination = '/tutors/dashboard';
        }
        router.replace(destination);
      } else {
        toast({
          title: 'Error',
          description: 'Failed to retrieve session. Please try again.',
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <div className="w-auto md:w-full  flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md mt-10">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Jobify
          </h1>
          <p className="mb-4">Sign in to start your journey with us</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email"
                      className="focus-visible:ring-transparent"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="password"
                      type="password"
                      {...field}
                      className="focus-visible:ring-transparent"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              //   isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              Signin
            </Button>
          </form>
        </Form>
        {/* <div className="text-center mt-4">
          <p>Want to be a member?</p>
          <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
            Sign Up
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default SigninPage;
