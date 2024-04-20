import React, { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCartAsync, fetchCartByIdAsync, selectItems, updateCartAsync } from "./cartSlice";
import { Link } from "react-router-dom";
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { selectCheckUser } from "../auth/authSlice";


export function Cart() {
  // const count = useSelector(selectCount);
  // const dispatch = useDispatch();
  const loggedUser = useSelector(selectCheckUser);
  const products = useSelector(selectItems);
  const [open, setOpen] = useState(true)
  const totalAmount = products.reduce((amount, item) => item.price * item.quantity + amount, 0);
  const totalQuantity = products.reduce((count, item) => item.quantity + count, 0);
  const dispatch = useDispatch();
  const handleQuantity = (product,quant) => {
    console.log("handleQuantity: ",quant);
    dispatch(updateCartAsync({...product,quantity: product.quantity+quant}));
  }

  const handleDelete =(itemId) =>{
    dispatch(deleteCartAsync(itemId));
  }

  return (
    <>
      {console.log(products)};
      <div className="mx-auto mt-12 bg-white max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-4xl mb-2 font-bold tracking-tight text-gray-900">
          Cart
        </h1>
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {products.map((product) => (
                <li key={product.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <p>{product.title}</p>
                        </h3>
                        <p className="ml-4">${product.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{product.rating}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-gray-500">
                        <label
                          htmlFor="quantity"
                          className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                        >
                          Qty
                        </label>
                        <div className="flex items-center">
                          <button className="bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-l" onClick={(e)=>handleQuantity(product,-1)}>
                            -
                          </button>
                          <div className="bg-gray-200 text-center py-2 px-4">
                            <span className="text-gray-700 font-semibold">{product.quantity}</span> 
                          </div>
                          <button className="bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-r" onClick={(e)=>handleQuantity(product,1)}>
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex">
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={(e)=>handleDelete(product.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>


        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${totalAmount}</p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Total Quantity</p>
            <p>{totalQuantity}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
          <div className="mt-6">
            <Link to="/checkout"
              href="#"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{' '}
              <Link to="/">
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => setOpen(false)}
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
