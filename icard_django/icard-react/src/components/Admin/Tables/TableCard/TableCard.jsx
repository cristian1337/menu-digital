import React, {useState, useEffect} from 'react'
import { getOrdersByTableApi } from '../../../../api/orders'
import { Card, Badge } from 'flowbite-react'
import { FaUtensils } from "react-icons/fa";
import { ORDER_STATUS } from '../../../../utils/constants'
import { size } from 'lodash';
import { Link } from 'react-router-dom'
import { usePayment } from '../../../../hooks'
import '../../../../assets/custom.css'

export function TableCard(props) {
    const { table, index, refresh } = props
    const [orders, setOrders] = useState([])
    const [tableBusy, setTableBusy] = useState(false)
    const [pendingPayment, setPendingPayment] = useState(false)
    const { getPaymentByTable } = usePayment()

    useEffect(() => {
      (async () => {
        const response = await getOrdersByTableApi(table.id, ORDER_STATUS.PENDING)
        setOrders(response)
        
      })()
    }, [refresh])

    useEffect(() => {
        (async () => {
          const response = await getOrdersByTableApi(table.id, ORDER_STATUS.DELIVERED)
          
          if (size(response) > 0) {
            setTableBusy(response)
          }else {
            setTableBusy(false)
          }

        })()
      }, [refresh])

      useEffect(() => {
        (async () => {
          const response = await getPaymentByTable(table.id)
          if (size(response) > 0) setPendingPayment(true)
          else setPendingPayment(false)
        })()
      }, [refresh])

  return (
    <Link key={index} className='cursor-pointer mt-4' to={`/admin/mesa/${table.id}`}>
        {size(orders) ? <div className='absolute' ><Badge color="failure" size='xl'>{size(orders)}</Badge></div> : null}

        {pendingPayment &&  <div className='absolute' ><Badge color="failure" size='xl'>Cuenta</Badge></div>}
        <Card>
            <div className='flex flex-col items-center'>
                <FaUtensils className={size(orders)>0 ? 'w-auto h-11 border rounded-md p-1.5 m-3 pending' : tableBusy ? 'w-auto h-11 border rounded-md p-1.5 m-3 busy' : 'w-auto h-11 border rounded-md p-1.5 m-3'} />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    Mesa {table.number}
                </h5>
            </div>
        </Card>
    </Link>
  )
}
