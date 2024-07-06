import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function ForgetPassword() {
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target.value
        const phoneNumber = e.target.mobileNumber.value

        axios.post('http://localhost:5001/api/user/phoneNumber', { phoneNumber })
            .then((response) => {
                console.log(response.data.data)
                if (response.data.message === "found") {
                    navigate(`/sendOTP/${response.data.data.mobileNumber}`)

                    form.reset()
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No phone number found',
                    })
                }

            })
            .catch((error) => {
                console.log('ami error:', error);
            });
    }

    return (
        <div className='h-screen w-full bg-gradient-to-b from-[#e0f2fa] to-white flex justify-center items-center'>
            <div className='space-y-8 lg:w-[552px] md:w-[400px] w-[350px] max-h-[790px]  bg-white shadow-xl px-12 py-20 rounded-xl'>
                <div>
                    <h1 className=' text-xl font-bold text-center'> Seearch Phone Number </h1>
                </div>
                <form className='' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-4 pb-5'>
                        <label htmlFor="mobileNumber" className='text-lg'>Phone number</label>
                        <input type="text" id="mobileNumber" name="phoneNumber" className='border-b-[1px] bg-transparent border-black focus:outline-none' required />
                    </div>
                    <div className=''>
                        <button className='btn btn-info w-full text-kg font-bold text-white' type='submit'> SEARCH </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgetPassword
