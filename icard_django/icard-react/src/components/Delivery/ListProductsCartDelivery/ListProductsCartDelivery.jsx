import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useOrder, useTable } from '../../../hooks'
import { Button } from 'flowbite-react'
import { HiTrash } from 'react-icons/hi'
import { map, forEach } from 'lodash'
import { removeProductCartApi } from '../../../api/cart'
import ModalDelivery from '../ModalDelivery/ModalDelivery'

export function ListProductsCartDelivery(props) {
    const { products, onRefresh } = props
    const [total, setTotal] = useState(0)
    const [show, setShow] = useState(false)
    const { addOrderToTable } = useOrder()
    const { getTableByNumber } = useTable()
    const navigate = useNavigate()

    const onClose = () => setShow((prev) => !prev)

    useEffect(() => {
      let totalTemp = 0
      forEach(products, (product) => {
        totalTemp += Number(product.price)
      })
      setTotal(totalTemp)
    }, [products])
    
    const removeProduct = (index) => {
        removeProductCartApi(index)
        onRefresh()
    }

    const createOrder = async () => {
        const tableData = await getTableByNumber(tableNumber)
        const idTable = tableData[0].id
        for await (const product of products) {
            await addOrderToTable(idTable, product.id)
        }
        cleanProductsCartApi()

        navigate(`/client/orders`)
    }

  return (
    <>
    <ul className="divide-y divide-gray-200 divide-gray-700 border-gray px-2.5">
        {map(products, (product, index) => (
        <li className="py-3 sm:py-4 relative" key={product.id}>
            <div className="flex items-center space-x-4">
                <div className="shrink-0">
                    <img
                        className="contain image-product-cart"
                        src={product.image}
                        alt={product.title}
                    />
                </div>
                <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    {product.title}
                </p>
                <p className="truncate text-md font-bold text-gray-500 dark:text-gray-400">
                    ${product.price}
                </p>
                </div>
                <div className="flex flex-col items-end text-sm font-semibold text-gray-900 dark:text-white">
                    <div>
                        <Button onClick={() => removeProduct(index)} >
                            <HiTrash />
                        </Button>
                    </div>
                </div>
            </div>
        </li>
        ))}
    </ul>
    <div className='flex justify-center items-center mt-4 absolute w-full btn-pedido' >
        <Button onClick={() => setShow(true)} size='lg' >Realizar pedido</Button>
        <p className='text-lg font-bold' >Total: ${total}</p>
    </div>
    <ModalDelivery show={show} onClose={onClose} products={products} />
    </>
  )
}
