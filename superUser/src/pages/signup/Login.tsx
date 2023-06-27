import { ArrowRight } from "lucide-react";
import { loginUser } from '../../store/slices/userSlice'
import { useDispatch } from "react-redux";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from '../../utils/axios'
import { Link } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
};

const signUpSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password required')
});



export function Login() {

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values, action) => {
        const user = {
          email: values.email,
          password: values.password
        }
        try {
          const { data } = await axios.post("/api/superuser/login", user)
          dispatch(loginUser(data))
          action.resetForm();
        } catch (error) {
        }
      },
    });




  const dispatch = useDispatch();


  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="shadow-2xl py-10 lg:px-10 sm:px-3 px-3  xl:w-6/12 md:w-7/12 sm:w-11/12 w-11/12 rounded-2xl">
          <h2 className="text-center text-2xl font-bold leading-tight text-black">Sign in to your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600 ">
            Don&apos;t have an account?{' '}
            <Link to={'/register'} className="font-semibold text-black transition-all duration-200 hover:underline">
              Create a free account
            </Link>
          </p>
          <form action="#" className="mt-8" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="text-base font-medium text-gray-900">
                  {' '}
                  Email address{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    id="email"
                    value={values.email} onChange={handleChange} onBlur={handleBlur}
                  ></input>
                  {errors.email && touched.email ? (<p className="text-red-500">{errors.email}</p>) : null}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-base font-medium text-gray-900">
                    {' '}
                    Password{' '}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password" placeholder="Password" id="password"
                    value={values.password} onChange={handleChange} onBlur={handleBlur}
                  ></input>
                  {errors.password && touched.password ? (<p className="text-red-500">{errors.password}</p>) : null}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Login <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
