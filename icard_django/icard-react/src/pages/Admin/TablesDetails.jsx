import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Spinner } from 'flowbite-react'
import { forEach, size } from 'lodash'
import { HeaderPage } from '../../components/Admin'
import { ListOrder, AddOrderForm, PaymentDetail } from '../../components/Admin'
import { ModalBasic } from '../../components/Common'
import { useOrder, useTable, usePayment } from '../../hooks'

export function TablesDetails() {
  const [refresh, setRefresh] = useState(false)
  const [paymentData, setPaymentData] = useState(null)
  const { id } = useParams()
  const { error, loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder()
  const { getTable, table } = useTable()
  const { createPayment, getPaymentByTable } = usePayment()

  const [showModal, setShowModal] = useState(false)

  const onRefresh = () => setRefresh((prev) => !prev)
  const openCloseModal = () => {
    setShowModal((prev) => !prev)
  }

  const onCreatePayment = async () => {
    const result = window.confirm('¿Estas seguro de generar la cuenta de la mesa?')

    if (result) {
      let totalPayment = 0
      forEach(orders, (order)=>{
        totalPayment += Number(order.product_data.price)
      })
      
      const paymentData = {
          table: id,
          totalPayment: totalPayment,
          paymentType: 'CASH',
          statusPayment: 'PENDING'
      }

      const payment = await createPayment(paymentData)

      console.log('payment');
      console.log(payment);

      for await (const order of orders) {
        await addPaymentToOrder(order.id, payment.id)
      }
      
      onRefresh()
    }
  } 

  useEffect(() => {
    getOrdersByTable(id, '', 'ordering=-status,crated_at')
  }, [id, refresh])

  useEffect(() => {
    getTable(id)
  }, [id])

  useEffect(() => {
    ( async () => {
      const response = await getPaymentByTable(id)
      if (size(response) > 0){
        setPaymentData(response[0])
      }
    })()
  }, [refresh])
  

  return (
    <>
    <HeaderPage 
      title={`Mesa ${table?.number}`}
      btnTitle={paymentData ? 'Ver cuenta' : 'Añadir pedido'}
      btnClick={openCloseModal}
      btnTitleTwo={!paymentData ? 'Generar cuenta' : null}
      btnClickTwo={onCreatePayment}
    />
    {loading ? (
        <div className='text-center' >
        <Spinner
            aria-label="loading"
            size="xl"
            />
        </div>
      ) :
        <ListOrder orders={orders} onRefresh={onRefresh} />
      }
    <ModalBasic show={showModal} onClose={openCloseModal} title='Generar pedido'>
      {paymentData ? (
        <PaymentDetail 
          payment={paymentData}
          orders={orders}
          onClose={openCloseModal}
          onRefresh={onRefresh}
        />
      ) : 
        <AddOrderForm idTable={id} onClose={openCloseModal} onRefresh={onRefresh} />
      }
    </ModalBasic>
    </>
  )
}
