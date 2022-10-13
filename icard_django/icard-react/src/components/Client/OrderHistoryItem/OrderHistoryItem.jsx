import React from 'react'
import moment from 'moment'
import 'moment/locale/es'
import { Card, Badge, Button } from 'flowbite-react'


export function OrderHistoryItem(props) {
    const { order } = props
    const { title, image } = order.product_data

  return (
    <div className='mb-4'>
    <Card>
        <li className="py-3 sm:py-4 relative">
            <div className='absolute right-0 top-custom'>
                {order.status == 'PENDING' ?
                <Badge color='warning'>
                    Pendiente
                </Badge> : 
                <Badge color='success'>
                    Entregado
                </Badge>}
            </div>
            <div className="flex items-center space-x-4">
                <div className="shrink-0">
                    <img
                        className="h-9 w-9 contain"
                        src={image}
                        alt={title}
                    />
                </div>
                <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    {title}
                </p>
                <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    {order.product_data.category_data.title}
                </p>
                </div>
                <div className="flex flex-col items-end text-sm font-semibold text-gray-900 dark:text-white">
                    <div>
                        <span className='mr-2'>{moment(order.created_at).format('HH:mm')}</span>
                        <span>{moment(order.created_at).startOf('second').fromNow()}</span>
                    </div>
                </div>
            </div>
        </li>
    </Card>
    </div>
  )
}
