'use server';

import { headers } from 'next/headers';
import { auth } from '../better-auth/auth';

export const signUpWithEmail = async () => {};

export const signInWithEmail = async () => {};

export const signOut = async () => {
  try {
    await auth.api.signOut({ headers: await headers() });
  } catch (error) {
    console.log('Sign out failed', error);
    return { success: false, error: 'Sign out failed' };
  }
};
