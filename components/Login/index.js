import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All field is required", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
    });
      return;
    }

    try {
      const res = await axios.post('http://127.0.0.1:8000/login/', { username: email, password: password });
      if (res.status === 200) {
        const token = res.data.token;
        Cookies.set('token', token);
        router.reload();

        // Add the token to all outgoing requests
        axios.interceptors.request.use(
          function (config) {
            const token = Cookies.get('token');
            if (token) {
              config.headers.Authorization = `Token ${token}`;
            }
            return config;
          },
          function (error) {
            return Promise.reject(error);
          }
        );
        return token;
      }


    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(err.response.data.error, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
      });
      } else {
        toast.error("An error occurred. Please try again later.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
      });
      }
    }

  }

  return <>
  <ToastContainer />
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='w-[25%] p-5 border-t-4 border-green-400 rounded-md bg-slate-50'>
        <div className='text-xl font-bold mb-6'>Login</div>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor="email" className='font-semibold'> Email </label> <br></br>
            <input type="text" id="email" name="email" className='w-full mt-2 p-2 border border-slate-500 rounded-md' placeholder='johnDoe@gmail.com'
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label htmlFor="password" className='font-semibold'> Password </label>
            <input type="password" id="password" className='w-full mt-2 p-2 border border-slate-500 rounded-md' placeholder='*******'
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className='flex justify-between mb-4'>
            <button className='bg-green-600 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded'
              type='submit'
            >Login</button>
          </div>


          <div className='w-full text-right'>
            <span>Don't have an account? <Link href={"/register"} className='underline'>Register</Link></span>
          </div>
        </form>
      </div>

    </main>
  </>
}

export default Login