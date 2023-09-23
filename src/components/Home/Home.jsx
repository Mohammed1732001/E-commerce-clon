import React from 'react'
import styles from "./Home.module.css"
import FeaturedProductes from './../FeaturedProductes/FeaturedProductes';
import MainSlider from './../MainSlider/MainSlider';
import CatogrySlider from '../CatorgySlider/CatogrySlider';

export default function Home() {
  return <>
    <div className=''>
      <MainSlider />
      <CatogrySlider />
      <FeaturedProductes />
    </div>


  </>

}
