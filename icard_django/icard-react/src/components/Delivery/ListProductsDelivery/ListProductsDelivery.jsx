import React, {useEffect} from 'react'
import { Button } from 'flowbite-react'
import { HiPlus } from 'react-icons/hi'
import { map } from 'lodash'
import { useProduct } from '../../../hooks'
import { addProductCart } from '../../../api/cart'
import { toast } from 'react-toastify'

export function ListProductsDelivery(props) {
    const { idCategory } = props
    const { loading, products, getProductByCategory, getProducts } = useProduct()

    useEffect(() => {
      if (idCategory) {
        getProductByCategory(idCategory)
      } else {
        getProducts()
      }
    }, [idCategory])

    const addToCart = (product) => {
        addProductCart(product.id)
        toast.success('Producto añadido al carrito', {
            position: 'top-center'
        })
    }

  return (
    <ul className="divide-y divide-gray-200 divide-gray-700 border-gray px-2.5">
        {map(products, (product) => (
        <li className="py-3 sm:py-4 relative" key={product.id}>
            <div className="flex items-center space-x-4">
                <div className="shrink-0">
                    <img
                        className="contain image-product"
                        src={product.image}
                        alt={product.title}
                    />
                </div>
                <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    {product.title}
                </p>
                <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    {product.category_data.title}
                </p>
                </div>
                <div className="flex flex-col items-end text-sm font-semibold text-gray-900 dark:text-white">
                    <div>
                        <span className='mr-2'>${product.price}</span>
                    </div>
                    <div>
                        <Button onClick={() => addToCart(product)} >
                            <HiPlus className='' />
                        </Button>
                    </div>
                </div>
            </div>
        </li>
        ))}
    </ul>
  )
}
