import React, { useState } from 'react'
import { Table, Button } from 'flowbite-react'
import { map } from 'lodash'
import moment from 'moment'
import { HiEye } from "react-icons/hi";
import { ModalBasic } from '../../Common';
import { PaymentProductsList } from './PaymentProductsList'

export function TableHistoryPayments(props) {
    const { payments } = props

    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState(null)
    const [contentModal, setContentModal] = useState(null)

    const openCloseModal = () => setShowModal((prev) => !prev)
    
    const showDetails = (payment) => {
        setTitleModal(`Pedidos de la mesa ${payment.table_data.number}`)
        setContentModal(<PaymentProductsList payment={payment} onClose={openCloseModal} />)
        openCloseModal()
    }
  return (
    <>
    <Table striped={true}>
        <Table.Head>
            <Table.HeadCell>
                ID
            </Table.HeadCell>
            <Table.HeadCell>
                Mesa
            </Table.HeadCell>
            <Table.HeadCell>
                Total
            </Table.HeadCell>
            <Table.HeadCell>
                Tipo de pago
            </Table.HeadCell>
            <Table.HeadCell>
                Fecha
            </Table.HeadCell>
            <Table.HeadCell>
                Acciones
            </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
            {map(payments, (payment, index) => (
                <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {payment.id}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {payment.table_data.number}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        ${payment.totalPayment}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {payment.paymentType=='CASH' ? 'Efectivo' : 'Tarjeta'}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {moment(payment.created_at).format('DD/MM/YYYY')}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white flex gap-1.5 items-center">
                        <Button size='xs' onClick={() => showDetails(payment)}>
                        <HiEye className='mr-1' />
                            Ver pedido
                        </Button>
                    </Table.Cell>
                </Table.Row>
            ))}
        </Table.Body>
    </Table>
    <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}  
    />
    </>
  )
}
