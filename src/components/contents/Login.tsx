import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface LoginUser {
  email: string, 
  password: string,
}

const Login = () => {
  
  const navigate = useNavigate();

  const handleSubmit = async (values: {
    email: string,
    password: string,
  }) => {
    try {
      
      const response = await fetch('https://api.escuelajs.co/api/v1/auth/login',{
        method: 'POST',
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
        headers: {
          'content-type': 'application/json; charset=UTF-8'
        }
      });

      if(response.ok){
        const result = await response.json();
        localStorage.setItem('login', result.access_token);
        Swal.fire({
          icon: 'success',
          title: 'Your Credential is valid',
          position: 'center',
          showCancelButton: false,
          timer: 1500
        }).then(()=>{
          navigate('/');
        });
      }else{
        Swal.fire({
          icon: 'error',
          title: 'failed to Login',
          position: 'center',
          showCancelButton: false,
          timer: 1500
        }).then(()=>{
          navigate('/login');
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  const formik = useFormik<LoginUser>({
    initialValues : {
      email: "",
      password: "",
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: Yup.object({
      email: Yup.string().email().required("Email is required").min(5, 'Email minimal 5 character'),
      password: 
      Yup.string().required("Password is required").min(5, 'Password Minimal 5 Character and must on letters and number')
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
						<h2 className="font-bold text-xl text-[#ff8b2d]">Login</h2>
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
            Login
          </button>
        </div>

				</form>
			</div>
    </div>
  );
}

export default Login;