import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../context/store';
import { signupFetch, User } from '../../context/signupSlice';

// Define the form data type
type SignupFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data,status, error } = useAppSelector((state) => state.signup);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>();

  const onSubmit: SubmitHandler<SignupFormData> = (data) => {
    const signData: User = {
      name: data.name,
      email: data.email,
      password: data.password,
      avatar: 'https://picsum.photos/200', // Default avatar
    };
    dispatch(signupFetch(signData));
    console.log(data)
  };

  const password = watch('password');

  return (
    <div className="flex flex-col items-center mt-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center border-2 border-violet-300 rounded-2xl lg:w-[25%] sm:w-[70%] p-5 bg-violet-600 gap-5"
      >
        {/* Name Field */}
        <div className="flex flex-col items-center w-full">
          <label htmlFor="name" className="text-white font-extrabold">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="outline-none border-2 rounded-2xl border-violet-500 w-full p-2"
            {...register('name', {
              required: 'Name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters',
              },
            })}
          />
          {errors.name && <span className="text-red-500">{errors.name.message}</span>}
        </div>

        {/* Email Field */}
        <div className="flex flex-col items-center w-full">
          <label htmlFor="email" className="text-white font-extrabold">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="outline-none border-2 rounded-2xl border-violet-500 w-full p-2"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </div>

        {/* Password Field */}
        <div className="flex flex-col items-center w-full">
          <label htmlFor="password" className="text-white font-extrabold">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="outline-none border-2 rounded-2xl border-violet-500 w-full p-2"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />
          {errors.password && <span className="text-red-500">{errors.password.message}</span>}
        </div>

        {/* Confirm Password Field */}
        <div className="flex flex-col items-center w-full">
          <label htmlFor="confirmPassword" className="text-white font-extrabold">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            className="outline-none border-2 rounded-2xl border-violet-500 w-full p-2"
            {...register('confirmPassword', {
              required: 'Confirm Password is required',
              validate: (value) => value === password || 'Passwords do not match',
            })}
          />
          {errors.confirmPassword && (
            <span className="text-red-500">{errors.confirmPassword.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="bg-purple-950 text-white p-2.5 rounded-2xl w-full"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>

      {status === 'failed' && <p className="text-red-500 mt-2">{error}</p>}

      <p className="mt-2">
        Already have an account?{' '}
        <span
          className="text-violet-600 cursor-pointer"
          onClick={() => navigate('/login')}
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default Signup;