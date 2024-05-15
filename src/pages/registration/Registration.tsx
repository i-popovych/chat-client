import { useFormik } from 'formik';
import * as Yup from 'yup';

import { authService } from '../../api/services/auth/auth.service';
import { SignUp } from '../../api/services/auth/libs/types/params/Signup.type';
import { Notification } from '../../packages/notification';

export const Registration = () => {
  const onRegistration = async (values: SignUp) => {
    try {
      await authService.registration(values);
      Notification.success('Registration successful');
    } catch (error) {
      console.error('[REGISTRATION ERROR]', error);
      Notification.error('Registration failed');
    } finally {
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
    }),
    onSubmit: (values) => {
      onRegistration({
        email: values.email,
        username: values.username,
        password: values.password,
      });
    },
  });

  return (
    <section
      className='body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0'
      style={{ fontFamily: 'Lato, sans-serif' }}
    >
      <header className='max-w-lg mx-auto'>
        <a href='#'>
          <h1 className='text-4xl font-bold text-white text-center'>Startup</h1>
        </a>
      </header>

      <main className='bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl'>
        <section>
          <h3 className='font-bold text-2xl'>Join Startup</h3>
          <p className='text-gray-600 pt-2'>Create your account.</p>
        </section>

        <section className='mt-10'>
          <form className='flex flex-col' onSubmit={formik.handleSubmit}>
            <div className='mb-6 pt-3 rounded bg-gray-200'>
              <label className='block text-gray-700 text-sm font-bold mb-2 ml-3' htmlFor='email'>
                Email
              </label>
              <input
                type='text'
                id='email'
                name='email'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className='bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3'
              />
              {formik.touched.email && formik.errors.email && (
                <div className='text-red-500 text-sm'>{formik.errors.email}</div>
              )}
            </div>
            <div className='mb-6 pt-3 rounded bg-gray-200'>
              <label className='block text-gray-700 text-sm font-bold mb-2 ml-3' htmlFor='username'>
                Username
              </label>
              <input
                type='text'
                id='username'
                name='username'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                className='bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3'
              />
              {formik.touched.username && formik.errors.username && (
                <div className='text-red-500 text-sm'>{formik.errors.username}</div>
              )}
            </div>
            <div className='mb-6 pt-3 rounded bg-gray-200'>
              <label className='block text-gray-700 text-sm font-bold mb-2 ml-3' htmlFor='password'>
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className='bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3'
              />
              {formik.touched.password && formik.errors.password && (
                <div className='text-red-500 text-sm'>{formik.errors.password}</div>
              )}
            </div>
            <div className='mb-6 pt-3 rounded bg-gray-200'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2 ml-3'
                htmlFor='confirmPassword'
              >
                Confirm Password
              </label>
              <input
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                className='bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3'
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <div className='text-red-500 text-sm'>{formik.errors.confirmPassword}</div>
              )}
            </div>
            <button
              className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200'
              type='submit'
            >
              Sign Up
            </button>
            <div className='max-w-lg mx-auto text-center mt-12 mb-6'>
              <p>
                Already have an account?{' '}
                <a href='#' className='font-bold hover:underline'>
                  Sign in
                </a>
                .
              </p>
            </div>
          </form>
        </section>
      </main>
    </section>
  );
};
