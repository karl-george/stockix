'use client';

import InputField from '@/components/InputField';
import { Button } from '@/components/ui/button';
import { signInWithEmail } from '@/lib/actions/auth.actions';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const router = useRouter();

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const result = await signInWithEmail(data);
      if (result.success) router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Sign In</h1>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
        {/* Email */}
        <InputField
          name='email'
          label='Email'
          placeholder='Enter your email'
          register={register}
          validation={{
            required: 'Email is required',
            pattern: /^\w+@\w+\.\w+$/,
            message: 'Please enter a valid email',
          }}
          error={errors.email}
          disabled={isSubmitting}
        />
        {/* Password */}
        <InputField
          name='password'
          label='Password'
          placeholder='Enter your password'
          type='password'
          register={register}
          validation={{ required: 'Password is required', minLength: 8 }}
          error={errors.password}
          disabled={isSubmitting}
        />
        {/* Submit Button */}
        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
    </>
  );
};

export default SignIn;
