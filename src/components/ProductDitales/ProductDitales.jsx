import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import Slider from "react-slick";
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';
import $ from "jquery"
export default function ProductDitales() {
  let { addToCart , setnumOfCartItems } = useContext(cartContext)
  async function addProduct(productId) {

    let response = await addToCart(productId);
    if (response?.data?.status === "success") {
      setnumOfCartItems(response.data.numOfCartItems)
      toast.success(response.data.message, { duration: 2000 })
    } else {
      toast.error("Error", { duration: 2000 })
    }
  }
  let { id } = useParams()
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  const [productDital, setProductDital] = useState({})
  async function getProductDitales() {
    let { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`)
    setProductDital(data.data);
    $(".loading").fadeOut(2000)
    console.log(data.data)
  }
  useEffect(() => {
    getProductDitales()
  }, [])
  return <>

    <div className='position-fixed top-0 end-0 bg-success start-0 bottom-0 loading '>
      <i className='fa-solid fa-spinner fa-spin fa-4x text-white  '></i>

    </div>
    <div className=' '>
      {productDital ? <div className='row align-items-center'>
        <div className='col-md-4' key={productDital._id}>
          <Slider {...settings}>
            {productDital.images?.map((img) => < img  key={productDital._id} src={img} alt="" />)}
          </Slider>
        </div>
        <div className='col-md-8'>
          <h2 className='text-main '>{productDital.title}</h2>
          <p className='text-muted '>{productDital.description}</p>
          <div className='d-flex justify-content-between'>
            <span className='text-muted'>{productDital.price} EGP</span>
            <span>
              <i className='fas fa-star text-warning'></i>{productDital.ratingsAverage}</span>
          </div>
          <button onClick={() => addProduct(productDital._id)} className='text-white border-0 bg-success w-100 rounded' > + Add</button>
        </div>
      </div>
        : ""}
    </div>


  </>
}
