import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/CartContext'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom';
import $ from "jquery"
export default function Cart() {
  let { getLogUserCart, removeProduct, updateCount , setnumOfCartItems } = useContext(cartContext)
  const [cartDitales, setCartDitales] = useState(null)
  async function getCart() {
    let response = await getLogUserCart()
    if (response.data.status === "success") {
      setCartDitales(response.data.data)
      $(".loading").fadeOut(2000)
    }
  }

  async function deleteProduct(productId) {
    let response = await removeProduct(productId)
    setCartDitales(response.data.data)
    setnumOfCartItems(response.data.numOfCartItems)
    toast("Product Removed")
    
  }
  async function updateProductCount(productId, count) {
    let response = await updateCount(productId, count)
    setCartDitales(response.data.data)
    toast("Product Count Updated ")
    
  }
  useEffect(() => {
    getCart()
  }, [])
  return <>
    <div className='position-fixed top-0 end-0 bg-success start-0 bottom-0 loading '>
      <i className='fa-solid fa-spinner fa-spin fa-4x text-white  '></i>
    </div>
    {
      cartDitales !== null ?
        <div className='bg-light  p-4 my-4'>
          <h3 className='fw-bold fs-2'>Shop Cart : </h3>
          <h6 className='text-success fw-bold fs-3  mb-3 '>Total Cart Price :{cartDitales.totalCartPrice} EGP </h6>
          {cartDitales.products.map((product) => <div key={product.product._id} className='row align-items-center border-bottom py-2 my-2'>
            <div className='col-md-2'>
              <img src={product.product.imageCover} className='w-100' alt="" />
            </div>
            <div className='col-md-10 d-flex justify-content-between'>
              <div>
                <h6 className='fw-bold fs-3'>{product.product.title}</h6>
                <h6 className='text-success fw-bold fs-4'>Price : {product.price}</h6>
                <button onClick={() => deleteProduct(product.product._id)} className=' btn m-0 p-0'><i className='text-danger fa-regular fa-trash-can'></i> Remove </button>
              </div>
              <div>
                <button onClick={() => updateProductCount(product.product._id, product.count + 1)} className='btn btn-success btn-sm'>+</button>
                <span className='mx-2'>{product.count}</span>
                <button onClick={() => updateProductCount(product.product._id, product.count - 1)} className='btn btn-success btn-sm'>-</button>
              </div>
            </div>
          </div>)}
          <button className='btn btn-success'>
            <Link className='text-white' to={"/checkout"} >
              Check Out <i class="fa-brands fa-cc-visa"></i>
            </Link>
          </button>
        </div> : null}
  </>


}
