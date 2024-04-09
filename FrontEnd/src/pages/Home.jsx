import React from 'react'
import { Navbar } from '../features/NavBar/Navbar'
import { ProductList } from '../features/productList/ProductList'
const Home = () => {
  return (
    <div>
        <Navbar>
            <ProductList/>
        </Navbar>
    </div>
  )
}

export default Home