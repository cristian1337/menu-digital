import { Button, Table } from 'flowbite-react'
import { FaMoneyBillAlt } from "react-icons/fa";
import React from 'react'
import { usePayment, useOrder } from '../../../hooks'

export function PaymentDetail(props) {
  const { payment, orders, onClose, onRefresh } = props
  const { closePayment } = usePayment()
  const { closeOrder } = useOrder()

  const onCloseTable = async () => {
    const result = window.confirm('¿Cerrar mesa y pedidos?')
    if (result) {
      await closePayment(payment.id)
      for await (const order of orders) {
        await closeOrder(order.id)
      }
      onRefresh()
      onClose()
    }
  }

  return (
    <>
    <Table striped={true}>
        <Table.Body className="divide-y">
            <Table.Row>
              <Table.Cell>Mesa</Table.Cell>
              <Table.Cell>{payment.table_data.number}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Total</Table.Cell>
              <Table.Cell>${payment.totalPayment}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Forma de pago</Table.Cell>
              <Table.Cell><FaMoneyBillAlt /></Table.Cell>
            </Table.Row>
        </Table.Body>
    </Table>
    <div className='mt-4'>
      <Button onClick={onCloseTable} >Marcar como pagado y cerrar mesa</Button>
    </div>
    </>
  )
}
