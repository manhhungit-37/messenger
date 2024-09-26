'use client';
import { useCallback, useEffect, useState } from 'react';
import { IAuthForm, Variant } from '@app/(site)/types/auth.types';
import { useForm } from 'react-hook-form';
import Input from '@components/Input';
import AuthSocialButton from '../AuthSocialButton';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import toast from 'react-hot-toast';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function AuthForm() {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => currentVariant === 'LOGIN' ? 'REGISTER' : 'LOGIN');
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthForm>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    }
  });

  const onSubmit = useCallback((values: IAuthForm) => {
    setIsLoading(true);

    if (variant === 'REGISTER') {
      axios.post('/api/register', values)
      .then(() => signIn('credentials', {
        ...values,
      }))
      .catch(() => {
        toast.error('Something went wrong!');
      })
      .finally(() => setIsLoading(false));
    }

    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...values,
        redirect: false,
      })
      .then((callback) => {
        if (callback?.ok) {
          toast.success('Logged in');
          router.push('/users');
        }

        if (callback?.error) {
          toast.error(callback.error);
        }
      })
      .finally(() => setIsLoading(false));
    }
  }, [variant, router]);

  const socialAction = useCallback((action: string) => {
    setIsLoading(true);
    signIn(action, { redirect: false })
    .then((callback) => {
      if (callback?.ok) {
        toast.success('Logged in');
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    })
  }, []);

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/users');
    }
  }, [session?.status, router]);

  return (
    <div>
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        {variant === 'LOGIN' ? "Sign in" : "Sign up"}
      </h2> 
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {variant === 'REGISTER' && (
              <Input
                id="name"
                type="text"
                label="Name"
                errors={errors}
                register={register}
              />
            )}
            <Input
              id="email"
              type="email"
              label="Email address"
              errors={errors}
              register={register}
            />
            <Input
              id="password"
              type="password"
              label="Password"
              errors={errors}
              register={register}
            />
            <div>
              <button type="submit" disabled={isLoading} className="flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 w-full text-white bg-sky-500">
                {variant === 'REGISTER' ? 'Register' : 'Sign in'}
              </button>
            </div>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-2.5 flex-items-center">
                <div className="w-full border-t border-gray-300">

                </div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <AuthSocialButton icon={BsGithub} onClick={() => socialAction('github')} />
              <AuthSocialButton icon={BsGoogle} onClick={() => socialAction('google')} />
            </div>
          </div>
          <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
            <div>
              {variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an accout?'}
            </div>
            <div
              className="underline cursor-pointer"
              onClick={toggleVariant} 
            >
              {variant === 'LOGIN' ? 'Create an account' : 'Log in'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthForm