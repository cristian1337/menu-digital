import React, {useEffect, useState} from 'react'
import { map } from 'lodash'
import moment from 'moment'
import { useOrder } from '../../../hooks'

export function PaymentProductsList(props) {
    const { payment } = props
    const [orders, setOrders] = useState(undefined)
    const { getOrdersByPayment } = useOrder()

    useEffect(() => {
      ( async () => {
        const response = await getOrdersByPayment(payment.id)
        setOrders(response)
      })()
    }, [])
    

  return (
    <div className="flow-root">
        <ul className="divide-y divide-gray-200 divide-gray-700 border-gray">
            {map(orders, (order, index) => (
            <li className="py-3 sm:py-4 relative" key={index}>
                <div className="flex items-center space-x-4">
                    <div className="shrink-0">
                        <img
                            className="h-9 w-9 contain"
                            src={order.product_data.image}
                            alt={order.product_data.title}
                        />
                    </div>
                    <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        {order.product_data.title}
                    </p>
                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        {order.product_data.category_data.title}
                    </p>
                    </div>
                    <div className="flex flex-col items-end text-sm font-semibold text-gray-900 dark:text-white">
                        <div>
                            <span className='mr-2'>{moment(order.created_at).format('DD/MM/YYYY')}</span>
                        </div>
                        <div>
                            <span className='mr-2'>${order.product_data.price}</span>
                        </div>
                    </div>
                </div>
            </li>
            ))}
        </ul>
    </div>
  )
}
