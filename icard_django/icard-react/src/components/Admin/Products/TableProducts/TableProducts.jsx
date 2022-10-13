import React from 'react'
import { Table, Button, Badge } from 'flowbite-react'
import { HiOutlineTrash, HiOutlinePencil, HiCheck, HiX } from "react-icons/hi";
import { map } from 'lodash';
import '../../../../assets/custom.css'

export function TableProducts(props) {
    const { products, onUpdateProduct, onDeleteProduct } = props;
  return (
    <>
        <Table striped={true}>
            <Table.Head>
                <Table.HeadCell>
                    Titulo
                </Table.HeadCell>
                <Table.HeadCell>
                    Precio
                </Table.HeadCell>
                <Table.HeadCell>
                    Categoria
                </Table.HeadCell>
                <Table.HeadCell>
                    Imagen
                </Table.HeadCell>
                <Table.HeadCell>
                    Activo
                </Table.HeadCell>
                <Table.HeadCell>
                    Acciones
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {map(products, (product, index) => (
                    <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {product.title}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {product.price}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {product.category_data.title}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            <img className='contain w-24 h-14' src={product.image} alt={products.title}/>
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {product.active ? <Badge size='sm' icon={HiCheck}>Activo</Badge> : <Badge size='sm' icon={HiX}>Inactivo</Badge>}
                        </Table.Cell>
                        
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white flex gap-1.5 items-center">
                            <Button size='xs' onClick={() => onUpdateProduct(product)}>
                            <HiOutlinePencil />
                                editar
                            </Button>
                            <Button size='xs' color='failure' onClick={() => onDeleteProduct(product) }>
                            <HiOutlineTrash />
                                eliminar
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    </>
  )
}
