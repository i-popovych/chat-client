import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { authService } from '../../api/services/auth/auth.service';
import { LoginParams } from '../../api/services/auth/libs/types/params/Login.type';
import { userService } from '../../api/services/user/user.service';
import { PrivateRoutes } from '../../components/Routes/libs/constants/privateRoutes.enum';
import { authStorage } from '../../packages/localStorage/authStorage';
import { UserStorageKeys } from '../../packages/localStorage/enums/userStorageKeys.enum';
import { Notification } from '../../packages/notification';
import { setUser } from '../../redux/features/user/userSlice';

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = async (values: LoginParams) => {
    try {
      const response = await authService.login(values);
      const { data: user } = await userService.profile(response.data.authorizationToken);
      dispatch(setUser(user));

      localStorage.setItem(UserStorageKeys.USER, JSON.stringify(user));
      authStorage.setTokens(response.data.authorizationToken, response.data.refreshToken);
      Notification.success('Login successful');

      navigate(PrivateRoutes.SELECT_PROJECT);
    } catch (error) {
      console.error('[REGISTRATION ERROR]', error);
      Notification.error('Login failed');
    } finally {
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values) => {
      onLogin({
        email: values.email,
        password: values.password,
      });
    },
  });

  return (
    <section
      className='body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0 bg-[#a0a0a0]'
      style={{ fontFamily: 'Lato, sans-serif' }}
    >
      <main className='bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl'>
        <section>
          <h3 className='font-bold text-2xl'>Welcome</h3>
          <p className='text-gray-600 pt-2'>Sign in to your account.</p>
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
            <div className='flex justify-end'>
              <a
                href='#'
                className='text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6'
              >
                Forgot your password?
              </a>
            </div>
            <button
              className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200'
              type='submit'
            >
              Sign In
            </button>
            <div className='max-w-lg mx-auto text-center mt-12 mb-6'>
              <p>
                Don't have an account?{' '}
                <Link to='/registration' className='font-bold hover:underline'>
                  Sign up
                </Link>
                .
              </p>
            </div>
          </form>
        </section>
      </main>
    </section>
  );
};
