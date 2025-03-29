import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../context/store";
import { loginFetch } from "../../context/loginSlice";

export type LoginFormData = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.login);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  useEffect(() => {
    if (status === 'login') {
      navigate("/");
    }
  }, [status, navigate]);

  const onSubmit: SubmitHandler<LoginFormData> = async (formData) => {
    try {
      await dispatch(loginFetch(formData)).unwrap();
    } catch (error) {
      // Error is already handled in the slice
    }
  };

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center border-2 border-violet-300 rounded-2xl lg:w-[25%] sm:w-[70%] p-5 bg-violet-600 gap-5 mt-10">
        <div className="flex flex-col items-center">
          <label htmlFor="email" className="text-white font-extrabold">Email</label>
          <input
            id="email"
            type="email"
            className="outline-none border-2 rounded-2xl border-violet-500 w-[100%]"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && <span className="text-white">{errors.email.message}</span>}
        </div>

        <div className="flex flex-col items-center">
          <label className="text-white font-extrabold" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="outline-none border-2 rounded-2xl border-violet-500 w-[100%]"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />
          {errors.password && <span className="text-white">{errors.password.message}</span>}
        </div>

        {error && (
          <div className="text-red-200 text-center">
            {status === 'no_user' ? 'User not found' : error}
          </div>
        )}

        <button
          type="submit"
          className="bg-purple-950 text-white p-2.5 rounded-2xl w-full"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Please wait...' : 'Login'}
        </button>
      </form>
      <h1 className="mt-2">
        If You Don't Have Account?{' '}
        <span 
          className="mt-2 text-violet-600 cursor-pointer hover:underline"
          onClick={() => navigate("/signup")}
        >
          SignUp
        </span>
      </h1>
    </div>
  );
};

export default Login;