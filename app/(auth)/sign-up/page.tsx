'use client';

import InputField from '@/components/InputField';
import { Button } from '@/components/ui/button';
import { signUpWithEmail } from '@/lib/actions/auth.actions';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const SignUp = () => {
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
      const result = await signUpWithEmail(data);
      if (result.success) router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <Image
        src='/logo.png'
        alt='Logo'
        width={100}
        height={100}
        className='h-12 w-auto rounded-full mt-4'
      />
      <h2 className='text-3xl font-semibold my-10'>WELCOME!</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5 w-full px-4'>
        {/* Name */}
        <InputField
          name='name'
          label='Name'
          placeholder='Enter your name'
          register={register}
          validation={{ required: 'Name is required', minLength: 2 }}
          error={errors.name}
          disabled={isSubmitting}
        />
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
        <div className='flex items-center justify-center'>
          <Button
            type='submit'
            disabled={isSubmitting}
            className='w-[60%] py-6 bg-blue-primary text-white mt-5 rounded-full cursor-pointer hover:bg-blue-primary/80'
          >
            {isSubmitting ? 'Signing up...' : 'SIGN UP'}
          </Button>
        </div>

        <div className='mt-6 flex items-center justify-center gap-1 flex-col'>
          <p>Already have an account?</p>
          <Link href='/sign-in' className='text-blue-primary'>
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
