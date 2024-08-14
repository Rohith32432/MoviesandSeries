import  axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate=useNavigate()
  async function handlesub(e){
    e.preventDefault()
    const from=new FormData(e.target)
    try{
      const {data}=await axios.post('http://localhost:2114/api/login',{
        email:from.get('email'),
        password:from.get('pwd')
      })
      console.log(data);
      if(data.usertoken){
      toast.success('login sucessful', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme:'dark',
        transition: Bounce,
        });
        // navigate('/')
      }
       
    }
    catch(err){
     
      toast.error('incorrect credentials', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme:'dark',
        transition: Bounce,
        });
      
       
    }
  }
  
  

  return (
    <div className=" d-flex flex-column justify-content-center align-items-center  w-100 position-absolute h-100 bg-dark ">
      <h1>Login</h1>
    <form className='w-50 text-start ' onSubmit={handlesub}>
    
      <div className="form-outline mb-4 ">
        <label className="form-label" htmlFor="form2Example1">Email address</label>
        <input type="email" id="form2Example1" name='email' className="form-control bg-dark text-white p-2" />
      </div>
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form2Example2">Password</label>
      <input type="text" id="form2Example1" name='pwd' className="form-control bg-dark text-white p-2" />
      </div>

  
      <div className="row mb-4">
        <div className="col d-flex justify-content-center">
       
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="form2Example31" defaultChecked />
            <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
          </div>
        </div>

        <div className="col">
          {/* Simple link */}
          <a href="#!">Forgot password?</a>
        </div>
      </div>
      <button type="submit" className="btn btn-primary btn-block mb-4" >Sign in</button>

      {/* Register buttons */}
      <div className="text-center">
        <p>Not a member? <Link to="/reg">Register</Link></p>
        <p>or sign up with:</p>
        <button type="button" className="btn btn-link btn-floating mx-1">
          <i className="fab fa-facebook-f"></i>
        </button>

        <button type="button" className="btn btn-link btn-floating mx-1">
          <i className="fab fa-google"></i>
        </button>

        <button type="button" className="btn btn-link btn-floating mx-1">
          <i className="fab fa-twitter"></i>
        </button>

        <button type="button" className="btn btn-link btn-floating mx-1">
          <i className="fab fa-github"></i>
        </button>
      </div>
    </form>
    <ToastContainer/>
</div>
  );
}

export default Login;
