import React from 'react'
import { Navbar } from '../features/NavBar/Navbar'
import ProductDetail from '../features/product/component/ProductDetail'

const ProductDetailPage = () => {
  return (
    <div>
        <Navbar>
            <ProductDetail/>
        </Navbar>
    </div>
  )
}

export default ProductDetailPage