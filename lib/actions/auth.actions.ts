'use server';

import { headers } from 'next/headers';
import { auth } from '../better-auth/auth';

export const signUpWithEmail = async ({
  email,
  password,
  name,
}: SignUpFormData) => {
  try {
    const response = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });

    return { success: true, data: response };
  } catch (error) {
    console.error('Sign up failed', error);
    return { success: false, error: 'Sign up failed' };
  }
};

export const signInWithEmail = async ({ email, password }: SignInFormData) => {
  try {
    const response = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return { success: true, data: response };
  } catch (error) {
    console.error('Sign in failed', error);
    return { success: false, error: 'Sign in failed' };
  }
};

export const signOut = async () => {
  try {
    await auth.api.signOut({ headers: await headers() });
  } catch (error) {
    console.log('Sign out failed', error);
    return { success: false, error: 'Sign out failed' };
  }
};
