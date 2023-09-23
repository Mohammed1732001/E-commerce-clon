import React, { useContext, useEffect, useState } from 'react'
import axios, { Axios } from 'axios'
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
import $ from "jquery"
import { toast } from 'react-hot-toast';
export default function Product() {


  const [products, setProducts] = useState([])


  let { addToCart, setnumOfCartItems } = useContext(cartContext)
  async function addProduct(productId) {

      let response = await addToCart(productId);
      if (response?.data?.status === "success") {
          setnumOfCartItems(response.data.numOfCartItems)

          toast.success(response.data.message, { duration: 2000 })
      } else {
          toast.error("Error", { duration: 2000 })
      }


      console.log(response);

  }





  async function getProducts() {
      let { data } = await axios.get("https://route-ecommerce.onrender.com/api/v1/products")
      setProducts(data.data);
      $(".loading").fadeOut(2000)
      // console.log(data.data)
  }

  useEffect(() => {
      getProducts()
  }, [])





return <>


  <div className='position-fixed top-0 end-0 bg-success start-0 bottom-0 loading '>
      <i className='fa-solid fa-spinner fa-spin fa-4x text-white  '></i>
  </div>
  <div className=''>
      <div className='row'>
          {products.map((products) => <div key={products._id} className='col-md-2' >
              <Link to={"/ProductDitales/" + products._id}>
                  <div className='product px-2 py-3'>
                      <img className='w-100 h-100' src={products.imageCover} alt="" />
                      <span className='text-black fw-bold font-sm'>{products.category.name}</span>
                      <h3 className='h6  text-success border-0 fw-bold'>{products.title.split(" ").slice(0, 2).join(" ")}</h3>
                      <div className='d-flex justify-content-between'>
                          <span className='text-muted'>{products.price} EGP</span>
                          <span>
                              <i className='fas fa-star text-warning'></i>
                              {products.ratingsAverage}

                          </span>
                      </div>


                  </div>
              </Link>
              <button onClick={() => addProduct(products._id)} className='text-white border-0 bg-success w-100 rounded' > + Add</button>

          </div>
          )}



      </div>

  </div>
</>

}
