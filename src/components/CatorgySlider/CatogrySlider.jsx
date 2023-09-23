import axios from 'axios';
import React, { useEffect, useState } from 'react'




import Slider from "react-slick";
export default function CatogrySlider() {







    const [categories, setcategories] = useState([])
    async function getcategories() {
        let { data } = await axios.get("https://route-ecommerce.onrender.com/api/v1/categories")
        setcategories(data.data);
        console.log(data.data)
    }

    useEffect(() => {
        getcategories()
    }, [])




    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1
    };


    return <>


        <Slider className='m-0 p-0 gx-0 gy-0'  autoplay={true}  autoplaySpeed={1000} {...settings}>

            {categories.map((catogry) => <div key={catogry._id}>

                <img className='w-100' height={150} src={catogry.image} alt="" />
                <h2 className='h6 '>{catogry.name}</h2>
            </div>)}

        </Slider>

    </>

}
