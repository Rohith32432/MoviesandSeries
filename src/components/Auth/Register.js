import  axios  from 'axios';
import React, { useState } from 'react';
import {  Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert'
import { Bounce, ToastContainer, toast } from 'react-toastify';
function Register() {
  const [err,seterr]=useState({show:false,data:''})
  const handelsubmit= async(e)=>{
    e.preventDefault()
    const form=new FormData(e.target)
    const name=form.get('name')
    const password=form.get('pwd')
    const email=form.get('email')
    const age=form.get('age')
   try{

     const res=await axios.post('http://localhost:2114/api/createuser',{
       name,age,email,password
     })
     if(res.status===200){
       toast.success('regestration sucessful', {
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
   catch(err){
   seterr({
    show:true,
    data:err.response.data.desc
   })
   

    
  }
}

  return (
    <div className=" d-flex flex-column justify-content-center align-items-center  w-100 position-absolute h-100 bg-dark ">
      <h1>Register</h1>
    <form className='w-50 text-start 'onSubmit={handelsubmit} >
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form2Example2">name</label>
      <input type="text" id="form2Example1" name='name' className="form-control bg-dark text-white p-2" />
      </div>
      <div className="form-outline mb-4 ">
        <label className="form-label" htmlFor="form2Example1">Email address</label>
        <input type="email" id="form2Example1" name='email' className="form-control bg-dark text-white p-2" />
      </div>
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form2Example2">age</label>
      <input type="text" id="form2Example1" name='age' className="form-control bg-dark text-white p-2" />
      </div>
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form2Example2">Password</label>
      <input type="text" id="form2Example1" name='pwd' className="form-control bg-dark text-white p-2" />
      </div>
      <button type="submit" className="btn btn-primary btn-block mb-4" >Sign in</button>
      <div className="text-center">
        <p>Not a member? <Link to="/login">Login</Link></p>
      </div>
        <Alert variant='danger' show={err.show} closeVariant='white'>
         {err.data}
        </Alert>
    </form>
    <ToastContainer/>
</div>
  );
}

export default Register;
