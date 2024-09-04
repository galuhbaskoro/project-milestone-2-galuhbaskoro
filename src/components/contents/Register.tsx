// import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface RegisterUser {
  email: string, 
  name: string,
  password: string,
}

const Register = () => {

  const navigate = useNavigate();

  const handleSubmit = async (values: {
    email: string,
    name: string,
    password: string,
  }) => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/users',{
        method: 'POST',
        body: JSON.stringify({
          email: values.email,
          name: values.name,
          password: values.password,
          role: 'customer',
          avatar: 'https://gravatar.com/avatar/79eaccc1dc565fd1ddb74735b8331972?s=400&d=robohash&r=x'
        }),
        headers: {
          'content-type': 'application/json; charset=UTF-8'
        }
      });
      if(response.ok){
        Swal.fire({
          icon: 'success',
          title: 'your account has been created',
					text: 'please login with out registered account',
          position: 'center',
          showCancelButton: false,
          timer: 1500
        }).then(()=>{
          navigate('/login');
        });
      }else{
        Swal.fire({
          icon: 'error',
          title: 'failed to create account',
          position: 'center',
          showCancelButton: false,
          timer: 1500
        }).then(()=>{
          navigate('/');
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  const formik = useFormik<RegisterUser>({
    initialValues : {
      email: "",
      name: "",
      password: "",
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: Yup.object({
      email: Yup.string().email().required("Email is required").min(5, 'Email minimal 5 character'),
      name: Yup.string().required("Name is required").min(5, 'name minimal 5 character'),
      password: 
      Yup.string().required("Password is required").min(5, 'Password Minimal 5 Character and must on letters and number'),
      // role: Yup.string().required("Role is required & Must be Customer").min(5, 'Role minimal 5 character'),
      // avatar: Yup.string().required("Avatar is required & Must be Url Link").min(5, 'Avatar minimal 5 character'),
    }),
    onSubmit: (values, {setSubmitting}) => {
    	setTimeout( () => {
      	handleSubmit(values);
      	setSubmitting(false);
    }, 400)}
  });

  return(
    <div 
      className="flex flex-wrap flex-row justify-center w-full py-10"
    >
			<div 
        className="flex flex-wrap flex-row w-full md:w-2/4 p-8 justify-center bg-white border border-gray-200 
        rounded-lg shadow-md items-center"
      >
				<form
					onSubmit={formik.handleSubmit}
					className="w-full"
				>
					{/* Title */}
					<div className="mb-5">
						<h2 className="font-bold text-xl text-[#ff8b2d]">Register</h2>
					</div>

					{/* Email */}
					<div className="mb-3">
						<label 
							htmlFor="email" 
							className="mb-2 text-sm font-medium text-gray-900">
							Email
						</label>
						<input 
            	id="email" 
            	name="email" 
            	type="email"
            	onChange={formik.handleChange}
            	onBlur={formik.handleBlur}
            	className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl block 
            	w-full p-2.5"
          	/>
						{formik.touched.email && formik.errors.email && (
            	<div className="text-xs text-red-500 mt-1">{formik.errors.email}</div>
          	)}
					</div>

          {/* Name */}
					<div className="mb-3">
						<label 
							htmlFor="name" 
							className="mb-2 text-sm font-medium text-gray-900">
							Name
						</label>
						<input 
            	id="name" 
            	name="name" 
            	type="text"
            	onChange={formik.handleChange}
            	onBlur={formik.handleBlur}
            	className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl block 
            	w-full p-2.5"
          	/>
						{formik.touched.name && formik.errors.name && (
            	<div className="text-xs text-red-500 mt-1">{formik.errors.name}</div>
          	)}
					</div>

          {/* Role */}
					{/* <div className="mb-3">
						<label 
							htmlFor="role" 
							className="mb-2 text-sm font-medium text-gray-900">
							Role
						</label>
						<input 
            	id="role" 
            	name="role" 
            	type="text"
            	onChange={formik.handleChange}
            	onBlur={formik.handleBlur}
            	className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl block 
            	w-full p-2.5"
          	/>
						{formik.touched.role && formik.errors.role && (
            	<div className="text-xs text-red-500 mt-1">{formik.errors.role}</div>
          	)}
					</div> */}

          {/* Avatar */}
					{/* <div className="mb-3">
						<label 
							htmlFor="role" 
							className="mb-2 text-sm font-medium text-gray-900">
							Avatar
						</label>
						<input 
            	id="avatar" 
            	name="avatar" 
            	type="text"
            	onChange={formik.handleChange}
            	onBlur={formik.handleBlur}
            	className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl block 
            	w-full p-2.5"
          	/>
						{formik.touched.avatar && formik.errors.avatar && (
            	<div className="text-xs text-red-500 mt-1">{formik.errors.avatar}</div>
          	)}
					</div> */}

					{/* Password */}
					<div className="mb-3">
						<label 
							htmlFor="password" 
							className="mb-2 text-sm font-medium text-gray-900">
							Password
						</label>
						<input 
            	id="password" 
            	name="password" 
            	type="password"
            	onChange={formik.handleChange}
            	onBlur={formik.handleBlur}
            	className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl block 
            	w-full p-2.5"
          	/>
						{formik.touched.password && formik.errors.password && (
            	<div className="text-xs text-red-500 mt-1">{formik.errors.password}</div>
          	)}
					</div>

					{/* Submit Button */}
					<div className="mt-5">
          <button
            type="submit" 
            disabled={formik.isSubmitting}
            className="inline-block px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-2xl shadow-sm hover:bg-green-700"
          >
            Register
          </button>
        </div>

				</form>
			</div>
    </div>
  );
}

export default Register;