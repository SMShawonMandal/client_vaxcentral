import React from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function NewPassword() {
  const {mobileNumber} = useParams()
  const navigate = useNavigate()

  function createNewPass(e) {
    e.preventDefault();
    const pass1 = e.target.pass.value;
    const pass2 = e.target.confirm_pass.value;
    console.log(pass1, pass2)

    if (pass1 === pass2) {
      axios.put('http://localhost:5001/api/user/password', {pass1, mobileNumber})
      .then((response) => {
        console.log(response.data)
        if (response.data.message === "updated") {
          Swal.fire({
            title: 'Success!',
            text: 'Password updated successfully',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            navigate('/login')
          }, 2000)
        }
      })
      .catch((error) => {
        console.log('ami error:', error.response.data);
      })
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Passwords do not match',
      })  
    }
  }
  return (
    <div className='h-screen w-full bg-gradient-to-b from-[#e0f2fa] to-white flex justify-center items-center'>
    <div className='space-y-8 lg:w-[552px] md:w-[400px] w-[350px] max-h-[790px]  bg-white shadow-xl px-12 py-20 rounded-xl'>
        <div>
            <h1 className=' text-xl font-bold text-center'> Set new password </h1>
        </div>
        <form className='' onSubmit={createNewPass}>
            <div className='flex flex-col gap-4 pb-5'>
                <label htmlFor="mobileNumber" className='text-lg'>Password</label>
                <input type="text" id="pass1" name="pass" className='border-b-[1px] bg-transparent border-black focus:outline-none' required />
            </div>
            <div className='flex flex-col gap-4 pb-5'>
                <label htmlFor="mobileNumber" className='text-lg'>Confirm Password</label>
                <input type="text" id="pass2" name="confirm_pass" className='border-b-[1px] bg-transparent border-black focus:outline-none' required />
            </div>
            <div className=''>
                <button className='btn btn-info w-full text-kg font-bold text-white' type='submit'> Continue </button>
            </div>
        </form>
    </div>
</div>
  )
}

export default NewPassword