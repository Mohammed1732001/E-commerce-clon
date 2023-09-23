import React, { useState } from 'react'
import styles from "./Login.module.css"
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'

import { Link, useNavigate } from 'react-router-dom'
export default function Login({saveUserData}) {



  let navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setmessageError] = useState("")
  async function handleLogin(values) {
    setIsLoading(true);
    let { data } = await axios.post("https://route-ecommerce.onrender.com/api/v1/auth/signin", values).catch((errr) => {
      setIsLoading(false);
      setmessageError(`${errr.response.data.message}`)
    })

    if (data.message === "success") {
      localStorage.setItem("userToken", data.token)
      saveUserData()
      setIsLoading(false);
      navigate("/")

    }
  }
  let validation = Yup.object({
    email: Yup.string().required("Email is Required").email("Email is invalied "),
    password: Yup.string().required("Password is Required").matches(/^[A-Z][a-z0-9]{5,10}$/, "password must start with uppercase..."),
  })
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validation,
    onSubmit: handleLogin
  })
  return <>
    <div className='w-75 mx-auto py-4'>
      <h2> Login Now :</h2>
      {messageError.length > 0 ? <div className='alert alert-danger'>{messageError}</div> : null}
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email"> Email :</label>
        <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name='email' id='email' />
        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : null}
        <label htmlFor="password"> Password :</label>
        <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name='password' id='password' />
        {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : null}
        {isLoading ? <button type='button' className='bg-success text-white w-25 rounded border-0 '><i className='fas fa-spinner fa-spin'></i> </button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='bg-success text-white w-25 rounded border-0'>Login </button>}
<Link className='text-danger ' to="/forgetPassword" > ForgetPassword ....?</Link>
      </form>
    </div>
  </>


}
