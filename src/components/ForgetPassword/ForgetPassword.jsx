import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from "yup"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function ForgetPassword() {

    const [CodeFlag,setCode] = useState(true)
    const [errorMsg,seterrorMsg] = useState("")
    let navigate = useNavigate()

    let validationSchema = Yup.object({
        email: Yup.string().required().email("Enter valid email")
    })


    let form1 = useFormik({
        initialValues: {
            email: ""
        }, onSubmit: (vals) => {
            console.log(vals);
            forgetPasswordApi(vals)
        }, validationSchema
    })







    let form2 = useFormik({
        initialValues: {
            resetCode: ""
        }, onSubmit: (vals) => {
            console.log(vals);
            resetCodeApi(vals)
        }
    })





    async function forgetPasswordApi(valsObj) {
        let { data } = await axios.post("https://route-ecommerce.onrender.com/api/v1/auth/forgotPasswords", valsObj)
        console.log(data);
        if(data.statusMsg=="success"){
            setCode(false)
        }
    }








    async function resetCodeApi(valsObj) {
        let { data } = await axios.post("https://route-ecommerce.onrender.com/api/v1/auth/verifyResetCode", valsObj).catch((erro)=>{
            seterrorMsg(erro.response.data.message)
            
        
        })
        console.log(data);
        if(data.status ==  "Success" ){
            navigate("/ResetPassword")
        }
        
    }


    return <>

        {CodeFlag ? <form onSubmit={form1.handleSubmit}>
            <div className='w-75 m-auto'>
                <label htmlFor="email">Email :</label>
                <input onChange={form1.handleChange} type="email" name='email' id='email' className='form-control' />
                <p className='text-danger'>{form1.errors.email}</p>
                <button className='w-25 bg-success text-white border-0'>Send Massege </button>

            </div>

        </form>
            :
            <form onSubmit={form2.handleSubmit} >
                <div className='w-75 m-auto'>
                    <label htmlFor="resetCode">Reset Code :</label>
                    <input onChange={form2.handleChange} type="text" name='resetCode' id='resetCode' className='form-control' />
         {errorMsg!=""?<div className='alert mt-2 alert-danger'>{errorMsg}</div>: ""}   
                    <button className='w-25 bg-success text-white border-0 '>verify Code </button>

                </div>

            </form>
        }







    </>
}
