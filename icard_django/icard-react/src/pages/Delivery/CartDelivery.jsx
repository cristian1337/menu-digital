import React, {useState, useEffect} from 'react'
import { useProduct } from '../../hooks'
import { getProductsCart } from '../../api/cart'
import { HiOutlineEmojiSad } from 'react-icons/hi'
import { size } from 'lodash'
import { ListProductsCartDelivery } from '../../components/Delivery'

export function CartDelivery() {
    const [products, setProducts] = useState(null)
    const [refresh, setRefresh] = useState(false)
    const { getProductById } = useProduct()

    useEffect(() => {
      (async () => {
        const idProductsCart = getProductsCart()

        const productsArray = []

        for await (const idProduct of idProductsCart) {
            const response = await getProductById(idProduct)
            productsArray.push(response)
        }

        setProducts(productsArray)
      })()
    }, [refresh])
    
    const onRefresh = () => setRefresh((prev) => !prev)

  return (
    <div>
        <h1 className='text-2xl font-bold text-center' >Carrito</h1>
        {!products ? (
            <p>Cargando...</p>
        ) : size(products) == 0 ? (
            <div className='flex flex-col justify-center items-center mt-4'>
                <p className='text-lg font-bold' >No hay productos en el carrito</p>
                <HiOutlineEmojiSad className='h-12 w-12 font-bold mb-4' />
            </div>
        ) : (
            <ListProductsCartDelivery products={products} onRefresh={onRefresh} />
        )}
    </div>
  )
}
