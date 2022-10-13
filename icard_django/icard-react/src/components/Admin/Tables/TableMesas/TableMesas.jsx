import React, {useState} from 'react'
import { Table, Button } from 'flowbite-react'
import QRCode from 'qrcode.react'
import { HiOutlineTrash, HiOutlinePencil, HiQrcode } from "react-icons/hi";
import { map } from 'lodash';
import { ModalBasic } from '../../../Common';

export function TableMesas(props) {
    const { tables, onDeleteTable, onUpdateTable } = props;
    const [show, setShow] = useState(false)
    const [contentModal, setContentModal] = useState(null)

    const openCloseModal = () => setShow((prev) => !prev)

    const showQr = (table) => {
        let QR = `${window.location.origin}/client/${table.number}`
        setContentModal(<div className='flex justify-center' >
            <QRCode value={QR} />
        </div>)
        openCloseModal()
    }

  return (
    <>
    <Table striped={true}>
            <Table.Head>
                <Table.HeadCell>
                    Número de mesa
                </Table.HeadCell>
                <Table.HeadCell>
                    Acciones
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {map(tables, (table, index) => (
                    <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {table.number}
                        </Table.Cell>
                        
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white flex gap-2 items-center">
                            <Button size='xs' onClick={() => showQr(table)}>
                                <HiQrcode className='w-4 h-4' />
                                QR
                            </Button>
                            <Button size='xs' onClick={() => onUpdateTable(table)}>
                                <HiOutlinePencil />
                                editar
                            </Button>
                            <Button size='xs' color='failure' onClick={() => onDeleteTable(table) }>
                                <HiOutlineTrash />
                                eliminar
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>

        <ModalBasic 
            show={show}
            onClose={openCloseModal}
            title='Codigo QR'
            children={contentModal}
        />
    </>
  )
}
