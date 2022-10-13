import React from 'react'
import { map } from 'lodash'
import '../../../assets/custom.css'
import { OrderItem} from './OrderItem'

export function ListOrder(props) {
    const { orders, onRefresh } = props

  return (
    <div className='max-w-full p-4'>
        {map(orders, (order, index) => (
            <div className="flow-root" key={index}>
                <ul className="divide-y divide-gray-200 divide-gray-700 border-gray">
                    <OrderItem order={order} key={index} onRefresh={onRefresh} />
                </ul>
            </div>
        ))}
    </div>
  )
}
