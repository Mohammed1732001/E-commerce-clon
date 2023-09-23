import React, { useState } from 'react'

import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function ResetPassword() {
 

    let navigate = useNavigate()
    let validation = Yup.object({
        email: Yup.string().required("Email is Required").email("Email is invalied "), 
        newPassword: Yup.string().required("NewPassword is Required").matches(/^[A-Z][a-z0-9]{5,10}$/, "NewPassword must start with uppercase..."),
      })
      let formik = useFormik({
        initialValues: {
          email: "",
          newPassword: "",
        },
        validationSchema: validation,
        onSubmit: resetPasswordApi
      })

async function resetPasswordApi(objData){
let {data}=await axios.put("https://route-ecommerce.onrender.com/api/v1/auth/resetPassword",objData)
console.log(data);
if (data.token){
    navigate("/login")

}
      }

    
    return <>
    
    <form className='' onSubmit={formik.handleSubmit}>
        <label htmlFor="email"> Email :</label>
        <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name='email' id='email' />
        {formik.errors.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : null}
        <label htmlFor="newPassword"> NewPassword :</label>
        <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name='newPassword' id='newPassword' />
        {formik.errors.newPassword ? <div className='alert alert-danger'>{formik.errors.newPassword}</div> : null}
     <button  type='submit' className='btn bg-main text-white '>Update Password </button>
      </form>

    
    </>
}

