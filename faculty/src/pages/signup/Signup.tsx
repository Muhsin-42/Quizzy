import  { useState } from "react";
import { ArrowRight, CloudCog } from "lucide-react";
import { loginUser } from '../../store/slices/userSlice'
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {useFormik} from 'formik'
import * as Yup from 'yup'
import axios from '../../utils/axios'
import { Link,  useNavigate } from "react-router-dom";

const initialValues = {
  fullname: "",
  email: "",
  password: "",
  cpassword: "" 
};

const signUpSchema = Yup.object({
      fullname: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    password: Yup.string()
      .required('Password required')
      .min(8, 'Password must be at least 6 characters long')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one symbol'),

      cpassword: Yup.string()
      .required('Confirm password is required')
      .test('passwords-match', 'Passwords must match', function (value) {
        return value === this.parent.password;
      })
});



export function SignupForm() {

    const navigate = useNavigate();

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values, action) => {
          
          const user = {
              fullname: values.fullname,
              email: values.email,
              password: values.password
          }
  
          try{
              const {data:res} = await axios.post("/api/faculty/register",user)
              navigate('/login')
              action.resetForm();
          }catch(error){
          }
      },
    });
  



    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
  

    // const handleLogin = () =>{
    //     dispatch(loginUser({name: fullname,email,password}))    
    // }


    return (
        <section>
          <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
              <h2 className="text-center text-2xl font-bold leading-tight text-black">
                Sign up to create account
              </h2>
              <p className="mt-2 text-center text-base text-gray-600">
                Already have an account?{' '}
                <Link to={'/login'} className="font-medium text-black transition-all duration-200 hover:underline">
                  Sign In</Link>
              </p>
              <form action="#"  className="mt-8" onSubmit={handleSubmit}>
                <div className="space-y-5">
                  <div>
                    <label htmlFor="name" className="text-base font-medium text-gray-900">
                      {' '}
                      Full Name{' '}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text" placeholder="Full Name" id="fullname"
                        value={values.fullname} onChange={handleChange} onBlur={handleBlur}
                      ></input>
                      {errors.fullname && touched.fullname ? ( <p className="text-red-500">{errors.fullname}</p> ) : null}
                    </div>
                  </div>
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
                      {errors.email && touched.email ? ( <p className="text-red-500">{errors.email}</p> ) : null}
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
                      {errors.password && touched.password ? ( <p className="text-red-500">{errors.password}</p> ) : null}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="text-base font-medium text-gray-900">
                        {' '}
                        Confirm Password{' '}
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="password" placeholder="Password" id="cpassword" 
                        value={values.cpassword} onChange={handleChange} onBlur={handleBlur}
                        ></input>
                        {errors.cpassword && touched.cpassword ? ( <p className="text-red-500">{errors.cpassword}</p> ) : null}
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    >
                      Create Account <ArrowRight className="ml-2" size={16} />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
    );
}
