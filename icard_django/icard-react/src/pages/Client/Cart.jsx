import React, {useState, useEffect} from 'react'
import { useProduct } from '../../hooks'
import { Link, useParams } from 'react-router-dom'
import { getProductsCart } from '../../api/cart'
import { size } from 'lodash'
import { HiOutlineEmojiSad } from 'react-icons/hi'
import { Button } from 'flowbite-react'
import { ListProductCart } from '../../components/Client'

export function Cart() {
    const [products, setProducts] = useState(null)
    const [refresh, setRefresh] = useState(false)
    const { getProductById } = useProduct()
    const { tableNumber } = useParams()

    const onRefresh = () => setRefresh((prev) => !prev)

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
    

  return (
    <div>
        <h1 className='text-2xl font-bold text-center' >Carrito</h1>
        {!products ? (
            <p>Cargando...</p>
        ) : size(products) == 0 ? (
            <div className='flex flex-col justify-center items-center mt-4'>
                <p className='text-lg font-bold' >No hay productos en el carrito</p>
                <HiOutlineEmojiSad className='h-12 w-12 font-bold mb-4' />
                <Link to={`/client/${tableNumber}/orders`}>
                    <Button>Ver pedidos</Button>
                </Link>
            </div>
        ) : (
            <ListProductCart products={products} onRefresh={onRefresh} />
        )}
    </div>
  )
}
