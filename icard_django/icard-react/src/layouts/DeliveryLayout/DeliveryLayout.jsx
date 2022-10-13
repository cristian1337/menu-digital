import React from 'react'
import { useNavigate } from 'react-router-dom'
import { HiLocationMarker, HiShoppingCart, HiClipboardList, HiLogout, HiHome } from 'react-icons/hi'

export function DeliveryLayout(props) {
    const { children } = props
    const navigate = useNavigate()

    const goToHome = () => {
        navigate(`/domicilios`)
      }
  
      const goToCart = () => {
        navigate(`/domicilios/carrito`)
      }
  
      const goToOrders = () => {
        navigate(`/domicilios/pedidos`)
      }
  return (
    <div>
        <div className='w-full flex justify-center items-center text-lg'>
            <HiLocationMarker className='color-red' />
            <p>Ubicación</p>
        </div>
        <div className='mx-3 my-2'>
            <h1 className='text-3xl font-bold text-black' >Mor!</h1>
            <h5 className='text-lg text-gray-600' >Granizadito o que ?</h5>
        </div>
        {children}
        <nav className='fixed bottom-0 mx-auto flex w-full z-10 icon-nav bg-indigo-600'>
            <div onClick={goToHome} className='flex flex-col items-center justify-center visited:bg-violet-500 text-white'>
                <HiHome className='icon' />
                <p>Inicio</p>
            </div>
            <div onClick={goToCart} className='flex flex-col items-center justify-center visited:bg-violet-500 text-white'>
                <HiShoppingCart className='icon' />
                <p>Carrito</p>
            </div>
            <div onClick={goToOrders} className='flex flex-col items-center justify-center text-white'>
                <HiClipboardList className='icon' />
                <p>pedidos</p>
            </div>
        </nav>
    </div>
  )
}
