import React, { useState, useEffect } from 'react'
import { useOrder, useTable, usePayment } from '../../hooks'
import { useParams } from 'react-router-dom'
import { map, size, forEach } from 'lodash'
import { OrderHistoryItem } from '../../components/Client'
import { ModalConfirm } from '../../components/Common'
import { Button } from 'flowbite-react'

export function OrdersHistory() {
  const [show, setShow] = useState(false)
  const [tableId, setTableId] = useState(null)
  const [isRequestAccount, setIsRequestAccount] = useState(false)
  const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder()
  const { getTableByNumber } = useTable()
  const { tableNumber } = useParams()
  const { createPayment, getPaymentByTable } = usePayment()

  useEffect(() => {
    (async () => {
      const tableData = await getTableByNumber(tableNumber)
      const idTableTemp = tableData[0].id
      setTableId(idTableTemp)
      getOrdersByTable(idTableTemp, '', 'ordering=-status,-created_at')
    })()
  }, [])

  useEffect(() => {
    (async () => {
      if (tableId) {
        const response = await getPaymentByTable(tableId)
        setIsRequestAccount(response);
      }
    })()
  }, [tableId])
  

  const onClose = () => setShow((prev) => !prev)

  const onCreatePayment = async (paymentType) => {
    setShow(false)
    let totalPayment = 0
    forEach(orders, (order) => {
      totalPayment += Number(order.product_data.price)
    })

    const paymentData = {
      table: tableId,
      totalPayment: totalPayment,
      paymentType: paymentType,
      statusPayment: 'PENDING'
    }

    const payment = await createPayment(paymentData)

    for await(const order of orders){
      await addPaymentToOrder(order.id, payment.id)
    }

    window.location.reload()
  }

  return (
    <div>
      <h1 className='text-2xl font-bold text-center' >Historial Pedidos</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : 
      (
        <>
        {size(orders) > 0 && (
          <div className='flex justify-center mt-4'>
            <Button onClick={() => size(isRequestAccount) == 0 && setShow(true)}>
              {size(isRequestAccount) > 0 ? (
                'La cuenta ya fue pedida'
              ) : (
                'Pedir la cuenta'
              )}
            </Button>
          </div>
        )}

        {map(orders, (order, index) => (
          <ul className="mt-4 px-2.5" key={index}>
            <OrderHistoryItem order={order} />
          </ul>
        ))}
        </>
      )
      }

      <ModalConfirm 
        title='Pagar con tarjeta o efectivo' 
        show={show}
        onCloseText='Efectivo'
        onClose={() => onCreatePayment('CASH')}
        onCloseButton={onClose}
        onConfirmText='Tarjeta'
        onConfirm={() => onCreatePayment('CARD')}
      />
    </div>
  )
}
