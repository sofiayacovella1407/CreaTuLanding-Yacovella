import React from 'react';
import CartWidget from './CartWidget.jsx';

const NavBar = () => {
  return (

    <div id='header'>
      
      <div id='logo'>
      <span>Logo</span>
      </div>

      <div id='navContainer'>
        <ul id='menu'>
          <li><a href="#" className='categorie'>Computadoras</a></li>
          <li><a href="#" className='categorie'>Mouse</a></li>
          <li><a href="#" className='categorie'>Bocinas</a></li>
          <li><a href="#" className='categorie'>Teclados</a></li>
          <li><a href="#" className='categorie'>Microfonos</a></li>
          <li><a href="#" className='categorie'>Audifonos</a></li>
          <li><a href="#"><CartWidget /></a></li>

        </ul>

      </div>

      
    </div>
  )
}

export default NavBar