import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import slide1 from "../../images/slider-image-1.jpeg"
import slide2 from "../../images/slider-image-2.jpeg"
import slide3 from "../../images/slider-image-3.jpeg"
export default function MainSlider() {
  return <>
  <div className='row g-0'>
<div className='col-md-9'>

<OwlCarousel className='bg-white owl-theme' loop items={1} >
<img src={slide1} height={400} className='w-100' alt="" />
<img src={slide2} height={400} className='w-100' alt="" />
<img src={slide3} height={400} className='w-100' alt="" />

</OwlCarousel>
</div>
<div className='col-md-3'>
<img src={slide2} height={200} className='w-100' alt="" />
<img src={slide3} height={200} className='w-100' alt="" />


</div>
  </div>
  
  </>
}
