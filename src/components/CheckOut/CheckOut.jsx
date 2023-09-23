import React from 'react'
import { useContext } from 'react';
import { useFormik } from 'formik'
import { cartContext } from '../../Context/CartContext';

export default function CheckOut() {
    let { onlinePayment, cartId } = useContext(cartContext)
    async function handleSubmit(values) {

        let response = await onlinePayment(cartId, values);
        if (response.data.status === "success")
        console.log(response);
            console.log(response.data.session.url);
        window.location.href = response.data.session.url

    }

    let formik = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: ""
        }, onSubmit: handleSubmit

    })
    return <>
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="details">Details :</label>
                <input type="text" id='details' name='details' className='form-control mb-3' value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} />

                <label htmlFor="phone">Phone :</label>
                <input type="tel" id='phone' name='phone' className='form-control mb-3' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />

                <label htmlFor="city">City :</label>
                <input type="text" id='city' name='city' className='form-control mb-3' value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} />


                <button type='submit' className='btn btn-outline-success  w-100'> Pay <i class="fa-brands fa-cc-visa"></i> </button>

            </form>
        </div>




    </>
}
