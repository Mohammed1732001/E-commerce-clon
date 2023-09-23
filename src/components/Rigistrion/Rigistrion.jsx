import React, { useState } from 'react'
import styles from "./Rigistrion.module.css"
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Rigistrion() {



  let navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setmessageError] = useState("")
  async function handleRigister(values) {
    setIsLoading(true);
    let { data } = await axios.post("https://route-ecommerce.onrender.com/api/v1/auth/signup", values).catch((errr) => {
      setIsLoading(false);
      setmessageError(`${errr.response.data.message}`)
    })

    if (data.message === "success") {
      setIsLoading(false);
      navigate("/login")

    }

  }
  let validation = Yup.object({
    name: Yup.string().required("Name is Required").min(3, "Minmum 3 charcter").max(10, "Maxmum 10 charcter "),
    email: Yup.string().required("Email is Required").email("Email is invalied "),
    password: Yup.string().required("Password is Required").matches(/^[A-Z][a-z0-9]{5,10}$/, "password must start with uppercase..."),
    rePassword: Yup.string().required("RePassword is Required").oneOf([Yup.ref("password")], "RePassword not match"),
    phone: Yup.string().required("Phone is Required").matches(/^01[0125][0-9]{8}$/, "phone is in valied"),


  })
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    validationSchema: validation,
    onSubmit: handleRigister


  })
  return <>
    <div className=' py-4'>

      <h2> Rigister Now :</h2>
      {messageError.length > 0 ? <div className='alert alert-danger'>{messageError}</div> : null}
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name"> Name :</label>
        <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" name='name' id='name' />
        {formik.errors.name && formik.touched.name ? <div className='alert alert-danger'>{formik.errors.name}</div> : null}
        <label htmlFor="email"> Email :</label>
        <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name='email' id='email' />
        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : null}
        <label htmlFor="password"> Password :</label>
        <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name='password' id='password' />
        {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : null}
        <label htmlFor="rePassword"> RePassword :</label>
        <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="Password" name='rePassword' id='rePassword' />
        {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger'>{formik.errors.rePassword}</div> : null}
        <label htmlFor="phone"> Phone :</label>
        <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name='phone' id='phone' />
        {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger'>{formik.errors.phone}</div> : null}
        {isLoading ? <button type='button' className=' bg-success text-white border-0 '><i className='fas fa-spinner fa-spin'></i> </button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='bg-success text-white w-25 rounded border-0 '>Rigister </button>}


      </form>

    </div>

  </>


}
