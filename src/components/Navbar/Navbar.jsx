import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../images/freshcart-logo.svg"
import { cartContext } from '../../Context/CartContext'


export default function Navbar({ userData, logOut }) {

  let { numOfCartItems } = useContext(cartContext)


  return <>

    <nav className="navbar fixed-top navbar-light bg-light navbar-expand-lg ">
      <div className="container">
        <a className="navbar-brand" href="#"><img className='text-light' src={logo} alt="" /></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">

          {userData ?

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="product">Product</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="brands">Brands</Link>
              </li>
            </ul> : ""}


          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className='nav-item d-flex align-items-center'>
              <i className='fab mx-2 fa-facebook'></i>
              <i className='fab mx-2 fa-twitter'></i>
              <i className='fab mx-2 fa-instagram'></i>
              <i className='fab mx-2 fa-tiktok'></i>
              <i className='fab mx-2 fa-linkedin'></i>
              <i className='fab mx-2 fa-youtube'></i>
            </li>

            {userData ? <>

              <li className="nav-item position-relative ">
                <Link className="nav-link px-2 active" aria-current="page" to="cart"><i className='fas fa-shopping-cart fa-lg'></i>
                  <span className='   position-absolute top-1 start-100 translate-middle badge rounded-pill bg-success'>{numOfCartItems} </span>
                </Link>
              </li>
              <li className=" px-1 nav-item">
                <Link className="nav-link active" onClick={logOut} aria-current="page" to="rigistrion">LogOut</Link>
              </li>
            </>
              :
              <>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="rigistrion">Rigister</Link>
                </li>
              </>
            }
          </ul>
        </div>
      </div>
    </nav>
  </>
}









